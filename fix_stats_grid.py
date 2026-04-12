with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

old = """            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {Array.isArray(stats) && stats.map((s, i) => (
                <div key={i} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 10px', minHeight: '90px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(10px, 2vw, 12px)' }}>{s.label}</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.iconBg + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 10px ${s.iconBg}60` }}>{s.icon}</div>
                  </div>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: 'clamp(13px, 2.5vw, 18px)', marginBottom: '8px' }}>{s.value}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ background: s.label === 'Total Withdrawals' ? '#ec4899' : '#ef4444', color: 'white', fontSize: '8px', padding: '2px 4px' }}>{s.label === 'Total Withdrawals' ? '-' + getCurrencySymbol(u.currency) + '0.00' : getCurrencySymbol(u.currency) + '0.00'}</span>
                      <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', fontSize: '8px', padding: '2px 4px' }}>{s.btc}</span>
                    </div>
                    {s.hasViewTrade && <button onClick={() => navigate('/dashboard/packages')} style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', fontSize: '8px', padding: '2px 6px' }}>View Trade</button>}
                  </div>
                </div>
              ))}
            </div>"""

new = """            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {Array.isArray(stats) && stats.map((s, i) => (
                <div key={i} style={{ position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 10px', minHeight: '90px', boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${s.iconBg}10, transparent)`, pointerEvents: 'none' }} />
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${s.iconBg}, transparent)`, borderRadius: '14px 14px 0 0' }} />
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(9px, 2vw, 11px)' }}>{s.label}</span>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.iconBg + '20', border: `1px solid ${s.iconBg}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                    </div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px' }}>{s.value}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>{s.btc}</span>
                      {s.hasViewTrade && <button onClick={() => navigate('/dashboard/packages')} style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', fontSize: '8px', padding: '2px 6px', cursor: 'pointer', borderRadius: '4px' }}>View</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Stats grid redesigned!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
