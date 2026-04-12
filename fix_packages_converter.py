import re

converter = """
              {Number(amount) > 0 && user?.currency && user?.currency !== 'USD' && (
                <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '4px', marginBottom: '4px' }}>
                  ≈ {formatAmountWithCode(Number(amount), user.currency)} in your currency
                </div>
              )}"""

# Fix Packages.jsx
with open('src/pages/Packages.jsx', 'r') as f:
    content = f.read()

# Find amount input
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'value={amount' in line.lower() and 'input' in line:
        print(f"Found in Packages.jsx line {i+1}: {line[:80]}")

# Fix CopyTradingSetup - already has converter but fix font
with open('src/pages/CopyTradingSetup.jsx', 'r') as f:
    content = f.read()

content = content.replace(
    "fontSize: '8px', color: '#f59e0b', marginBottom: '8px'",
    "fontSize: '9px', color: '#f59e0b', marginBottom: '8px'"
)

with open('src/pages/CopyTradingSetup.jsx', 'w') as f:
    f.write(content)

print("✅ CopyTradingSetup converter style fixed!")
