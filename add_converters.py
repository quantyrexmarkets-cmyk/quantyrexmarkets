import re

converter = """
              {Number(amount) > 0 && user?.currency && user?.currency !== 'USD' && (
                <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '4px', marginBottom: '4px' }}>
                  ≈ {formatAmountWithCode(Number(amount), user.currency)} in your currency
                </div>
              )}"""

files = [
    ('src/pages/NewTrade.jsx', 
     "placeholder='Min. $10.00'",
     "placeholder='Min. $10.00'"),
    
    ('src/pages/Withdraw.jsx',
     "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter amount' style={inputStyle} />",
     "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter amount' style={inputStyle} />"),
    
    ('src/pages/WithdrawDeposit.jsx',
     "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter",
     "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter"),
]

for filepath, find_str, _ in files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Find the input line and add converter after it
        lines = content.split('\n')
        new_lines = []
        for i, line in enumerate(lines):
            new_lines.append(line)
            if find_str[:40] in line and 'input' in line:
                # Find the end of this input tag
                if '/>' in line:
                    new_lines.append(converter)
                    print(f"✅ Added converter to {filepath} line {i+1}")
                else:
                    # Multi-line input - find closing />
                    j = i + 1
                    while j < len(lines):
                        new_lines.append(lines[j])
                        if '/>' in lines[j]:
                            new_lines.append(converter)
                            print(f"✅ Added converter to {filepath} line {j+1}")
                            # Skip these lines since we already added them
                            lines = lines[:j+1] + lines[j+1:]
                            break
                        j += 1
        
        content = '\n'.join(new_lines)
        
        # Also ensure useAuth is destructured properly
        if 'const { user }' not in content and 'useAuth' in content:
            # Find existing useAuth usage
            if "const { user," in content:
                pass  # already has user
            elif "const {" in content and "useAuth" in content:
                # Find the useAuth hook call
                content = re.sub(
                    r'const \{ ([^}]*) \} = useAuth\(\);',
                    lambda m: 'const { ' + m.group(1) + (', user' if 'user' not in m.group(1) else '') + ' } = useAuth();',
                    content
                )
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
        
    except FileNotFoundError:
        print(f"❌ Not found: {filepath}")

print("\n✅ Done!")
