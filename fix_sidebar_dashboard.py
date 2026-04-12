with open('src/components/DashboardSidebar.jsx', 'r') as f:
    content = f.read()

# Add Home import to lucide-react
old_import = "import { User, BarChart2, Wallet, Bot, TrendingUp, Clock, ArrowDownCircle, Package, Lock, Users, ChevronRight, Globe, X, Download, Bell, Settings } from 'lucide-react';"
new_import = "import { User, BarChart2, Wallet, Bot, TrendingUp, Clock, ArrowDownCircle, Package, Lock, Users, ChevronRight, Globe, X, Download, Bell, Settings, Home } from 'lucide-react';"

content = content.replace(old_import, new_import)

# Add Dashboard item at the top of DASHBOARD section
old_items = """    items: [
      { icon: <User size={16}/>, label: 'Profile', route: '/dashboard/profile' },"""

new_items = """    items: [
      { icon: <Home size={16}/>, label: 'Dashboard', route: '/dashboard' },
      { icon: <User size={16}/>, label: 'Profile', route: '/dashboard/profile' },"""

if old_items in content:
    content = content.replace(old_items, new_items)
    print("✅ Dashboard item added!")
else:
    print("❌ Pattern not found")

with open('src/components/DashboardSidebar.jsx', 'w') as f:
    f.write(content)
