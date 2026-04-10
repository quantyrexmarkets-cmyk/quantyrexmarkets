import re

files_to_fix = [
    'src/components/Footer.jsx',
    'src/components/LoadingScreen.jsx',
    'src/components/SignUp.jsx',
    'src/components/SignIn.jsx',
    'src/pages/ForgotPassword.jsx',
    'src/pages/ResetPassword.jsx',
    'src/pages/WithdrawDeposit.jsx',
    'src/pages/WithdrawNew.jsx',
    'src/pages/Dashboard.jsx',
    'src/components/DashboardSidebar.jsx',
]

# Old logo patterns to find
old_patterns = [
    r"<path d=['\"]M20 2L4 10V22L20 38L36 22V10L20 2Z['\"][^/]*/?>",
    r"<path d=['\"]M20 8L8 14V22L20 34L32 22V14L20 8Z['\"][^/]*/?>",
    r"<path d=['\"]M20 14L12 18V23L20 30L28 23V18L20 14Z['\"][^/]*/?>",
]

# New logo SVG paths
new_logo_paths = '''<polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
                <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="2" fill="#f59e0b"/>'''

for filepath in files_to_fix:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Check if file has old logo
        if 'M20 2L4 10V22L20 38' in content:
            # Find the full SVG block and replace
            pattern = r"(<svg[^>]*viewBox=['\"]0 0 40 40['\"][^>]*>)\s*<path d=['\"]M20 2L4 10V22L20 38L36 22V10L20 2Z['\"][^/]*/>\s*<path d=['\"]M20 8L8 14V22L20 34L32 22V14L20 8Z['\"][^/]*/>\s*<path d=['\"]M20 14L12 18V23L20 30L28 23V18L20 14Z['\"][^/]*/>"
            
            replacement = r"\1\n                " + new_logo_paths
            
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            
            if content != original:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"✅ Fixed: {filepath}")
            else:
                print(f"⚠️ Pattern not matched: {filepath}")
        else:
            print(f"⏭️ No old logo: {filepath}")
            
    except FileNotFoundError:
        print(f"❌ Not found: {filepath}")
    except Exception as e:
        print(f"❌ Error in {filepath}: {e}")

print("\n✅ Done!")
