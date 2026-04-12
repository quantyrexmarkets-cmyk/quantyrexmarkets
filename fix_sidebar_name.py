with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "<span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user?.firstName || ''} {user?.lastName || ''}</span>",
    "<span style={{ color: 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.5px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>{user?.firstName || ''} {user?.lastName || ''}</span>"
)

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Sidebar name font fixed!")
