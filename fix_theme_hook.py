with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

old = "  const { user } = useAuth();"
new = "  const { user } = useAuth();\n  const { current: t } = useTheme();"

if old in content and 'const { current: t }' not in content:
    content = content.replace(old, new)
    print("✅ Theme hook added!")
else:
    print("Already exists or pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
