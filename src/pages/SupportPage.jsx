import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { installer, subscribeToPush } from '../utils/pwa';

export default function SupportPage() {
  const { current: t } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(null); // {index, text}
  const longPressTimer = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  // Track visual viewport (handles keyboard open/close on mobile)
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handleResize = () => setViewportHeight(vv.height);
    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    handleResize();
    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
    };
  }, []);
  const [adminReply, setAdminReply] = useState('');
  const [canInstall, setCanInstall] = useState(installer.canInstall());
  const [adminSending, setAdminSending] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchChats = () =>
    fetch('https://quantyrexmarkets-api.vercel.app/api/chat/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => {
        const list = Array.isArray(d) ? d : [];
        setContacts(list);
        if (selectedChat) {
          const updated = list.find(c => c._id === selectedChat._id);
          if (updated) setSelectedChat(updated);
        }
      }).catch(() => {});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  useEffect(() => { fetchChats(); const i = setInterval(fetchChats, 3000); return () => clearInterval(i); }, [selectedChat]);
  useEffect(() => {
    if (!bottomRef.current) return;
    const container = bottomRef.current.parentElement;
    if (!container) return;
    // Only auto-scroll if user is within 100px of the bottom
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  const sendReply = async () => {
    if (!adminReply?.trim() || adminSending) return;
    setAdminSending(true);
    try {
      const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/reply/${selectedChat._id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ text: adminReply }) });
      const data = await res.json();
      setSelectedChat(data);
      setAdminReply('');
    } catch(e) {}
    setAdminSending(false);
  };

  // PWA manifest route switch
  useEffect(() => {
    let el = document.querySelector('link[rel="manifest"]');
    if (el) el.setAttribute('href', '/manifest-support.json?v=20250601c');
    document.title = 'Quantyrex Support';
  }, []);

  // Listen for install prompt
  useEffect(() => {
    const handler = () => setCanInstall(true);
    window.addEventListener('pwa-installable', handler);
    return () => window.removeEventListener('pwa-installable', handler);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100dvh', width: '100vw', background: '#000', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: selectedChat ? '0px' : '100%', maxWidth: '280px', flexShrink: 0, background: '#0a0a0a', borderRight: `1px solid ${t.subtleBorder}`, overflowY: 'auto', transition: 'width 0.2s', overflow: 'hidden' }}>
        <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${t.subtleBorder}` }}>
          <button type="button" onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer', fontSize: '18px', padding: '0' }}>←</button>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>Support Chats</span>
          <span style={{ background: '#6366f1', color: 'white', fontSize: '9px', padding: '2px 7px', borderRadius: '10px', marginLeft: 'auto' }}>{contacts.length}</span>
        </div>
        {contacts.length === 0 && <div style={{ color: t.faintText, fontSize: '11px', padding: '20px 12px' }}>No conversations yet</div>}
        {contacts.map((c, i) => (
          <div key={i} onClick={async () => {
            setSelectedChat(c); setShowInfo(false);
            await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/read/${c._id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
          }} style={{ padding: '12px 14px', cursor: 'pointer', borderBottom: `1px solid ${t.tableRowBorder}`, background: selectedChat?._id === c._id ? 'rgba(99,102,241,0.15)' : 'transparent', borderLeft: selectedChat?._id === c._id ? '3px solid #6366f1' : '3px solid transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white', fontWeight: '700', flexShrink: 0 }}>{(c.name || c.email || 'U').slice(0,2).toUpperCase()}</div>
                <div>
                  <div style={{ color: 'white', fontSize: '11px', fontWeight: '600' }}>{c.name || c.email || 'User'}</div>
                  <div style={{ color: t.mutedText, fontSize: '9px', marginTop: '1px' }}>{c.messages?.[c.messages.length-1]?.text?.slice(0,30) || 'Image'}{c.messages?.[c.messages.length-1]?.text?.length > 30 ? '...' : ''}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                {c.unreadAdmin > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '8px', padding: '1px 5px', borderRadius: '8px' }}>{c.unreadAdmin}</span>}
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.visitorOnline ? '#22c55e' : 'transparent' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', minWidth: 0, minHeight: 0, maxHeight: '100%', overflow: 'hidden' }}>
        {!selectedChat ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.faintText, fontSize: '12px' }}>Select a conversation</div>
        ) : (
          <>
            {/* Header */}
            <div style={{ background: '#0a0a0a', padding: '12px 16px', paddingTop: 'max(12px, env(safe-area-inset-top, 12px))', borderBottom: `1px solid ${t.subtleBorder}`, display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button type="button" onClick={() => setSelectedChat(null)} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', fontSize: '18px', padding: '0' }}>←</button>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', fontWeight: '700' }}>{(selectedChat.name || selectedChat.email || 'U').slice(0,2).toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <div style={{ color: 'white', fontSize: '12px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedChat.name || selectedChat.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px' }}>
                  <span style={{ color: selectedChat.visitorOnline ? '#22c55e' : t.faintText }}>{selectedChat.visitorOnline ? '● Online' : '○ Offline'}</span>
                  {selectedChat.userInfo?.country && <span style={{ color: t.mutedText }}>• {selectedChat.userInfo.country}</span>}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button type="button" onClick={() => setShowInfo(!showInfo)} title="View visitor info" style={{ background: showInfo ? '#6366f1' : '#1a1a1a', border: `1px solid ${t.border}`, color: 'white', cursor: 'pointer', borderRadius: '4px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'>
                    <circle cx='12' cy='12' r='10'/>
                    <line x1='12' y1='16' x2='12' y2='12'/>
                    <line x1='12' y1='8' x2='12.01' y2='8'/>
                  </svg>
                </button>
                {selectedChat.status === 'open' && (
                  <button type="button" onClick={async () => {
                    await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/resolve/${selectedChat._id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
                    fetchChats(); setSelectedChat(prev => ({ ...prev, status: 'resolved' }));
                  }} style={{ background: '#22c55e', border: 'none', color: 'white', fontSize: '9px', padding: '5px 12px', cursor: 'pointer', borderRadius: '4px' }}>Resolve</button>
                )}
                <button type="button" onClick={async () => {
                  if (!window.confirm('Delete?')) return;
                  await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/delete/${selectedChat._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                  fetchChats(); setSelectedChat(null); setShowInfo(false);
                }} style={{ background: '#ef4444', border: 'none', color: 'white', fontSize: '9px', padding: '5px 12px', cursor: 'pointer', borderRadius: '4px' }}>Delete</button>
              </div>
            </div>

            {/* User Info Panel - hidden on mobile, shown on desktop */}
            <div style={{ background: '#0a0a0a', borderBottom: `1px solid ${t.subtleBorder}`, padding: '14px 16px', gap: '12px', alignItems: 'flex-start', display: showInfo || window.innerWidth >= 768 ? 'flex' : 'none', flexShrink: 0 }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'white', fontWeight: '700', flexShrink: 0 }}>
                {(selectedChat.name || selectedChat.email || 'U').slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '700' }}>{selectedChat.name || 'Unknown'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.subText, fontSize: '10px' }}>
                  <svg width='10' height='10' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/><polyline points='22,6 12,13 2,6'/></svg>
                  {selectedChat.email}
                </div>
                {selectedChat.userInfo?.country && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.subText, fontSize: '10px' }}>
                    <svg width='10' height='10' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/><circle cx='12' cy='9' r='2.5'/></svg>
                    {selectedChat.userInfo.country}
                  </div>
                )}
                {selectedChat.userInfo?.device && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.subText, fontSize: '10px' }}>
                    <svg width='10' height='10' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><rect x='5' y='2' width='14' height='20' rx='2'/></svg>
                    {selectedChat.userInfo.device}
                  </div>
                )}
                {selectedChat.userInfo?.browser && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.subText, fontSize: '10px' }}>
                    <svg width='10' height='10' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='2' y1='12' x2='22' y2='12'/><path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10'/></svg>
                    {selectedChat.userInfo.browser.includes('Chrome') ? 'Chrome' : selectedChat.userInfo.browser.includes('Firefox') ? 'Firefox' : selectedChat.userInfo.browser.includes('Safari') ? 'Safari' : 'Browser'}
                  </div>
                )}
                {selectedChat.userInfo?.page && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
                    <svg width='10' height='10' fill='none' stroke='#6366f1' viewBox='0 0 24 24' strokeWidth='2'><path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'/><path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'/></svg>
                    <span style={{ color: '#6366f1' }}>vertextradspro.vercel.app{selectedChat.userInfo.page}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: selectedChat.visitorOnline ? '#22c55e' : t.faintText, fontSize: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedChat.visitorOnline ? '#22c55e' : t.faintText }}></div>
                  {selectedChat.visitorOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}>
              {selectedChat.messages?.map((msg, i) => {
                const msgDate = new Date(msg.createdAt).toDateString();
                const prevDate = i > 0 ? new Date(selectedChat.messages[i-1].createdAt).toDateString() : null;
                const initials = (selectedChat.name || selectedChat.email || 'U').slice(0,2).toUpperCase();
                return (
                  <div key={i}>
                    {msgDate !== prevDate && (
                      <div style={{ textAlign: 'center', margin: '8px 0' }}>
                        <span style={{ background: t.border, color: t.mutedText, fontSize: '9px', padding: '3px 10px', borderRadius: '8px' }}>
                          {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: msg.sender === 'system' ? 'center' : msg.sender === 'admin' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: '8px' }}>
                      {msg.sender === 'system' ? (
                        <div style={{ background: t.subtleBorder, color: t.mutedText, fontSize: '9px', padding: '4px 12px', borderRadius: '10px' }}>{msg.text} <span style={{ color: t.faintText }}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div>
                      ) : msg.sender === 'user' ? (
                        <>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2'>
                              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                              <circle cx='12' cy='7' r='4'/>
                            </svg>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', marginLeft: '4px' }}>
                            <div
                              onTouchStart={() => {
                                longPressTimer.current = setTimeout(() => {
                                  setDeleteMsg({ index: i, text: msg.text || 'Image' });
                                }, 600);
                              }}
                              onTouchEnd={() => clearTimeout(longPressTimer.current)}
                              onTouchMove={() => clearTimeout(longPressTimer.current)}
                              onContextMenu={(e) => { e.preventDefault(); setDeleteMsg({ index: i, text: msg.text || 'Image' }); }}
                              style={{ background: '#1c1c1c', color: 'white', fontSize: '12px', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', lineHeight: '1.4', wordBreak: 'break-word', userSelect: 'text', WebkitUserSelect: 'text', cursor: 'pointer' }}>
                              {msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer', objectFit: 'cover' }} /></a> : msg.text}
                            </div>
                            <div style={{ color: t.faintText, fontSize: '9px', marginTop: '4px', marginLeft: '6px' }}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '70%', marginRight: '4px' }}>
                            <div
                              onTouchStart={() => {
                                longPressTimer.current = setTimeout(() => {
                                  setDeleteMsg({ index: i, text: msg.text || 'Image' });
                                }, 600);
                              }}
                              onTouchEnd={() => clearTimeout(longPressTimer.current)}
                              onTouchMove={() => clearTimeout(longPressTimer.current)}
                              onContextMenu={(e) => { e.preventDefault(); setDeleteMsg({ index: i, text: msg.text || 'Image' }); }}
                              style={{ background: '#3b82f6', color: 'white', fontSize: '12px', padding: msg.image ? '4px' : '10px 14px', borderRadius: '18px 18px 4px 18px', lineHeight: '1.4', wordBreak: 'break-word', userSelect: 'text', WebkitUserSelect: 'text', cursor: 'pointer' }}>
                              {msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer', objectFit: 'cover' }} /></a> : msg.text}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', marginRight: '6px' }}>
                              <span style={{ color: t.faintText, fontSize: '9px' }}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', color: msg.read ? '#22c55e' : t.mutedText }}>
                                {msg.read ? (
                                  <svg width='14' height='10' viewBox='0 0 16 11' fill='none'>
                                    <path d='M1 5.5L4.5 9L10 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
                                    <path d='M6 5.5L9.5 9L15 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
                                  </svg>
                                ) : (
                                  <svg width='12' height='10' viewBox='0 0 12 11' fill='none'>
                                    <path d='M1 5.5L4.5 9L11 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/>
                                  </svg>
                                )}
                              </span>
                            </div>
                          </div>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#bef5e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#0d9488' strokeWidth='2'>
                              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                              <circle cx='12' cy='7' r='4'/>
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {selectedChat.status === 'open' && (
              <div style={{ padding: '12px 16px', paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a', display: 'flex', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                <input type="file" accept="image/*" id="supportImageUpload" style={{ display: 'none' }} onChange={async e => {
                  const file = e.target.files[0]; if (!file) return;
                  setAdminSending(true);
                  const fd = new FormData(); fd.append('image', file);
                  try {
                    const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/reply-image/${selectedChat._id}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
                    const data = await res.json(); setSelectedChat(data);
                  } catch(e) {}
                  setAdminSending(false); e.target.value = '';
                }} />
                <button type="button" onClick={() => document.getElementById('supportImageUpload').click()} style={{ background: '#1a1a1a', border: `1px solid ${t.border}`, color: t.text, width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width='16' height='16' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21,15 16,10 5,21'/></svg>
                </button>
                <textarea
                  value={adminReply || ''}
                  onChange={e => {
                    setAdminReply(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
                  }}
                  onKeyDown={e => {
                    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
                    if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
                      e.preventDefault();
                      sendReply();
                      e.target.style.height = 'auto';
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  style={{
                    flex: 1, background: '#111',
                    border: `1px solid ${t.border}`,
                    color: t.text, fontSize: '13px',
                    padding: '10px 16px', outline: 'none',
                    borderRadius: '20px', resize: 'none',
                    fontFamily: 'inherit', lineHeight: '1.4',
                    maxHeight: '140px', overflowY: 'auto',
                    minHeight: '40px', boxSizing: 'border-box',
                    userSelect: 'text', WebkitUserSelect: 'text'
                  }}
                />
                <button type="button" onClick={sendReply} disabled={adminSending} style={{ background: '#6366f1', border: 'none', color: 'white', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: adminSending ? 0.6 : 1 }}>
                  {adminSending ? (
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                      <circle cx='12' cy='12' r='10' opacity='0.3'/>
                      <path d='M12 2a10 10 0 0 1 10 10' strokeLinecap='round'>
                        <animateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='0.8s' repeatCount='indefinite'/>
                      </path>
                    </svg>
                  ) : (
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Message Confirmation */}
      {deleteMsg && (
        <>
          <div onClick={() => setDeleteMsg(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99998 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 99999, background: '#1a1a1a', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px', width: '90%', maxWidth: '320px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='24' height='24' fill='none' stroke='#ef4444' viewBox='0 0 24 24' strokeWidth='2'>
                <polyline points='3 6 5 6 21 6'/>
                <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/>
              </svg>
            </div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>Delete Message?</div>
            <div style={{ color: t.mutedText, fontSize: '11px', marginBottom: '16px', wordBreak: 'break-word' }}>
              "{deleteMsg.text.slice(0, 60)}{deleteMsg.text.length > 60 ? '...' : ''}"
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setDeleteMsg(null)} style={{ flex: 1, background: 'transparent', border: `1px solid ${t.border}`, color: t.text, fontSize: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button type="button" onClick={async () => {
                try {
                  const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/chat/message/${selectedChat._id}/${deleteMsg.index}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                  const data = await res.json();
                  if (data && data.messages) setSelectedChat(data);
                } catch(e) {}
                setDeleteMsg(null);
              }} style={{ flex: 1, background: '#ef4444', border: 'none', color: 'white', fontSize: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
