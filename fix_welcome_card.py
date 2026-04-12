with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

old = """            {/* Welcome Card */}
            <div style={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '14px 12px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Welcome back, {u.firstName || 'User'} {u.lastName || ''}!</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginBottom: '10px' }}>Your investment dashboard overview</div>
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60px', borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(45px)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                  <svg width='16' height='16' fill='none' stroke='rgba(255,255,255,0.6)' viewBox='0 0 24 24' strokeWidth='2'><rect x='2' y='5' width='20' height='14' rx='2'/><line x1='2' y1='10' x2='22' y2='10'/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: '600' }}>Account Balance</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px' }}>Your available funds</div>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px', marginBottom: '8px' }}>
                  <svg width='12' height='12' fill='none' stroke='rgba(255,255,255,0.6)' viewBox='0 0 24 24' strokeWidth='2'><polyline points='20 6 9 17 4 12'/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Available for Withdrawal</span>
                </div>
                <div style={{ marginBottom: '8px', display: 'block', margin: '0 auto 8px' }}>
                  <span style={{ background: u.kycStatus === 'approved' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: u.kycStatus === 'approved' ? '#22c55e' : '#ef4444', fontSize: '9px', padding: '3px 10px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <svg width='10' height='10' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/></svg>
                    {u.kycStatus === 'approved' ? '✓ KYC Verified' : '✗ KYC Not Verified'}
                  </span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => navigate('/dashboard/deposit')} style={{ flex: 1, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>
                  Deposit
                </button>
                <button onClick={() => navigate('/dashboard/withdraw')} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>
                  Withdraw
                </button>
              </div>
            </div>"""

new = """            {/* Welcome Card */}
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 8px 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              
              {/* Glow effects */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', filter: 'blur(40px)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', padding: '20px 16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px', letterSpacing: '0.5px' }}>Welcome back</div>
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>{u.firstName || 'User'} {u.lastName || ''}</div>
                  </div>
                  <span style={{ background: u.kycStatus === 'approved' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: u.kycStatus === 'approved' ? '#22c55e' : '#ef4444', fontSize: '9px', padding: '4px 10px', borderRadius: '20px', border: u.kycStatus === 'approved' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: u.kycStatus === 'approved' ? '#22c55e' : '#ef4444' }}></div>
                    {u.kycStatus === 'approved' ? 'KYC Verified' : 'KYC Not Verified'}
                  </span>
                </div>

                {/* Balance Section */}
                <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', marginBottom: '16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(99,102,241,0.05), transparent)', pointerEvents: 'none' }} />
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '6px', letterSpacing: '0.5px' }}>TOTAL BALANCE</div>
                  <div style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.5px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.1)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <svg width='10' height='10' fill='none' stroke='#22c55e' viewBox='0 0 24 24' strokeWidth='2'><polyline points='20 6 9 17 4 12'/></svg>
                    <span style={{ color: '#22c55e', fontSize: '10px' }}>Available for Withdrawal</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '9px', marginTop: '8px' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate('/dashboard/deposit')} style={{ flex: 1, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', color: 'white', fontSize: '12px', fontWeight: '600', padding: '11px', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>
                    <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>
                    Deposit
                  </button>
                  <button onClick={() => navigate('/dashboard/withdraw')} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '12px', fontWeight: '600', padding: '11px', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Welcome card redesigned!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
