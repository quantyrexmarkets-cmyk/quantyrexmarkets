with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Replace the entire login success block
old_block = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        // Force immediate redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);'''

new_block = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        // Redirect immediately without waiting
        window.location.href = '/dashboard';'''

if old_block in content:
    content = content.replace(old_block, new_block)
    print("Changed to instant redirect")
else:
    print("Pattern not found, trying alternative...")
    # Try finding just the token check
    if 'if (res.token) {' in content:
        lines = content.split('\n')
        new_lines = []
        in_token_block = False
        skip_until_else = False
        
        for i, line in enumerate(lines):
            if 'if (res.token) {' in line:
                in_token_block = True
                new_lines.append(line)
                new_lines.append("        localStorage.setItem('token', res.token);")
                new_lines.append("        login(res.token, res.user);")
                new_lines.append("        window.location.href = '/dashboard';")
                skip_until_else = True
                continue
            
            if skip_until_else:
                if '} else if' in line or 'else {' in line:
                    skip_until_else = False
                    new_lines.append(line)
                continue
                
            new_lines.append(line)
        
        content = '\n'.join(new_lines)
        print("Manually rebuilt token block")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)

print("Done!")
