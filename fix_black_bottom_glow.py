with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

old = """                  {t.bg === '#111111' && <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60px', borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(40px)', pointerEvents: 'none' }} />}
                  {t.bg === '#111111' && <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(30px)', pointerEvents: 'none' }} />}"""

new = """                  {t.bg === '#111111' && <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60px', borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(40px)', pointerEvents: 'none' }} />}"""

if old in content:
    content = content.replace(old, new)
    print("✅ Kept only bottom glow!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
