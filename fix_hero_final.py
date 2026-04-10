with open('src/components/HeroSection.jsx', 'r') as f:
    lines = f.readlines()

# Find and replace the SVG section starting at line 87
new_lines = []
skip_until_svg_close = False

for i, line in enumerate(lines):
    line_num = i + 1
    
    if line_num == 87:
        # Replace with original hexagon logo
        new_lines.append('            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">\n')
        new_lines.append('                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>\n')
        new_lines.append('                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>\n')
        new_lines.append('                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>\n')
        new_lines.append('                </svg>\n')
        skip_until_svg_close = True
        continue
    
    if skip_until_svg_close:
        if '</svg>' in line:
            skip_until_svg_close = False
        continue
    
    new_lines.append(line)

with open('src/components/HeroSection.jsx', 'w') as f:
    f.writelines(new_lines)

print("✅ HeroSection logo fixed!")
