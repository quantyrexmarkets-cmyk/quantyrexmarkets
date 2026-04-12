with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# QUANTYREX white, MARKETS purple
content = content.replace(
    "<span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>QUANTYREX MARKETS</span>",
    "<span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>QUANTYREX</span><span style={{ color: '#6366f1', fontSize: '11px', fontWeight: '800' }}> MARKETS</span>"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Fixed - QUANTYREX white, MARKETS purple!")
