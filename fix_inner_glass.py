with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix inner balance card - pure glass, darker, no color tint
content = content.replace(
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>",
    "background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>"
)

# Remove the gradient overlay inside inner card
content = content.replace(
    "position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)', pointerEvents: 'none'",
    "position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Inner glass fixed - pure dark transparent!")
