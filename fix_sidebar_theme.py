with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Fix sidebar main container
content = content.replace(
    "position: 'fixed', top: 0, left: open ? '0' : '-220px', height: '100vh', width: '210px',",
    "position: 'fixed', top: 0, left: open ? '0' : '-220px', height: '100vh', width: '210px', background: t.sidebarBg,"
)

# Fix section titles
content = content.replace(
    "color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: '700'",
    "color: t.subText, fontSize: '9px', fontWeight: '700'"
)

# Fix menu item text
content = content.replace(
    "color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left'",
    "color: t.text, fontSize: '11px', textAlign: 'left'"
)

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Sidebar theme applied!")
