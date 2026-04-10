with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Find the return statement and add a loading check
old_return = 'return (\n    <div style={{ minHeight: \'100vh\', background: \'linear-gradient(135deg, #0F172A 0%, #020617 100%)\''

new_return = '''if (!user) {
    return <div style={{ minHeight: '100vh', background: '#0e1628', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)\''''

if old_return in content and 'if (!user)' not in content:
    content = content.replace(old_return, new_return)
    print("Added user check before render")
    
with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
    
print("Dashboard fixed!")
