with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix QUANTYREX MARKETS color - white not purple
content = content.replace(
    "color: '#6366f1', fontSize: '11px', fontWeight: '800' }}>QUANTYREX MARKETS</span>",
    "color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>QUANTYREX MARKETS</span>"
)

# Fix Welcome back text - lighter weight
content = content.replace(
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Welcome back, {u.firstName || 'User'} {u.lastName || ''}!",
    "color: 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back, {u.firstName || 'User'} {u.lastName || ''}!"
)

# Fix subtitle too
content = content.replace(
    "color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginBottom: '10px' }}>Your investment dashboard overview",
    "color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: '300', marginBottom: '10px' }}>Your investment dashboard overview"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Fixed!")
