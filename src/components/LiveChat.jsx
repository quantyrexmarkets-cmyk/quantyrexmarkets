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
    const handler = () => setOpen(true);
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

  // Send visitor left when closing chat or leaving page
  useEffect(() => {
    const handleLeave = () => {
      if (token) {
        fetch(`${API}/visitor-left`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          keepalive: true
        });
      }
    };
    window.addEventListener('beforeunload', handleLeave);
    return () => window.removeEventListener('beforeunload', handleLeave);
  }, [token]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setFullscreen(true);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, chat]);

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
          <div style={{ position: fullscreen ? 'fixed' : 'absolute', bottom: fullscreen ? 0 : '50px', right: fullscreen ? 0 : 0, top: fullscreen ? 0 : 'auto', left: fullscreen ? 0 : 'auto', width: fullscreen ? '100%' : '280px', height: fullscreen ? '100%' : 'auto', background: 'white', border: '1px solid rgba(99,102,241,0.4)', borderRadius: fullscreen ? '0' : '8px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 9999 }}>

            {/* Header */}
            <div style={{ background: '#6366f1', padding: '16px 12px', minHeight: '68px', boxSizing: 'border-box', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.3)' }}>
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
                <button type="button" onClick={() => { setOpen(false); setFullscreen(false); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px' }}>×</button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ height: fullscreen ? 'calc(100vh - 115px)' : '220px', overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'white' }}>
              {!chat || !chat.messages || chat.messages.filter(msg => !(msg.sender === 'system' && msg.text?.includes('left'))).length === 0 ? (
                <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: '9px', textAlign: 'center', marginTop: '80px' }}>
                  Send a message to start chatting
                </div>
              ) : chat.messages.filter(msg => !(msg.sender === 'system' && msg.text?.includes('left'))).map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'system' ? 'center' : msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '4px' }}>
                  {msg.sender === 'system' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', padding: '3px 10px', borderRadius: '10px' }}>
                      <img src="/support-avatar.jpg" style={{ width: '14px', height: '14px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '8px' }}>{msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer' }} /></a> : msg.text}</span>
                    </div>
                  ) : (
                    <div style={{ background: msg.sender === 'user' ? '#6366f1' : '#f3f4f6', color: msg.sender === 'user' ? 'white' : '#1f2937', fontSize: '9px', padding: '6px 10px', borderRadius: msg.sender === 'user' ? '8px 8px 0 8px' : '8px 8px 8px 0', maxWidth: '75%', lineHeight: '1.4', wordBreak: 'break-word', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                      {msg.image ? <a href={msg.image} target='_blank' rel='noopener noreferrer'><img src={msg.image} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '6px', display: 'block', cursor: 'pointer' }} /></a> : msg.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '8px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '6px', background: 'white', position: fullscreen ? 'fixed' : 'relative', bottom: fullscreen ? 0 : 'auto', left: fullscreen ? 0 : 'auto', right: fullscreen ? 0 : 'auto', zIndex: 10000 }}>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                style={{ flex: 1, background: '#f3f4f6', border: '1px solid #6366f1', color: '#1f2937', fontSize: '9px', padding: '6px 8px', outline: 'none', borderRadius: '4px' }}
              />
              <button type="button" onClick={sendMessage} disabled={loading} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '9px', padding: '6px 10px', cursor: 'pointer', borderRadius: '4px', fontWeight: '600' }}>
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
              <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
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
          <button type="button" onClick={() => setOpen(!open)} style={{
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
