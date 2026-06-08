import { useState, useEffect, useRef } from 'react';
import InlineLoader from '../components/InlineLoader';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Mail, Lock, Unlock, Ban, CheckCircle, ArrowUpCircle, RotateCcw, Trash2, DollarSign, Send, X, Shield, TrendingUp, Crown, Clock, Check, AlertCircle } from 'lucide-react';
import { formatAmountWithUSD, convertAmount, getCurrencySymbol, getCurrencyCode } from '../utils/currency';
const BASE_URL = (import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api'));
const getToken = () => localStorage.getItem('token');
const headers = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` });
const api = (path, method = 'GET', body) => fetch(`${BASE_URL}/admin${path}`, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined }).then(r => r.json());
// Section wrapper - defined OUTSIDE component to prevent re-mounting on re-render
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
  const [balance, setBalance] = useState('');
  const [msgText, setMsgText] = useState('');
  const [profitAmt, setProfitAmt] = useState('');
  const [regFeeAmt, setRegFeeAmt] = useState('');
  const [feeType, setFeeType] = useState('processing');
  const [feeLabel, setFeeLabel] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeDesc, setFeeDesc] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailType, setEmailType] = useState('custom');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [regFeeAmount, setRegFeeAmount] = useState('');
  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };
  const [clicked, setClicked] = useState('');
  // Uncontrolled input refs (prevents mobile keyboard focus loss)
  const balanceRef = useRef(null);
  const minWRef = useRef(null);
  const profitRef = useRef(null);
  const msgTextRef = useRef(null);
  const regFeeRef = useRef(null);
  const depositAmountRef = useRef(null);
  const depositNoteRef = useRef(null);
  const feeLabelRef = useRef(null);
  const feeAmountRef = useRef(null);
  const feeDescRef = useRef(null);
  const click = async (key, fn) => {
    setClicked(key);
    await fn();
    setTimeout(() => setClicked(''), 500);
  };
  useEffect(() => {
    // Show navigation state data INSTANTLY (no loading flash)
    if (location.state?.user) {
      const u = location.state.user;
      setUser(u);
      setBalance(convertAmount(u.balance||0, u.currency));
      setMsgText(u.adminMessage || '');
      setLoading(false);
    }
    // ALWAYS fetch fresh data from API (so refresh gets latest values)
    // Safe to update user state because inputs are uncontrolled (use refs)
    api('/users/' + id).then(u => {
      if (!u || !u._id) return;
      setUser(u);
      setLoading(false);
      // Only update input refs if user hasn't typed anything yet (still at default)
      // We update refs to reflect latest backend value on fresh load/refresh
      if (balanceRef.current && document.activeElement !== balanceRef.current) {
        balanceRef.current.value = convertAmount(u.balance||0, u.currency);
      }
      if (profitRef.current && document.activeElement !== profitRef.current) {
        profitRef.current.value = convertAmount(u.totalProfit||0, u.currency);
      }
      if (msgTextRef.current && document.activeElement !== msgTextRef.current) {
        msgTextRef.current.value = u.adminMessage || '';
      }
    }).catch(() => setLoading(false));
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
        padding:'8px 14px',
        background: isClicked ? 'rgba(99,102,241,0.15)' : 'transparent',
        border: isClicked ? '1.5px solid #6366f1' : '1.5px solid '+t.tableDivider,
        color: isClicked ? '#6366f1' : t.text,
        fontSize:'10px',
        fontWeight:'600',
        cursor:'pointer',
        borderRadius:'6px',
        display:'inline-flex',
        alignItems:'center',
        gap:'4px',
        marginBottom:'6px',
        marginRight:'6px',
        transition: 'all 0.15s ease',
        transform: isClicked ? 'scale(0.95)' : 'scale(1)',
      }}>
        {isClicked ? (
          <span style={{ display:'inline-flex', gap:'2px', alignItems:'center' }}>
            <span style={{ animation:'dotPulse 1.4s infinite', animationDelay:'0s' }}>.</span>
            <span style={{ animation:'dotPulse 1.4s infinite', animationDelay:'0.2s' }}>.</span>
            <span style={{ animation:'dotPulse 1.4s infinite', animationDelay:'0.4s' }}>.</span>
          </span>
        ) : (<>{icon} {label}</>)}
      </button>
    );
  };
  // S component moved outside to prevent re-mounting on every render (which caused scroll jumps)
  return (
    <div style={{ minHeight:'100vh', background:t.bg, fontFamily:"'Segoe UI',sans-serif", color:t.text }}>
      <div style={{ background:t.cardBg, borderBottom:`1px solid ${t.border}`, padding:'12px 20px', display:'flex', alignItems:'center', gap:'12px', position:'sticky', top:0, zIndex:50 }}>
        <button type="button" onClick={() => navigate('/admin')} style={{ background:'none', border:'none', color:t.text, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'600' }}><ArrowLeft size={16}/> Back</button>
        <div style={{ color:t.subText, fontSize:'11px' }}>Manage User</div>
        <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
          {msg && (
            <div style={{
              position:'fixed',
              top:'70px',
              left:'50%',
              transform:'translateX(-50%)',
              zIndex:9999,
              background:'rgba(34,197,94,0.95)',
              color:'white',
              padding:'10px 18px',
              borderRadius:'8px',
              fontSize:'12px',
              fontWeight:'600',
              boxShadow:'0 4px 16px rgba(0,0,0,0.3)',
              display:'flex',
              alignItems:'center',
              gap:'8px',
              animation:'toastSlide 0.3s ease',
              pointerEvents:'none',
              maxWidth:'90vw',
              whiteSpace:'nowrap',
              overflow:'hidden',
              textOverflow:'ellipsis'
            }}>
              <svg width='14' height='14' fill='none' stroke='white' viewBox='0 0 24 24' strokeWidth='3'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7'/>
              </svg>
              {msg}
            </div>
          )}

        </div>
      </div>
      <div style={{ maxWidth:'600px', margin:'0 auto', padding:'16px' }}>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:user.isBlocked?'#ef4444':'#22c55e', border:'1px solid '+(user.isBlocked?'#ef4444':'#22c55e') }}>{user.isBlocked?'● Blocked':'● Active'}</span>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:'#6366f1', border:'1px solid #6366f1' }}>Balance: {formatAmountWithUSD(user.balance||0, user.currency)}</span>
          <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'9px', fontWeight:'600', color:user.accountUpgraded?'#22c55e':'#64748b', border:'1px solid '+(user.accountUpgraded?'#22c55e':'#64748b') }}>{user.accountUpgraded?'Upgraded':'Standard'}</span>
        </div>
        <S title="Balance" t={t}>
          <input ref={balanceRef} defaultValue={convertAmount(user.balance||0, user.currency)} key={`bal-${user._id||user.id}`} placeholder={`Current: ${getCurrencySymbol(user.currency)}${convertAmount(user.balance||0, user.currency)} (${getCurrencyCode(user.currency)})`} type="number" style={inp}/>
          <div style={{ color:t.subText, fontSize:'8px', marginTop:'2px' }}>Enter value in {getCurrencyCode(user.currency)} · stored as USD</div>
          {btn(async()=>{const rawVal=parseFloat(balanceRef.current?.value||0);const code=getCurrencyCode(user.currency);const rates=JSON.parse(localStorage.getItem('fx_rates')||'{}');const rate=rates[code]||1;const usdVal=rawVal/rate;const r=await api('/users/'+id+'/balance','PUT',{balance:usdVal});if(r.user){setUser(r.user);if(balanceRef.current)balanceRef.current.value=convertAmount(r.user.balance||0, r.user.currency);} showMsg('Balance updated');}, 'Set Balance', <DollarSign size={12}/>)}
          <div style={{ marginTop:'8px', color:t.subText, fontSize:'9px', marginBottom:'4px' }}>Profit</div>
          <input ref={profitRef} defaultValue={convertAmount(user.totalProfit||0, user.currency)} key={`profit-${user._id||user.id}`} placeholder={`Current: ${getCurrencySymbol(user.currency)}${convertAmount(user.totalProfit||0, user.currency)} (${getCurrencyCode(user.currency)})`} type="number" style={inp}/>
          <div style={{ color:t.subText, fontSize:'8px', marginTop:'2px' }}>Enter value in {getCurrencyCode(user.currency)} · stored as USD</div>
          {btn(async()=>{const rawVal=parseFloat(profitRef.current?.value||0);const code=getCurrencyCode(user.currency);const rates=JSON.parse(localStorage.getItem('fx_rates')||'{}');const rate=rates[code]||1;const usdVal=rawVal/rate;const r=await api('/users/'+id+'/total-profit','PUT',{totalProfit:usdVal});if(r.user){setUser(r.user);if(profitRef.current)profitRef.current.value=convertAmount(r.user.totalProfit||0, r.user.currency);} showMsg('Profit updated');}, 'Set Profit', <TrendingUp size={12}/>)}
        </S>
        <S title="Record Deposit" t={t}>
          <div style={{ color:t.subText, fontSize:'9px', marginBottom:'6px', lineHeight:'1.5' }}>
            Adds to user's Total Deposits stat only. Does NOT affect live balance.
          </div>
          <input ref={depositAmountRef} defaultValue="" placeholder={`Amount in ${getCurrencyCode(user.currency)}`} type="number" style={inp}/>
          <div style={{ color:t.subText, fontSize:'8px', marginTop:'2px', marginBottom:'6px' }}>Enter value in {getCurrencyCode(user.currency)} · stored as USD</div>
          <input ref={depositNoteRef} defaultValue="" placeholder="Note (optional, e.g. 'Bonus credit')" type="text" style={inp}/>
          <div style={{ marginTop:'8px' }}>
            {btn(async()=>{
              const localVal = parseFloat(depositAmountRef.current?.value||0);
              if(!localVal || localVal <= 0) return showMsg('Enter valid amount');
              const code = getCurrencyCode(user.currency);
              const rates = JSON.parse(localStorage.getItem('fx_rates')||'{}');
              const rate = rates[code] || 1;
              const usdAmount = localVal / rate;
              const note = depositNoteRef.current?.value || '';
              try {
                const r = await api('/users/'+id+'/add-deposit','POST',{amount:usdAmount, notes:note, method:'admin_credit'});
                if(r.user) setUser(r.user);
                if(depositAmountRef.current) depositAmountRef.current.value='';
                if(depositNoteRef.current) depositNoteRef.current.value='';
                showMsg('Deposit recorded silently · totalDeposits updated');
              } catch(e) {
                showMsg('Failed: '+(e.message||'error'));
              }
            }, 'Record Deposit', <DollarSign size={12}/>)}
          </div>
        </S>
        <S title="Admin Message" t={t}>
          {user.adminMessage&&<div style={{ color:'#f59e0b', fontSize:'10px', marginBottom:'8px', padding:'8px', background:'rgba(245,158,11,0.1)', borderRadius:'6px' }}>Current: {user.adminMessage}</div>}
          <textarea ref={msgTextRef} defaultValue={user.adminMessage||''} key={`msg-${user._id||user.id}`} placeholder="Message to user..." rows={3} style={{ ...inp, resize:'vertical' }}/>
          <div style={{ display:'flex', gap:'6px' }}>
            {btn(async()=>{const v=msgTextRef.current?.value||'';await api('/users/'+id+'/message','POST',{message:v});setUser(prev=>({...prev,adminMessage:v}));showMsg('Sent');}, 'Send', <Send size={12}/>)}
            {btn(async()=>{await api('/users/'+id+'/message','DELETE');setUser(prev=>({...prev,adminMessage:''}));if(msgTextRef.current)msgTextRef.current.value='';showMsg('Cleared');}, 'Clear', <X size={12}/>)}
          </div>
        </S>
        <S title="Account Controls" t={t}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            <button type="button" disabled={clicked==='block'} onClick={async()=>{setClicked('block');try{await api('/users/'+id+'/block','PUT');setUser(p=>({...p,isBlocked:!p.isBlocked}));showMsg('Updated');}finally{setTimeout(()=>setClicked(''),500);}}} style={{ padding:'9px', background:clicked==='block'?'rgba(99,102,241,0.15)':'transparent', border:'1.5px solid '+(clicked==='block'?'#6366f1':t.tableDivider), color:clicked==='block'?'#6366f1':t.text, fontSize:'10px', fontWeight:'600', cursor:clicked==='block'?'wait':'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{clicked==='block'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):(user.isBlocked?<><Unlock size={12}/> Unblock</>:<><Lock size={12}/> Block</>)}</button>
            <button type="button" disabled={clicked==='wblock'} onClick={async()=>{setClicked('wblock');try{await api('/users/'+id+'/withdrawal-block','PUT');setUser(p=>({...p,withdrawalBlocked:!p.withdrawalBlocked}));showMsg('Updated');}finally{setTimeout(()=>setClicked(''),500);}}} style={{ padding:'9px', background:clicked==='wblock'?'rgba(99,102,241,0.15)':'transparent', border:'1.5px solid '+(clicked==='wblock'?'#6366f1':t.tableDivider), color:clicked==='wblock'?'#6366f1':t.text, fontSize:'10px', fontWeight:'600', cursor:clicked==='wblock'?'wait':'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{clicked==='wblock'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):(user.withdrawalBlocked?<><CheckCircle size={12}/> Allow W.</>:<><Ban size={12}/> Block W.</>)}</button>
            <button type="button" onClick={()=>setShowEmailModal(true)} style={{ padding:'9px', background:'transparent', border:'1.5px solid '+t.tableDivider, color:t.text, fontSize:'10px', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}><Mail size={12}/> Email User</button>
          </div>
        </S>
        <S title="Account Plan" t={t}>
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Current: <span style={{ color:user.currentPlan!=='none'?'#6366f1':'#64748b', fontWeight:'600' }}>{user.currentPlan!=='none'?user.currentPlan:'None'}</span></div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'8px' }}>
            {['BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','ELITE'].map(plan=>(
              <button type="button" key={plan} disabled={clicked==='plan-'+plan} onClick={async()=>{setClicked('plan-'+plan);try{await api('/users/'+id+'/plan','PUT',{plan});setUser(p=>({...p,currentPlan:plan}));showMsg('Plan: '+plan);}finally{setTimeout(()=>setClicked(''),500);}}} style={{ padding:'5px 10px', background:user.currentPlan===plan?'#6366f1':(clicked==='plan-'+plan?'rgba(99,102,241,0.15)':'transparent'), border:'1px solid '+(user.currentPlan===plan||clicked==='plan-'+plan?'#6366f1':t.border), color:user.currentPlan===plan?'white':(clicked==='plan-'+plan?'#6366f1':t.text), fontSize:'9px', fontWeight:'600', cursor:clicked==='plan-'+plan?'wait':'pointer', borderRadius:'4px' }}>{clicked==='plan-'+plan?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):plan}</button>
            ))}
          </div>
          {btn(async()=>{await api('/users/'+id+'/plan','PUT',{plan:'none'});setUser(p=>({...p,currentPlan:'none'}));showMsg('Plan removed');}, 'Remove Plan', <X size={12}/>)}
        </S>
        <S title="Subscription" t={t}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px', padding:'10px 12px', background:t.bg, borderRadius:'6px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:(user.subscription?.active && user.subscription?.expiresAt && new Date(user.subscription.expiresAt) > new Date())?'#22c55e':'#ef4444' }}/>
            <div style={{ flex:1 }}>
              <div style={{ color:t.text, fontSize:'11px', fontWeight:'700' }}>
                {(user.subscription?.active && user.subscription?.expiresAt && new Date(user.subscription.expiresAt) > new Date()) ? 'PRO ACTIVE' : 'NOT SUBSCRIBED'}
              </div>
              {user.subscription?.expiresAt && (
                <div style={{ color:t.subText, fontSize:'9px', marginTop:'2px' }}>
                  {(new Date(user.subscription.expiresAt) > new Date())
                    ? 'Expires: ' + new Date(user.subscription.expiresAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) + ' (' + Math.ceil((new Date(user.subscription.expiresAt) - new Date()) / (1000*60*60*24)) + ' days left)'
                    : 'Expired: ' + new Date(user.subscription.expiresAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
                  }
                </div>
              )}
              {user.subscription?.activatedBy && (
                <div style={{ color:t.faintText, fontSize:'9px', marginTop:'2px' }}>Activated by: {user.subscription.activatedBy}</div>
              )}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
            {btn(async()=>{const r=await api('/users/'+id+'/subscription/grant','POST',{days:365});if(r.user)setUser(r.user);showMsg('Granted 1 year');}, 'Grant 1 Year', <Crown size={12}/>)}
            {btn(async()=>{const r=await api('/users/'+id+'/subscription/grant','POST',{days:30});if(r.user)setUser(r.user);showMsg('Granted 30 days');}, 'Grant 30 Days', <Crown size={12}/>)}
            {btn(async()=>{const r=await api('/users/'+id+'/subscription/extend','POST',{days:30});if(r.user)setUser(r.user);showMsg('Extended 30 days');}, 'Extend 30 Days', <Clock size={12}/>)}
            {btn(async()=>{if(!window.confirm('Revoke Pro subscription?'))return;const r=await api('/users/'+id+'/subscription/revoke','POST');if(r.user)setUser(r.user);showMsg('Revoked');}, 'Revoke Pro', <X size={12}/>)}
          </div>
        </S>
        <S title="Withdrawal Code" t={t}>
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'8px' }}>Status: <span style={{ color:user.withdrawalCodeRequired?'#6366f1':'#64748b', fontWeight:'600' }}>{user.withdrawalCodeRequired?'Active':'Not Set'}</span></div>
          {user.withdrawalCode&&<div style={{ background:t.cardBg2, border:`1px solid ${t.border}`, borderRadius:'6px', padding:'10px', textAlign:'center', marginBottom:'8px' }}><div style={{ color:t.subText, fontSize:'8px', marginBottom:'4px', letterSpacing:'1px' }}>CODE</div><div style={{ color:t.text, fontSize:'18px', fontWeight:'800', letterSpacing:'4px' }}>{user.withdrawalCode}</div></div>}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {btn(async()=>{await api('/users/'+id+'/withdrawal-code','PUT',{withdrawalCodeRequired:true,generate:true});const r=await api('/users/'+id);setUser(r);showMsg('Generated');}, user.withdrawalCodeRequired?'New Code':'Generate', <Shield size={12}/>)}
            {user.withdrawalCodeRequired&&btn(async()=>{await api('/users/'+id+'/withdrawal-code','PUT',{withdrawalCodeRequired:false,generate:false});setUser(p=>({...p,withdrawalCodeRequired:false,withdrawalCode:''}));showMsg('Removed');}, 'Remove', <X size={12}/>)}
            {user.withdrawalCodeRequired&&btn(()=>api('/users/'+id+'/send-withdrawal-code','POST').then(()=>showMsg('Sent to '+user.email)), 'Send Code', <Mail size={12}/>)}
          </div>
        </S>
        <S title="Registration Fee" t={t}>
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'10px' }}>
            Status: <span style={{ color:user.registrationFeeRequired?(user.registrationFeePaid?'#22c55e':'#ef4444'):'#64748b', fontWeight:'600', display:'inline-flex', alignItems:'center', gap:'4px' }}>
              {user.registrationFeeRequired
                ? (user.registrationFeePaid
                    ? (<><Check size={11} strokeWidth={3}/> Paid · {formatAmountWithUSD(user.registrationFeeAmount||0, user.currency)}</>)
                    : (<><AlertCircle size={11}/> Required · Awaiting Payment</>))
                : 'Not Required'}
            </span>
          </div>

          {/* Stage 1: Toggle fee requirement (no amount needed) */}
          {!user.registrationFeeRequired && (
            <>
              <div style={{ color:t.subText, fontSize:'9px', marginBottom:'8px', lineHeight:'1.5' }}>
                Activate fee requirement. User will be prompted to contact support to complete payment.
              </div>
              <button type="button" disabled={clicked==='regfee-add'} onClick={async()=>{
                setClicked('regfee-add');
                try{
                  const r = await api('/users/'+id+'/registration-fee','PUT',{required:true, amount:0});
                  if(r.user) setUser(r.user);
                  showMsg('Fee requirement activated · user notified');
                } catch(e) {
                  showMsg('Failed: '+(e.message||'error'));
                } finally {
                  setTimeout(()=>setClicked(''),500);
                }
              }} style={{ width:'100%', padding:'9px', background:clicked==='regfee-add'?'rgba(99,102,241,0.15)':'#6366f1', border:'1.5px solid #6366f1', color:clicked==='regfee-add'?'#6366f1':'white', fontSize:'10px', fontWeight:'700', cursor:clicked==='regfee-add'?'wait':'pointer', borderRadius:'6px' }}>
                {clicked==='regfee-add'?'Activating...':'+ Add Registration Fee Requirement'}
              </button>
            </>
          )}

          {/* Stage 2: Fee required, awaiting payment — approve with actual amount */}
          {user.registrationFeeRequired && !user.registrationFeePaid && (
            <>
              <div style={{ color:t.subText, fontSize:'9px', marginBottom:'4px' }}>
                Approve & confirm payment — enter amount user paid in {getCurrencyCode(user.currency)}
              </div>
              <div style={{ display:'flex', gap:'6px', marginBottom:'8px' }}>
                <input ref={regFeeRef} defaultValue="" placeholder={`Amount paid (${getCurrencyCode(user.currency)})`} type="number" style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'8px 10px', outline:'none', borderRadius:'6px' }}/>
                <button type="button" disabled={clicked==='regfee-approve'} onClick={async()=>{
                  const localVal = parseFloat(regFeeRef.current?.value||0);
                  if(!localVal) return showMsg('Enter amount user paid');
                  const code = getCurrencyCode(user.currency);
                  const rates = JSON.parse(localStorage.getItem('fx_rates')||'{}');
                  const rate = rates[code] || 1;
                  const usdAmount = localVal / rate;
                  setClicked('regfee-approve');
                  try{
                    // Save the exact amount paid + mark as paid (triggers confirmation email)
                    await api('/users/'+id+'/registration-fee','PUT',{required:true, amount:usdAmount});
                    const r = await api('/users/'+id+'/registration-fee/mark-paid','PUT');
                    if(r.user) setUser(r.user);
                    if(regFeeRef.current) regFeeRef.current.value='';
                    showMsg('Approved · confirmation email sent in '+code);
                  } catch(e) {
                    showMsg('Failed: '+(e.message||'error'));
                  } finally {
                    setTimeout(()=>setClicked(''),500);
                  }
                }} style={{ padding:'8px 14px', background:clicked==='regfee-approve'?'rgba(34,197,94,0.2)':'#22c55e', border:'1.5px solid #22c55e', color:'white', fontSize:'10px', fontWeight:'700', cursor:clicked==='regfee-approve'?'wait':'pointer', borderRadius:'6px', whiteSpace:'nowrap' }}>
                  {clicked==='regfee-approve'?'Approving...':(<><Check size={11} strokeWidth={3}/> Approve & Confirm</>)}
                </button>
              </div>
              <button type="button" disabled={clicked==='regfee-revoke'} onClick={async()=>{
                if(!window.confirm('Cancel registration fee requirement entirely?'))return;
                setClicked('regfee-revoke');
                try{
                  const r=await api('/users/'+id+'/registration-fee/revoke','PUT');
                  if(r.user)setUser(r.user);
                  showMsg('Cancelled');
                } finally {
                  setTimeout(()=>setClicked(''),500);
                }
              }} style={{ width:'100%', padding:'7px', background:'transparent', border:'1.5px solid #ef4444', color:'#ef4444', fontSize:'10px', fontWeight:'700', cursor:clicked==='regfee-revoke'?'wait':'pointer', borderRadius:'6px' }}>
                {clicked==='regfee-revoke'?'Cancelling...':'Cancel Fee Requirement'}
              </button>
            </>
          )}

          {/* Stage 3: Already paid */}
          {user.registrationFeePaid && (
            <button type="button" disabled={clicked==='regfee-revoke'} onClick={async()=>{
              if(!window.confirm('Revoke fee status? User will be required to pay again.'))return;
              setClicked('regfee-revoke');
              try{
                const r=await api('/users/'+id+'/registration-fee/revoke','PUT');
                if(r.user)setUser(r.user);
                showMsg('Revoked');
              } finally {
                setTimeout(()=>setClicked(''),500);
              }
            }} style={{ width:'100%', padding:'8px', background:'transparent', border:'1.5px solid #ef4444', color:'#ef4444', fontSize:'10px', fontWeight:'700', cursor:'pointer', borderRadius:'6px' }}>
              {clicked==='regfee-revoke'?'Revoking...':'Revoke Paid Status'}
            </button>
          )}
        </S>
        <S title="Add Fee" t={t}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px' }}>
            <select value={feeType} onChange={e=>setFeeType(e.target.value)} style={{ background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'10px', padding:'7px', outline:'none', borderRadius:'6px' }}>
              <option value="processing">Processing Fee</option>
              <option value="tax">Tax / Compliance</option>
              <option value="conversion">Conversion Fee</option>
              <option value="inactivity">Inactivity Fee</option>
              <option value="maintenance">Maintenance Fee</option>
              <option value="custom">Custom</option>
            </select>
            <input type="number" ref={feeAmountRef} defaultValue="" placeholder="Amount $" style={{ background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'10px', padding:'7px', outline:'none', borderRadius:'6px', boxSizing:'border-box' }}/>
          </div>
          <input ref={feeLabelRef} defaultValue="" placeholder="Fee name (shown to user)" style={inp}/>
          <textarea ref={feeDescRef} defaultValue="" placeholder="Description (shown on popup)" rows={2} style={{ ...inp, resize:'vertical' }}/>
          <button type="button" disabled={clicked==='addfee'} onClick={async()=>{const fa=parseFloat(feeAmountRef.current?.value||0);if(!fa||fa<=0)return showMsg('Enter amount');const fl=feeLabelRef.current?.value||'';const fd=feeDescRef.current?.value||'';setClicked('addfee');try{const r=await api('/users/'+id+'/fees','POST',{type:feeType,label:fl||feeType,amount:fa,description:fd});setUser(r.user);showMsg('Fee added');if(feeLabelRef.current)feeLabelRef.current.value='';if(feeAmountRef.current)feeAmountRef.current.value='';if(feeDescRef.current)feeDescRef.current.value='';}finally{setTimeout(()=>setClicked(''),500);}}} style={{ width:'100%', padding:'9px', background:clicked==='addfee'?'rgba(99,102,241,0.15)':'transparent', border:'1.5px solid '+(clicked==='addfee'?'#6366f1':t.tableDivider), color:clicked==='addfee'?'#6366f1':t.text, fontSize:'10px', fontWeight:'600', cursor:clicked==='addfee'?'wait':'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', marginBottom:'8px' }}>{clicked==='addfee'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):'+ Add Fee & Notify'}</button>
          {(user.pendingFees||[]).length>0&&(user.pendingFees||[]).map((fee,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:`1px solid ${t.tableRowBorder}` }}>
              <div><div style={{ color:t.text, fontSize:'10px', fontWeight:'600' }}>{fee.label}</div><div style={{ color:t.subText, fontSize:'9px' }}>${fee.amount?.toFixed(2)}</div></div>
              <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
                <span style={{ color:fee.paid?'#22c55e':'#ef4444', fontSize:'9px', fontWeight:'600' }}>{fee.paid?'Paid':'Unpaid'}</span>
                {!fee.paid&&<button type="button" disabled={clicked==='paid-'+fee._id} onClick={async()=>{setClicked('paid-'+fee._id);try{const r=await api('/users/'+id+'/fees/'+fee._id+'/paid','PUT');setUser(r.user);showMsg('Marked paid');}finally{setTimeout(()=>setClicked(''),500);}}} style={{ padding:'3px 8px', background:clicked==='paid-'+fee._id?'rgba(99,102,241,0.15)':'transparent', border:'1px solid '+(clicked==='paid-'+fee._id?'#6366f1':t.border), color:clicked==='paid-'+fee._id?'#6366f1':t.text, fontSize:'9px', cursor:clicked==='paid-'+fee._id?'wait':'pointer', borderRadius:'4px', minWidth:'55px' }}>{clicked==='paid-'+fee._id?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):'Mark Paid'}</button>}
                <button type="button" disabled={clicked==='delfee-'+fee._id} onClick={async()=>{setClicked('delfee-'+fee._id);try{const r=await api('/users/'+id+'/fees/'+fee._id,'DELETE');setUser(r.user);showMsg('Removed');}finally{setTimeout(()=>setClicked(''),500);}}} style={{ padding:'3px 8px', background:clicked==='delfee-'+fee._id?'rgba(239,68,68,0.15)':'transparent', border:'1px solid '+(clicked==='delfee-'+fee._id?'#ef4444':t.border), color:'#ef4444', fontSize:'9px', cursor:clicked==='delfee-'+fee._id?'wait':'pointer', borderRadius:'4px', minWidth:'24px' }}>{clicked==='delfee-'+fee._id?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):'✕'}</button>
              </div>
            </div>
          ))}
        </S>
        <S title="Account Upgrade" t={t}>
          {/* Status Display */}
          <div style={{ padding:'12px 14px', background:t.bg, borderRadius:'8px', marginBottom:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', border:`1px solid ${user.accountUpgraded?'rgba(34,197,94,0.3)':t.border}` }}>
            <div>
              <div style={{ fontSize:'9px', color:t.subText, fontWeight:'600', letterSpacing:'1.2px' }}>STATUS</div>
              <div style={{ fontSize:'13px', fontWeight:'700', color: user.accountUpgraded?'#22c55e':t.subText, marginTop:'4px', display:'flex', alignItems:'center', gap:'5px' }}>
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:user.accountUpgraded?'#22c55e':'#64748b', display:'inline-block' }}></span>
                {user.accountUpgraded ? 'UPGRADED' : 'STANDARD'}
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'9px', color:t.subText, fontWeight:'600', letterSpacing:'1.2px' }}>MAX WITHDRAWAL</div>
              <div style={{ fontSize:'15px', fontWeight:'700', color:t.text, marginTop:'4px' }}>{getCurrencySymbol(user.currency)}{convertAmount(user.minimumWithdrawal||100, user.currency)}</div>
            </div>
          </div>

          {/* Input + Upgrade Button */}
          <div style={{ color:t.subText, fontSize:'10px', marginBottom:'6px' }}>New Maximum Withdrawal ({getCurrencyCode(user.currency)})</div>
          <input ref={minWRef} type="number" defaultValue={convertAmount(user.minimumWithdrawal||100, user.currency)} key={`minw-${user._id}`} placeholder="Enter new minimum" style={{ width:'100%', background:t.inputBg, border:`1px solid ${t.border}`, color:t.text, fontSize:'11px', padding:'9px 12px', outline:'none', borderRadius:'6px', boxSizing:'border-box', marginBottom:'8px' }}/>

          <button type="button" disabled={clicked==='upgrade'} onClick={async()=>{const localV=parseFloat(minWRef.current?.value||0);if(!localV||localV<1)return showMsg('Minimum must be at least 1');const code=getCurrencyCode(user.currency);const rates=JSON.parse(localStorage.getItem('fx_rates')||'{}');const rate=rates[code]||1;const v=localV/rate;setClicked('upgrade');try{await api('/users/'+id+'/minimum-withdrawal','PUT',{minimumWithdrawal:v});const r=await api('/users/'+id+'/account-upgrade','PUT',{forceUpgrade:true});if(r.user)setUser(p=>({...r.user,minimumWithdrawal:v}));else setUser(p=>({...p,accountUpgraded:true,minimumWithdrawal:v}));showMsg('Upgraded · Min set to '+getCurrencySymbol(user.currency)+v);}catch(e){showMsg('Failed: '+e.message);}finally{setTimeout(()=>setClicked(''),500);}}} style={{ width:'100%', padding:'11px', background:clicked==='upgrade'?'rgba(34,197,94,0.15)':'linear-gradient(135deg, #22c55e, #16a34a)', border:'none', color:'#ffffff', fontSize:'11px', fontWeight:'700', cursor:clicked==='upgrade'?'wait':'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', marginBottom:'8px', letterSpacing:'0.5px' }}>{clicked==='upgrade'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):(<><ArrowUpCircle size={13}/> {user.accountUpgraded?'Update Max Withdrawal':'Upgrade & Set Max'}</>)}</button>

          {user.accountUpgraded && (
            <button type="button" disabled={clicked==='revoke-upg'} onClick={async()=>{if(!window.confirm('Revoke upgrade and reset min withdrawal to 100?'))return;setClicked('revoke-upg');try{await api('/users/'+id+'/minimum-withdrawal','PUT',{minimumWithdrawal:100});const r=await api('/users/'+id+'/account-upgrade','PUT',{forceUpgrade:false});if(r.user)setUser(p=>({...r.user,minimumWithdrawal:100}));else setUser(p=>({...p,accountUpgraded:false,minimumWithdrawal:100}));if(minWRef.current)minWRef.current.value='100';showMsg('Upgrade revoked · Min reset to 100');}catch(e){showMsg('Failed: '+e.message);}finally{setTimeout(()=>setClicked(''),500);}}} style={{ width:'100%', padding:'9px', background:'transparent', border:`1.5px solid ${t.tableDivider}`, color:'#ef4444', fontSize:'10px', fontWeight:'600', cursor:clicked==='revoke-upg'?'wait':'pointer', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{clicked==='revoke-upg'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):(<><RotateCcw size={11}/> Revoke (Reset to $100)</>)}</button>
          )}
        </S>
        <S title="Danger Zone" t={t}>
          <button type="button" disabled={clicked==='deluser'} onClick={async()=>{if(!window.confirm('DELETE '+user.email+'?'))return;setClicked('deluser');try{await api('/users/'+id,'DELETE');navigate('/admin');}catch(e){setTimeout(()=>setClicked(''),500);}}} style={{ width:'100%', padding:'11px', background:clicked==='deluser'?'#dc2626':'#ef4444', border:'none', color:'white', fontSize:'12px', fontWeight:'700', cursor:clicked==='deluser'?'wait':'pointer', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>{clicked==='deluser'?(<><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.2s'}}>.</span><span style={{animation:'dotPulse 1.4s infinite',animationDelay:'0.4s'}}>.</span></>):(<><Trash2 size={14}/> Delete User Account</>)}</button>
        </S>
      </div>

      {showEmailModal && (
        <>
          <div onClick={() => setShowEmailModal(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:300 }}/>
          <div onClick={e=>e.stopPropagation()} style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:301, background:'white', padding:'28px 24px', width:'320px', borderRadius:'8px', fontFamily:"'Segoe UI',sans-serif" }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <div style={{ color:'#111', fontSize:'13px', fontWeight:'700' }}>Email {user.firstName}</div>
              <button type="button" onClick={() => setShowEmailModal(false)} style={{ background:'none', border:'none', fontSize:'20px', cursor:'pointer', color:'#888' }}>×</button>
            </div>
            <div style={{ color:'#888', fontSize:'10px', marginBottom:'14px' }}>To: {user.email}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginBottom:'14px' }}>
              {[
                {value:'custom', label:'Custom Message'},
                {value:'upgradePromo', label:'Upgrade Plans'},
                {value:'registrationFee', label:'Registration Fee'},
                {value:'adminMessage', label:'Admin Announcement'},
              ].map(opt => (
                <div key={opt.value} onClick={() => setEmailType(opt.value)}
                  style={{ padding:'8px 12px', background:emailType===opt.value?'rgba(99,102,241,0.1)':'#e6e6e6', border:'1px solid '+(emailType===opt.value?'#6366f1':'#e2e8f0'), cursor:'pointer', color:emailType===opt.value?'#6366f1':'#555', fontSize:'11px', fontWeight:emailType===opt.value?'600':'400', borderRadius:'6px' }}>
                  {opt.label}
                </div>
              ))}
            </div>
            {emailType==='registrationFee' && (
              <div style={{ marginBottom:'12px' }}>
                <div style={{ color:'#888', fontSize:'10px', marginBottom:'4px' }}>Fee Amount ($)</div>
                <input value={regFeeAmount} onChange={e=>setRegFeeAmount(e.target.value)} placeholder="e.g. 250"
                  style={{ width:'100%', background:'#e6e6e6', border:'1px solid #e2e8f0', color:'#111', fontSize:'11px', padding:'8px 10px', outline:'none', borderRadius:'6px', boxSizing:'border-box' }}/>
              </div>
            )}
            {(emailType==='custom'||emailType==='adminMessage') && (
              <>
                <div style={{ marginBottom:'10px' }}>
                  <div style={{ color:'#888', fontSize:'10px', marginBottom:'4px' }}>Subject</div>
                  <input value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Email subject..."
                    style={{ width:'100%', background:'#e6e6e6', border:'1px solid #e2e8f0', color:'#111', fontSize:'11px', padding:'8px 10px', outline:'none', borderRadius:'6px', boxSizing:'border-box' }}/>
                </div>
                <div style={{ marginBottom:'14px' }}>
                  <div style={{ color:'#888', fontSize:'10px', marginBottom:'4px' }}>Message</div>
                  <textarea value={emailMessage} onChange={e=>setEmailMessage(e.target.value)} placeholder="Type your message..." rows={4}
                    style={{ width:'100%', background:'#e6e6e6', border:'1px solid #e2e8f0', color:'#111', fontSize:'11px', padding:'8px 10px', outline:'none', resize:'vertical', boxSizing:'border-box', borderRadius:'6px' }}/>
                </div>
              </>
            )}
            <div style={{ display:'flex', gap:'8px' }}>
              <button type="button" onClick={() => setShowEmailModal(false)} style={{ flex:1, padding:'9px', background:'transparent', border:'1px solid #e2e8f0', color:'#888', fontSize:'10px', cursor:'pointer', borderRadius:'6px' }}>Cancel</button>
              <button type="button" onClick={async () => {
                setEmailSending(true);
                try {
                  if (emailType==='upgradePromo') await api('/users/'+id+'/send-upgrade-promo','POST');
                  else if (emailType==='registrationFee') await api('/users/'+id+'/send-registration-fee','POST',{amount:regFeeAmount});
                  else await api('/users/'+id+'/email','POST',{subject:emailSubject,message:emailMessage,type:emailType});
                  showMsg('Email sent!');
                  setShowEmailModal(false);
                } catch(e) { showMsg('Failed to send'); }
                setEmailSending(false);
              }} style={{ flex:1, padding:'9px', background:'#6366f1', border:'none', color:'white', fontSize:'10px', fontWeight:'700', cursor:'pointer', borderRadius:'6px' }}>
                {emailSending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        </>
      )}
    
      <style>{`
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.2; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
      </div>
  );
}
