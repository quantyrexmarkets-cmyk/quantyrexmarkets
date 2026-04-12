with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Add gap between QUANTYREX MARKETS text and below
content = content.replace(
    "<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>",
    "<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', marginTop: '8px' }}>"
)

# Add gap between DashboardTicker and Welcome card
content = content.replace(
    "<DashboardTicker />\n            <div style={{ height: \"10px\" }}></div>",
    "<DashboardTicker />\n            <div style={{ height: '16px' }}></div>"
)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Gaps added!")
