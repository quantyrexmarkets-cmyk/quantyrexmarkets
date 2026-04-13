with open('src/components/PageHeader.jsx', 'r') as f:
    content = f.read()

# Fix hamburger icon color
content = content.replace(
    "color: t.subText, cursor: 'pointer', marginRight: '4px', display: 'flex', alignItems: 'center'",
    "color: t.text, cursor: 'pointer', marginRight: '4px', display: 'flex', alignItems: 'center'"
)

# Fix bell icon color
content = content.replace(
    "color: t.subText, cursor: 'pointer', padding: '5px 8px', position: 'relative', display: 'flex', alignItems: 'center'",
    "color: t.text, cursor: 'pointer', padding: '5px 8px', position: 'relative', display: 'flex', alignItems: 'center'"
)

# Fix title text
content = content.replace(
    "color: t.subText, fontSize: '11px', fontWeight: '500'",
    "color: t.text, fontSize: '11px', fontWeight: '500'"
)

with open('src/components/PageHeader.jsx', 'w') as f:
    f.write(content)

print("✅ Nav icons fixed for white theme!")
