import os
import re

# Files to update (excluding AdminPanel to avoid breaking it)
files = [
    'src/pages/BotTransactionHistory.jsx',
    'src/pages/ChangePassword.jsx',
    'src/pages/CopyTrading.jsx',
    'src/pages/CopyTradingSetup.jsx',
    'src/pages/Deposit.jsx',
    'src/pages/DepositFunds.jsx',
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
    'src/pages/WithdrawVerifyCode.jsx',
    'src/components/DashboardSidebar.jsx',
]

# Theme color replacements
replacements = [
    # Main backgrounds
    ("background: '#0f172a'", "background: t.bg"),
    ("background: '#0F172A'", "background: t.bg"),
    ("background: '#0e1628'", "background: t.bg"),
    ("background: '#131b2e'", "background: t.bg"),
    # Card backgrounds
    ("background: '#1e293b'", "background: t.cardBg"),
    ("background: '#161b27'", "background: t.cardBg"),
    ("background: '#1a2e4a'", "background: t.cardBg"),
    # Inline styles
    ("background:'#0f172a'", "background:t.bg"),
    ("background:'#0F172A'", "background:t.bg"),
    ("background:'#1e293b'", "background:t.cardBg"),
]

theme_import = "import { useTheme } from '../context/ThemeContext';"
component_import = "import { useTheme } from '../../context/ThemeContext';"

for filepath in files:
    if not os.path.exists(filepath):
        print(f"❌ Not found: {filepath}")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # Add import if not exists
    if 'useTheme' not in content:
        # Find first import line
        first_import_end = content.find('\n', content.find('import '))
        if '../context/ThemeContext' in content:
            pass
        elif 'src/pages' in filepath or 'src/components' in filepath:
            content = content[:first_import_end+1] + theme_import + '\n' + content[first_import_end+1:]

    # Add hook if not exists
    if 'useTheme' in content and 'const { current: t }' not in content:
        # Find existing useAuth or first useState
        hook_patterns = [
            ('const { user } = useAuth();', 'const { user } = useAuth();\n  const { current: t } = useTheme();'),
            ('const { user, logout } = useAuth();', 'const { user, logout } = useAuth();\n  const { current: t } = useTheme();'),
            ('const { user, loading } = useAuth();', 'const { user, loading } = useAuth();\n  const { current: t } = useTheme();'),
            ('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const { current: t } = useTheme();'),
        ]
        for old_hook, new_hook in hook_patterns:
            if old_hook in content and 'const { current: t }' not in content:
                content = content.replace(old_hook, new_hook, 1)
                break

    # Apply color replacements
    for old_color, new_color in replacements:
        content = content.replace(old_color, new_color)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ {filepath}")
    else:
        print(f"⏭️ No change: {filepath}")

print("\n✅ Done!")
