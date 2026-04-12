with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add Google Fonts import at the top
if 'Montserrat' not in content:
    content = "import '@fontsource/montserrat';\n" + content
    print("Added Montserrat import")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
