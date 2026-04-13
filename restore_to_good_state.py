with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Welcome card - use t.cardBg
content = content.replace(
    "background: t.bg === '#f8fafc' ? '#ffffff' : t.bg === '#111111' ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(99,102,241,0.1) 100%)' : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)'",
    "background: t.cardBg"
)

content = content.replace(
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)'",
    "background: t.cardBg"
)

content = content.replace(
    "border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(99,102,241,0.25)'",
    "border: `1px solid ${t.border}`"
)

# Inner balance card - use t.cardBg2
content = content.replace(
    "background: t.bg === '#f8fafc' ? '#f1f5f9' : t.bg === '#111111' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'",
    "background: t.cardBg2"
)

content = content.replace(
    "background: t.bg === '#f8fafc' ? '#f1f5f9' : 'rgba(0,0,0,0.3)'",
    "background: t.cardBg2"
)

content = content.replace(
    "border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)'",
    "border: `1px solid ${t.border}`"
)

# Glow effects - remove conditional
content = content.replace(
    "opacity: t.bg === '#f8fafc' ? 0.1 : 1",
    "opacity: 1"
)

# Welcome text - use t.text
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white'",
    "color: t.text"
)

# Subtext - use t.subText
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.35)'",
    "color: t.subText"
)
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.6)'",
    "color: t.subText"
)
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.4)'",
    "color: t.subText"
)
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#94a3b8' : 'rgba(255,255,255,0.3)'",
    "color: t.subText"
)
content = content.replace(
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white'",
    "color: t.text"
)

# Stats cards
content = content.replace(
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'rgba(255,255,255,0.04)'",
    "background: t.cardBg"
)

# Transaction list
content = content.replace(
    "boxShadow: t.bg === '#f8fafc' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)'",
    "boxShadow: '0 4px 24px rgba(0,0,0,0.05)'"
)
content = content.replace(
    "boxShadow: t.bg === '#f8fafc' ? '0 4px 20px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)'",
    "boxShadow: '0 4px 24px rgba(0,0,0,0.05)'"
)

# KYC card
content = content.replace(
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'rgba(255,255,255,0.04)'",
    "background: t.cardBg"
)

# Withdraw button
content = content.replace(
    "background: t.bg === '#f8fafc' ? '#f1f5f9' : 'rgba(255,255,255,0.08)'",
    "background: t.cardBg2"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard restored to use t.cardBg and t.cardBg2!")
