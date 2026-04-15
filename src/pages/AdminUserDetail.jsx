import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, TrendingUp, Package, Users, Shield, Clock } from 'lucide-react';

const BASE_URL = 'https://quantyrexmarkets-api.vercel.app/api';
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });
const api = (path, method = 'GET', body) => fetch(`${BASE_URL}/admin${path}`, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined }).then(r => r.json());

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bots, setBots] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [msg, setMsg] = useState('');

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  useEffect(() => {
    Promise.all([
      api(`/users/${id}`),
      api(`/users/${id}/bots`),
      api(`/users/${id}/investments`),
    ]).then(([u, b, inv]) => {
      setUser(u);
      setBots(Array.isArray(b) ? b : []);
      setInvestments(Array.isArray(inv) ? inv : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const toggleBlock = async () => {
    const res = await api(`/users/${id}/block`, 'PUT');
    setUser(res.user || { ...user, isBlocked: !user.isBlocked });
    showMsg(res.message || 'Updated');
  };

  const toggleUpgrade = async () => {
    const res = await api(`/users/${id}/upgrade`, 'PUT');
    setUser(prev => ({ ...prev, accountUpgraded: !prev.accountUpgraded }));
    showMsg('Account upgrade toggled');
  };

  const updateBalance = async (val) => {
    const res = await api(`/users/${id}/balance`, 'PUT', { balance: parseFloat(val) });
    if (res.user) setUser(res.user);
    showMsg('Balance updated');
  };

  const deleteUserAct = async () => {
    if (!window.confirm('DELETE this user permanently?')) return;
    await api(`/users/${id}`, 'DELETE');
    navigate('/admin');
  };

  if (loading) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', color:t.subText }}>Loading...</div>;
  if (!user) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', color:t.subText }}>User not found</div>;

  const tabs = ['overview','activity','bots','investments','fees'];

  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Montserrat', 'Segoe UI', sans-serif", color:t.text }}>
      {/* Header */}
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'14px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}>
          <ArrowLeft size={16}/> Back to Admin
        </button>
        <div style={{ width:'1px', height:'20px', background:t.border }}/>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', color:'white', fontWeight:'700', overflow:'hidden' }}>
            {user.avatar ? <img src={user.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : `${user.firstName?.[0]||''}${user.lastName?.[0]||''}`}
          </div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'700', color:t.text }}>{user.firstName} {user.lastName}</div>
            <div style={{ fontSize:'10px', color:t.subText }}>{user.email}</div>
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
          {msg && <span style={{ color:'#22c55e', fontSize:'10px', fontWeight:'600' }}>{msg}</span>}
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'700', background:'transparent', color:user.isBlocked?'#ef4444':'#22c55e', border:`1px solid ${user.isBlocked?'#ef4444':'#22c55e'}` }}>{user.isBlocked?'● Suspended':'● Active'}</span>
        </div>
      </div>

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'20px 16px' }}>

        {/* Stats Row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px' }}>
          {[
            { label:'Balance', value:`$${parseFloat(user.balance||0).toLocaleString('en-US',{minimumFractionDigits:2})}`, icon:<DollarSign size={16} color="#6366f1"/>, color:'#6366f1' },
            { label:'Total Deposits', value:`$${parseFloat(user.totalDeposits||0).toLocaleString()}`, icon:<TrendingUp size={16} color="#22c55e"/>, color:'#22c55e' },
            { label:'Total Withdrawals', value:`$${parseFloat(user.totalWithdrawals||0).toLocaleString()}`, icon:<ArrowUpCircle size={16} color="#f59e0b"/>, color:'#f59e0b' },
            { label:'Total Profit', value:`$${parseFloat(user.totalProfit||0).toLocaleString()}`, icon:<Package size={16} color="#ec4899"/>, color:'#ec4899' },
          ].map((s,i) => (
            <div key={i} style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                <span style={{ color:t.subText, fontSize:'10px' }}>{s.label}</span>
                {s.icon}
              </div>
              <div style={{ color:s.color, fontSize:'18px', fontWeight:'800', letterSpacing:'-0.02em' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* User Info + Actions */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
          {/* Info */}
          <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px' }}>
            <div style={{ color:t.text, fontSize:'12px', fontWeight:'700', marginBottom:'12px' }}>Account Info</div>
            {[
              ['Email', user.email],
              ['Phone', user.phone || '—'],
              ['Country', user.country || '—'],
              ['Currency', user.currency || '—'],
              ['KYC Status', user.kycStatus || 'none'],
              ['Plan', user.currentPlan !== 'none' ? user.currentPlan : 'None'],
              ['Min Withdrawal', `$${user.minimumWithdrawal || 100}`],
              ['Joined', new Date(user.createdAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${t.tableRowBorder}` }}>
                <span style={{ color:t.subText, fontSize:'10px' }}>{label}</span>
                <span style={{ color:t.text, fontSize:'10px', fontWeight:'600' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px' }}>
            <div style={{ color:t.text, fontSize:'12px', fontWeight:'700', marginBottom:'12px' }}>Quick Actions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {/* Edit Balance */}
              <div>
                <div style={{ color:t.subText, fontSize:'10px', marginBottom:'4px' }}>Set Balance</div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <input id="balInput" defaultValue={user.balance?.toFixed(2)} style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'7px 10px', outline:'none', borderRadius:'6px' }}/>
                  <button onClick={() => updateBalance(document.getElementById('balInput').value)} style={{ padding:'7px 14px', background:'#6366f1', border:'none', color:'white', fontSize:'10px', fontWeight:'700', cursor:'pointer', borderRadius:'6px' }}>Set</button>
                </div>
              </div>
              <div style={{ height:'1px', background:t.border }}/>
              <button onClick={toggleBlock} style={{ padding:'9px', background:user.isBlocked?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)', border:`1px solid ${user.isBlocked?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'}`, color:user.isBlocked?'#22c55e':'#ef4444', fontSize:'11px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                {user.isBlocked?<><Unlock size={13}/> Unblock Account</>:<><Lock size={13}/> Block Account</>}
              </button>
              <button onClick={toggleUpgrade} style={{ padding:'9px', background:user.accountUpgraded?'rgba(239,68,68,0.1)':'rgba(34,197,94,0.1)', border:`1px solid ${user.accountUpgraded?'rgba(239,68,68,0.3)':'rgba(34,197,94,0.3)'}`, color:user.accountUpgraded?'#ef4444':'#22c55e', fontSize:'11px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                {user.accountUpgraded?<><RotateCcw size={13}/> Revoke Upgrade</>:<><ArrowUpCircle size={13}/> Approve Upgrade</>}
              </button>
              <button onClick={deleteUserAct} style={{ padding:'9px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#ef4444', fontSize:'11px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                <Trash2 size={13}/> Delete User
              </button>
            </div>
          </div>
        </div>

        {/* Bots */}
        {bots.length > 0 && (
          <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px', marginBottom:'12px' }}>
            <div style={{ color:t.text, fontSize:'12px', fontWeight:'700', marginBottom:'12px' }}>Bot Subscriptions ({bots.length})</div>
            {bots.map((b,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${t.tableRowBorder}` }}>
                <div>
                  <div style={{ color:t.text, fontSize:'11px', fontWeight:'600' }}>{b.botName}</div>
                  <div style={{ color:t.subText, fontSize:'9px' }}>${b.amount} · {new Date(b.createdAt).toLocaleDateString()}</div>
                </div>
                <span style={{ padding:'3px 8px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', background:b.status==='active'?'#f0fdf4':'#f8fafc', color:b.status==='active'?'#15803d':'#64748b', border:b.status==='active'?'1px solid #bbf7d0':'1px solid #e2e8f0' }}>{b.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Investments */}
        {investments.length > 0 && (
          <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px' }}>
            <div style={{ color:t.text, fontSize:'12px', fontWeight:'700', marginBottom:'12px' }}>Investment Packages ({investments.length})</div>
            {investments.map((inv,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${t.tableRowBorder}` }}>
                <div>
                  <div style={{ color:t.text, fontSize:'11px', fontWeight:'600' }}>{inv.plan}</div>
                  <div style={{ color:t.subText, fontSize:'9px' }}>${inv.amount} · {new Date(inv.createdAt).toLocaleDateString()}</div>
                </div>
                <span style={{ padding:'3px 8px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', background:inv.status==='active'?'#f0fdf4':'#f8fafc', color:inv.status==='active'?'#15803d':'#64748b', border:inv.status==='active'?'1px solid #bbf7d0':'1px solid #e2e8f0' }}>{inv.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
