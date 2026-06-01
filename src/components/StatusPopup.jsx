import React, { useEffect } from 'react';

export default function StatusPopup({ show, type = 'success', title, message, onClose, autoClose = 3000 }) {
  useEffect(() => {
    if (show && autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, onClose]);

  if (!show) return null;

  // Inject keyframes once
  if (typeof document !== 'undefined' && !document.getElementById('status-popup-keyframes')) {
    const style = document.createElement('style');
    style.id = 'status-popup-keyframes';
    style.textContent = `
      @keyframes statusPopupDrawX {
        to { stroke-dashoffset: 0; }
      }
      @keyframes statusPopupCirclePop {
        0% { transform: scale(0); opacity: 0; }
        60% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  const color = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#f59e0b';

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998 }} onClick={onClose} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 9999, background: 'white', padding: '28px 20px', width: '280px',
        textAlign: 'center', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          border: `2px solid ${color}`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
          animation: 'statusPopupCirclePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {type === 'success' && (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
              <polyline points='20 6 9 17 4 12' style={{
                strokeDasharray: 30,
                strokeDashoffset: 30,
                animation: 'statusPopupDrawX 0.4s ease-out 0.1s forwards'
              }}/>
            </svg>
          )}
          {type === 'error' && (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth='2.5' strokeLinecap='round'>
              <line x1='18' y1='6' x2='6' y2='18' style={{
                strokeDasharray: 20,
                strokeDashoffset: 20,
                animation: 'statusPopupDrawX 0.3s ease-out 0.1s forwards'
              }}/>
              <line x1='6' y1='6' x2='18' y2='18' style={{
                strokeDasharray: 20,
                strokeDashoffset: 20,
                animation: 'statusPopupDrawX 0.3s ease-out 0.35s forwards'
              }}/>
            </svg>
          )}
          {type === 'warning' && (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth='2.5'>
              <path d='M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'/>
            </svg>
          )}
        </div>
        <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
          {title}
        </div>
        {message && (
          <div style={{ color: '#555', fontSize: '11px', lineHeight: '1.5' }}>
            {message}
          </div>
        )}
      </div>
    </>
  );
}
