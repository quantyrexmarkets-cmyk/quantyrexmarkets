with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

old = """<div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard'); onClose(); }}>
            <div style={{ width: '18px', height: '18px' }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '800' }}>QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span></span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '400' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
            </div>
          </div>"""

new = """<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard'); onClose(); }}>
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

if old in content:
    content = content.replace(old, new)
    print("✅ Sidebar layout updated!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
