with open('src/context/AuthContext.jsx', 'r') as f:
    content = f.read()

# Fix the getMe call to handle errors properly
old_getme = '''getMe().then(data => {
            if (data && data._id) {
              setUser(data);'''

new_getme = '''getMe().then(data => {
            console.log('getMe response:', data);
            if (data && data._id) {
              setUser(data);'''

if old_getme in content:
    content = content.replace(old_getme, new_getme)
    print("Added console.log to getMe")

# Also fix the catch block
old_catch = ''').catch(err => {
              console.log('getMe error:', err);
            }).finally(() => setLoading(false));'''

new_catch = ''').catch(err => {
              console.log('getMe error:', err);
              localStorage.removeItem('token');
              setUser(null);
            }).finally(() => setLoading(false));'''

if old_catch in content:
    content = content.replace(old_catch, new_catch)
    print("Fixed error handling")

with open('src/context/AuthContext.jsx', 'w') as f:
    f.write(content)

print("AuthContext fixed!")
