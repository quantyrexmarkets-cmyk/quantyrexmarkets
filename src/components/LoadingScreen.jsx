export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0e1628',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* Animated Logo */}
      <div style={{ position: 'relative', width: '40px', height: '40px', marginBottom: '16px' }}>
        {/* Spinning ring */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#6366f1',
          borderRightColor: '#6366f1',
          animation: 'spin 1s linear infinite'
        }} />
        {/* Logo in center */}
        <div style={{ position: 'absolute', inset: '8px' }}>
          <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
                <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="2" fill="#f59e0b"/>
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ color: 'white', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '6px' }}>
        QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span>
      </div>

      {/* Animated dots */}
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: '#6366f1',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
