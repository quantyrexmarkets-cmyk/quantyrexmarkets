import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { User, BarChart2, Wallet, Bot, TrendingUp, Clock, ArrowDownCircle, Package, Lock, Users, ChevronRight, Globe, X, Download, Bell, Settings, Home } from 'lucide-react';

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
];

export default function DashboardSidebar({ open, onClose }) {
  const location = useLocation();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const { notifications, unread, markAllRead } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();

  useEffect(() => {
    const handle = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const typeColor = (type) => ({ deposit: '#22c55e', withdrawal: '#f59e0b', profit: '#6366f1', referral: '#ec4899', kyc: '#22d3ee', system: '#9ca3af' })[type] || '#9ca3af';
  const timeAgo = (date) => { const d = Math.floor((Date.now() - new Date(date))/1000); if(d<60) return d+'s ago'; if(d<3600) return Math.floor(d/60)+'m ago'; if(d<86400) return Math.floor(d/3600)+'h ago'; return Math.floor(d/86400)+'d ago'; };

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 1099 }} />}
      <div style={{
        position: 'fixed', top: 0, left: open ? '0' : '-220px', height: '100vh', width: '210px', background: t.sidebarBg,
        background: t.bg, zIndex: 1100, transition: 'left 0.3s ease',
        display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.sidebarBorder}`, overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ padding: '12px 16px', minHeight: '41px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => { navigate('/dashboard/profile'); onClose(); }}>
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
              <span style={{ color: t.text, fontSize: '15px', fontWeight: '300', letterSpacing: '0.5px', fontFamily: "'Montserrat', Arial, sans-serif" }}>{user?.firstName || ''} {user?.lastName || ''}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444' }}></div>
                <span style={{ color: user?.kycStatus === 'approved' ? '#22c55e' : '#ef4444', fontSize: '9px', fontWeight: '500' }}>
                  {user?.kycStatus === 'approved' ? 'KYC Verified' : 'KYC Not Verified'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer' }}>
            <X size={14}/>
          </button>
        </div>

        {/* Menu */}
        <div style={{ padding: '12px 0', flex: 1 }}>
          {sidebarSections.map((section, si) => (
            <div key={si} style={{ marginBottom: '16px' }}>
              <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em', padding: '0 16px', marginBottom: '8px', marginTop: '8px' }}>{section.title}</div>
              {section.items.map((item, ii) => (
                <div key={ii} style={{ padding: '2px 8px' }}>
                  <div style={{
                    borderRadius: '8px',
                    background: location.pathname === item.route
                      ? t.bg === '#f8fafc'
                        ? 'rgba(99,102,241,0.1)'
                        : 'rgba(99,102,241,0.15)'
                      : 'transparent',
                    backdropFilter: location.pathname === item.route ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: location.pathname === item.route ? 'blur(12px)' : 'none',
                    border: location.pathname === item.route
                      ? t.bg === '#f8fafc'
                        ? '1px solid rgba(99,102,241,0.4)'
                        : '1px solid rgba(99,102,241,0.3)'
                      : `1px solid transparent`,
                    boxShadow: location.pathname === item.route
                      ? t.bg === '#f8fafc'
                        ? '0 2px 8px rgba(99,102,241,0.15)'
                        : '0 4px 16px rgba(99,102,241,0.15), inset 0 1px 0 rgba(99,102,241,0.05)'
                      : 'none',
                  }}>
                  <button onClick={() => {
                    if (item.action === 'smartsupp') { if(window.smartsupp) window.smartsupp('chat:open'); onClose(); }
                    else if (item.external) { window.open(item.external, '_blank'); onClose(); }
                    else if (item.submenu) {
                      setOpenSubmenu(openSubmenu === si+'-'+ii ? null : si+'-'+ii);
                    } else {
                      navigate(item.route); onClose();
                    }
                  }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: location.pathname === item.route ? '#6366f1' : t.text, fontSize: '11px', fontWeight: location.pathname === item.route ? '600' : '400', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#6366f1' }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {item.badge && <span style={{ background: '#ef4444', color: t.text, fontSize: '8px', padding: '2px 5px', borderRadius: '2px', fontWeight: '700' }}>{item.badge}</span>}
                      <ChevronRight size={10} color={t.mutedText} style={{ transform: openSubmenu === si+'-'+ii ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}/>
                    </div>
                  </button>
                  {item.submenu && openSubmenu === si+'-'+ii && (
                    <div style={{ background: t.bg === '#f8fafc' ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.08)', paddingLeft: '38px', borderLeft: '2px solid #6366f1', marginLeft: '16px' }}>
                      {item.submenu.map((sub, si2) => (
                        <button key={si2} onClick={() => { navigate(sub.route); onClose(); }}
                          style={{ width: '100%', padding: '12px 16px 12px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: t.text, fontSize: '11px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                          <span style={{ color: '#6366f1', fontSize: '12px' }}>›</span> {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Language */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${t.subtleBorder}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
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
              {unread > 0 && <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '8px', cursor: 'pointer' }}>Mark all read</button>}
              <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', color: t.subText, fontSize: '16px', cursor: 'pointer' }}>×</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: t.faintText, fontSize: '9px' }}>No notifications yet</div>
            ) : notifications.map((n, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${t.tableRowBorder}`, background: n.read ? 'transparent' : 'rgba(99,102,241,0.06)', display: 'flex', gap: '10px' }}>
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
