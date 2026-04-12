with open('src/components/PageHeader.jsx', 'r') as f:
    content = f.read()

# Add useTheme import
if 'useTheme' not in content:
    content = content.replace(
        "import { RefreshCw, User, Settings, Lock, LogOut } from 'lucide-react';",
        "import { RefreshCw, User, Settings, Lock, LogOut } from 'lucide-react';\nimport { useTheme } from '../context/ThemeContext';"
    )

# Add hook
if 'const { current: t }' not in content:
    content = content.replace(
        "const { user, logout } = useAuth();",
        "const { user, logout } = useAuth();\n  const { current: t } = useTheme();"
    )

# Fix nav background
content = content.replace(
    "background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)'",
    "background: t.navBg"
)

# Fix nav border
content = content.replace(
    "borderBottom: '1px solid rgba(99,102,241,0.3)'",
    "borderBottom: `1px solid ${t.accent}4D`"
)

with open('src/components/PageHeader.jsx', 'w') as f:
    f.write(content)

print("✅ PageHeader theme applied!")
