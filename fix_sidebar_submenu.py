with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Replace all submenu items with direct routes
old_sections = """const sidebarSections = [
  {
    title: 'DASHBOARD',
    items: [
      { icon: <Home size={16}/>, label: 'Dashboard', route: '/dashboard' },
      { icon: <User size={16}/>, label: 'Profile', route: '/dashboard/profile' },
      { icon: <BarChart2 size={16}/>, label: 'Live Market', badge: 'New', route: '/dashboard/live-market' },
      { icon: <Wallet size={16}/>, label: 'Stake', route: null, submenu: [
        { label: 'New Stake', route: '/dashboard/new-stake' },
        { label: 'Stake History', route: '/dashboard/stake' },
      ]},
      { icon: <Bot size={16}/>, label: 'Manage Bots', badge: 'New', route: '/dashboard/manage-bots' },
    ]
  },
  {
    title: 'INVESTMENTS',
    items: [
      { icon: <BarChart2 size={16}/>, label: 'Investment records', route: '/dashboard/investment-records' },
      { icon: <Clock size={16}/>, label: 'Transaction history', route: '/dashboard/transaction-history' },
      { icon: <Package size={16}/>, label: 'Packages', route: null, submenu: [
        { label: 'Available Packages', route: '/dashboard/packages' },
        { label: 'My Packages', route: '/dashboard/packages?tab=my' },
      ]},
      { icon: <ArrowDownCircle size={16}/>, label: 'Withdraw / Deposit', route: null, submenu: [
        { label: 'Deposit', route: '/dashboard/deposit' },
        { label: 'Withdraw', route: '/dashboard/withdraw' },
      ]},
      { icon: <TrendingUp size={16}/>, label: 'Live Trading', badge: 'New', route: '/dashboard/live-trading' },
      { icon: <Users size={16}/>, label: 'Copy Trading', badge: 'New', route: null, submenu: [
        { label: 'Browse Traders', route: '/dashboard/copy-trading' },
        { label: 'My Copy Trades', route: '/dashboard/my-copy-trades' },
      ]},
      { icon: <Lock size={16}/>, label: 'KYC', route: '/dashboard/kyc' },
      { icon: <Users size={16}/>, label: 'Refer Users', route: '/dashboard/refer-users' },
      { icon: <Bell size={16}/>, label: 'Support', route: null, external: null, action: 'smartsupp' },
      { icon: <Settings size={16}/>, label: 'Settings', route: '/dashboard/settings' },
    ]
  }
];"""

new_sections = """const sidebarSections = [
  {
    title: 'DASHBOARD',
    items: [
      { icon: <Home size={16}/>, label: 'Dashboard', route: '/dashboard' },
      { icon: <User size={16}/>, label: 'Profile', route: '/dashboard/profile' },
      { icon: <BarChart2 size={16}/>, label: 'Live Market', route: '/dashboard/live-market' },
      { icon: <Wallet size={16}/>, label: 'New Stake', route: '/dashboard/new-stake' },
      { icon: <Wallet size={16}/>, label: 'Stake History', route: '/dashboard/stake' },
      { icon: <Bot size={16}/>, label: 'Manage Bots', route: '/dashboard/manage-bots' },
    ]
  },
  {
    title: 'INVESTMENTS',
    items: [
      { icon: <BarChart2 size={16}/>, label: 'Investment Records', route: '/dashboard/investment-records' },
      { icon: <Clock size={16}/>, label: 'Transaction History', route: '/dashboard/transaction-history' },
      { icon: <Package size={16}/>, label: 'Packages', route: '/dashboard/packages' },
      { icon: <ArrowDownCircle size={16}/>, label: 'Deposit', route: '/dashboard/deposit' },
      { icon: <ArrowDownCircle size={16}/>, label: 'Withdraw', route: '/dashboard/withdraw' },
      { icon: <TrendingUp size={16}/>, label: 'Live Trading', route: '/dashboard/live-trading' },
      { icon: <Users size={16}/>, label: 'Copy Trading', route: '/dashboard/copy-trading' },
      { icon: <Users size={16}/>, label: 'My Copy Trades', route: '/dashboard/my-copy-trades' },
      { icon: <Lock size={16}/>, label: 'KYC', route: '/dashboard/kyc' },
      { icon: <Users size={16}/>, label: 'Refer Users', route: '/dashboard/refer-users' },
      { icon: <Bell size={16}/>, label: 'Support', route: null, action: 'smartsupp' },
      { icon: <Settings size={16}/>, label: 'Settings', route: '/dashboard/settings' },
    ]
  }
];"""

if old_sections in content:
    content = content.replace(old_sections, new_sections)
    print("✅ Removed all submenus - direct links!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
