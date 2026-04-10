import re

with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Find and fix unsafe .map() calls
fixes = [
    (r'transactions\.slice\(0, 10\)\.map', 'Array.isArray(transactions) ? transactions.slice(0, 10).map'),
    (r'notifications\.map\((n, i\) =>', 'Array.isArray(notifications) ? notifications.map((n, i) =>'),
    (r'stats\.map\((s, i\) =>', 'Array.isArray(stats) ? stats.map((s, i) =>'),
]

for pattern, replacement in fixes:
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        print(f"Fixed: {pattern}")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("Dashboard.jsx patched!")
