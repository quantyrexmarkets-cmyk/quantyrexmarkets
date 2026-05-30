import { useState, useEffect } from 'react';

export default function BrowserNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    // Detect Chrome on Android (not Edge, Firefox, Samsung, Opera)
    const isAndroidChrome = /Android/i.test(ua) && /Chrome/i.test(ua) 
      && !/Edg|Firefox|Samsung|OPR|FxiOS/i.test(ua);
    const dismissed = localStorage.getItem('browserNoticeDismissed');
    if (isAndroidChrome && !dismissed) {
      setTimeout(() => setShow(true), 3000);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
      width: '92%', maxWidth: '440px', background: '#1e293b', color: '#fff',
      padding: '14px 16px', borderRadius: '12px', fontSize: '12px', lineHeight: '1.5',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 99999,
      border: '1px solid rgba(99,102,241,0.4)', display: 'flex',
      alignItems: 'flex-start', gap: '10px',
      animation: 'noticeFadeIn 0.4s ease-out'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: '4px', color: '#818cf8' }}>
          💡 Tip for best experience
        </div>
        <div style={{ color: '#cbd5e1' }}>
          If you see display glitches, try <b style={{color:'#fff'}}>Firefox</b> for a smoother experience.
        </div>
      </div>
      <button onClick={() => {
        localStorage.setItem('browserNoticeDismissed', '1');
        setShow(false);
      }} style={{
        background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
        cursor: 'pointer', fontSize: '14px', padding: '4px 10px',
        borderRadius: '6px', flexShrink: 0
      }}>×</button>
      <style>{`
        @keyframes noticeFadeIn {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
