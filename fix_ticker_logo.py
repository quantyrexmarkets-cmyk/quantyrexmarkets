with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix the specific logo before QUANTYREX MARKETS text
old = '''<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: "100%", height: "100%" }}>
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
              <span style={{ color: '#6366f1', fontSize: '9px', fontWeight: '800' }}>QUANTYREX MARKETS</span>'''

new = '''<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 40 40" fill="none" width="16" height="16">
                    <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                    <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                    <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                  </svg>
                  <span style={{ color: '#6366f1', fontSize: '9px', fontWeight: '800' }}>QUANTYREX MARKETS</span>'''

if old in content:
    content = content.replace(old, new)
    print("✅ Found and fixed exact pattern!")
else:
    # Try line by line replacement
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if i == 283:  # Line 284 (0-indexed = 283)
            lines[i] = '                  <svg viewBox="0 0 40 40" fill="none" width="16" height="16">'
            print(f"✅ Fixed line {i+1}")
    content = '\n'.join(lines)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Done!")
