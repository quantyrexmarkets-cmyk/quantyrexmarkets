with open('src/pages/Dashboard.jsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i, line in enumerate(lines):
    # Start skipping at the navItems.map that's leftover
    if 'navItems.map((item, i) => (' in line and i < 170:
        skip = True
    
    # Stop skipping after the closing </div>
    if skip and '</div>' in line and i > 165:
        skip = False
        continue
    
    if not skip:
        new_lines.append(line)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.writelines(new_lines)

print("✅ Fixed!")
