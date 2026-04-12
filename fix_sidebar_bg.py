with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

old = """background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)', backdropFilter: 'blur(20px)', boxShadow: '0 4px 24px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.05) inset'"""

new = """background: 'transparent'"""

if old in content:
    content = content.replace(old, new)
    print("✅ Background set to transparent!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
