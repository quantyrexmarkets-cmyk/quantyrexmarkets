with open('src/main.jsx', 'r') as f:
    content = f.read()

# Add ThemeProvider import
if 'ThemeProvider' not in content:
    content = content.replace(
        "import { AuthProvider }",
        "import { ThemeProvider } from './context/ThemeContext';\nimport { AuthProvider }"
    )
    
    # Wrap app with ThemeProvider
    content = content.replace(
        "<AuthProvider>",
        "<ThemeProvider>\n    <AuthProvider>"
    )
    content = content.replace(
        "</AuthProvider>",
        "</AuthProvider>\n    </ThemeProvider>"
    )
    print("✅ ThemeProvider added to main.jsx")
else:
    print("Already added")

with open('src/main.jsx', 'w') as f:
    f.write(content)
