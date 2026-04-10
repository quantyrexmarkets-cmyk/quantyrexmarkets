import os
import glob

# The ORIGINAL logo (keeping same size and structure, just slightly refined)
original_logo = """<path d='M20 2L4 10V22L20 38L36 22V10L20 2Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.5'/>
                <path d='M20 8L8 14V22L20 34L32 22V14L20 8Z' fill='#0d1117' stroke='#6366F1' strokeWidth='1.2'/>
                <path d='M20 14L12 18V23L20 30L28 23V18L20 14Z' fill='#6366F1' stroke='#6366F1' strokeWidth='1'/>"""

# The broken new logo patterns to find and replace
broken_patterns = [
    """<polygon points='20,4 34,11 34,27 20,34 6,27 6,11' fill='none' stroke='#6366F1' strokeWidth='1' opacity='0.5'/>
                <circle cx='20' cy='18' r='8' fill='none' stroke='#6366F1' strokeWidth='2'/>
                <line x1='25' y1='23' x2='32' y2='30' stroke='#6366F1' strokeWidth='2' strokeLinecap='round'/>
                <circle cx='32' cy='30' r='2' fill='#f59e0b'/>""",
    """<polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
                <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="2" fill="#f59e0b"/>""",
    """<polygon points="20,4 34,11 34,27 20,34 6,27 6,11" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5"/>
                {/* Q Circle */}
                <circle cx="20" cy="18" r="8" fill="none" stroke="#6366F1" strokeWidth="2"/>
                {/* Q Tail */}
                <line x1="25" y1="23" x2="32" y2="30" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
                {/* Accent dot */}
                <circle cx="32" cy="30" r="2" fill="#f59e0b"/>""",
]

# Double quote version of original
original_logo_dq = original_logo.replace("'", '"')

jsx_files = glob.glob('src/**/*.jsx', recursive=True)

for filepath in jsx_files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        
        # Replace broken patterns with original
        for pattern in broken_patterns:
            if pattern in content:
                content = content.replace(pattern, original_logo_dq)
        
        # Also fix the broken style syntax
        content = content.replace(
            "style={width: '100%', height: '100%'}",
            "style={{ width: '100%', height: '100%' }}"
        )
        content = content.replace(
            'style={width: "100%", height: "100%"}',
            'style={{ width: "100%", height: "100%" }}'
        )
        
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"✅ Restored: {filepath}")
    
    except Exception as e:
        print(f"❌ Error in {filepath}: {e}")

print("\n✅ Done restoring logos!")
