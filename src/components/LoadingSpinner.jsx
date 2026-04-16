export default function LoadingSpinner({ fullPage = false, size = 'sm' }) {

  const dots = (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: '5px', height: '5px', borderRadius: '50%', background: '#6366f1',
          animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`
        }}/>
      ))}
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080e1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Segoe UI', sans-serif",
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}/>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          animation: 'glowPulse 2s ease-in-out infinite',
        }}/>

        {/* Logo + Scanner */}
        <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '24px' }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(99,102,241,0.2)',
          }}/>
          {/* Rotating arc */}
          <div style={{
            position: 'absolute', inset: '-4px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#6366f1',
            borderRightColor: '#6366f1',
            animation: 'spin 1.2s linear infinite',
          }}/>
          {/* Inner ring */}
          <div style={{
            position: 'absolute', inset: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(99,102,241,0.15)',
          }}/>
          {/* Logo */}
          <div style={{ position: 'absolute', inset: '18px' }}>
            <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%">
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#080e1a" stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#080e1a" stroke="#6366F1" strokeWidth="1.2"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
          </div>
          <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        </div>

        {/* Brand */}
        <div style={{
          color: 'white', fontSize: '13px', fontWeight: '700',
          letterSpacing: '3px', marginBottom: '4px',
          animation: 'fadeInUp 0.6s ease both',
        }}>
          QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span>
        </div>

        {/* Status text */}
        <div style={{
          color: 'rgba(255,255,255,0.3)', fontSize: '9px',
          letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: '20px',
          animation: 'fadeInUp 0.6s ease 0.2s both',
        }}>
          Initializing Platform
        </div>

        {/* Dots */}
        <div style={{ animation: 'fadeInUp 0.6s ease 0.4s both' }}>
          {dots}
        </div>

        {/* Bottom line */}
        <div style={{
          position: 'absolute', bottom: '32px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ width: '20px', height: '1px', background: 'rgba(99,102,241,0.3)' }}/>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '8px', letterSpacing: '1px' }}>SECURE CONNECTION</span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(99,102,241,0.3)' }}/>
        </div>
      </div>
    );
  }

  // Inline small spinner
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ position: 'relative', width: '20px', height: '20px', marginRight: '8px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#6366f1', borderRightColor: '#6366f1',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
      <span style={{ color: '#6366f1', fontSize: '11px', fontWeight: '600' }}>Loading...</span>
    </div>
  );
}
