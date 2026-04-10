with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add console.log before the problematic line
if 'const stats = [' in content and 'console.log' not in content.split('const stats = [')[0][-100:]:
    content = content.replace(
        'const stats = [',
        'console.log("User data:", u);\n  console.log("DashData:", dashData);\n  const stats = ['
    )
    print("Added debug logging")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
