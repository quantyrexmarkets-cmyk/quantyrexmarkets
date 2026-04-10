with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Fix the broken style prop - it should be style={{ ... }} not style={...}
content = content.replace(
    "style={width: '100%', height: '100%'}",
    "style={{ width: '100%', height: '100%' }}"
)

# Also check for other variations
content = content.replace(
    'style={width: "100%", height: "100%"}',
    'style={{ width: "100%", height: "100%" }}'
)

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)

print("✅ Fixed SignIn.jsx")
