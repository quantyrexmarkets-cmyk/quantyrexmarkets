with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add blob glow inside inner card for black theme
old = """                  <div style={{ position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none' }} />"""

new = """                  <div style={{ position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none' }} />
                  {t.bg === '#111111' && <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60px', borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(40px)', pointerEvents: 'none' }} />}
                  {t.bg === '#111111' && <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(30px)', pointerEvents: 'none' }} />}"""

if old in content:
    content = content.replace(old, new)
    print("✅ Blob glow added to black theme inner card!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
