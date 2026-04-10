import os

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

old_paths = """<path d='M20 2L4 10V22L20 38L36 22V10L20 2Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.5'/>
                <path d='M20 8L8 14V22L20 34L32 22V14L20 8Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.2'/>
                <path d='M20 14L12 18V23L20 30L28 23V18L20 14Z' fill='#6366F1' stroke='#6366F1' strokeWidth='1'/>"""

new_paths = """<polygon points='20,4 34,11 34,27 20,34 6,27 6,11' fill='none' stroke='#6366F1' strokeWidth='1' opacity='0.5'/>
                <circle cx='20' cy='18' r='8' fill='none' stroke='#6366F1' strokeWidth='2'/>
                <line x1='25' y1='23' x2='32' y2='30' stroke='#6366F1' strokeWidth='2' strokeLinecap='round'/>
                <circle cx='32' cy='30' r='2' fill='#f59e0b'/>"""

# Also handle double quote version
old_paths_dq = old_paths.replace("'", '"')
new_paths_dq = new_paths.replace("'", '"')

for filepath in files_to_fix:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Try single quote version
        content = content.replace(old_paths, new_paths)
        
        # Try double quote version
        content = content.replace(old_paths_dq, new_paths_dq)
        
        # Also try with different whitespace
        old_compact = "<path d='M20 2L4 10V22L20 38L36 22V10L20 2Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.5'/>"
        new_compact = "<polygon points='20,4 34,11 34,27 20,34 6,27 6,11' fill='none' stroke='#6366F1' strokeWidth='1' opacity='0.5'/><circle cx='20' cy='18' r='8' fill='none' stroke='#6366F1' strokeWidth='2'/><line x1='25' y1='23' x2='32' y2='30' stroke='#6366F1' strokeWidth='2' strokeLinecap='round'/><circle cx='32' cy='30' r='2' fill='#f59e0b'/>"
        
        if old_compact in content:
            # Replace all three paths
            content = content.replace("<path d='M20 2L4 10V22L20 38L36 22V10L20 2Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.5'/>", "<polygon points='20,4 34,11 34,27 20,34 6,27 6,11' fill='none' stroke='#6366F1' strokeWidth='1' opacity='0.5'/>")
            content = content.replace("<path d='M20 8L8 14V22L20 34L32 22V14L20 8Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.2'/>", "<circle cx='20' cy='18' r='8' fill='none' stroke='#6366F1' strokeWidth='2'/>")
            content = content.replace("<path d='M20 14L12 18V23L20 30L28 23V18L20 14Z' fill='#6366F1' stroke='#6366F1' strokeWidth='1'/>", "<line x1='25' y1='23' x2='32' y2='30' stroke='#6366F1' strokeWidth='2' strokeLinecap='round'/><circle cx='32' cy='30' r='2' fill='#f59e0b'/>")
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"✅ Fixed: {filepath}")
        else:
            if 'M20 2L4 10V22L20 38' in original:
                print(f"⚠️ Has old logo but pattern didn't match: {filepath}")
            else:
                print(f"⏭️ Already updated or no logo: {filepath}")
                
    except FileNotFoundError:
        print(f"❌ Not found: {filepath}")
    except Exception as e:
        print(f"❌ Error: {filepath} - {e}")

print("\n✅ Done!")
