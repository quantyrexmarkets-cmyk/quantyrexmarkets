with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

old = """<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard'); onClose(); }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '18px', height: '18px' }}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                </svg>
              </div>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '800' }}>QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span></span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '400', paddingLeft: '24px' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
          </div>"""

new = """<div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard/profile'); onClose(); }}>
            {/* Avatar */}
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(99,102,241,0.4)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '700' }}>
                  {user?.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            {/* User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: 'white', fontSize: '11px', fontWeight: '600' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
              <span style={{ color: '#6366f1', fontSize: '9px', fontWeight: '500' }}>{user?.accountType || 'Member'}</span>
            </div>
          </div>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Avatar layout applied!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
