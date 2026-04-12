with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix nav background
content = content.replace(
    "background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, borderBottom: '1px solid rgba(99,102,241,0.3)'",
    "background: t.navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, borderBottom: `1px solid ${t.accent}4D`"
)

# Fix sidebar bg
content = content.replace(
    "background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.1)'",
    "background: t.sidebarBg, borderRight: `1px solid ${t.border}`"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard nav theme applied!")
