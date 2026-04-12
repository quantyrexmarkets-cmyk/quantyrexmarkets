with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Find the overlay div and add blur effect
old = """{open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1099 }} />}"""

new = """{open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 1099 }} />}"""

if old in content:
    content = content.replace(old, new)
    print("✅ Blur added to sidebar overlay!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
