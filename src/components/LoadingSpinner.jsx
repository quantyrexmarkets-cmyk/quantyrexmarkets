import { useTheme } from '../context/ThemeContext';

export default function LoadingSpinner({ fullPage = false }) {
  const { current: t } = useTheme();

  if (fullPage) {
    return (
      <div style={{
        minHeight: '100vh', background: t.bg,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', width: '32px', height: '32px', marginBottom: '12px' }}>
          <div style={{
            position: 'absolute', inset: '-2px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#6366f1',
            animation: 'spin 1s linear infinite',
          }}/>
          <div style={{ position: 'absolute', inset: '5px' }}>
            <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%">
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill={t.bg} stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '3px', height: '3px', borderRadius: '50%', background: '#6366f1',
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', gap: '6px' }}>
      <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#6366f1', animation: 'spin 0.8s linear infinite' }}/>
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}
