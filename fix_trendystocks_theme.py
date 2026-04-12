with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Find TrendyStocks function and add useTheme hook inside it
old = "function TrendyStocks() {"
new = """function TrendyStocks() {
  const { current: t } = useTheme();"""

if old in content and 'function TrendyStocks' in content:
    content = content.replace(old, new)
    print("✅ Added useTheme to TrendyStocks!")
else:
    print("❌ Pattern not found")

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)
