with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix 1: QUANTYREX MARKETS header text size
content = content.replace(
    "color: '#6366f1', fontSize: '9px', fontWeight: '800' }}>QUANTYREX MARKETS</span>",
    "color: '#6366f1', fontSize: '11px', fontWeight: '800' }}>QUANTYREX MARKETS</span>"
)

# Fix 2: Username next to header
content = content.replace(
    "color: 'rgba(255,255,255,0.4)', fontSize: '8px' }}>| {u.firstName || ''} {u.lastName || ''}",
    "color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>| {u.firstName || ''} {u.lastName || ''}"
)

# Fix 3: Welcome card title
content = content.replace(
    "color: 'white', fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>Welcome back, {u.firstName || 'User'} {u.lastName || ''}!",
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Welcome back, {u.firstName || 'User'} {u.lastName || ''}!"
)

# Fix 4: Welcome card subtitle
content = content.replace(
    "color: 'rgba(255,255,255,0.45)', fontSize: '8px', marginBottom: '10px' }}>Your investment dashboard overview",
    "color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginBottom: '10px' }}>Your investment dashboard overview"
)

# Fix 5: Account Balance label
content = content.replace(
    "color: 'rgba(255,255,255,0.6)', fontSize: '9px', fontWeight: '600' }}>Account Balance",
    "color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: '600' }}>Account Balance"
)

# Fix 6: Available funds text
content = content.replace(
    "color: 'rgba(255,255,255,0.4)', fontSize: '9px', marginBottom: '10px' }}>Your available funds",
    "color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '10px' }}>Your available funds"
)

# Fix 7: Balance amount
content = content.replace(
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}",
    "color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>{formatAmountWithCode(u.balance || 0, u.currency)}"
)

# Fix 8: Available for withdrawal badge
content = content.replace(
    "color: 'rgba(255,255,255,0.6)', fontSize: '9px' }}>Available for Withdrawal",
    "color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Available for Withdrawal"
)

# Fix 9: KYC status badge
content = content.replace(
    "u.kycStatus === 'approved' ? 'Verified' : 'Unverified'",
    "u.kycStatus === 'approved' ? '✓ KYC Verified' : '✗ KYC Not Verified'"
)

# Fix 10: Stats grid label size
content = content.replace(
    "fontSize: 'clamp(8px, 2vw, 11px)' }}>{s.label}",
    "fontSize: 'clamp(10px, 2vw, 12px)' }}>{s.label}"
)

# Fix 11: Stats grid value size
content = content.replace(
    "fontSize: 'clamp(11px, 2.5vw, 16px)', marginBottom: '8px' }}>{s.value}",
    "fontSize: 'clamp(13px, 2.5vw, 18px)', marginBottom: '8px' }}>{s.value}"
)

# Fix 12: Stats grid small tags
content = content.replace(
    "fontSize: '6px', padding: '1px 3px' }}>{s.label === 'Total Withdrawals'",
    "fontSize: '8px', padding: '2px 4px' }}>{s.label === 'Total Withdrawals'"
)

content = content.replace(
    "fontSize: '6px', padding: '1px 3px' }}>{s.btc}",
    "fontSize: '8px', padding: '2px 4px' }}>{s.btc}"
)

# Fix 13: View Trade button
content = content.replace(
    "fontSize: '6px', padding: '1px 4px', }}>View Trade",
    "fontSize: '8px', padding: '2px 6px' }}>View Trade"
)

# Fix 14: Deposit/Withdraw buttons
content = content.replace(
    "color: 'white', fontSize: '9px', fontWeight: '600', padding: '7px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>\n                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>\n                  Deposit",
    "color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>\n                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>\n                  Deposit"
)

content = content.replace(
    "color: 'white', fontSize: '9px', fontWeight: '600', padding: '7px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>\n                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>\n                  Withdraw",
    "color: 'white', fontSize: '11px', fontWeight: '600', padding: '10px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>\n                  <svg width='14' height='14' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg>\n                  Withdraw"
)

# Fix 15: KYC Card
content = content.replace(
    "color: 'white', fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification",
    "color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Identity Verification"
)

content = content.replace(
    "color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginBottom: '16px' }}>Complete verification to access all features",
    "color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '16px' }}>Complete verification to access all features"
)

content = content.replace(
    "color: 'white', fontSize: '12px', fontWeight: '700', padding: '12px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>",
    "color: 'white', fontSize: '13px', fontWeight: '700', padding: '13px', cursor: 'pointer', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Dashboard content sizes fixed!")
