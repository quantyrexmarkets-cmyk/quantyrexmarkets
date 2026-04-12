with open('src/context/ThemeContext.jsx', 'r') as f:
    content = f.read()

old = """  white: {
    name: 'White',
    bg: '#f1f5f9',
    cardBg: '#ffffff',
    cardBg2: '#f8fafc',
    text: '#0f172a',
    subText: 'rgba(15,23,42,0.5)',
    border: 'rgba(15,23,42,0.1)',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.9) 100%)',
    sidebarBg: '#ffffff',
    inputBg: '#f1f5f9',
    tableBg: '#f8fafc',
  },"""

new = """  white: {
    name: 'White',
    bg: '#f8fafc',
    cardBg: '#ffffff',
    cardBg2: '#f1f5f9',
    text: '#0f172a',
    subText: '#64748b',
    border: '#e2e8f0',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
    sidebarBg: '#ffffff',
    inputBg: '#f8fafc',
    tableBg: '#f8fafc',
  },"""

content = content.replace(old, new)

with open('src/context/ThemeContext.jsx', 'w') as f:
    f.write(content)

print("✅ White theme colors improved!")
