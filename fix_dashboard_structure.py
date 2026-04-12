with open('src/pages/Dashboard.jsx', 'r') as f:
    lines = f.readlines()

# Find the problem area and check structure
for i, line in enumerate(lines):
    if '{/* Main Content */}' in line:
        print(f"Line {i+1}: {line.rstrip()}")
        # Show 5 lines before
        for j in range(max(0, i-5), i):
            print(f"Line {j+1}: {lines[j].rstrip()}")
        # Show 5 lines after
        for j in range(i, min(len(lines), i+5)):
            print(f"Line {j+1}: {lines[j].rstrip()}")
        break
