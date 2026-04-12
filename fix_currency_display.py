import os

# Map of file -> (amount_var, where to add converter, old_pattern)
files_to_fix = {
    'src/pages/NewTrade.jsx': {
        'amount': 'amount',
        'old': "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Min. $10.00'",
        'close_tag': '/>'
    },
    'src/pages/Withdraw.jsx': {
        'amount': 'amount',
        'old': "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter amount' style={inputStyle} />",
        'close_tag': None
    },
    'src/pages/WithdrawDeposit.jsx': {
        'amount': 'amount',
        'old': None
    },
    'src/pages/Packages.jsx': {
        'amount': 'amount',
        'old': None
    },
}

converter = """
              {{Number({amount}) > 0 && user?.currency && user?.currency !== 'USD' && (
                <div style={{{{ fontSize: '9px', color: '#f59e0b', marginTop: '4px', marginBottom: '4px' }}}}>
                  ≈ {{formatAmountWithCode(Number({amount}), user.currency)}} in your currency
                </div>
              )}}"""

# Check what the amount input looks like in each file
for filepath in files_to_fix:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Find amount input
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'value={amount}' in line and 'input' in line:
                print(f"\n{filepath} line {i+1}:")
                print(line[:100])
                break
    except FileNotFoundError:
        print(f"Not found: {filepath}")

