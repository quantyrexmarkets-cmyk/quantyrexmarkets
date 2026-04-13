with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Only change what needs to adapt to white theme
# Keep dark theme values but make them conditional

# 1. Welcome card outer - conditional background
content = content.replace(
    "background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(99,102,241,0.25)'",
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(99,102,241,0.25)'"
)
print("✅ Welcome card fixed")

# 2. Welcome text colors - conditional
content = content.replace(
    "color: 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back"
)
print("✅ Welcome text fixed")

content = content.replace(
    "color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: '300', marginBottom: '10px' }}>Your investment dashboard overview",
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: '300', marginBottom: '10px' }}>Your investment dashboard overview"
)
print("✅ Subtitle fixed")

# 3. Inner balance card
content = content.replace(
    "background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px'",
    "background: t.bg === '#f8fafc' ? '#f1f5f9' : 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)', borderRadius: '12px'"
)
print("✅ Inner card fixed")

# 4. Account Balance label
content = content.replace(
    "color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: '600' }}>Account Balance",
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: '600' }}>Account Balance"
)

# 5. Available funds
content = content.replace(
    "color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px' }}>Your available funds",
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px' }}>Your available funds"
)

# 6. Balance amount
content = content.replace(
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}"
)

# 7. Last updated
content = content.replace(
    "color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>Last updated:",
    "color: t.bg === '#f8fafc' ? '#94a3b8' : 'rgba(255,255,255,0.3)', fontSize: '8px' }}>Last updated:"
)

# 8. Withdraw button
content = content.replace(
    "background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'",
    "background: t.bg === '#f8fafc' ? '#f1f5f9' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.15)', color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'"
)
print("✅ Withdraw button fixed")

# 9. Stats cards
content = content.replace(
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${t.border}`, borderRadius: '14px'",
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${t.border}`, borderRadius: '14px'"
)
print("✅ Stats cards fixed")

# 10. Stats label and value
content = content.replace(
    "color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(9px, 2vw, 11px)'",
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.55)', fontSize: 'clamp(9px, 2vw, 11px)'"
)
content = content.replace(
    "color: 'white', fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'"
)
content = content.replace(
    "color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>{{s.btc}",
    "color: t.bg === '#f8fafc' ? '#94a3b8' : 'rgba(255,255,255,0.3)', fontSize: '8px' }}>{{s.btc}"
)
print("✅ Stats text fixed")

# 11. Transaction list
content = content.replace(
    "background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', marginBottom: '20px'",
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: t.bg === '#f8fafc' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px', boxShadow: t.bg === '#f8fafc' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)', marginBottom: '20px'"
)
print("✅ Transaction list fixed")

# 12. Transaction list title
content = content.replace(
    "color: 'white', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST"
)

# 13. QUANTYREX text
content = content.replace(
    "color: 'white', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX"
)

# 14. KYC card
content = content.replace(
    "background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.2)'",
    "background: t.bg === '#f8fafc' ? '#ffffff' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center', boxShadow: t.bg === '#f8fafc' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 4px 24px rgba(0,0,0,0.2)'"
)
content = content.replace(
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification",
    "color: t.bg === '#f8fafc' ? '#0f172a' : 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification"
)
content = content.replace(
    "color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '16px' }}>Complete verification",
    "color: t.bg === '#f8fafc' ? '#64748b' : 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '16px' }}>Complete verification"
)
print("✅ KYC card fixed")

# 15. Main background
content = content.replace(
    "background: t.bg, display: 'flex'",
    "background: t.bg, display: 'flex'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("\n✅ White theme applied carefully - dark theme preserved!")
