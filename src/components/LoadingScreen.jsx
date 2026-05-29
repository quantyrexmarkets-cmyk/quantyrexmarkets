import { useTheme } from '../context/ThemeContext';

export default function LoadingScreen() {
  const { current: t } = useTheme();
  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{ marginBottom: '16px' }}>
        <svg viewBox="0 0 40 40" fill="none" width="48" height="48" style={{ display: 'block' }}>
          <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill={t.cardBg} stroke="#6366F1" strokeWidth="1.5"/>
          <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill={t.cardBg} stroke="#6366F1" strokeWidth="1.2"/>
          <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
        </svg>
      </div>
      <div style={{ color: t.text, fontSize: '11px', fontWeight: '800', letterSpacing: '2px', marginBottom: '6px' }}>
        QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span>
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6366f1', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
    </div>
  );
}
