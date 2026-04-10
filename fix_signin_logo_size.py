with open('src/components/SignIn.jsx', 'r') as f:
    content = f.read()

# Fix the SignIn logo - change from 100% to fixed size like SignUp
old_signin = '''<svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                </svg>'''

new_signin = '''<svg viewBox="0 0 40 40" fill="none" width="40" height="40" style={{ margin: '0 auto 10px' }}>
                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                </svg>'''

content = content.replace(old_signin, new_signin)

with open('src/components/SignIn.jsx', 'w') as f:
    f.write(content)

print("✅ SignIn logo size fixed!")
