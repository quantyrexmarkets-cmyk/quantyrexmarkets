with open('src/pages/CopyTradingSetup.jsx', 'r') as f:
    content = f.read()

# Fix $ symbol size
content = content.replace(
    "fontSize: '13px' }}>$</span>",
    "fontSize: '10px' }}>$</span>"
)

# Fix input font size
content = content.replace(
    "color: 'white', fontSize: '16px', fontWeight: '700', padding: '12px 12px 12px 26px'",
    "color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px 10px 10px 24px'"
)

with open('src/pages/CopyTradingSetup.jsx', 'w') as f:
    f.write(content)

print("✅ CopyTradingSetup font sizes fixed!")
