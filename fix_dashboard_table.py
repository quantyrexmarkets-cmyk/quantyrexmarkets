with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix transaction table header
content = content.replace(
    "'Amount','Txn Date','Method','Txn Type','Status'",
    "'Amount','Txn Date','Method','Txn Type','Status'"
)

# Fix table font sizes
import re

# Fix header cells
content = re.sub(
    r"fontSize: '8px', fontWeight: '600' \}}>(\{h\})",
    r"fontSize: '10px', fontWeight: '600' }}>\1",
    content
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard table sizes fixed!")
