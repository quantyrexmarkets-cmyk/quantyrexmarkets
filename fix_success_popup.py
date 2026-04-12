with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

old = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 1500);'''

new = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.replace('/dashboard');
        }, 1500);'''

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed - success popup resets before redirect!")
else:
    print("❌ Pattern not found")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)
