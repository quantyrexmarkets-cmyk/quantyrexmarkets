with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

replacements = [
    # Balance button in nav
    ("background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'",
     "background: t.cardBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'"),
    # Trade button in nav
    ("background: 'transparent', border: '1px solid #6366f1', color: 'white', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'",
     "background: 'transparent', border: '1px solid #6366f1', color: t.text, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'"),
    # Notifications title
    ("color: 'white', fontSize: '11px', fontWeight: '700' }}>Notifications",
     "color: t.text, fontSize: '11px', fontWeight: '700' }}>Notifications"),
    # Notification item title
    ("color: 'white', fontSize: '10px', fontWeight: '600', marginBottom: '2px'",
     "color: t.text, fontSize: '10px', fontWeight: '600', marginBottom: '2px'"),
    # Transaction list selects
    ("background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '8px', padding: '3px 8px', outline: 'none'",
     "background: t.cardBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none'"),
    ("background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '8px', padding: '2px 5px', outline: 'none'",
     "background: t.cardBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none'"),
    # Search input
    ("background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '8px', padding: '3px 8px', outline: 'none', width: '90px'",
     "background: t.cardBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '90px'"),
    # Quick trade section
    ("color: 'white', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Quick Trade",
     "color: t.text, fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Quick Trade"),
    ("color: 'white', fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '12px' }}>TRADE ASSETS",
     "color: t.text, fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '12px' }}>TRADE ASSETS"),
    # Trade inputs and selects
    ("background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '9px', padding: '6px 8px', outline: 'none'",
     "background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px 8px', outline: 'none'"),
    # QUANTYREX text
    ("color: 'white', fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX",
     "color: t.text, fontSize: '13px', fontWeight: '300', letterSpacing: '1px', fontFamily: \"'Montserrat', Arial, sans-serif\" }}>QUANTYREX"),
    # Transaction list show entries label
    ("color: 'rgba(255,255,255,0.45)', fontSize: '8px' }}>Show",
     "color: t.subText, fontSize: '8px' }}>Show"),
    ("color: 'rgba(255,255,255,0.45)', fontSize: '8px' }}>entries",
     "color: t.subText, fontSize: '8px' }}>entries"),
    ("color: 'rgba(255,255,255,0.45)', fontSize: '8px' }}>Search:",
     "color: t.subText, fontSize: '8px' }}>Search:"),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old[:50]}...")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("\n✅ All nav texts fixed!")
