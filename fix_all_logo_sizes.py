import os
import re

# Files that need logo size fixed (standalone logos without parent size control)
files_to_fix = [
    'src/components/SignIn.jsx',
    'src/components/LoadingScreen.jsx',
    'src/pages/ResetPassword.jsx',
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"⏭️ Not found: {filepath}")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Replace oversized SVG with proper fixed size (40x40 like SignUp)
    content = content.replace(
        '''<svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>''',
        '''<svg viewBox="0 0 40 40" fill="none" width="40" height="40" style={{ margin: '0 auto 10px', display: 'block' }}>'''
    )
    
    # Also try single quote version
    content = content.replace(
        """<svg viewBox='0 0 40 40' fill='none' style={{ width: '100%', height: '100%' }}>""",
        """<svg viewBox='0 0 40 40' fill='none' width='40' height='40' style={{ margin: '0 auto 10px', display: 'block' }}>"""
    )
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Fixed: {filepath}")
    else:
        print(f"⚠️ No change needed: {filepath}")

print("\n✅ Done!")
