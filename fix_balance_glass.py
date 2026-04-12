with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix balance font size
content = content.replace(
    "color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}",
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}"
)

# Remove purple glow from inner card and make it cleaner glass
old_inner = """                <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60px', borderRadius: '50%', background: 'rgba(99,102,241,0.35)', filter: 'blur(45px)', pointerEvents: 'none' }} />"""

new_inner = """                <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)', pointerEvents: 'none' }} />"""

if old_inner in content:
    content = content.replace(old_inner, new_inner)
    print("✅ Inner card glass fixed!")
else:
    print("❌ Inner card pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
