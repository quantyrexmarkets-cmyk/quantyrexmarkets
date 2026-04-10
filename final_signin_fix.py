with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Remove setSuccess and redirect immediately
old = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        // Add small delay to ensure state updates
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 500);'''

new = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        // Immediate redirect - no popup
        window.location.replace('/dashboard');'''

if old in content:
    content = content.replace(old, new)
    print("Removed success popup, redirecting immediately")
else:
    print("Pattern not found, trying alternative")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)
