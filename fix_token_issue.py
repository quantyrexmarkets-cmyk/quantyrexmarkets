with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Change to pass user data immediately and avoid relying on getMe
old = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        // Redirect immediately without waiting
        window.location.href = '/dashboard';'''

new = '''if (res.token) {
        console.log('✅ Login successful');
        console.log('Token:', res.token.substring(0, 30) + '...');
        console.log('User from login:', res.user);
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        console.log('✅ Token saved, calling login(), redirecting...');
        // Force page reload to trigger AuthContext with new token
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);'''

if old in content:
    content = content.replace(old, new)
    print("Added logging and small delay")
else:
    print("Pattern not found")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)
