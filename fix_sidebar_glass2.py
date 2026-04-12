with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Wrap each item in a div with glass effect when active
old = """              {section.items.map((item, ii) => (
                <div key={ii}>
                  <button onClick={() => {"""

new = """              {section.items.map((item, ii) => (
                <div key={ii} style={{ padding: '2px 8px' }}>
                  <div style={{
                    borderRadius: '8px',
                    background: location.pathname === item.route ? 'rgba(99,102,241,0.12)' : 'transparent',
                    backdropFilter: location.pathname === item.route ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: location.pathname === item.route ? 'blur(12px)' : 'none',
                    border: location.pathname === item.route ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                    boxShadow: location.pathname === item.route ? '0 4px 16px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
                  }}>
                  <button onClick={() => {"""

if old in content:
    content = content.replace(old, new)
    print("✅ Added glass wrapper!")
else:
    print("❌ Pattern not found")

# Close the glass div after the button and submenu
old_close = """                </div>
              ))}"""

new_close = """                  </div>
                </div>
              ))}"""

content = content.replace(old_close, new_close, 1)

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Glass effect applied!")
