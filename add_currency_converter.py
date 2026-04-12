import re

# The currency converter snippet to add after amount input
def get_converter(currency_var='user?.currency', amount_var='amount'):
    return f"""
              {{Number({amount_var}) > 0 && {currency_var} && {currency_var} !== 'USD' && (
                <div style={{{{ fontSize: '9px', color: '#f59e0b', marginTop: '4px', marginBottom: '4px' }}}}>
                  ≈ {{formatAmountWithCode(Number({amount_var}), {currency_var})}} in your currency
                </div>
              )}}"""

# Fix each file
files = {
    'src/pages/NewTrade.jsx': {
        'old': "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Min. $10.00'",
        'after_tag': True
    },
    'src/pages/Withdraw.jsx': {
        'old': "<input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter amount' style={inputStyle} />",
        'after_tag': True
    },
}

# Check imports first
for filepath in [
    'src/pages/NewTrade.jsx',
    'src/pages/Withdraw.jsx',
    'src/pages/WithdrawNew.jsx',
    'src/pages/WithdrawDeposit.jsx',
    'src/pages/Packages.jsx',
    'src/pages/DepositFunds.jsx',
    'src/pages/Deposit.jsx',
    'src/pages/TraderDetails.jsx',
    'src/pages/TraderProfile.jsx',
]:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Check if formatAmountWithCode is imported
        has_format = 'formatAmountWithCode' in content
        has_format_amount = 'formatAmount' in content
        
        print(f"{filepath}:")
        print(f"  formatAmountWithCode: {has_format}")
        print(f"  formatAmount: {has_format_amount}")
        print(f"  has useAuth: {'useAuth' in content}")
        print()
    except FileNotFoundError:
        print(f"  NOT FOUND: {filepath}")
