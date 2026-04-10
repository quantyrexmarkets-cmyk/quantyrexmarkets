with open('src/pages/Dashboard.jsx', 'r') as f:
    lines = f.readlines()

# Find the line with stats.map and add safety check
output = []
for i, line in enumerate(lines):
    if '{stats.map((s, i) => (' in line and 'Array.isArray' not in line:
        # Add safety check
        indent = len(line) - len(line.lstrip())
        output.append(' ' * indent + '{Array.isArray(stats) && stats.map((s, i) => (\n')
        print(f"Added safety check at line {i+1}")
    else:
        output.append(line)

with open('src/pages/Dashboard.jsx', 'w') as f:
    f.writelines(output)

print("Safety check added!")
