import os
import glob

# Find all JSX files
jsx_files = glob.glob('src/**/*.jsx', recursive=True)

fixed_files = []

for filepath in jsx_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Fix broken style props
        content = content.replace(
            "style={width: '100%', height: '100%'}",
            "style={{ width: '100%', height: '100%' }}"
        )
        
        content = content.replace(
            'style={width: "100%", height: "100%"}',
            'style={{ width: "100%", height: "100%" }}'
        )
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            fixed_files.append(filepath)
            print(f"✅ Fixed: {filepath}")
    
    except Exception as e:
        print(f"❌ Error in {filepath}: {e}")

if fixed_files:
    print(f"\n✅ Fixed {len(fixed_files)} files")
else:
    print("\n⚠️ No files needed fixing")
