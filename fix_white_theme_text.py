import os
import re

files = [
    'src/pages/BotTransactionHistory.jsx',
    'src/pages/ChangePassword.jsx',
    'src/pages/CopyTrading.jsx',
    'src/pages/CopyTradingSetup.jsx',
    'src/pages/Deposit.jsx',
    'src/pages/InvestmentRecords.jsx',
    'src/pages/KYC.jsx',
    'src/pages/LiveMarket.jsx',
    'src/pages/LiveTrading.jsx',
    'src/pages/ManageBots.jsx',
    'src/pages/MyCopyTrades.jsx',
    'src/pages/NewStake.jsx',
    'src/pages/Notifications.jsx',
    'src/pages/Packages.jsx',
    'src/pages/Profile.jsx',
    'src/pages/ReferUsers.jsx',
    'src/pages/Settings.jsx',
    'src/pages/Stake.jsx',
    'src/pages/TransactionHistory.jsx',
    'src/pages/Withdraw.jsx',
    'src/pages/WithdrawDeposit.jsx',
    'src/pages/WithdrawNew.jsx',
    'src/components/DashboardSidebar.jsx',
    'src/components/PageHeader.jsx',
]

text_replacements = [
    # White text -> theme text
    ("color: 'white'", "color: t.text"),
    ('color: "white"', "color: t.text"),
    # Specific white colors
    ("color: '#ffffff'", "color: t.text"),
    ("color: '#fff'", "color: t.text"),
    # Subtext
    ("color: 'rgba(255,255,255,0.7)'", "color: t.subText"),
    ("color: 'rgba(255,255,255,0.6)'", "color: t.subText"),
    ("color: 'rgba(255,255,255,0.5)'", "color: t.subText"),
    ("color: 'rgba(255,255,255,0.4)'", "color: t.subText"),
    ("color: 'rgba(255,255,255,0.45)'", "color: t.subText"),
    # Border
    ("border: '1px solid rgba(255,255,255,0.08)'", "border: `1px solid ${t.border}`"),
    ("border: '1px solid rgba(255,255,255,0.1)'", "border: `1px solid ${t.border}`"),
    ("borderBottom: '1px solid rgba(255,255,255,0.06)'", "borderBottom: `1px solid ${t.border}`"),
    ("borderBottom: '1px solid rgba(255,255,255,0.08)'", "borderBottom: `1px solid ${t.border}`"),
    # Card backgrounds
    ("background: '#1a2e4a'", "background: t.cardBg2"),
    ("background: '#0e1628'", "background: t.inputBg"),
    # Table
    ("background: 'rgba(255,255,255,0.06)'", "background: t.border"),
]

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    if 'const { current: t }' not in content:
        continue

    for old, new in text_replacements:
        content = content.replace(old, new)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ {filepath}")

print("\n✅ Done!")
