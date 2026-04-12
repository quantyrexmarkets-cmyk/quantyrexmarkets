with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

old = """style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: location.pathname === item.route ? 'rgba(99,102,241,0.15)' : 'transparent', backdropFilter: location.pathname === item.route ? 'blur(10px)' : 'none', borderLeft: location.pathname === item.route ? '2px solid #6366f1' : '2px solid transparent', border: 'none', cursor: 'pointer', color: location.pathname === item.route ? '#ffffff' : 'rgba(255,255,255,0.7)', fontSize: '11px', textAlign: 'left' }}>"""

new = """style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left' }}>"""

if old in content:
    content = content.replace(old, new)
    print("✅ Removed old active style")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
