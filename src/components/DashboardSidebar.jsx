import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { User, BarChart2, Wallet, Bot, TrendingUp, Clock, ArrowDownCircle, Package, Lock, Users, ChevronRight, Globe, X, Download, Bell, Settings, Home, Crown } from 'lucide-react';

function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const fetch_ = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json());
      if (res.notifications) { setNotifications(res.notifications); setUnread(res.unread); }
    } catch {}
  };

  useEffect(() => { fetch_(); const t = setInterval(fetch_, 30000); return () => clearInterval(t); }, []);

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('https://quantyrexmarkets-api.vercel.app/api/notifications/read-all', {
        method: 'PUT', headers: { Authorization: `Bearer ${token}` }
      });
      setUnread(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch {}
  };

  return { notifications, unread, markAllRead };
}

const sidebarSections = [
  {
    title: 'DASHBOARD',
    items: [
      { icon: <Home size={13}/>, label: 'Dashboard', route: '/dashboard' },
      { icon: <User size={13}/>, label: 'Profile', route: '/dashboard/profile' },
      { icon: <BarChart2 size={13}/>, label: 'Live Market', badge: 'New', route: '/dashboard/live-market' },
      { icon: <Wallet size={13}/>, label: 'Stake', route: null, submenu: [
        { label: 'New Stake', route: '/dashboard/new-stake' },
        { label: 'Stake History', route: '/dashboard/stake' },
      ]},
      { icon: <Bot size={13}/>, label: 'Manage Bots', badge: 'New', route: '/dashboard/manage-bots' },
    ]
  },
  {
    title: 'INVESTMENTS',
    items: [
      { icon: <BarChart2 size={13}/>, label: 'Investment records', route: '/dashboard/investment-records' },
      { icon: <Clock size={13}/>, label: 'Transaction history', route: '/dashboard/transaction-history' },
      { icon: <Package size={13}/>, label: 'Packages', route: null, submenu: [
        { label: 'Available Packages', route: '/dashboard/packages' },
        { label: 'My Packages', route: '/dashboard/packages?tab=my' },
      ]},
      { icon: <ArrowDownCircle size={13}/>, label: 'Withdraw / Deposit', route: null, submenu: [
        { label: 'Deposit', route: '/dashboard/deposit' },
        { label: 'Withdraw', route: '/dashboard/withdraw' },
      ]},
      { icon: <TrendingUp size={13}/>, label: 'Live Trading', badge: 'New', route: '/dashboard/live-trading' },
      { icon: <Users size={13}/>, label: 'Copy Trading', badge: 'New', route: null, submenu: [
        { label: 'Browse Traders', route: '/dashboard/copy-trading' },
        { label: 'My Copy Trades', route: '/dashboard/my-copy-trades' },
      ]},
      
      { icon: <Crown size={13}/>, label: 'Upgrade to Pro', badge: 'Pro', route: '/dashboard/subscription' },
      { icon: <Lock size={13}/>, label: 'KYC', route: '/dashboard/kyc' },
      { icon: <Users size={13}/>, label: 'Refer Users', route: '/dashboard/refer-users' },
      { icon: <Bell size={13}/>, label: 'Support', route: null, external: null, action: 'smartsupp' },
      { icon: <Settings size={13}/>, label: 'Settings', route: '/dashboard/settings' },
    ]
  }
];

export default function DashboardSidebar({ open, onClose }) {
  const location = useLocation();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Related routes - pages that should highlight a sidebar item
  const relatedRoutes = {
    '/dashboard/live-trading': '/dashboard/live-trading',
    '/dashboard/new-trade': '/dashboard/live-trading',
    '/dashboard/bot-transactions': '/dashboard/manage-bots',
    '/dashboard/bot-plans': '/dashboard/manage-bots',
    '/dashboard/deposit-funds': '/dashboard/deposit',
    '/dashboard/withdraw/new': '/dashboard/withdraw',
    '/dashboard/withdraw/verify-code': '/dashboard/withdraw',
    '/dashboard/trader': '/dashboard/copy-trading',
    '/dashboard/copy-trading/setup': '/dashboard/copy-trading',
    '/dashboard/withdraw-deposit': '/dashboard/deposit',
  };

  // Get the effective path (handles related routes)
  const effectivePath = relatedRoutes[location.pathname] || 
    Object.entries(relatedRoutes).find(([k]) => location.pathname.startsWith(k))?.[1] ||
    location.pathname;

  // Check if item is active
  // Parents with submenus are NEVER highlighted - only the actual sub-item gets highlighted
  const isActive = (item) => {
    if (item.submenu) return false;
    if (item.route && (effectivePath === item.route || location.pathname === item.route)) return true;
    return false;
  };

  // Check if specific submenu child is active
  const isSubActive = (sub) => {
    if (!sub.route) return false;
    const subPath = sub.route.split('?')[0];
    const subQuery = sub.route.includes('?') ? '?' + sub.route.split('?')[1] : '';
    
    // Route has query params (e.g. /dashboard/packages?tab=my)
    if (subQuery) {
      return (location.pathname === subPath || effectivePath === subPath) && location.search === subQuery;
    }
    
    // Route has no query params (e.g. /dashboard/packages)
    // Only match if there's no query string OR query doesn't belong to another sub
    return (location.pathname === sub.route || effectivePath === sub.route) && !location.search;
  };

  const { notifications, unread, markAllRead } = useNotifications();

  // Auto-open submenu if current path (or related route) matches a child
  useEffect(() => {
    let found = null;
    sidebarSections.forEach((section, si) => {
      section.items.forEach((item, ii) => {
        if (item.submenu && item.submenu.some(sub => {
          const subPath = sub.route?.split('?')[0];
          return location.pathname === subPath ||
                 effectivePath === subPath ||
                 location.pathname + location.search === sub.route;
        })) {
          found = si+'-'+ii;
        }
      });
    });
    if (found) setOpenSubmenu(found);
  }, [location.pathname, location.search, effectivePath]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();

  useEffect(() => {
    const handle = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const typeColor = (type) => ({ deposit: '#22c55e', withdrawal: '#f59e0b', profit: '#6366f1', referral: '#ec4899', kyc: '#22d3ee', system: '#9ca3af' })[type] || '#9ca3af';
  const timeAgo = (date) => { const d = Math.floor((Date.now() - new Date(date))/1000); if(d<60) return d+'s ago'; if(d<3600) return Math.floor(d/60)+'m ago'; if(d<86400) return Math.floor(d/3600)+'h ago'; return Math.floor(d/86400)+'d ago'; };

  if (!open) return null;

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1099 }} />}
      <div style={{
          position: 'fixed', top: 0, left: open ? '0' : '-220px', height: '100vh', width: '210px', background: t.sidebarBg || t.cardBg, zIndex: 1100, transition: 'left 0.3s ease',
        display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.sidebarBorder}`, overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ padding: '16px 16px 12px', minHeight: '55px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', borderBottom: `1px solid ${t.subtleBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard/profile'); onClose(); }}>
            {/* Logo */}
            <div style={{ width: '45px', height: '45px', flexShrink: 0 }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: '100%', height: '100%' }}>
                <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"/>
                <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"/>
                <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
              </svg>
            </div>
            {/* User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
              <span style={{ color: t.text, fontSize: '15px', fontWeight: '300', letterSpacing: '0.5px', fontFamily: 'inherit' }}>{user?.firstName || ''} {user?.lastName || ''}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444' }}></div>
                <span style={{ color: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '500' }}>
                  {user?.kycStatus === 'approved' ? 'KYC Verified' : 'KYC Not Verified'}
                </span>
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer' }}>
            <X size={14}/>
          </button>
        </div>

        {/* Menu */}
        <div style={{ padding: '8px 0 20px', flex: 1 }}>
          {sidebarSections.map((section, si) => (
            <div key={si} style={{ marginBottom: '16px' }}>
              <div style={{ color: t.subText, fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', padding: '0 18px', marginBottom: '10px', marginTop: '14px', textTransform: 'uppercase' }}>{section.title}</div>
              {section.items.map((item, ii) => (
                <div key={ii} style={{ padding: 0 }}>
                  <div style={{
                    background: isActive(item) && openSubmenu !== si+'-'+ii
                      ? t.bg === '#e6e6e6'
                        ? 'rgba(99,102,241,0.08)'
                        : 'rgba(99,102,241,0.1)'
                      : 'transparent',
                    borderLeft: isActive(item) && openSubmenu !== si+'-'+ii
                      ? '3px solid #6366f1'
                      : '3px solid transparent',
                  }}>
                  <button type="button" onClick={() => {
                    if (item.action === 'smartsupp') { if(window.smartsupp) window.smartsupp('chat:open'); onClose(); }
                    else if (item.external) { window.open(item.external, '_blank'); onClose(); }
                    else if (item.submenu) {
                      setOpenSubmenu(openSubmenu === si+'-'+ii ? null : si+'-'+ii);
                    } else {
                      navigate(item.route); onClose();
                    }
                  }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: 'transparent', border: 'none', cursor: 'pointer', color: isActive(item) && openSubmenu !== si+'-'+ii ? '#6366f1' : t.text, fontSize: '13px', fontWeight: isActive(item) && openSubmenu !== si+'-'+ii ? '600' : '500', textAlign: 'left', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#6366f1' }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {item.badge && <span style={{ background: '#ef4444', color: '#fff', fontSize: '9px', padding: '2px 7px', borderRadius: '10px', fontWeight: '700', letterSpacing: '0.04em' }}>{item.badge}</span>}
                      <ChevronRight size={10} color={t.mutedText} style={{ transform: openSubmenu === si+'-'+ii ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}/>
                    </div>
                  </button>
                {item.submenu && openSubmenu === si+'-'+ii && (
                  <div style={{ paddingLeft: '8px', paddingRight: '8px', marginTop: '2px', marginBottom: '2px' }}>
                    {item.submenu.map((sub, si2) => {
                      const subActive = isSubActive(sub) && openSubmenu === si+'-'+ii;
                      return (
                        <button type="button" key={si2} onClick={() => { navigate(sub.route); onClose(); }}
                          style={{
                            width: '100%', padding: '10px 18px', marginBottom: '2px', fontSize: '12px',
                            background: subActive
                              ? t.bg === '#e6e6e6' ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.18)'
                              : 'transparent',
                            border: subActive ? '1px solid rgba(99,102,241,0.35)' : '1px solid transparent',
                            borderRadius: '8px',
                            boxShadow: subActive
                              ? t.bg === '#e6e6e6' ? '0 2px 8px rgba(99,102,241,0.12)' : '0 4px 12px rgba(99,102,241,0.2)'
                              : 'none',
                            cursor: 'pointer',
                            color: subActive ? '#6366f1' : t.subText,
                            fontSize: '11px', fontWeight: subActive ? '600' : '400',
                            textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.15s ease',
                          }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: subActive ? '#6366f1' : t.subText, flexShrink: 0 }}/>
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Language */}
        <div style={{ padding: '12px 18px', borderTop: `1px solid ${t.subtleBorder}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={11} color={t.mutedText}/>
          <span style={{ color: t.subText, fontSize: '8px' }}>EN ^</span>
        </div>
      </div>
      {/* Notification Panel */}
      {notifOpen && (
        <div ref={notifRef} style={{ position: 'fixed', top: 0, left: '240px', width: '280px', height: '100vh', background: t.cardBg, borderRight: `1px solid ${t.border}`, zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: t.text, fontSize: '13px', fontWeight: '700' }}>Notifications</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {unread > 0 && <button type="button" onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '8px', cursor: 'pointer' }}>Mark all read</button>}
              <button type="button" onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', color: t.subText, fontSize: '16px', cursor: 'pointer' }}>×</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No notifications yet</div>
            ) : notifications.map((n, i) => (
              <div key={i} style={{ padding: '7px 14px', borderBottom: `1px solid ${t.tableRowBorder}`, background: n.read ? 'transparent' : 'rgba(99,102,241,0.06)', display: 'flex', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: typeColor(n.type), marginTop: '4px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: t.text, fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>{n.title}</div>
                  <div style={{ color: t.subText, fontSize: '11px', lineHeight: '1.4' }}>{n.message}</div>
                  <div style={{ color: t.faintText, fontSize: '7px', marginTop: '4px' }}>{timeAgo(n.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
