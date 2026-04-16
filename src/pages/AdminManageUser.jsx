import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, Send, X, Settings, Package, CreditCard, Eye, ShieldCheck, ShieldOff } from 'lucide-react';

const BASE_URL = 'https://quantyrexmarkets-api.vercel.app/api';
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });
const api = (path, method = 'GET', body) => fetch(`${BASE_URL}/admin${path}`, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined }).then(r => r.json());

export default function AdminManageUser() {
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

  const btnStyle = (color, isActive = false) => ({
    padding: '6px 12px',
    background: 'transparent',
    border: '1.5px solid ' + (isActive ? color : t.tableDivider),
    color: isActive ? color : t.text,
    fontSize: '10px', fontWeight: '600', cursor: 'pointer',
    borderRadius: '6px', marginRight: '3px', marginBottom: '3px',
    display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap',
  });

  const updateBalance = async (id) => {
    const res = await api('/users/' + id + '/balance', 'PUT', { balance: parseFloat(editBalance[id]) });
    if (res.user) setSelectedUser(res.user);
    showMsg('Balance updated');
  };

  const updateUserStats = async (id) => {
    await api('/users/' + id + '/stats', 'PUT', editStats[id] || {});
    showMsg('Stats updated');
  };

  const sendMessage = async (id) => {
    await api('/users/' + id + '/message', 'POST', { message: msgInput[id] });
    showMsg('Message sent');
  };

  const deleteMessage = async (id) => {
    await api('/users/' + id + '/message', 'DELETE');
    showMsg('Message deleted');
  };

  const toggleBlock = async (id) => {
    const res = await api('/users/' + id + '/block', 'PUT');
    setSelectedUser(prev => ({ ...prev, isBlocked: !prev.isBlocked }));
    showMsg(res.message || 'Updated');
  };

  const toggleWithdrawalBlock = async (id) => {
    await api('/users/' + id + '/withdrawal-block', 'PUT');
    setSelectedUser(prev => ({ ...prev, withdrawalBlocked: !prev.withdrawalBlocked }));
    showMsg('Withdrawal block toggled');
  };

  const toggleAccountUpgrade = async (id) => {
    await api('/users/' + id + '/upgrade', 'PUT');
    setSelectedUser(prev => ({ ...prev, accountUpgraded: !prev.accountUpgraded }));
    showMsg('Upgrade toggled');
  };

  const deleteUser = async (id) => {
    if (!window.confirm('DELETE this user permanently?')) return;
    await api('/users/' + id, 'DELETE');
    navigate('/admin');
  };

  const addProfit = async (userId) => {
    if (!profitAmount || isNaN(profitAmount)) { showMsg('Enter valid amount'); return; }
    setProfitLoading(true);
    const res = await api('/users/' + userId + '/profit', 'POST', { amount: profitAmount });
    if (res.success) {
      setSelectedUser(prev => ({ ...prev, balance: prev.balance + parseFloat(profitAmount), totalProfit: (prev.totalProfit||0) + parseFloat(profitAmount) }));
      showMsg(res.message);
    } else { showMsg(res.message || 'Failed'); }
    setProfitLoading(false);
  };

  const sendWithdrawalCode = async (id, email) => {
    await api('/users/' + id + '/send-withdrawal-code', 'POST');
    showMsg('Code sent to ' + email);
  };

  const setWithdrawalCode = async (id, remove = false) => {
    await api('/users/' + id + '/withdrawal-code', 'PUT', { withdrawalCodeRequired: !remove, generate: true });
    const res = await api('/users/' + id);
    setSelectedUser(res);
    showMsg(remove ? 'Code removed' : 'Code generated');
  };

  const setMinWithdrawal = async (id) => {
    const amt = prompt('Set minimum withdrawal amount:');
    if (!amt) return;
    await api('/users/' + id + '/min-withdrawal', 'PUT', { minimumWithdrawal: parseFloat(amt) });
    setSelectedUser(prev => ({ ...prev, minimumWithdrawal: parseFloat(amt) }));
    showMsg('Min withdrawal updated');
  };

  useEffect(() => {
    Promise.all([
      api('/users/' + id),
      api('/users/' + id + '/bots'),
      api('/users/' + id + '/investments'),
    ]).then(([u, b, inv]) => {
      setSelectedUser(u);
      setUserBots(Array.isArray(b) ? b : []);
      setUserInvestments(Array.isArray(inv) ? inv : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner fullPage />;
  if (!selectedUser) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center', color:t.subText }}>User not found</div>;

  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Segoe UI',sans-serif", color:t.text }}>
      {/* Header */}
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}>
          <ArrowLeft size={16}/> Back
        </button>
        <div style={{ width:'1px', height:'20px', background:t.border }}/>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', color:'white', fontWeight:'700', overflow:'hidden', flexShrink:0 }}>
            {selectedUser.avatar ? <img src={selectedUser.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : (selectedUser.firstName?.[0]||'') + (selectedUser.lastName?.[0]||'')}
          </div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'700' }}>{selectedUser.firstName} {selectedUser.lastName}</div>
            <div style={{ fontSize:'10px', color:t.subText }}>{selectedUser.email}</div>
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
          {msg && <span style={{ color:'#22c55e', fontSize:'10px', fontWeight:'600' }}>{msg}</span>}
          <button onClick={() => navigate('/admin/users/' + id)} style={{ padding:'6px 12px', background:'transparent', border:'1.5px solid ' + t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', gap:'4px' }}>
            <Eye size={12}/> View Profile
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:t.border, borderBottom:`1px solid ${t.border}` }}>
        {[
          ['Balance', '$' + parseFloat(selectedUser.balance||0).toLocaleString('en-US',{minimumFractionDigits:2}), '#6366f1'],
          ['Deposits', '$' + parseFloat(selectedUser.totalDeposits||0).toLocaleString(), '#22c55e'],
          ['Withdrawals', '$' + parseFloat(selectedUser.totalWithdrawals||0).toLocaleString(), '#f59e0b'],
          ['Profit', '$' + parseFloat(selectedUser.totalProfit||0).toLocaleString(), '#ec4899'],
        ].map(([l,v,col],i) => (
          <div key={i} style={{ padding:'10px', textAlign:'center', background:t.cardBg }}>
            <div style={{ color:t.subText, fontSize:'9px', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{l}</div>
            <div style={{ color:t.text, fontSize:'13px', fontWeight:'700' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ padding:'10px 16px', background:t.cardBg2, borderBottom:`1px solid ${t.border}`, display:'flex', gap:'6px', flexWrap:'wrap', alignItems:'center' }}>
        <button onClick={() => toggleBlock(selectedUser._id)} style={{ ...btnStyle(selectedUser.isBlocked?'#22c55e':'#ef4444', true), background:selectedUser.isBlocked?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)' }}>{selectedUser.isBlocked?<><Unlock size={11}/> Unblock</>:<><Lock size={11}/> Block</>}</button>
        <button onClick={() => toggleWithdrawalBlock(selectedUser._id)} style={{ ...btnStyle(selectedUser.withdrawalBlocked?'#22c55e':'#ef4444', true), background:selectedUser.withdrawalBlocked?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)' }}>{selectedUser.withdrawalBlocked?<><CheckCircle size={11}/> Allow W.</>:<><Ban size={11}/> Block W.</>}</button>
        <button onClick={() => toggleAccountUpgrade(selectedUser._id)} style={{ ...btnStyle(selectedUser.accountUpgraded?'#ef4444':'#22c55e', true), background:selectedUser.accountUpgraded?'rgba(239,68,68,0.1)':'rgba(34,197,94,0.1)' }}>{selectedUser.accountUpgraded?<><RotateCcw size={11}/> Revoke</>:<><ArrowUpCircle size={11}/> Upgrade</>}</button>
        <button onClick={() => deleteUser(selectedUser._id)} style={{ ...btnStyle('#ef4444'), background:'rgba(239,68,68,0.1)', marginLeft:'auto' }}><Trash2 size={11}/> Delete User</button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:`1px solid ${t.border}`, background:t.cardBg, overflowX:'auto' }}>
        {['info','fees','bots','investments','profit'].map(tab => (
          <button key={tab} onClick={() => setUserDetailTab(tab)}
            style={{ padding:'10px 16px', background:userDetailTab===tab?'rgba(99,102,241,0.1)':'transparent', border:'none', borderBottom:userDetailTab===tab?'2px solid #6366f1':'2px solid transparent', color:userDetailTab===tab?'#6366f1':t.subText, fontSize:'10px', fontWeight:userDetailTab===tab?'700':'400', cursor:'pointer', whiteSpace:'nowrap', textTransform:'capitalize' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding:'16px', maxWidth:'800px', margin:'0 auto' }}>
            {userDetailTab === 'info' && (
              <div style={{ padding: '14px 16px' }}>
                {selectedUser.adminMessage && (
                  <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', padding: '8px', marginBottom: '14px' }}>
                    <div style={{ color: '#f59e0b', fontSize: '8px', fontWeight: '700', marginBottom: '4px' }}>Admin Message</div>
                    <div style={{ color: t.text, fontSize: '9px' }}>{selectedUser.adminMessage}</div>
                  </div>
                )}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ color: '#6366f1', fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Profile</div>
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
                  <div style={{ color: '#6366f1', fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Advanced Controls</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Plan Upgrade */}
                    <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '6px', padding: '10px' }}>
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
                    <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.dimText, fontSize: '8px', marginBottom: '6px' }}>
                        Withdrawal Code: <strong style={{ color: selectedUser.withdrawalCodeRequired ? '#a78bfa' : '#64748b' }}>{selectedUser.withdrawalCodeRequired ? 'Active' : 'Not Set'}</strong>
                      </div>
                      {selectedUser.withdrawalCode && (
                        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '4px', padding: '8px', marginBottom: '8px', textAlign: 'center' }}>
                          <div style={{ color: t.mutedText, fontSize: '7px', marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Current Code</div>
                          <div style={{ color: '#a78bfa', fontSize: '16px', fontWeight: '800', letterSpacing: '4px' }}>{selectedUser.withdrawalCode}</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button onClick={() => { setWithdrawalCode(selectedUser._id); setSelectedUser(null); }} style={btnStyle('#a78bfa')}>{selectedUser.withdrawalCodeRequired ? 'Generate New Code' : 'Generate Code'}</button>
                        {selectedUser.withdrawalCodeRequired && <button onClick={() => { setWithdrawalCode(selectedUser._id, true); setSelectedUser(null); }} style={btnStyle('#64748b')}>Remove Code</button>}
                      </div>
                      <div style={{ color: t.faintText, fontSize: '7px', marginTop: '6px' }}>Code will be emailed to user when you click Send Code below</div>
                    </div>

                    {/* Send Code Button */}
                    {selectedUser.withdrawalCodeRequired && (
                      <button onClick={() => { sendWithdrawalCode(selectedUser._id, selectedUser.email, selectedUser.firstName); setSelectedUser(null); }} style={{ ...btnStyle('#6366f1'), width: '100%', padding: '8px' }}>
                        📧 Send Code to {selectedUser.email}
                      </button>
                    )}

                    {/* Min Withdrawal */}
                    <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '6px', padding: '10px' }}>
                      <div style={{ color: t.dimText, fontSize: '8px', marginBottom: '6px' }}>
                        Min Withdrawal: <strong style={{ color: '#0ea5e9' }}>${selectedUser.minimumWithdrawal || 100}</strong>
                      </div>
                      <button onClick={() => { setMinWithdrawal(selectedUser._id); setSelectedUser(null); }} style={btnStyle('#0ea5e9')}>Change Min Withdrawal</button>
                    </div>

                    {/* Delete */}
                    <button onClick={() => deleteUser(selectedUser._id)} style={{ ...btnStyle('#ef4444'), width: '100%', padding: '8px' }}>
                      🗑 Delete User Account
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ color: '#6366f1', fontSize: '9px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Financials</div>
                  {[
                    ['Balance', '$' + (selectedUser.balance?.toFixed(2) || '0.00')],
                    ['Total Deposits', '$' + (selectedUser.totalDeposits?.toFixed(2) || '0.00')],
                    ['Total Withdrawals', '$' + (selectedUser.totalWithdrawals?.toFixed(2) || '0.00')],
                    ['Total Profit', '$' + (selectedUser.totalProfit?.toFixed(2) || '0.00')],
                    ['Total Referrals', selectedUser.totalReferrals || 0],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <span style={{ color: t.subText, fontSize: '9px' }}>{k}</span>
                      <span style={{ color: '#22c55e', fontSize: '9px', fontWeight: '700' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedUser(null)} style={{ width: '100%', padding: '8px', background: '#6366f1', border: 'none', color: 'white', fontSize: '8px', fontWeight: '700', cursor: 'pointer' }}>Close</button>
              </div>
            )}

            {/* Bots Tab */}
            {userDetailTab === 'fees' && (
              <div>
                {/* Registration Fee */}
                <div style={{ background: t.cardBg2, borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                  <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '8px' }}>Registration Fee</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <input type="number" placeholder="Amount" id="regFeeAmt"
                      style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px' }}/>
                    <button onClick={() => {
                      const amt = document.getElementById('regFeeAmt').value;
                      api(`/users/${selectedUser._id}/registration-fee`, 'PUT', { required: true, amount: parseFloat(amt) })
                        .then(d => { setSelectedUser(d.user); showMsg('Registration fee set'); })
                        .catch(e => showMsg(e.message));
                    }} style={btnStyle('#6366f1')}>Set Fee</button>
                    <button onClick={() => {
                      api(`/users/${selectedUser._id}/registration-fee`, 'PUT', { required: false, amount: 0 })
                        .then(d => { setSelectedUser(d.user); showMsg('Registration fee removed'); });
                    }} style={btnStyle('#ef4444')}>Remove</button>
                  </div>
                  <div style={{ fontSize: '8px', color: t.subText }}>
                    Status: <span style={{ color: selectedUser.registrationFeeRequired ? (selectedUser.registrationFeePaid ? '#22c55e' : '#ef4444') : '#64748b', fontWeight: '600' }}>
                      {selectedUser.registrationFeeRequired ? (selectedUser.registrationFeePaid ? '✓ Paid' : `⚠ Unpaid - $${selectedUser.registrationFeeAmount}`) : 'Not Required'}
                    </span>
                  </div>
                </div>

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
                      </select>
                    </div>
                    <div>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Amount ($)</div>
                      <input type="number" id="feeAmount" placeholder="0.00"
                        style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }}/>
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Custom Label</div>
                    <input id="feeLabel" placeholder="e.g. Tax Compliance Fee"
                      style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box' }}/>
                  </div>
                  <button onClick={() => {
                    const type = document.getElementById('feeType').value;
                    const amount = parseFloat(document.getElementById('feeAmount').value);
                    const label = document.getElementById('feeLabel').value || type;
                    if (!amount || amount <= 0) return showMsg('Enter valid amount');
                    api(`/users/${selectedUser._id}/fees`, 'POST', { type, label, amount })
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
                        <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '8px', fontWeight: '600', background: fee.paid ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: fee.paid ? '#22c55e' : '#ef4444', border: fee.paid ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)' }}>
                          {fee.paid ? '✓ Paid' : 'Unpaid'}
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
