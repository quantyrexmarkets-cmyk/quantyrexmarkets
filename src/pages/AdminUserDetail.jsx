import LoadingScreen from '../components/LoadingScreen';
import { useState, useEffect } from 'react';
import InlineLoader from '../components/InlineLoader';
;
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, TrendingUp, Package } from 'lucide-react';

const BASE_URL = 'https://quantyrexmarkets-api.vercel.app/api';
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });
const api = (path, method = 'GET', body) => fetch(`${BASE_URL}/admin${path}`, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined }).then(r => r.json());

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBots, setUserBots] = useState([]);
  const [userInvestments, setUserInvestments] = useState([]);
  const [userDetailTab, setUserDetailTab] = useState('info');
  const [msg, setMsg] = useState('');
  const [editBalance, setEditBalance] = useState({});
  const [editStats, setEditStats] = useState({});
  const [msgInput, setMsgInput] = useState({});
  const [profitAmount, setProfitAmount] = useState('');
  const [profitLoading, setProfitLoading] = useState(false);
  const [proofImage, setProofImage] = useState(null);

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };
  const logActivity = () => {};

  const updateBalance = async (id) => {
    const res = await api(`/users/${id}/balance`, 'PUT', { balance: parseFloat(editBalance[id]) });
    if (res.user) setSelectedUser(res.user);
    showMsg('Balance updated');
  };

  const updateUserStats = async (id) => {
    const stats = editStats[id] || {};
    await api(`/users/${id}/stats`, 'PUT', stats);
    showMsg('Stats updated');
  };

  const sendMessage = async (id) => {
    await api(`/users/${id}/message`, 'POST', { message: msgInput[id] });
    showMsg('Message sent');
  };

  const deleteMessage = async (id) => {
    await api(`/users/${id}/message`, 'DELETE');
    showMsg('Message deleted');
  };

  const toggleBlock = async (id) => {
    const res = await api(`/users/${id}/block`, 'PUT');
    setSelectedUser(res.user || { ...selectedUser, isBlocked: !selectedUser.isBlocked });
    showMsg(res.message || 'Updated');
  };

  const toggleWithdrawalBlock = async (id) => {
    const res = await api(`/users/${id}/withdrawal-block`, 'PUT');
    setSelectedUser(prev => ({ ...prev, withdrawalBlocked: !prev.withdrawalBlocked }));
    showMsg('Withdrawal block toggled');
  };

  const toggleAccountUpgrade = async (id) => {
    const res = await api(`/users/${id}/upgrade`, 'PUT');
    setSelectedUser(prev => ({ ...prev, accountUpgraded: !prev.accountUpgraded }));
    showMsg('Upgrade toggled');
  };

  const deleteUser = async (id) => {
    if (!window.confirm('DELETE this user permanently?')) return;
    await api(`/users/${id}`, 'DELETE');
    navigate('/admin');
  };

  const addProfit = async (userId, userName) => {
    if (!profitAmount || isNaN(profitAmount)) { showMsg('Enter valid amount'); return; }
    setProfitLoading(true);
    const res = await api(`/users/${userId}/profit`, 'POST', { amount: profitAmount });
    if (res.success) {
      setSelectedUser(prev => ({ ...prev, balance: prev.balance + parseFloat(profitAmount), totalProfit: (prev.totalProfit||0) + parseFloat(profitAmount) }));
      showMsg(res.message);
    } else {
      showMsg(res.message || 'Failed');
    }
    setProfitLoading(false);
  };

  const sendWithdrawalCode = async (id, email, name) => {
    await api(`/users/${id}/send-withdrawal-code`, 'POST');
    showMsg('Code sent to ' + email);
  };

  const setWithdrawalCode = async (id, remove = false) => {
    await api(`/users/${id}/withdrawal-code`, 'PUT', { withdrawalCodeRequired: !remove, generate: true });
    const res = await api(`/users/${id}`);
    setSelectedUser(res);
    showMsg(remove ? 'Code removed' : 'Code generated');
  };

  const setMinWithdrawal = async (id) => {
    const amt = prompt('Set minimum withdrawal amount:');
    if (!amt) return;
    await api(`/users/${id}/min-withdrawal`, 'PUT', { minimumWithdrawal: parseFloat(amt) });
    setSelectedUser(prev => ({ ...prev, minimumWithdrawal: parseFloat(amt) }));
    showMsg('Min withdrawal updated');
  };

  const btnStyle = (color, isActive = false) => {
    return {
      padding:'6px 12px',
      background: 'transparent',
      border: `1.5px solid ${t.tableDivider}`,
      color: t.text,
      fontSize:'10px',
      fontWeight:'600',
      cursor:'pointer',
      borderRadius:'6px',
      marginRight:'3px',
      marginBottom:'3px',
      display:'inline-flex',
      alignItems:'center',
      gap:'4px',
      whiteSpace:'nowrap',
    };
  };

  useEffect(() => {
    Promise.all([
      api(`/users/${id}`),
      api(`/users/${id}/bots`),
      api(`/users/${id}/investments`),
    ]).then(([u, b, inv]) => {
      setSelectedUser(u);
      setUserBots(Array.isArray(b) ? b : []);
      setUserInvestments(Array.isArray(inv) ? inv : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <InlineLoader text="Loading user..." />;
  if (!selectedUser) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', color:t.subText }}>User not found</div>;

  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Segoe UI', sans-serif", color:t.text }}>
      {/* Header */}
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}>
          <ArrowLeft size={16}/> Back
        </button>

        <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
          {msg && <span style={{ color:'#22c55e', fontSize:'10px', fontWeight:'600' }}>{msg}</span>}
        </div>
      </div>

      <div style={{ maxWidth:'960px', margin:'0 auto', padding:'20px 16px' }}>

        {/* Stats - same size, same color */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'20px' }}>
          {[
            ['Balance', `$${parseFloat(selectedUser.balance||0).toLocaleString('en-US',{minimumFractionDigits:2})}`],
            ['Deposits', `$${parseFloat(selectedUser.totalDeposits||0).toLocaleString('en-US',{minimumFractionDigits:2})}`],
            ['Withdrawals', `$${parseFloat(selectedUser.totalWithdrawals||0).toLocaleString('en-US',{minimumFractionDigits:2})}`],
            ['Profit', `$${parseFloat(selectedUser.totalProfit||0).toLocaleString('en-US',{minimumFractionDigits:2})}`],
          ].map(([label, value]) => (
            <div key={label} style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'8px', padding:'14px', textAlign:'center' }}>
              <div style={{ color:t.subText, fontSize:'8px', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
              <div style={{ color:t.text, fontSize:'11px', fontWeight:'600' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:`1px solid ${t.border}`, marginBottom:'16px', overflowX:'auto' }}>
          {['info','fees','bots','investments','profit'].map(tab => (
            <button key={tab} onClick={() => setUserDetailTab(tab)}
              style={{ padding:'10px 16px', background:userDetailTab===tab?'rgba(99,102,241,0.1)':'transparent', border:'none', borderBottom:userDetailTab===tab?'2px solid #6366f1':'2px solid transparent', color:userDetailTab===tab?'#6366f1':t.subText, fontSize:'11px', fontWeight:userDetailTab===tab?'700':'400', cursor:'pointer', whiteSpace:'nowrap', textTransform:'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
            {userDetailTab === 'info' && (
              <div style={{ padding: '14px 16px' }}>
                {/* Profile Picture */}
                <div style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px', background:t.cardBg2, border:`1px solid ${t.border}`, borderRadius:'10px', marginBottom:'16px' }}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', color:'white', fontWeight:'700', overflow:'hidden', flexShrink:0, cursor:'pointer' }}
                    onClick={() => selectedUser.avatar && setProofImage(selectedUser.avatar)}>
                    {selectedUser.avatar && selectedUser.avatar !== '' ? <img src={selectedUser.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : `${selectedUser.firstName?.[0]||''}${selectedUser.lastName?.[0]||''}`}
                  </div>
                  <div>
                    <div style={{ color:t.text, fontSize:'13px', fontWeight:'700' }}>{selectedUser.firstName} {selectedUser.lastName}</div>
                    <div style={{ color:t.subText, fontSize:'10px', marginBottom:'3px' }}>{selectedUser.email}</div>
                    <div style={{ display:'flex', gap:'8px' }}>
                      <span style={{ color:selectedUser.isBlocked?'#ef4444':'#22c55e', fontSize:'10px', fontWeight:'600' }}>{selectedUser.isBlocked?'● Suspended':'● Active'}</span>
                      <span style={{ color:selectedUser.kycStatus==='approved'?'#6366f1':'#64748b', fontSize:'10px' }}>KYC: {selectedUser.kycStatus==='approved'?'Verified':selectedUser.kycStatus||'None'}</span>
                    </div>
                  </div>
                  {selectedUser.avatar && selectedUser.avatar !== '' && (
                    <button onClick={() => setProofImage(selectedUser.avatar)} style={{ marginLeft:'auto', padding:'5px 10px', background:'transparent', border:`1px solid ${t.border}`, color:t.subText, fontSize:'9px', cursor:'pointer', borderRadius:'4px' }}>View Photo</button>
                  )}
                </div>
                {selectedUser.adminMessage && (
                  <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', padding: '8px', marginBottom: '14px' }}>
                    <div style={{ color: '#f59e0b', fontSize: '8px', fontWeight: '700', marginBottom: '4px' }}>Admin Message</div>
                    <div style={{ color: t.text, fontSize: '9px' }}>{selectedUser.adminMessage}</div>
                  </div>
                )}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Profile</div>
                  {[
                    ['Email', selectedUser.email],
                    ['Phone', selectedUser.phone || '---'],
                    ['Country', selectedUser.country || '---'],
                    ['KYC Status', selectedUser.kycStatus],
                    ['Account Type', selectedUser.accountType],
                    ['Referral Code', selectedUser.referralCode],
                    ['Status', selectedUser.isBlocked ? 'Blocked' : 'Active'],
                    ['Joined', new Date(selectedUser.createdAt).toLocaleDateString()],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <span style={{ color: t.subText, fontSize: '9px' }}>{k}</span>
                      <span style={{ color: 'white', fontSize: '9px', fontWeight: '600' }}>{v}</span>
                    </div>
                  ))}
                </div>
                {/* Advanced Controls */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Advanced Controls</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Plan Upgrade */}
                    <div style={{ background: t.cardBg2, border: `1px solid ${t.border}`, borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.dimText, fontSize: '8px', marginBottom: '8px' }}>
                        Current Plan: <strong style={{ color: selectedUser.currentPlan && selectedUser.currentPlan !== 'none' ? '#22c55e' : '#64748b' }}>{selectedUser.currentPlan && selectedUser.currentPlan !== 'none' ? selectedUser.currentPlan : 'No Plan'}</strong>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'ELITE'].map(plan => (
                          <button key={plan} onClick={async () => {
                            await api(`/users/${selectedUser._id}/plan`, 'PUT', { plan });
                            setSelectedUser({ ...selectedUser, currentPlan: plan });
                            showMsg(`User upgraded to ${plan} — email sent!`);
                          }} style={{ ...btnStyle(selectedUser.currentPlan === plan ? '#22c55e' : '#4b5563'), fontSize: '7px', opacity: selectedUser.currentPlan === plan ? 1 : 0.7 }}>
                            {selectedUser.currentPlan === plan ? '✓ ' : ''}{plan}
                          </button>
                        ))}
                        <button onClick={async () => {
                          await api(`/users/${selectedUser._id}/plan`, 'PUT', { plan: 'none' });
                          setSelectedUser({ ...selectedUser, currentPlan: 'none' });
                          showMsg('Plan removed');
                        }} style={{ ...btnStyle('#64748b'), fontSize: '7px' }}>Remove Plan</button>
                      </div>
                    </div>

                    {/* Withdrawal Code */}
                    <div style={{ background: t.cardBg2, border: `1px solid ${t.border}`, borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.dimText, fontSize: '8px', marginBottom: '6px' }}>
                        Withdrawal Code: <strong style={{ color: selectedUser.withdrawalCodeRequired ? '#a78bfa' : '#64748b' }}>{selectedUser.withdrawalCodeRequired ? 'Active' : 'Not Set'}</strong>
                      </div>
                      {selectedUser.withdrawalCode && (
                        <div style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '4px', padding: '8px', marginBottom: '8px', textAlign: 'center' }}>
                          <div style={{ color: t.mutedText, fontSize: '7px', marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Current Code</div>
                          <div style={{ color: t.text, fontSize: '16px', fontWeight: '800', letterSpacing: '4px' }}>{selectedUser.withdrawalCode}</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button onClick={() => { setWithdrawalCode(selectedUser._id); setSelectedUser(null); }} style={btnStyle('#a78bfa')}>{selectedUser.withdrawalCodeRequired ? 'Generate New Code' : 'Generate Code'}</button>
                        {selectedUser.withdrawalCodeRequired && <button onClick={() => { setWithdrawalCode(selectedUser._id, true); setSelectedUser(null); }} style={btnStyle('#64748b')}>Remove Code</button>}
                      </div>
                      {selectedUser.withdrawalCodeRequired && (
                        <button onClick={() => sendWithdrawalCode(selectedUser._id, selectedUser.email, selectedUser.firstName)}
                          style={{ width:'100%', marginTop:'8px', padding:'9px', background:'transparent', border:`2px solid ${t.text}`, color:t.text, fontSize:'10px', fontWeight:'700', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', opacity:0.85 }}>
                          📧 Send Code to {selectedUser.email}
                        </button>
                      )}
                    </div>

                    {/* Registration Fee */}
                    <div style={{ background: t.cardBg2, border: `1px solid ${t.border}`, borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '6px', fontWeight: '700' }}>REGISTRATION FEE</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                        <input type="number" placeholder="Amount" id="regFeeAmt"
                          style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px' }}/>
                        <button onClick={() => {
                          const amt = document.getElementById('regFeeAmt').value;
                          api(`/users/${selectedUser._id}/registration-fee`, 'PUT', { required: true, amount: parseFloat(amt) })
                            .then(d => { setSelectedUser(d.user); showMsg('Registration fee set'); })
                            .catch(e => showMsg(e.message));
                        }} style={{ padding:'5px 10px', background:'transparent', border:`1.5px solid ${t.tableDivider}`, color:t.text, fontSize:'9px', fontWeight:'600', cursor:'pointer', borderRadius:'4px' }}>Set</button>
                        <button onClick={() => {
                          api(`/users/${selectedUser._id}/registration-fee`, 'PUT', { required: false, amount: 0 })
                            .then(d => { setSelectedUser(d.user); showMsg('Removed'); });
                        }} style={{ padding:'5px 10px', background:'transparent', border:`1.5px solid ${t.tableDivider}`, color:'#ef4444', fontSize:'9px', fontWeight:'600', cursor:'pointer', borderRadius:'4px' }}>Remove</button>
                      </div>
                      <div style={{ color: t.subText, fontSize: '8px' }}>
                        Status: <span style={{ color: selectedUser.registrationFeeRequired ? (selectedUser.registrationFeePaid ? '#22c55e' : '#ef4444') : '#64748b', fontWeight: '600' }}>
                          {selectedUser.registrationFeeRequired ? (selectedUser.registrationFeePaid ? 'Paid' : `Unpaid - $${selectedUser.registrationFeeAmount}`) : 'Not Required'}
                        </span>
                      </div>
                    </div>

                    {/* Min Withdrawal */}
                    <div style={{ background: t.cardBg2, border: `1px solid ${t.border}`, borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.dimText, fontSize: '8px', marginBottom: '6px' }}>
                        Min Withdrawal: <strong style={{ color: t.text }}>${selectedUser.minimumWithdrawal || 100}</strong>
                      </div>
                      <button onClick={() => { setMinWithdrawal(selectedUser._id); setSelectedUser(null); }} style={btnStyle('#0ea5e9')}>Change Min Withdrawal</button>
                    </div>

                    {/* Delete */}
                    <button onClick={() => deleteUser(selectedUser._id)} style={{ width:'100%', padding:'10px', background:'#ef4444', border:'none', color:'white', fontSize:'11px', fontWeight:'700', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                      🗑 Delete User Account
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Financials</div>
                  {[
                    ['Balance', '$' + (selectedUser.balance?.toFixed(2) || '0.00')],
                    ['Total Deposits', '$' + (selectedUser.totalDeposits?.toFixed(2) || '0.00')],
                    ['Total Withdrawals', '$' + (selectedUser.totalWithdrawals?.toFixed(2) || '0.00')],
                    ['Total Profit', '$' + (selectedUser.totalProfit?.toFixed(2) || '0.00')],
                    ['Total Referrals', selectedUser.totalReferrals || 0],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <span style={{ color: t.subText, fontSize: '9px' }}>{k}</span>
                      <span style={{ color: t.subText, fontSize: '9px', fontWeight: '700' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedUser(null)} style={{ width: '100%', padding: '8px', background: 'transparent', border: `1.5px solid ${t.tableDivider}`, color: t.text, fontSize: '8px', fontWeight: '700', cursor: 'pointer', borderRadius: '6px' }}>Close</button>
              </div>
            )}

            {/* Bots Tab */}
            {userDetailTab === 'fees' && (
              <div>


                {/* Add Other Fees */}
                <div style={{ background: t.cardBg2, borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '8px' }}>Add Fee</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Fee Type</div>
                      <select id="feeType" style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px' }}>
                        <option value="processing">Withdrawal Processing Fee</option>
                        <option value="tax">Tax / Compliance Fee</option>
                        <option value="conversion">Conversion Fee</option>
                        <option value="inactivity">Inactivity Fee</option>
                        <option value="maintenance">Maintenance Fee</option>
                        <option value="custom">Custom Fee</option>
                      </select>
                    </div>
                    <div>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Amount ($)</div>
                      <input type="number" id="feeAmount" placeholder="0.00"
                        style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }}/>
                    </div>
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Fee Name (shown to user)</div>
                    <input id="feeLabel" placeholder="e.g. Tax Compliance Fee"
                      style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }}/>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Fee Description (shown on popup)</div>
                    <textarea id="feeDescription" placeholder="Describe why this fee is required..."
                      rows={3}
                      style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', resize:'vertical' }}/>
                  </div>
                  <button onClick={() => {
                    const type = document.getElementById('feeType').value;
                    const amount = parseFloat(document.getElementById('feeAmount').value);
                    const label = document.getElementById('feeLabel').value || type;
                    const description = document.getElementById('feeDescription')?.value || '';
                    if (!amount || amount <= 0) return showMsg('Enter valid amount');
                    api(`/users/${selectedUser._id}/fees`, 'POST', { type, label, amount, description })
                      .then(d => { setSelectedUser(d.user); showMsg('Fee added & email sent'); })
                      .catch(e => showMsg(e.message));
                  }} style={{ ...btnStyle('#6366f1', true), width: '100%', justifyContent: 'center' }}>
                    + Add Fee & Notify User
                  </button>
                </div>

                {/* Pending Fees List */}
                <div style={{ background: t.cardBg2, borderRadius: '8px', padding: '12px' }}>
                  <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '8px' }}>
                    Pending Fees ({(selectedUser.pendingFees || []).filter(f => !f.paid).length})
                  </div>
                  {(selectedUser.pendingFees || []).length === 0 ? (
                    <div style={{ color: t.faintText, fontSize: '9px', textAlign: 'center', padding: '12px' }}>No fees</div>
                  ) : (selectedUser.pendingFees || []).map((fee, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <div>
                        <div style={{ color: t.text, fontSize: '9px', fontWeight: '600' }}>{fee.label}</div>
                        <div style={{ color: t.subText, fontSize: '8px' }}>${fee.amount?.toFixed(2)}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ color: fee.paid ? '#22c55e' : '#ef4444', fontSize: '10px', fontWeight: '600' }}>
                          {fee.paid ? 'Paid' : 'Unpaid'}
                        </span>
                        {!fee.paid && (
                          <button onClick={() => {
                            api(`/users/${selectedUser._id}/fees/${fee._id}/paid`, 'PUT')
                              .then(d => { setSelectedUser(d.user); showMsg('Marked as paid'); })
                              .catch(e => showMsg(e.message));
                          }} style={btnStyle('#22c55e')}>Mark Paid</button>
                        )}
                        <button onClick={() => {
                          api(`/users/${selectedUser._id}/fees/${fee._id}`, 'DELETE')
                            .then(d => { setSelectedUser(d.user); showMsg('Fee removed'); })
                            .catch(e => showMsg(e.message));
                        }} style={btnStyle('#ef4444')}><Trash2 size={10}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userDetailTab === 'bots' && (
              <div style={{ padding: '14px 16px' }}>
                <div style={{ color: t.text, fontSize: '8px', fontWeight: '700', marginBottom: '10px' }}>Bot Subscriptions ({userBots.length})</div>
                {userBots.length === 0 ? (
                  <div style={{ color: t.faintText, fontSize: '9px', padding: '20px', textAlign: 'center' }}>No bots subscribed</div>
                ) : userBots.map((b, i) => (
                  <div key={i} style={{ background: t.tableHeaderBg, padding: '10px', marginBottom: '6px', borderLeft: '2px solid #6366f1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#6366f1', fontSize: '8px', fontWeight: '700' }}>{b.botName}</span>
                      <span style={{ color: b.status === 'active' ? '#22c55e' : '#9ca3af', fontSize: '8px' }}>{b.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: t.mutedText, fontSize: '8px' }}>Invested: <span style={{ color: t.text }}>${b.amount?.toLocaleString()}</span></span>
                      <span style={{ color: t.mutedText, fontSize: '8px' }}>Earned: <span style={{ color: '#f59e0b' }}>${(b.earned||0).toFixed(2)}</span></span>
                      <span style={{ color: t.mutedText, fontSize: '8px' }}>Rate: <span style={{ color: '#22c55e' }}>{b.dailyRate}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Investments Tab */}
            {userDetailTab === 'investments' && (
              <div style={{ padding: '14px 16px' }}>
                <div style={{ color: t.text, fontSize: '8px', fontWeight: '700', marginBottom: '10px' }}>Investment Packages ({userInvestments.length})</div>
                {userInvestments.length === 0 ? (
                  <div style={{ color: t.faintText, fontSize: '9px', padding: '20px', textAlign: 'center' }}>No investments</div>
                ) : userInvestments.map((inv, i) => (
                  <div key={i} style={{ background: t.tableHeaderBg, padding: '10px', marginBottom: '6px', borderLeft: '2px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#f59e0b', fontSize: '8px', fontWeight: '700' }}>{inv.plan}</span>
                      <span style={{ color: '#22c55e', fontSize: '8px' }}>{inv.roi}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: t.mutedText, fontSize: '8px' }}>Amount: <span style={{ color: t.text }}>${inv.amount?.toLocaleString()}</span></span>
                      <span style={{ color: t.mutedText, fontSize: '8px' }}>{new Date(inv.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profit Tab */}

        </div>
      </div>

      {proofImage && (
        <>
          <div onClick={() => setProofImage(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src={proofImage} style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain' }}/>
          </div>
        </>
      )}
    </div>
  );
}
