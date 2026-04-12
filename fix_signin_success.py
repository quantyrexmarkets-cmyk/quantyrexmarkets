with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

old = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        // Immediate redirect - no popup, no delay
        window.location.replace('/dashboard');'''

new = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 1500);'''

if old in content:
    content = content.replace(old, new)
    print("✅ Success popup restored!")
else:
    print("❌ Pattern not found")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)
