with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

fixes = [
    # Menu item padding
    ("padding: '9px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left'",
     "padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left'"),
    # Submenu item padding
    ("width: '100%', padding: '9px 16px 9px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', fontSize: '11px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500'",
     "width: '100%', padding: '12px 16px 12px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', fontSize: '11px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500'"),
    # Section title margin
    ("padding: '0 16px', marginBottom: '6px'",
     "padding: '0 16px', marginBottom: '8px', marginTop: '8px'"),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old[:50]}...")
    else:
        print(f"⚠️ Not found: {old[:50]}...")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("\n✅ Sidebar padding updated!")
