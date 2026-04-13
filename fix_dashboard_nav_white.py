with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix balance button in dashboard nav
content = content.replace(
    "background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'",
    "background: t.cardBg, border: `1px solid ${t.border}`, color: t.text"
)

# Fix nav box shadow
content = content.replace(
    "boxShadow: '0 4px 24px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.05) inset'",
    "boxShadow: t.bg === '#f8fafc' ? '0 2px 8px rgba(0,0,0,0.08)' : '0 4px 24px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.05) inset'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard nav white theme fixed!")
