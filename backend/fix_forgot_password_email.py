with open('routes/auth.js', 'r') as f:
    content = f.read()

old = '''      await sendEmail({
        to: user.email,
        name: user.firstName || user.email,
        subject: 'Reset your password',
        resetUrl,
      });'''

new = '''      await sendEmail({
        to: user.email,
        type: 'passwordReset',
        name: user.firstName || user.email,
        subject: 'Reset Your Password — Quantyrex Markets',
        resetUrl,
      });'''

if old in content:
    content = content.replace(old, new)
    print("✅ Fixed forgot password email type!")
else:
    print("❌ Pattern not found")

with open('routes/auth.js', 'w') as f:
    f.write(content)
