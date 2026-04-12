with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Remove the entire Icon Sidebar section
old = '''      {/* Icon Sidebar */}
      <div style={{ width: 'clamp(36px, 8vw, 48px)', background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.1)', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: '4px', flexShrink: 0, display: sidebarOpen ? 'none' : 'flex' }}>
        <div style={{ width: '22px', height: '22px', marginBottom: '16px' }}>
            <svg viewBox="0 0 40 40" fill="none" style={{ width: "100%", height: "100%" }}>
              <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
              <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
              <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
            </svg>
            </div>
        {navItems.map((item, i) => (
          <button key={i} onClick={() => { setActiveNav(i); navigate(item.route); }} title={item.label}
            style={{ width: '34px', height: '34px', background: activeNav === i ? '#6366f1' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeNav === i ? 'white' : 'rgba(255,255,255,0.4)' }}>
            {item.icon}
          </button>
          ))}
      </div>'''

if old in content:
    content = content.replace(old, '')
    print("✅ Icon Sidebar removed!")
else:
    print("⚠️ Pattern not found, trying line-by-line...")
    lines = content.split('\n')
    new_lines = []
    skip = False
    for i, line in enumerate(lines):
        if '{/* Icon Sidebar */}' in line:
            skip = True
        if skip and '</div>' in line and 'navItems.map' not in ''.join(lines[max(0,i-10):i]):
            # Count if this closes the icon sidebar div
            skip = False
            continue
        if not skip:
            new_lines.append(line)
    content = '\n'.join(new_lines)
    print("✅ Tried line-by-line removal")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
