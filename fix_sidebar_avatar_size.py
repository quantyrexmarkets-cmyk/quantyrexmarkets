with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Increase avatar size
content = content.replace(
    "width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(99,102,241,0.4)'",
    "width: '45px', height: '45px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(99,102,241,0.4)'"
)

# Increase initial letter size
content = content.replace(
    "color: 'white', fontSize: '14px', fontWeight: '700'",
    "color: 'white', fontSize: '18px', fontWeight: '700'"
)

# Increase name size
content = content.replace(
    "color: 'white', fontSize: '11px', fontWeight: '600'",
    "color: 'white', fontSize: '13px', fontWeight: '600'"
)

# Increase account type size
content = content.replace(
    "color: '#6366f1', fontSize: '9px', fontWeight: '500'",
    "color: '#6366f1', fontSize: '11px', fontWeight: '500'"
)

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Avatar and text sizes increased!")
