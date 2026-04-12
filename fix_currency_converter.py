import os

# Files that need formatAmountWithCode import added
files_need_import = {
    'src/pages/NewTrade.jsx': "import { formatAmount",
    'src/pages/Withdraw.jsx': "import { formatAmount",
    'src/pages/WithdrawNew.jsx': None,
    'src/pages/WithdrawDeposit.jsx': "import { formatAmount",
    'src/pages/Packages.jsx': "import { formatAmount",
    'src/pages/DepositFunds.jsx': None,
    'src/pages/Deposit.jsx': "import { formatAmount",
    'src/pages/TraderDetails.jsx': None,
    'src/pages/TraderProfile.jsx': None,
}

for filepath, old_import in files_need_import.items():
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # Add formatAmountWithCode to import
        if 'formatAmountWithCode' not in content:
            if old_import and old_import in content:
                content = content.replace(
                    old_import,
                    old_import.replace('import { formatAmount', 'import { formatAmountWithCode, formatAmount')
                )
                print(f"✅ Added formatAmountWithCode import to {filepath}")
            else:
                # Add new import
                first_import = content.find('import ')
                end_of_first = content.find('\n', first_import)
                content = content[:end_of_first+1] + "import { formatAmountWithCode } from '../utils/currency';\n" + content[end_of_first+1:]
                print(f"✅ Added new import to {filepath}")

        # Add useAuth if missing
        if 'useAuth' not in content:
            first_import = content.find('import ')
            end_of_first = content.find('\n', first_import)
            content = content[:end_of_first+1] + "import { useAuth } from '../context/AuthContext';\n" + content[end_of_first+1:]
            print(f"✅ Added useAuth import to {filepath}")

        with open(filepath, 'w') as f:
            f.write(content)

    except FileNotFoundError:
        print(f"❌ Not found: {filepath}")

print("\n✅ Imports fixed!")
