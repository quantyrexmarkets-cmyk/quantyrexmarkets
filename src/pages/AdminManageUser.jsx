import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, Send, X, Shield } from 'lucide-react';
const BASE_URL = 'https://quantyrexmarkets-api.vercel.app/api';
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });
const api = (path, method = 'GET', body) => fetch(`${BASE_URL}/admin${path}`, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined }).then(r => r.json());
export default function AdminManageUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [balance, setBalance] = useState('');
  const [msgText, setMsgText] = useState('');
  const [profitAmt, setProfitAmt] = useState('');
  const [regFeeAmt, setRegFeeAmt] = useState('');
  const [feeType, setFeeType] = useState('processing');
  const [feeLabel, setFeeLabel] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeDesc, setFeeDesc] = useState('');
  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };
  const [clicked, setClicked] = useState('');
  const click = async (key, fn) => {
    setClicked(key);
    await fn();
    setTimeout(() => setClicked(''), 500);
  };
  useEffect(() => {
    api('/users/' + id).then(u => {
      setUser(u); setBalance(u.balance?.toFixed(2) || '0');
      setMsgText(u.adminMessage || ''); setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);
  if (loading) return <LoadingSpinner fullPage />;
  if (!user) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>Not found</div>;
  const inp = { width:'100%', background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'8px 10px', outline:'none', borderRadius:'6px', boxSizing:'border-box', marginBottom:'6px' };
  const btn = (onClick, label, icon) => (
    <button onClick={onClick} style={{ padding:'8px 14px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'inline-flex', alignItems:'center', gap:'4px', marginBottom:'6px', marginRight:'6px' }}>
      {icon} {label}
    </button>
  );
  const S = ({ title, children }) => (
    <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px', marginBottom:'12px' }}>
      <div style={{ color:t.subText, fontSize:'9px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>{title}</div>
      {children}
    </div>
  );
  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Segoe UI',sans-serif", color:t.text }}>
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}><ArrowLeft size={16}/> Back</button>
        <div style={{ width:'1px', height:'20px', background:t.border }}/>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', color:'white', fontWeight:'700', overflow:'hidden' }}>
            {user.avatar?<img src={user.avatar} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>:(user.firstName?.[0]||'')+(user.lastName?.[0]||'')}
          </div>
          <div><div style={{ fontSize:'14px', fontWeight:'700' }}>{user.firstName} {user.lastName}</div><div style={{ fontSize:'10px', color:t.subText }}>{user.email}</div></div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
          {msg && <span style={{ color:'#22c55e', fontSize:'10px', fontWeight:'600' }}>{msg}</span>}

        </div>
      </div>
      <div style={{ maxWidth:'600px', margin:'0 auto', padding:'16px' }}>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:user.isBlocked?'#ef4444':'#22c55e', border:'1px solid '+(user.isBlocked?'#ef4444':'#22c55e') }}>{user.isBlocked?'● Blocked':'● Active'}</span>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:'#6366f1', border:'1px solid #6366f1' }}>Balance: ${parseFloat(user.balance||0).toLocaleString('en-US',{minimumFractionDigits:2})}</span>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:user.accountUpgraded?'#22c55e':'#64748b', border:'1px solid '+(user.accountUpgraded?'#22c55e':'#64748b') }}>{user.accountUpgraded?'Upgraded':'Standard'}</span>
        </div>
        <S title="Balance">
          <input value={balance} onChange={e=>setBalance(e.target.value)} placeholder="Amount" type="number" style={inp}/>
          {btn(async()=>{const r=await api('/users/'+id+'/balance','PUT',{balance:parseFloat(balance)});if(r.user){setUser(r.user);setBalance(r.user.balance?.toFixed(2));}showMsg('Balance updated');}, 'Set Balance', <DollarSign size={12}/>)}
          <div style={{ marginTop:'8px', color:t.subText, fontSize:'9px', marginBottom:'4px' }}>Add Profit</div>
          <div style={{ display:'flex', gap:'6px' }}>
            <input value={profitAmt} onChange={e=>setProfitAmt(e.target.value)} placeholder="Amount" type="number" style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'7px 10px', outline:'none', borderRadius:'6px' }}/>
            <button onClick={async()=>{if(!profitAmt)return;const r=await api('/users/'+id+'/profit','POST',{amount:parseFloat(profitAmt)});if(r.success){setUser(prev=>({...prev,balance:prev.balance+parseFloat(profitAmt)}));}showMsg(r.message||'Done');setProfitAmt('');}} style={{ padding:'7px 14px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px' }}>Add</button>
          </div>
        </S>
        <S title="Admin Message">
          {user.adminMessage&&<div style={{ color:'#f59e0b', fontSize:'10px', marginBottom:'8px', padding:'8px', background:'rgba(245,158,11,0.1)', borderRadius:'6px' }}>Current: {user.adminMessage}</div>}
          <textarea value={msgText} onChange={e=>setMsgText(e.target.value)} placeholder="Message to user..." rows={3} style={{ ...inp, resize:'vertical' }}/>
          <div style={{ display:'flex', gap:'6px' }}>
            {btn(async()=>{await api('/users/'+id+'/message','POST',{message:msgText});setUser(prev=>({...prev,adminMessage:msgText}));showMsg('Sent');}, 'Send', <Send size={12}/>)}
            {btn(async()=>{await api('/users/'+id+'/message','DELETE');setUser(prev=>({...prev,adminMessage:''}));setMsgText('');showMsg('Cleared');}, 'Clear', <X size={12}/>)}
          </div>
        </S>
        <S title="Account Controls">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            <button onClick={()=>api('/users/'+id+'/block','PUT').then(()=>{setUser(p=>({...p,isBlocked:!p.isBlocked}));showMsg('Updated');})} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{user.isBlocked?<><Unlock size={12}/> Unblock</>:<><Lock size={12}/> Block</>}</button>
            <button onClick={()=>api('/users/'+id+'/withdrawal-block','PUT').then(()=>{setUser(p=>({...p,withdrawalBlocked:!p.withdrawalBlocked}));showMsg('Updated');})} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{user.withdrawalBlocked?<><CheckCircle size={12}/> Allow W.</>:<><Ban size={12}/> Block W.</>}</button>
            <button onClick={()=>api('/users/'+id+'/upgrade','PUT').then(()=>{setUser(p=>({...p,accountUpgraded:!p.accountUpgraded}));showMsg('Updated');})} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{user.accountUpgraded?<><RotateCcw size={12}/> Revoke</>:<><ArrowUpCircle size={12}/> Upgrade</>}</button>
            <button onClick={()=>{window.open('mailto:'+user.email,'_blank');}} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}><Mail size={12}/> Email User</button>
          </div>
        </S>
        <S title="Account Plan">
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Current: <span style={{ color:user.currentPlan!=='none'?'#6366f1':'#64748b', fontWeight:'600' }}>{user.currentPlan!=='none'?user.currentPlan:'None'}</span></div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'8px' }}>
            {['BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','ELITE'].map(plan=>(
              <button key={plan} onClick={async()=>{await api('/users/'+id+'/plan','PUT',{plan});setUser(p=>({...p,currentPlan:plan}));showMsg('Plan: '+plan);}} style={{ padding:'5px 10px', background:user.currentPlan===plan?'#6366f1':'transparent', border:'1px solid '+(user.currentPlan===plan?'#6366f1':t.border), color:user.currentPlan===plan?'white':t.text, fontSize:'9px', fontWeight:'600', cursor:'pointer', borderRadius:'4px' }}>{plan}</button>
            ))}
          </div>
          {btn(async()=>{await api('/users/'+id+'/plan','PUT',{plan:'none'});setUser(p=>({...p,currentPlan:'none'}));showMsg('Plan removed');}, 'Remove Plan', <X size={12}/>)}
        </S>
        <S title="Withdrawal Code">
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Status: <span style={{ color:user.withdrawalCodeRequired?'#6366f1':'#64748b', fontWeight:'600' }}>{user.withdrawalCodeRequired?'Active':'Not Set'}</span></div>
          {user.withdrawalCode&&<div style={{ background:t.cardBg2, border:`1px solid ${t.border}`, borderRadius:'6px', padding:'10px', textAlign:'center', marginBottom:'8px' }}><div style={{ color:t.subText, fontSize:'8px', marginBottom:'4px', letterSpacing:'1px' }}>CODE</div><div style={{ color:t.text, fontSize:'18px', fontWeight:'800', letterSpacing:'4px' }}>{user.withdrawalCode}</div></div>}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {btn(async()=>{await api('/users/'+id+'/withdrawal-code','PUT',{withdrawalCodeRequired:true,generate:true});const r=await api('/users/'+id);setUser(r);showMsg('Generated');}, user.withdrawalCodeRequired?'New Code':'Generate', <Shield size={12}/>)}
            {user.withdrawalCodeRequired&&btn(async()=>{await api('/users/'+id+'/withdrawal-code','PUT',{withdrawalCodeRequired:false,generate:false});setUser(p=>({...p,withdrawalCodeRequired:false,withdrawalCode:''}));showMsg('Removed');}, 'Remove', <X size={12}/>)}
            {user.withdrawalCodeRequired&&btn(()=>api('/users/'+id+'/send-withdrawal-code','POST').then(()=>showMsg('Sent to '+user.email)), 'Send Code', <Mail size={12}/>)}
          </div>
        </S>
        <S title="Registration Fee">
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Status: <span style={{ color:user.registrationFeeRequired?(user.registrationFeePaid?'#22c55e':'#ef4444'):'#64748b', fontWeight:'600' }}>{user.registrationFeeRequired?(user.registrationFeePaid?'Paid':'Unpaid $'+user.registrationFeeAmount):'Not Required'}</span></div>
          <div style={{ display:'flex', gap:'6px' }}>
            <input value={regFeeAmt} onChange={e=>setRegFeeAmt(e.target.value)} placeholder="Amount" type="number" style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'7px 10px', outline:'none', borderRadius:'6px' }}/>
            <button onClick={async()=>{const r=await api('/users/'+id+'/registration-fee','PUT',{required:true,amount:parseFloat(regFeeAmt)});setUser(r.user);showMsg('Set');}} style={{ padding:'7px 12px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px' }}>Set</button>
            <button onClick={async()=>{const r=await api('/users/'+id+'/registration-fee','PUT',{required:false,amount:0});setUser(r.user);showMsg('Removed');}} style={{ padding:'7px 12px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:'#ef4444', fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px' }}>Remove</button>
          </div>
        </S>
        <S title="Add Fee">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px' }}>
            <select value={feeType} onChange={e=>setFeeType(e.target.value)} style={{ background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'10px', padding:'7px', outline:'none', borderRadius:'6px' }}>
              <option value="processing">Processing Fee</option>
              <option value="tax">Tax / Compliance</option>
              <option value="conversion">Conversion Fee</option>
              <option value="inactivity">Inactivity Fee</option>
              <option value="maintenance">Maintenance Fee</option>
              <option value="custom">Custom</option>
            </select>
            <input type="number" value={feeAmount} onChange={e=>setFeeAmount(e.target.value)} placeholder="Amount $" style={{ background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'10px', padding:'7px', outline:'none', borderRadius:'6px', boxSizing:'border-box' }}/>
          </div>
          <input value={feeLabel} onChange={e=>setFeeLabel(e.target.value)} placeholder="Fee name (shown to user)" style={inp}/>
          <textarea value={feeDesc} onChange={e=>setFeeDesc(e.target.value)} placeholder="Description (shown on popup)" rows={2} style={{ ...inp, resize:'vertical' }}/>
          <button onClick={async()=>{if(!feeAmount||parseFloat(feeAmount)<=0)return showMsg('Enter amount');const r=await api('/users/'+id+'/fees','POST',{type:feeType,label:feeLabel||feeType,amount:parseFloat(feeAmount),description:feeDesc});setUser(r.user);showMsg('Fee added');setFeeLabel('');setFeeAmount('');setFeeDesc('');}} style={{ width:'100%', padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', marginBottom:'8px' }}>+ Add Fee & Notify</button>
          {(user.pendingFees||[]).length>0&&(user.pendingFees||[]).map((fee,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:`1px solid ${t.tableRowBorder}` }}>
              <div><div style={{ color:t.text, fontSize:'10px', fontWeight:'600' }}>{fee.label}</div><div style={{ color:t.subText, fontSize:'9px' }}>${fee.amount?.toFixed(2)}</div></div>
              <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
                <span style={{ color:fee.paid?'#22c55e':'#ef4444', fontSize:'9px', fontWeight:'600' }}>{fee.paid?'Paid':'Unpaid'}</span>
                {!fee.paid&&<button onClick={async()=>{const r=await api('/users/'+id+'/fees/'+fee._id+'/paid','PUT');setUser(r.user);showMsg('Marked paid');}} style={{ padding:'3px 8px', background:'transparent', border:'1px solid '+t.border, color:t.text, fontSize:'9px', cursor:'pointer', borderRadius:'4px' }}>Mark Paid</button>}
                <button onClick={async()=>{const r=await api('/users/'+id+'/fees/'+fee._id,'DELETE');setUser(r.user);showMsg('Removed');}} style={{ padding:'3px 8px', background:'transparent', border:'1px solid '+t.border, color:'#ef4444', fontSize:'9px', cursor:'pointer', borderRadius:'4px' }}>✕</button>
              </div>
            </div>
          ))}
        </S>
        <S title="Min Withdrawal">
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Current: <span style={{ color:t.text, fontWeight:'600' }}>${user.minimumWithdrawal||100}</span></div>
          <div style={{ display:'flex', gap:'6px' }}>
            <input id="minW" type="number" defaultValue={user.minimumWithdrawal||100} style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'7px 10px', outline:'none', borderRadius:'6px' }}/>
            <button onClick={async()=>{const v=document.getElementById('minW').value;await api('/users/'+id+'/min-withdrawal','PUT',{minimumWithdrawal:parseFloat(v)});setUser(p=>({...p,minimumWithdrawal:parseFloat(v)}));showMsg('Updated');}} style={{ padding:'7px 14px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px' }}>Set</button>
          </div>
        </S>
        <S title="Danger Zone">
          <button onClick={async()=>{if(!window.confirm('DELETE '+user.email+'?'))return;await api('/users/'+id,'DELETE');navigate('/admin');}} style={{ width:'100%', padding:'11px', background:'#ef4444', border:'none', color:'white', fontSize:'12px', fontWeight:'700', cursor:'pointer', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}><Trash2 size={14}/> Delete User Account</button>
        </S>
      </div>
    </div>
  );
}
