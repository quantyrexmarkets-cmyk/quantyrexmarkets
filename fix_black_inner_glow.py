with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add glow shadow to inner balance card
old = "background: t.cardBg2, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden'"

new = "background: t.cardBg2, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden', boxShadow: t.bg === '#111111' ? '0 0 20px rgba(99,102,241,0.15), inset 0 1px 0 rgba(99,102,241,0.1)' : 'none'"

if old in content:
    content = content.replace(old, new)
    print("✅ Glow added to inner card!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
