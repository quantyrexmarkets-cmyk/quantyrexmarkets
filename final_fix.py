with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Find and replace the problematic section
old = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        // Single redirect after 1 second
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);'''

new = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        // Immediate redirect - no popup, no delay
        window.location.replace('/dashboard');'''

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed login redirect")
else:
    print("❌ Pattern not found - showing what we have:")
    # Find the if (res.token) block
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'if (res.token) {' in line and i < 100:
            print(f"\nLine {i}: {line}")
            for j in range(i+1, min(i+10, len(lines))):
                print(f"Line {j}: {lines[j]}")
                if '}' in lines[j] and 'else' in lines[j]:
                    break

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)

print("\nDone!")
