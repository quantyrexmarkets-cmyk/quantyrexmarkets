with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Fix font sizes
fixes = [
    # Section title
    ("fontSize: '7px', fontWeight: '700', letterSpacing: '0.1em'", "fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em'"),
    # Menu items
    ("color: 'rgba(255,255,255,0.9)', fontSize: '9px', textAlign: 'left'", "color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left'"),
    # Submenu items
    ("color: 'white', fontSize: '9px', textAlign: 'left'", "color: 'white', fontSize: '11px', textAlign: 'left'"),
    # Badge
    ("fontSize: '6px', padding: '1px 4px'", "fontSize: '8px', padding: '2px 5px'"),
    # Sidebar brand name
    ("fontSize: '10px', fontWeight: '800'", "fontSize: '12px', fontWeight: '800'"),
    # Notification title
    ("fontSize: '11px', fontWeight: '700'", "fontSize: '13px', fontWeight: '700'"),
    # Notification text
    ("fontSize: '10px', fontWeight: '600'", "fontSize: '12px', fontWeight: '600'"),
    ("fontSize: '9px', lineHeight: '1.4'", "fontSize: '11px', lineHeight: '1.4'"),
    # Icon sizes
    ("<User size={13}/>", "<User size={16}/>"),
    ("<BarChart2 size={13}/>", "<BarChart2 size={16}/>"),
    ("<Bot size={13}/>", "<Bot size={16}/>"),
    ("<TrendingUp size={13}/>", "<TrendingUp size={16}/>"),
    ("<Clock size={13}/>", "<Clock size={16}/>"),
    ("<ArrowDownCircle size={13}/>", "<ArrowDownCircle size={16}/>"),
    ("<Package size={13}/>", "<Package size={16}/>"),
    ("<Lock size={13}/>", "<Lock size={16}/>"),
    ("<Users size={13}/>", "<Users size={16}/>"),
    ("<Wallet size={13}/>", "<Wallet size={16}/>"),
    ("<Globe size={13}/>", "<Globe size={16}/>"),
    ("<Bell size={13}/>", "<Bell size={16}/>"),
    ("<Settings size={13}/>", "<Settings size={16}/>"),
    ("<Download size={13}/>", "<Download size={16}/>"),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old[:40]}...")
    
with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("\n✅ Sidebar font sizes updated!")
with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Increase sidebar width
content = content.replace(
    "left: open ? '0' : '-180px', height: '100vh', width: '170px'",
    "left: open ? '0' : '-220px', height: '100vh', width: '210px'"
)

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Sidebar width increased!")
