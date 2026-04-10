with open('src/components/HeroSection.jsx', 'r') as f:
    content = f.read()

# The proper original hexagon logo
old_broken = '''<svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                      {/* Hexagon border */}
                      <polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
                      {/* Q Circle */}
                      <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
                      {/* Q Tail */}
                      <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                      {/* Accent dot */}
                      <circle cx="32" cy="30" r="2" fill="#f59e0b"/>
                </svg>'''

original_logo = '''<svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
                </svg>'''

content = content.replace(old_broken, original_logo)

with open('src/components/HeroSection.jsx', 'w') as f:
    f.write(content)

print("✅ HeroSection logo restored")
