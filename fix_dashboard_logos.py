with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix line 284 area - the logo in the body section needs a wrapper
# Find and replace the problematic pattern

old_pattern = '''<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                </svg>'''

new_pattern = '''<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 40 40" fill="none" width="18" height="18">
                    <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                    <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                    <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                  </svg>'''

content = content.replace(old_pattern, new_pattern)

# Also fix any other 100% width logos
content = content.replace(
    '<svg viewBox="0 0 40 40" fill="none" style={{ width: \'100%\', height: \'100%\' }}>',
    '<svg viewBox="0 0 40 40" fill="none" style={{ width: "100%", height: "100%" }}>'
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard logos fixed!")
