with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Restore welcome card to original dark glass
old = """            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: t.bg === '#f8fafc' ? t.cardBg : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.25)', boxShadow: t.bg === '#f8fafc' ? '0 4px 20px rgba(0,0,0,0.08)' : '0 8px 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)', padding: '14px 12px', textAlign: 'center' }}>"""

new = """            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 8px 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)', padding: '14px 12px', textAlign: 'center' }}>"""

content = content.replace(old, new)

# Restore inner balance card
old2 = """                <div style={{ background: t.bg === '#f8fafc' ? t.cardBg2 : 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>"""

new2 = """                <div style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px', marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>"""

content = content.replace(old2, new2)

# Restore stats cards
content = content.replace(
    "background: t.bg === '#f8fafc' ? t.cardBg : 'rgba(255,255,255,0.04)'",
    "background: 'rgba(255,255,255,0.04)'"
)

# Restore transaction list
content = content.replace(
    "background: t.bg === '#f8fafc' ? t.cardBg : 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '10px', boxShadow: t.bg === '#f8fafc' ? '0 4px 20px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)', marginBottom: '20px'",
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', marginBottom: '20px'"
)

# Restore KYC card
content = content.replace(
    "background: t.bg === '#f8fafc' ? t.cardBg : 'rgba(255,255,255,0.04)', border: `1px solid rgba(99,102,241,0.3)`, borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center', boxShadow: t.bg === '#f8fafc' ? '0 4px 20px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)'",
    "background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.2)'"
)

# Restore withdraw button
content = content.replace(
    "background: t.bg === '#f8fafc' ? t.cardBg2 : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: `1px solid ${t.border}`, color: t.text",
    "background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: t.text"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dark theme restored!")
