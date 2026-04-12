with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "<span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>QUANTYREX</span><span style={{ color: '#6366f1', fontSize: '11px', fontWeight: '800' }}> MARKETS</span>",
    "<span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX</span><span style={{ color: '#6366f1', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>&nbsp;&nbsp;MARKETS</span>"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Fixed font and size!")
