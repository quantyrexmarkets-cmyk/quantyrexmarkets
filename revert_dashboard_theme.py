with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Remove theme import and hook from Dashboard - let CSS handle it
# Keep only the bg change for the main container
replacements = [
    # Revert text colors back to original
    ("color: t.text, fontSize: '14px', fontWeight: '700' }}>Trendy Stock Markets", "color: 'white', fontSize: '14px', fontWeight: '700' }}>Trendy Stock Markets"),
    ("color: t.text, fontSize: '11px', fontWeight: '700' }}>Notifications", "color: 'white', fontSize: '11px', fontWeight: '700' }}>Notifications"),
    ("color: t.text, fontSize: '10px', fontWeight: '600', marginBottom: '2px'", "color: 'white', fontSize: '10px', fontWeight: '600', marginBottom: '2px'"),
    ("color: t.text, fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX", "color: 'white', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX"),
    ("color: t.text, fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back", "color: 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back"),
    ("color: t.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance", "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance"),
    ("color: t.text, fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'", "color: 'white', fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'"),
    ("color: t.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification", "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification"),
    ("color: t.text, fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST", "color: 'white', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST"),
    ("color: t.text, fontSize: '11px', cursor: 'pointer'", "color: 'white', fontSize: '11px', cursor: 'pointer'"),
    # Revert subtext
    ("color: t.subText, fontSize: '8px', marginBottom: '10px'", "color: 'rgba(255,255,255,0.45)', fontSize: '8px', marginBottom: '10px'"),
    ("color: t.subText, fontSize: '9px', fontWeight: '600' }}>Account Balance", "color: 'rgba(255,255,255,0.6)', fontSize: '9px', fontWeight: '600' }}>Account Balance"),
    ("color: t.subText, fontSize: '11px', marginBottom: '10px'", "color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px'"),
    ("color: t.subText, fontSize: '7px'", "color: 'rgba(255,255,255,0.45)', fontSize: '7px'"),
    ("color: t.subText, fontSize: 'clamp(9px, 2vw, 11px)'", "color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(9px, 2vw, 11px)'"),
    ("color: t.subText, fontSize: '8px'", "color: 'rgba(255,255,255,0.3)', fontSize: '8px'"),
    ("color: t.subText, fontSize: '8px' }}>Last updated", "color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>Last updated"),
    # Revert borders
    ("border: `1px solid ${t.border}`", "border: '1px solid rgba(255,255,255,0.08)'"),
    ("borderBottom: `1px solid ${t.border}`", "borderBottom: '1px solid rgba(255,255,255,0.06)'"),
    # Revert card backgrounds
    ("background: t.cardBg", "background: '#1e293b'"),
    ("background: t.cardBg2", "background: '#1a2e4a'"),
    ("background: t.inputBg", "background: '#0e1628'"),
    ("background: t.sidebarBg", "background: '#0f172a'"),
    # Revert loading
    ("background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text", "background: '#0e1628', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'"),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Reverted: {old[:50]}")

# Keep only main bg using theme
content = content.replace(
    "background: '#1e293b'",
    "background: '#1e293b'"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("\n✅ Dashboard reverted to original dark theme!")
