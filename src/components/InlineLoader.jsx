export default function InlineLoader({
  text = 'Loading...',
  minHeight = '60vh',
  compact = false,
}) {
  return (
    <div
      style={{
        minHeight: compact ? 'auto' : minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
        padding: compact ? '16px' : '24px',
      }}
    >
      <div
        style={{
          width: compact ? '20px' : '32px',
          height: compact ? '20px' : '32px',
          borderRadius: '50%',
          border: '2px solid #6366f1',
          borderTopColor: 'transparent',
          animation: 'inlineSpin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          color: '#94a3b8',
          fontSize: compact ? '9px' : '10px',
          fontWeight: '500',
          letterSpacing: '0.4px',
        }}
      >
        {text}
      </div>

      <style>{`
        @keyframes inlineSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
