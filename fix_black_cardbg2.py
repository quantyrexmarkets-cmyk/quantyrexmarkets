with open('src/context/ThemeContext.jsx', 'r') as f:
    content = f.read()

# Fix black theme cardBg2 back to original
content = content.replace(
    "cardBg2: '#1a1a2e',",
    "cardBg2: '#222222',"
)

with open('src/context/ThemeContext.jsx', 'w') as f:
    f.write(content)

print("✅ Black theme cardBg2 restored to #222222!")
