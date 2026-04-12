with open('src/components/PageHeader.jsx', 'r') as f:
    content = f.read()

old = """{title && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>/ {title}</span>}"""

new = """{title && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '500' }}>{title}</span>}"""

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed page title - removed /")
else:
    print("❌ Pattern not found")

with open('src/components/PageHeader.jsx', 'w') as f:
    f.write(content)
