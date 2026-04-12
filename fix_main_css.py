with open('src/main.jsx', 'r') as f:
    content = f.read()

if "themes.css" not in content:
    content = content.replace(
        "import './index.css'",
        "import './index.css'\nimport './styles/themes.css'"
    )
    print("✅ CSS imported!")
else:
    print("Already imported")

with open('src/main.jsx', 'w') as f:
    f.write(content)
