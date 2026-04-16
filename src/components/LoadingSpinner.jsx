export default function LoadingSpinner({ fullPage = false, size = 'sm' }) {

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

        {/* Logo + rotating ring */}
        <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '16px' }}>
          <div style={{
            position: 'absolute', inset: '-3px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#6366f1',
            animation: 'spin 1s linear infinite',
          }}/>
          <div style={{ position: 'absolute', inset: '8px' }}>
            <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%">
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#080e1a" stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#080e1a" stroke="#6366F1" strokeWidth="1.2"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        <div style={{ color: 'white', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '3px' }}>
          QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '8px', letterSpacing: '1.5px', marginBottom: '14px' }}>
          INITIALIZING
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '4px', height: '4px', borderRadius: '50%', background: '#6366f1',
              animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`
            }}/>
          ))}
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.7)} 50%{opacity:1;transform:scale(1)} }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ position: 'relative', width: '18px', height: '18px', marginRight: '8px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#6366f1',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
      <span style={{ color: '#6366f1', fontSize: '11px', fontWeight: '600' }}>Loading...</span>
    </div>
  );
}
