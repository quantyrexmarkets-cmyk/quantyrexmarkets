with open('src/pages/Dashboard.jsx', 'r') as f:
    content = f.read()

# Fix inner card for black theme
old = "background: t.bg === '#f8fafc' ? '#f1f5f9' : 'rgba(0,0,0,0.3)'"
new = "background: t.bg === '#f8fafc' ? '#f1f5f9' : t.bg === '#111111' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'"

content = content.replace(old, new)

# Fix welcome card outer for black theme
old2 = "background: t.bg === '#f8fafc' ? '#ffffff' : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)'"
new2 = "background: t.bg === '#f8fafc' ? '#ffffff' : t.bg === '#111111' ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0.9) 50%, rgba(99,102,241,0.1) 100%)' : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(99,102,241,0.1) 100%)'"

content = content.replace(old2, new2)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.write(content)

print("✅ Black theme card fixed!")
