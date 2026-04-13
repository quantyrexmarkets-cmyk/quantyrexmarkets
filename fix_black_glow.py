with open('src/context/ThemeContext.jsx', 'r') as f:
    content = f.read()

# Add glow to black theme cardBg2
content = content.replace(
    """  black: {
    name: 'Black',
    bg: '#111111',
    cardBg: '#1a1a1a',
    cardBg2: '#222222',""",
    """  black: {
    name: 'Black',
    bg: '#111111',
    cardBg: '#1a1a1a',
    cardBg2: '#1a1a2e',"""
)

with open('src/context/ThemeContext.jsx', 'w') as f:
    f.write(content)

print("✅ Black theme inner card has subtle blue glow!")
