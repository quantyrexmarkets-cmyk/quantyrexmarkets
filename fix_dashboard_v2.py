import re

with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Find and fix unsafe .map() calls - Fixed regex escaping
fixes = [
    (r'transactions\.slice\(0, 10\)\.map', r'(Array.isArray(transactions) ? transactions : []).slice(0, 10).map'),
    (r'\.map\(\(n, i\) => \(', r'.map((n, i) => ('),  # This one is already safe
    (r'stats\.map\(\(s, i\) =>', r'(Array.isArray(stats) ? stats : []).map((s, i) =>'),
]

modified = False
for pattern, replacement in fixes:
    if pattern in content and 'Array.isArray' not in content[max(0, content.find(pattern)-100):content.find(pattern)+100]:
        content = content.replace(pattern, replacement)
        print(f"Fixed: {pattern[:30]}...")
        modified = True

if modified:
    with open('src/pages/Dashboard.jsx', 'w') as f:
        f.write(content)
    print("Dashboard.jsx patched!")
else:
    print("No changes needed or already patched")
