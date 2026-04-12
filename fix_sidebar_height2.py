with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Add minHeight to match nav
old = """<div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(99,102,241,0.3)', background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)', backdropFilter: 'blur(20px)', boxShadow: '0 4px 24px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.05) inset' }}>"""

new = """<div style={{ padding: '12px 16px', minHeight: '41px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(99,102,241,0.3)', background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)', backdropFilter: 'blur(20px)', boxShadow: '0 4px 24px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.05) inset' }}>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Height fixed!")
else:
    print("❌ Pattern not found")

# Fix username font size - make it bigger
old_name = """<span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: '400' }}>{user?.firstName || ''} {user?.lastName || ''}</span>"""

new_name = """<span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '400' }}>{user?.firstName || ''} {user?.lastName || ''}</span>"""

if old_name in content:
    content = content.replace(old_name, new_name)
    print("✅ Username font size increased!")
else:
    print("❌ Username pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
