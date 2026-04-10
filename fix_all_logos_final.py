import os
import re

files_to_fix = [
    'src/components/SignIn.jsx',
    'src/components/SignUp.jsx', 
    'src/components/Footer.jsx',
    'src/components/LoadingScreen.jsx',
    'src/components/DashboardSidebar.jsx',
    'src/pages/Dashboard.jsx',
    'src/pages/ForgotPassword.jsx',
    'src/pages/ResetPassword.jsx',
    'src/pages/WithdrawDeposit.jsx',
    'src/pages/WithdrawNew.jsx',
]

# Original hexagon logo
hexagon_logo = '''<path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>'''

# Single quote version
hexagon_logo_sq = hexagon_logo.replace('"', "'")

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"⏭️ Not found: {filepath}")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Pattern to match the broken Q logo SVG content
    q_pattern = r'''<polygon points=["']20,4 34,11 34,27 20,34 6,27 6,11["'][^/]*/>\s*(?:{/\* Q Circle \*/})?\s*<circle cx=["']20["'] cy=["']18["'][^/]*/>\s*(?:{/\* Q Tail \*/})?\s*<line x1=["']25["'][^/]*/>\s*(?:{/\* Accent dot \*/})?\s*<circle cx=["']32["'][^/]*/>'''
    
    # Also try simpler patterns
    patterns_to_replace = [
        (r"<polygon points=[\"']20,4 34,11 34,27 20,34 6,27 6,11[\"'][^>]*/>", '<path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>'),
        (r"<circle cx=[\"']20[\"'] cy=[\"']18[\"'] r=[\"']8[\"'][^>]*/>", '<path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>'),
        (r"<line x1=[\"']25[\"'] y1=[\"']23[\"'][^>]*/>", '<path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>'),
        (r"<circle cx=[\"']32[\"'] cy=[\"']30[\"'][^>]*/>", ''),
        (r"\{/\* Hexagon border \*/\}\s*", ''),
        (r"\{/\* Q Circle \*/\}\s*", ''),
        (r"\{/\* Q Tail \*/\}\s*", ''),
        (r"\{/\* Accent dot \*/\}\s*", ''),
    ]
    
    for pattern, replacement in patterns_to_replace:
        content = re.sub(pattern, replacement, content)
    
    # Also fix style syntax error
    content = content.replace(
        "style={width: '100%', height: '100%'}",
        "style={{ width: '100%', height: '100%' }}"
    )
    content = content.replace(
        'style={width: "100%", height: "100%"}',
        'style={{ width: "100%", height: "100%" }}'
    )
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Fixed: {filepath}")
    else:
        print(f"⚠️ No changes: {filepath}")

print("\n✅ Done!")
