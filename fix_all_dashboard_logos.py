with open('src/pages/Dashboard.jsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Line 169 - sidebar logo (keep 100% because parent is 22px)
    # Line 284 - body logo (needs fixed size)
    
    if 'svg viewBox="0 0 40 40"' in line and "width: '100%'" in line:
        # Check if previous line has a size constraint
        if i > 0 and ("width: '22px'" in lines[i-1] or "width: '18px'" in lines[i-1]):
            # Keep as is - parent has size
            new_lines.append(line)
        else:
            # Replace with fixed size
            line = line.replace(
                'style={{ width: \'100%\', height: \'100%\' }}',
                'width="18" height="18"'
            )
            new_lines.append(line)
    else:
        new_lines.append(line)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.writelines(new_lines)

print("✅ Dashboard logos fixed!")
