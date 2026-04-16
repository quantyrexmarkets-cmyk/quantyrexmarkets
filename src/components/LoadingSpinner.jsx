export default function LoadingSpinner({ fullPage = false, size = 'sm' }) {
  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', width: size === 'lg' ? '40px' : '24px', height: size === 'lg' ? '40px' : '24px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: size === 'lg' ? '3px solid transparent' : '2px solid transparent',
          borderTopColor: '#6366f1',
          borderRightColor: '#6366f1',
          animation: 'spin 0.8s linear infinite'
        }}/>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
      {size === 'lg' && (
        <div style={{ color: '#6366f1', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>Loading...</div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div style={{ minHeight: '100vh', background: '#0e1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {spinner}
      </div>
    );
  }

  return spinner;
}
