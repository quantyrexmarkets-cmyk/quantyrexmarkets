with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Add useLocation import
old_import = "import { useNavigate } from 'react-router-dom';"
new_import = "import { useNavigate, useLocation } from 'react-router-dom';"

content = content.replace(old_import, new_import)

# Add useLocation hook
old_hook = "export default function DashboardSidebar({ open, onClose }) {"
new_hook = """export default function DashboardSidebar({ open, onClose }) {
  const location = useLocation();"""

content = content.replace(old_hook, new_hook)

# Update menu item button to use location for active state
old_btn = """style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '11px', textAlign: 'left' }}>"""

new_btn = """style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: location.pathname === item.route ? 'rgba(99,102,241,0.15)' : 'transparent', backdropFilter: location.pathname === item.route ? 'blur(10px)' : 'none', borderLeft: location.pathname === item.route ? '2px solid #6366f1' : '2px solid transparent', border: 'none', cursor: 'pointer', color: location.pathname === item.route ? '#ffffff' : 'rgba(255,255,255,0.7)', fontSize: '11px', textAlign: 'left' }}>"""

if old_btn in content:
    content = content.replace(old_btn, new_btn)
    print("✅ Glass effect added to active item!")
else:
    print("❌ Button pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
