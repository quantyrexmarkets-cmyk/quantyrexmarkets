import os
import re

new_logo_svg = '''<svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
              <polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
              <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
              <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="32" cy="30" r="2" fill="#f59e0b"/>
            </svg>'''

files_to_update = [
    'src/components/DashboardSidebar.jsx',
    'src/pages/Dashboard.jsx',
    'src/components/SignIn.jsx',
    'src/components/SignUp.jsx',
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Look for old hexagon logo pattern
        old_pattern = r"<svg viewBox='0 0 40 40'[^>]*>[\s\S]*?<path d='M20 2L4 10V22L20 38L36 22V10L20 2Z'[\s\S]*?</svg>"
        
        if re.search(old_pattern, content):
            content = re.sub(old_pattern, new_logo_svg.replace('{{ ', '{').replace(' }}', '}'), content)
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"✅ Updated {filepath}")
        else:
            print(f"⚠️ No old logo found in {filepath}")

print("\nDone updating logos!")
