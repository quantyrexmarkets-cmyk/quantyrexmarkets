with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix hamburger
content = content.replace(
    "color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginRight: '4px', display: 'flex', alignItems: 'center'",
    "color: t.text, cursor: 'pointer', marginRight: '4px', display: 'flex', alignItems: 'center'"
)

# Fix bell icon
content = content.replace(
    "color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '5px 8px', position: 'relative', display: 'flex', alignItems: 'center'",
    "color: t.text, cursor: 'pointer', padding: '5px 8px', position: 'relative', display: 'flex', alignItems: 'center'"
)

# Fix profile avatar button
content = content.replace(
    "color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center'",
    "color: t.text, cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard nav icons fixed!")
