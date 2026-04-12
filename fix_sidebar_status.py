with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

old = """            {/* User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
              <span style={{ color: '#6366f1', fontSize: '11px', fontWeight: '500' }}>{user?.accountType || 'Member'}</span>
            </div>"""

new = """            {/* User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444' }}></div>
                <span style={{ color: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444', fontSize: '9px', fontWeight: '500' }}>
                  {user?.kycStatus === 'approved' ? 'KYC Verified' : 'KYC Not Verified'}
                </span>
              </div>
            </div>"""

if old in content:
    content = content.replace(old, new)
    print("✅ KYC status added!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
