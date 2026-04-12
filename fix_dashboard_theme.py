with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add useTheme import
if 'useTheme' not in content:
    content = content.replace(
        "import { useAuth } from '../context/AuthContext';",
        "import { useAuth } from '../context/AuthContext';\nimport { useTheme } from '../context/ThemeContext';"
    )

    # Add hook
    content = content.replace(
        "  const { user, logout } = useAuth();",
        "  const { user, logout } = useAuth();\n  const { current: t } = useTheme();"
    )

    # Apply theme to main container
    content = content.replace(
        "background: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)'",
        "background: t.bg"
    )

    print("✅ Theme applied to Dashboard!")
else:
    print("Already added")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
