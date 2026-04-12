with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

replacements = [
    # Text colors
    ("color: 'white', fontSize: '14px', fontWeight: '700' }}>Trendy Stock Markets", "color: t.text, fontSize: '14px', fontWeight: '700' }}>Trendy Stock Markets"),
    ("color: 'white', fontSize: '11px', fontWeight: '700' }}>Notifications", "color: t.text, fontSize: '11px', fontWeight: '700' }}>Notifications"),
    ("color: 'white', fontSize: '10px', fontWeight: '600', marginBottom: '2px'", "color: t.text, fontSize: '10px', fontWeight: '600', marginBottom: '2px'"),
    ("color: '#ffffff', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX", "color: t.text, fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX"),
    ("color: 'white', fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back", "color: t.text, fontSize: '15px', fontWeight: '300', letterSpacing: '0.3px', marginBottom: '4px' }}>Welcome back"),
    ("color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance", "color: t.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance"),
    ("color: 'white', fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'", "color: t.text, fontWeight: '700', fontSize: 'clamp(12px, 2.5vw, 16px)', marginBottom: '8px'"),
    ("color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification", "color: t.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification"),
    ("color: 'white', fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST", "color: t.text, fontSize: '9px', fontWeight: '700', letterSpacing: '0.08em' }}>TRANSACTION LIST"),
    # Loading screen
    ("background: '#0e1628', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'", "background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text"),
    # Balance button
    ("color: 'white', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}><span style={{ color: '#f7931a'", "color: t.text, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}><span style={{ color: '#f7931a'"),
    # Subtext colors
    ("color: 'rgba(255,255,255,0.45)', fontSize: '8px', marginBottom: '10px'", "color: t.subText, fontSize: '8px', marginBottom: '10px'"),
    ("color: 'rgba(255,255,255,0.6)', fontSize: '9px', fontWeight: '600' }}>Account Balance", "color: t.subText, fontSize: '9px', fontWeight: '600' }}>Account Balance"),
    ("color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px'", "color: t.subText, fontSize: '11px', marginBottom: '10px'"),
    ("color: 'rgba(255,255,255,0.45)', fontSize: '7px'", "color: t.subText, fontSize: '7px'"),
    ("color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(9px, 2vw, 11px)'", "color: t.subText, fontSize: 'clamp(9px, 2vw, 11px)'"),
    ("color: 'rgba(255,255,255,0.3)', fontSize: '8px'", "color: t.subText, fontSize: '8px'"),
    ("color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginBottom: '10px'", "color: t.subText, fontSize: '11px', marginBottom: '10px'"),
    ("color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>Last updated", "color: t.subText, fontSize: '8px' }}>Last updated"),
    # borders
    ("border: '1px solid rgba(255,255,255,0.08)'", "border: `1px solid ${t.border}`"),
    ("border: '1px solid rgba(255,255,255,0.1)'", "border: `1px solid ${t.border}`"),
    ("borderBottom: '1px solid rgba(255,255,255,0.06)'", "borderBottom: `1px solid ${t.border}`"),
    # Card backgrounds
    ("background: '#111827'", "background: t.cardBg"),
    ("background: '#1a2e4a'", "background: t.cardBg2"),
    ("background: '#0e1628'", "background: t.inputBg"),
    ("background: '#161b27'", "background: t.cardBg"),
    # Notification panel
    ("background: '#132035'", "background: t.cardBg"),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old[:50]}...")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("\n✅ Dashboard white theme fixed!")
