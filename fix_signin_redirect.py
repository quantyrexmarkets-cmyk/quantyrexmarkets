with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Find the login success block and simplify it
old_success = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        // Single redirect after 1 second
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);'''

new_success = '''if (res.token) {
        localStorage.setItem('token', res.token);
        login(res.token, res.user);
        setSuccess(true);
        // Force immediate redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);'''

if old_success in content:
    content = content.replace(old_success, new_success)
    print("Fixed SignIn redirect to use window.location.href")

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)

print("SignIn fixed!")
