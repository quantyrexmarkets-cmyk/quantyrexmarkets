with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Replace avatar with logo
old = """            {/* Avatar */}
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(99,102,241,0.4)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: '700' }}>
                  {user?.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>"""

new = """            {/* Logo */}
            <div style={{ width: '45px', height: '45px', flexShrink: 0 }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
              </svg>
            </div>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Logo replaced avatar!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
