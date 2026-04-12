with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Add useAuth import
old_import = "import { useNavigate } from 'react-router-dom';"
new_import = """import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';"""

content = content.replace(old_import, new_import)

# Add useAuth hook inside the component
old_hook = "export default function DashboardSidebar({ open, onClose }) {"
new_hook = """export default function DashboardSidebar({ open, onClose }) {
  const { user } = useAuth();"""

content = content.replace(old_hook, new_hook)

# Update the brand name to include username below
old_brand = """<span style={{ color: 'white', fontSize: '12px', fontWeight: '800' }}>QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span></span>"""

new_brand = """<div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '800' }}>QUANTYREX <span style={{ color: '#6366f1' }}>MARKETS</span></span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px', fontWeight: '400' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
            </div>"""

if old_brand in content:
    content = content.replace(old_brand, new_brand)
    print("✅ Username added below brand!")
else:
    print("❌ Brand pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)

print("✅ Done!")
