with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix KYC card
content = content.replace(
    "background: '#161b27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center'",
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'"
)

# Fix transaction list
content = content.replace(
    "background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: '20px'",
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)', marginBottom: '20px'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ KYC card and transaction list glass updated!")
