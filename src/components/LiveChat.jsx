import { useTheme } from '../context/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const API = 'https://quantyrexmarkets-api.vercel.app/api/chat';

export default function LiveChat() {
  const { current: t } = useTheme();
  if (window.location.pathname.startsWith('/admin')) return null;
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(() => {
    return !sessionStorage.getItem('chatBubbleDismissed');
  });

  // Allow external trigger
  useEffect(() => {
    const handler = () => { setOpen(true); setShowBubble(false); };
    window.addEventListener('openLiveChat', handler);
    return () => window.removeEventListener('openLiveChat', handler);
  }, []);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const bottomRef = useRef(null);

  const fetchChat = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/my`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setChat(data);
      if (data && !open) setUnread(data.unreadUser || 0);
    } catch (e) {}
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 5000);
    return () => clearInterval(interval);
  }, [token, open]);

  // Heartbeat - keep user marked online while chat is open
  useEffect(() => {
    if (!open || !token) return;
    const sendHeartbeat = () => {
      fetch(`${API}/heartbeat`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    };
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 20000); // every 20s
    return () => clearInterval(interval);
  }, [open, token]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      // Auto-fullscreen on mobile only
      if (window.innerWidth < 768) {
        setFullscreen(true);
      }
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, chat]);

  // Track visual viewport (handles keyboard open/close on mobile)
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  useEffect(() => {
    if (!open || !fullscreen) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const handleResize = () => {
      setViewportHeight(vv.height);
    };
    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    handleResize();
    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
    };
  }, [open, fullscreen]);

  // Lock body scroll when fullscreen chat is open
  const savedScrollY = useRef(0);
  useEffect(() => {
    if (open && fullscreen) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    }
    return () => {
      const wasLocked = document.body.style.position === 'fixed';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      if (wasLocked) {
        window.scrollTo(0, savedScrollY.current);
      }
    };
  }, [open, fullscreen]);

  const sendMessage = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      // Get country from timezone
      let country = '';
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        // Map common timezones to countries
        const tzMap = {
          'Africa/Lagos': 'Nigeria', 'Africa/Abidjan': 'Ivory Coast', 'Africa/Accra': 'Ghana',
          'Africa/Nairobi': 'Kenya', 'Africa/Cairo': 'Egypt', 'Africa/Johannesburg': 'South Africa',
          'Asia/Calcutta': 'India', 'Asia/Kolkata': 'India', 'Asia/Dubai': 'UAE',
          'Asia/Karachi': 'Pakistan', 'Asia/Dhaka': 'Bangladesh', 'Asia/Colombo': 'Sri Lanka',
          'America/New_York': 'USA', 'America/Los_Angeles': 'USA', 'America/Chicago': 'USA',
          'Europe/London': 'UK', 'Europe/Paris': 'France', 'Europe/Berlin': 'Germany',
          'Asia/Tokyo': 'Japan', 'Asia/Shanghai': 'China', 'Asia/Singapore': 'Singapore',
          'Australia/Sydney': 'Australia', 'Pacific/Auckland': 'New Zealand',
          'America/Toronto': 'Canada', 'America/Sao_Paulo': 'Brazil',
        };
        country = tzMap[tz] || tz.split('/').pop().replace(/_/g, ' ');
      } catch(e) {}

      const res = await fetch(`${API}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
        text,
        userInfo: {
          browser: navigator.userAgent,
          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          page: window.location.pathname,
          country
        }
      })
      });
      const data = await res.json();
      setChat(data);
      setText('');
    } catch (e) {}
    setLoading(false);
  };

  if (!user) return null;

  return (
    <>
      {/* Avatar Preview Modal */}
      {showAvatar && (
        <div
          onClick={() => setShowAvatar(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2147483647, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src="/support-avatar.jpg"
            alt="Support"
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #6366f1' }}
          />
        </div>
      )}

      {/* Chat Window */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        {open && (
          <div style={{ position: fullscreen ? 'fixed' : 'absolute', bottom: fullscreen ? 0 : '50px', right: fullscreen ? 0 : 0, top: fullscreen ? 0 : 'auto', left: fullscreen ? 0 : 'auto', width: fullscreen ? '100vw' : '280px', height: fullscreen ? `${viewportHeight}px` : 'auto', maxHeight: fullscreen ? `${viewportHeight}px` : 'none', paddingTop: fullscreen ? 'env(safe-area-inset-top, 0px)' : 0, paddingBottom: fullscreen ? 'env(safe-area-inset-bottom, 0px)' : 0, boxSizing: 'border-box', background: '#dedede', border: fullscreen ? 'none' : '1px solid rgba(99,102,241,0.4)', borderRadius: fullscreen ? '0' : '8px', overflow: 'hidden', boxShadow: fullscreen ? 'none' : '0 8px 32px rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ background: '#6366f1', padding: 'env(safe-area-inset-top, 0px) 12px 16px 12px', paddingTop: fullscreen ? 'max(16px, env(safe-area-inset-top, 16px))' : '16px', minHeight: '68px', flexShrink: 0, boxSizing: 'border-box', borderRadius: fullscreen ? '0' : '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.3)' }}>
                    <svg viewBox="0 0 40 40" fill="none" style={{ width: '26px', height: '26px' }}>
                      {/* Hexagon logo */}
                      <path d="M20 3L5 11V23L20 37L35 23V11L20 3Z" fill="#111827" stroke="#818cf8" strokeWidth="1.5"/>
                      <path d="M20 8L9 14V22L20 32L31 22V14L20 8Z" fill="#111827" stroke="#818cf8" strokeWidth="1.2"/>
                      <path d="M20 13L13 17V22L20 27L27 22V17L20 13Z" fill="#a5b4fc" stroke="#a5b4fc" strokeWidth="1"/>
                      {/* Headset */}
                      <path d="M13 22C13 17.582 16.134 14 20 14C23.866 14 27 17.582 27 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <rect x="11" y="22" width="3" height="5" rx="1.5" fill="white"/>
                      <rect x="26" y="22" width="3" height="5" rx="1.5" fill="white"/>
                      <path d="M29 26.5C29 28 28 29.5 26.5 30L24 30.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', border: '2px solid #6366f1' }} />
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: '11px', fontWeight: '700' }}>Live Chat — Quantyrex Markets Support</div>
                  <div style={{ color: t.overlayText, fontSize: '9px' }}>We typically reply within minutes</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button type="button" onClick={() => setFullscreen(!fullscreen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>{fullscreen ? <svg width='12' height='12' fill='none' stroke='white' viewBox='0 0 24 24' strokeWidth='2'><path d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3'/></svg> : <svg width='12' height='12' fill='none' stroke='white' viewBox='0 0 24 24' strokeWidth='2'><path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7'/></svg>}</button>
                <button type="button" onClick={() => { setOpen(false); setFullscreen(false); setViewportHeight(window.innerHeight); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px' }}>×</button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: fullscreen ? 1 : 'none', height: fullscreen ? 'auto' : '220px', overflowY: 'auto', padding: '10px', minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', scrollPaddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#dedede' }}>
              {!chat || !chat.messages || chat.messages.filter(msg => !(msg.sender === 'system' && msg.text?.includes('left'))).length === 0 ? (
                <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: '9px', textAlign: 'center', marginTop: '80px' }}>
                  Send a message to start chatting
                </div>
              ) : chat.messages.filter(msg => !(msg.sender === 'system' && msg.text?.includes('left'))).map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'system' ? 'center' : msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                  {msg.sender === 'system' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', padding: '4px 12px', borderRadius: '12px' }}>
                      <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '10px' }}>{msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer' }} /></a> : msg.text}</span>
                    </div>
                  ) : msg.sender === 'admin' ? (
                    <>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px', boxShadow: '0 0 0 2px rgba(255,255,255,0.8)' }}>
                        <svg viewBox="0 0 40 40" fill="none" style={{ width: '22px', height: '22px' }}>
                          <path d="M20 3L5 11V23L20 37L35 23V11L20 3Z" fill="#111827" stroke="#818cf8" strokeWidth="1.5"/>
                          <path d="M20 8L9 14V22L20 32L31 22V14L20 8Z" fill="#111827" stroke="#818cf8" strokeWidth="1.2"/>
                          <path d="M20 13L13 17V22L20 27L27 22V17L20 13Z" fill="#a5b4fc" stroke="#a5b4fc" strokeWidth="1"/>
                          <path d="M13 22C13 17.582 16.134 14 20 14C23.866 14 27 17.582 27 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          <rect x="11" y="22" width="3" height="5" rx="1.5" fill="white"/>
                          <rect x="26" y="22" width="3" height="5" rx="1.5" fill="white"/>
                          <path d="M29 26.5C29 28 28 29.5 26.5 30L24 30.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', marginLeft: '4px' }}>
                        <div style={{ background: '#ffffff', color: '#1a1a1a', fontSize: '12px', padding: msg.image ? '4px' : '10px 14px', borderRadius: '18px 18px 18px 4px', lineHeight: '1.4', wordBreak: 'break-word', whiteSpace: 'pre-wrap', boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
                          {msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer' }} /></a> : msg.text}
                        </div>
                        <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '9px', marginTop: '4px', marginLeft: '6px' }}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '70%', marginRight: '4px' }}>
                        <div style={{ background: '#3b82f6', color: 'white', fontSize: '12px', padding: msg.image ? '4px' : '10px 14px', borderRadius: '18px 18px 4px 18px', lineHeight: '1.4', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                          {msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer' }} /></a> : msg.text}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', marginRight: '6px' }}>
                          <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: '9px' }}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
                          
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
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '10px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '8px', background: '#dedede', flexShrink: 0, position: 'relative', zIndex: 10000, alignItems: 'center' }}>
              <input type="file" accept="image/*" id="clientImageUpload" style={{ display: 'none' }} onChange={async e => {
                const file = e.target.files[0]; if (!file) return;
                setLoading(true);
                const fd = new FormData(); fd.append('image', file);
                try {
                  const res = await fetch(`${API}/send-image`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
                  const data = await res.json();
                  if (data.chat) setChat(data.chat);
                } catch(err) {}
                setLoading(false); e.target.value = '';
              }} />
              <button type="button" onClick={() => document.getElementById('clientImageUpload').click()} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', color: '#6366f1', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width='18' height='18' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'>
                  <rect x='3' y='3' width='18' height='18' rx='2'/>
                  <circle cx='8.5' cy='8.5' r='1.5'/>
                  <polyline points='21,15 16,10 5,21'/>
                </svg>
              </button>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                style={{ flex: 1, background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', color: '#1f2937', fontSize: '13px', padding: '10px 14px', outline: 'none', borderRadius: '8px' }}
              />
              <button type="button" onClick={sendMessage} disabled={loading} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '12px', padding: '10px 16px', cursor: 'pointer', borderRadius: '8px', fontWeight: '600', flexShrink: 0 }}>
                {loading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        )}

        {/* IUX-style Bubble with Speech Tooltip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!open && showBubble && (
            <div style={{
              position: 'relative',
              backgroundColor: '#f5f5f5',
              background: '#f5f5f5',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1px solid #d4d4d4',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              width: 'auto',
              maxWidth: '170px',
              minWidth: '140px',
              animation: 'bubbleSlideIn 0.4s ease-out'
            }}>
              <button type="button" onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
                sessionStorage.setItem('chatBubbleDismissed', '1');
              }} style={{
                position: 'absolute', top: '-7px', left: '-7px',
                background: '#1a1a1a', border: 'none', borderRadius: '50%',
                width: '20px', height: '20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}>
                <svg width="11" height="11" fill="none" stroke="#fff" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div onClick={() => { setOpen(true); setShowBubble(false); }} style={{ cursor: 'pointer' }}>
                <div style={{ color: '#111', fontSize: '12px', fontWeight: '700', marginBottom: '2px', lineHeight: '1.3' }}>
                  We're Online!
                </div>
                <div style={{ color: '#666', fontSize: '10px', lineHeight: '1.3' }}>
                  How may I help you today?
                </div>
              </div>
              <div style={{
                position: 'absolute', right: '-7px', top: '50%',
                transform: 'translateY(-50%)',
                width: 0, height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '8px solid #f5f5f5'
              }} />
            </div>
          )}
          <button type="button" onClick={() => { if (open) { setOpen(false); setFullscreen(false); } else { setOpen(true); } }} style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: '#16a34a', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(22,163,74,0.5)',
            position: 'relative', flexShrink: 0
          }}>
            <svg width="26" height="26" fill="none" stroke="#ffffff" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {unread > 0 && (
              <div style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: '#ef4444', color: 'white',
                fontSize: '10px', fontWeight: '700',
                width: '18px', height: '18px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff'
              }}>
                {unread}
              </div>
            )}
          </button>
        </div>
        <style>{`
          @keyframes bubbleSlideIn {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  );
}
