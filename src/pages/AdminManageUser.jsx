import { useState, useEffect, useRef } from 'react';
import InlineLoader from '../components/InlineLoader';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, Send, X, Shield, TrendingUp, Crown, Clock, Check, AlertCircle } from 'lucide-react';
import { formatAmountWithUSD, convertAmount, getCurrencySymbol, getCurrencyCode, toUSD } from '../utils/currency';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });

const api = (path, method = 'GET', body) => 
  fetch(`${BASE_URL}/admin${path}`, { 
    method, 
    headers: headers(), 
    body: body ? JSON.stringify(body) : undefined 
  }).then(async r => {
    const text = await r.text();
    try { return text ? JSON.parse(text) : {}; } catch(e) { return {}; }
  });

const extractUser = (res) => {
  if (!res) return null;
  return res.user || (res._id ? res : null);
};

const S = ({ title, children, t }) => (
  <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:'10px', padding:'16px', marginBottom:'12px' }}>
    <div style={{ color:t.subText, fontSize:'9px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>{title}</div>
    {children}
  </div>
);

export default function AdminManageUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { current: t } = useTheme();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!location.state?.user);
  const [msg, setMsg] = useState('');
  const [clicked, setClicked] = useState('');
  const [feeType, setFeeType] = useState('processing');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailType, setEmailType] = useState('custom');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [regFeeAmount, setRegFeeAmount] = useState('');

  const balanceRef = useRef(null);
  const profitRef = useRef(null);
  const depositAmountRef = useRef(null);
  const depositNoteRef = useRef(null);
  const msgTextRef = useRef(null);
  const minWRef = useRef(null);
  const feeAmountRef = useRef(null);
  const feeLabelRef = useRef(null);
  const feeDescRef = useRef(null);
  const regFeeRef = useRef(null);

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const formatNumberInput = (e) => {
    const input = e.target;
    const raw = input.value.replace(/,/g, '');
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      const cursorPos = input.selectionStart;
      const oldLen = input.value.length;
      input.value = raw ? Number(raw).toLocaleString('en-US') : '';
      const newLen = input.value.length;
      input.setSelectionRange(cursorPos + (newLen - oldLen), cursorPos + (newLen - oldLen));
    } else { input.value = input.value.slice(0, -1); }
  };

  const syncUser = async () => {
    try {
      const res = await api('/users/' + id);
      const u = extractUser(res);
      if (u) {
        setUser(u);
        if (balanceRef.current && document.activeElement !== balanceRef.current) {
          balanceRef.current.value = Number(convertAmount(u.balance||0, u.currency)).toLocaleString();
        }
        if (profitRef.current && document.activeElement !== profitRef.current) {
          profitRef.current.value = Number(convertAmount(u.totalProfit||0, u.currency)).toLocaleString();
        }
        if (msgTextRef.current && document.activeElement !== msgTextRef.current) {
          msgTextRef.current.value = u.adminMessage || '';
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    syncUser().finally(() => setLoading(false));
  }, [id]);

  if (loading && !user) return <InlineLoader text="Loading user..." />;
  if (!user) return <div style={{ minHeight:'100vh', background:t.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>Not found</div>;

  const inp = { width:'100%', background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'8px 10px', outline:'none', borderRadius:'6px', boxSizing:'border-box', marginBottom:'6px' };

  const btn = (onClick, label, icon, key) => {
    const isClicked = clicked === (key || label);
    return (
      <button type="button" onClick={async () => {
        setClicked(key || label);
        try { await onClick(); } catch(e) {}
        setTimeout(() => setClicked(''), 800);
      }} style={{
        padding:'8px 14px', background: isClicked ? 'rgba(99,102,241,0.15)' : 'transparent',
        border: isClicked ? '1.5px solid #6366f1' : '1.5px solid '+t.tableDivider,
        color: isClicked ? '#6366f1' : t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'inline-flex', alignItems:'center', gap:'4px', marginBottom:'6px', marginRight:'6px', transition: 'all 0.15s ease'
      }}>
        {isClicked ? <span style={{ display:'inline-flex', gap:'2px' }}><span style={{ animation:'dotPulse 1.4s infinite' }}>.</span><span style={{ animation:'dotPulse 1.4s infinite', animationDelay:'0.2s' }}>.</span><span style={{ animation:'dotPulse 1.4s infinite', animationDelay:'0.4s' }}>.</span></span> : <>{icon} {label}</>}
      </button>
    );
  };

  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Segoe UI',sans-serif", color:t.text }}>
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button type="button" onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}><ArrowLeft size={16}/> Back</button>
        <div style={{ color:t.subText, fontSize:'11px' }}>Manage: {user.firstName} {user.lastName}</div>
        <div style={{ marginLeft:'auto' }}>
          {msg && <div style={{ position:'fixed', top:'70px', left:'50%', transform:'translateX(-50%)', zIndex:9999, background:'rgba(34,197,94,0.95)', color:'white', padding:'10px 18px', borderRadius:'8px', fontSize:'12px', fontWeight:'600' }}>{msg}</div>}
        </div>
      </div>

      <div style={{ maxWidth:'600px', margin:'0 auto', padding:'16px' }}>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:user.isBlocked?'#ef4444':'#22c55e', border:'1px solid '+(user.isBlocked?'#ef4444':'#22c55e') }}>{user.isBlocked?'● Blocked':'● Active'}</span>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:'#6366f1', border:'1px solid #6366f1' }}>Balance: {formatAmountWithUSD(user.balance||0, user.currency)}</span>
        </div>

        <S title="Balance & Profit" t={t}>
          <div style={{ fontSize:'9px', color:t.subText, marginBottom:'4px' }}>Main Balance ({getCurrencyCode(user.currency)})</div>
          <input ref={balanceRef} defaultValue={Number(convertAmount(user.balance||0, user.currency)).toLocaleString()} type="text" inputMode="numeric" onInput={formatNumberInput} style={inp}/>
          {btn(async () => {
            const rawVal = parseFloat(String(balanceRef.current?.value||'0').replace(/,/g, ''));
            const usdVal = toUSD(rawVal, user.currency);
            await api('/users/'+id+'/balance', 'PUT', { balance: usdVal });
            await syncUser();
            showMsg('Balance updated');
          }, 'Set Balance', <DollarSign size={12}/>)}

          <div style={{ marginTop:'8px', fontSize:'9px', color:t.subText, marginBottom:'4px' }}>Total Profit ({getCurrencyCode(user.currency)})</div>
          <input ref={profitRef} defaultValue={Number(convertAmount(user.totalProfit||0, user.currency)).toLocaleString()} type="text" inputMode="numeric" onInput={formatNumberInput} style={inp}/>
          {btn(async () => {
            const rawVal = parseFloat(String(profitRef.current?.value||'0').replace(/,/g, ''));
            const usdVal = toUSD(rawVal, user.currency);
            await api('/users/'+id+'/total-profit', 'PUT', { totalProfit: usdVal });
            await api('/users/'+id+'/stats', 'PUT', { totalProfit: usdVal });
            await syncUser();
            showMsg('Profit updated');
          }, 'Set Profit', <TrendingUp size={12}/>)}
        </S>

        <S title="Record Deposit" t={t}>
          <div style={{ color:'#22c55e', fontSize:'11px', marginBottom:'6px', padding:'8px', background:'rgba(34,197,94,0.1)', borderRadius:'6px', fontWeight:'700' }}>
            Current Total Deposits: {getCurrencyCode(user.currency)} {Number(convertAmount(user.totalDeposits||0, user.currency)).toLocaleString()}
          </div>
          <input ref={depositAmountRef} placeholder={`Amount in ${getCurrencyCode(user.currency)}`} type="text" inputMode="numeric" onInput={formatNumberInput} style={inp}/>
          <input ref={depositNoteRef} placeholder="Note (optional)" type="text" style={inp}/>
          
          <div style={{ marginTop:'8px' }}>
            {btn(async () => {
              const localVal = parseFloat(String(depositAmountRef.current?.value||'0').replace(/,/g, ''));
              if (!localVal || localVal <= 0) return showMsg('Enter valid amount');
              const usdAmount = toUSD(localVal, user.currency);
              const newTotal = (user.totalDeposits || 0) + usdAmount;
              await api('/users/'+id+'/add-deposit', 'POST', { amount: usdAmount, notes: depositNoteRef.current?.value || 'Deposit', method: 'Deposit' });
              await api('/users/'+id+'/stats', 'PUT', { totalDeposits: newTotal });
              await api('/users/'+id+'/total-deposits', 'PUT', { totalDeposits: newTotal });
              await syncUser();
              if (depositAmountRef.current) depositAmountRef.current.value = '';
              showMsg('Deposit recorded');
            }, 'Record Deposit', <DollarSign size={12}/>)}

            {btn(async () => {
              const localVal = parseFloat(String(depositAmountRef.current?.value||'0').replace(/,/g, ''));
              const usdAmount = toUSD(localVal, user.currency);
              await api('/users/'+id+'/stats', 'PUT', { totalDeposits: usdAmount });
              await api('/users/'+id+'/total-deposits', 'PUT', { totalDeposits: usdAmount });
              await syncUser();
              showMsg('Total Deposits overwritten');
            }, 'Set Deposits (overwrite)', <Shield size={12}/>)}

            {btn(async () => {
              if (!window.confirm("Reset total deposits to 0?")) return;
              await api('/users/'+id+'/stats', 'PUT', { totalDeposits: 0 });
              await api('/users/'+id+'/total-deposits', 'PUT', { totalDeposits: 0 });
              await syncUser();
              showMsg("Deposits reset to 0");
            }, "Reset (to 0)", <RotateCcw size={12}/>)}
          </div>
        </S>

        <S title="Admin Message" t={t}>
          <textarea ref={msgTextRef} defaultValue={user.adminMessage||''} rows={3} style={{ ...inp, resize:'vertical' }} placeholder="Message to user..."/>
          <div style={{ display:'flex', gap:'6px' }}>
            {btn(async()=>{const v=msgTextRef.current?.value||'';await api('/users/'+id+'/message','POST',{message:v});await syncUser();showMsg('Sent');}, 'Send', <Send size={12}/>)}
            {btn(async()=>{await api('/users/'+id+'/message','DELETE');await syncUser();if(msgTextRef.current)msgTextRef.current.value='';showMsg('Cleared');}, 'Clear', <X size={12}/>)}
          </div>
        </S>

        <S title="Account Controls" t={t}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            {btn(async()=>{await api('/users/'+id+'/block','PUT');await syncUser();showMsg('Updated');}, user.isBlocked?'Unblock User':'Block User', user.isBlocked?<Unlock size={12}/>:<Lock size={12}/>, 'block')}
            {btn(async()=>{await api('/users/'+id+'/withdrawal-block','PUT');await syncUser();showMsg('Updated');}, user.withdrawalBlocked?'Allow Withdrawals':'Block Withdrawals', user.withdrawalBlocked?<CheckCircle size={12}/>:<Ban size={12}/>, 'wblock')}
            <button type="button" onClick={()=>setShowEmailModal(true)} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}><Mail size={12}/> Email User</button>
          </div>
        </S>

        <S title="Registration Fee" t={t}>
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'10px' }}>
            Status: <span style={{ color:user.registrationFeeRequired?(user.registrationFeePaid?'#22c55e':'#ef4444'):'#64748b', fontWeight:'600' }}>
              {user.registrationFeeRequired ? (user.registrationFeePaid ? 'PAID' : 'PENDING') : 'NOT REQUIRED'}
            </span>
          </div>
          {!user.registrationFeeRequired ? (
             btn(async()=>{await api('/users/'+id+'/registration-fee','PUT',{required:true,amount:0});await syncUser();showMsg('Activated');}, 'Require Fee', <Shield size={12}/>)
          ) : (
            <>
              {!user.registrationFeePaid && (
                <div style={{ display:'flex', gap:'6px', marginBottom:'8px' }}>
                  <input ref={regFeeRef} placeholder="Amount paid" type="text" inputMode="numeric" onInput={formatNumberInput} style={{ ...inp, marginBottom:0, flex:1 }}/>
                  <button onClick={async()=>{
                    const val = toUSD(parseFloat(String(regFeeRef.current?.value||'0').replace(/,/g, '')), user.currency);
                    await api('/users/'+id+'/registration-fee','PUT',{required:true,amount:val});
                    await api('/users/'+id+'/registration-fee/mark-paid','PUT');
                    await syncUser();
                    showMsg('Approved');
                  }} style={{ padding:'0 15px', background:'#22c55e', color:'white', border:'none', borderRadius:'6px', fontSize:'10px', fontWeight:'700' }}>Approve</button>
                </div>
              )}
              {btn(async()=>{await api('/users/'+id+'/registration-fee/revoke','PUT');await syncUser();showMsg('Revoked');}, 'Revoke Fee Status', <X size={12}/>)}
            </>
          )}
        </S>

        <S title="Manage Fees" t={t}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px' }}>
            <select value={feeType} onChange={e=>setFeeType(e.target.value)} style={{ ...inp, marginBottom:0 }}>
              <option value="processing">Processing Fee</option>
              <option value="tax">Tax / Compliance</option>
              <option value="commission">Commission</option>
              <option value="custom">Custom</option>
            </select>
            <input ref={feeAmountRef} placeholder="Amount" type="text" inputMode="numeric" onInput={formatNumberInput} style={{ ...inp, marginBottom:0 }}/>
          </div>
          <input ref={feeLabelRef} placeholder="Fee Name (e.g. IRS Tax)" style={inp}/>
          {btn(async()=>{
            const amt = toUSD(parseFloat(String(feeAmountRef.current?.value||'0').replace(/,/g, '')), user.currency);
            await api('/users/'+id+'/fees','POST',{type:feeType,label:feeLabelRef.current?.value||feeType,amount:amt});
            await syncUser();
            feeAmountRef.current.value=''; feeLabelRef.current.value='';
            showMsg('Fee added');
          }, 'Add Fee & Notify', <Plus size={12}/>)}
          
          {(user.pendingFees||[]).map(fee=>(
            <div key={fee._id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderTop:`1px solid ${t.border}` }}>
              <div style={{ fontSize:'10px' }}>{fee.label} - <b>{formatAmountWithUSD(fee.amount, user.currency)}</b></div>
              <button onClick={async()=>{await api('/users/'+id+'/fees/'+fee._id,'DELETE');await syncUser();}} style={{ color:'#ef4444', border:'none', background:'none', cursor:'pointer' }}><X size={14}/></button>
            </div>
          ))}
        </S>
      </div>

      {showEmailModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div style={{ background:'white', padding:'20px', borderRadius:'12px', width:'100%', maxWidth:'400px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'15px' }}>
              <div style={{ color:'#111', fontWeight:'700' }}>Email {user.firstName}</div>
              <button onClick={()=>setShowEmailModal(false)} style={{ border:'none', background:'none', fontSize:'20px', cursor:'pointer', color:'#888' }}>×</button>
            </div>
            <input value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Subject" style={{ ...inp, background:'#f3f4f6', color:'#111' }}/>
            <textarea value={emailMessage} onChange={e=>setEmailMessage(e.target.value)} placeholder="Message" rows={4} style={{ ...inp, background:'#f3f4f6', color:'#111', resize:'none' }}/>
            <button onClick={async()=>{setEmailSending(true); try { await api('/users/'+id+'/email','POST',{subject:emailSubject,message:emailMessage}); showMsg('Sent'); setShowEmailModal(false); } catch(e){} setEmailSending(false); }} style={{ width:'100%', padding:'10px', background:'#6366f1', color:'white', border:'none', borderRadius:'6px', fontWeight:'700' }}>{emailSending?'Sending...':'Send Email'}</button>
          </div>
        </div>
      )}
      <style>{`@keyframes dotPulse { 0%, 60%, 100% { opacity: 0.2; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }`}</style>
    </div>
  );
}
const Plus = ({size}) => <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
