import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { createWithdrawal, getWithdrawals } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatAmountWithCode, formatAmount, getCurrencySymbol } from '../utils/currency';

const methods = [
  { id: 'crypto', label: 'Crypto (Recommended)', desc: 'Withdraw your funds to your cryptocurrency wallet.', select: 'Select Crypto', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'bank', label: 'Bank Transfer', desc: 'Transfer your funds directly to your bank account.', select: 'Select Bank Transfer', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'cashapp', label: 'Cashapp', desc: 'Withdraw your funds to your Cashapp account.', select: 'Select Cashapp', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'paypal', label: 'Paypal', desc: 'Withdraw your funds via Paypal Account.', select: 'Select Paypal', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'westernunion', label: 'Western Union', desc: 'Withdraw your funds via Western Union.', select: 'Select Western Union', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { id: 'moneygram', label: 'Money Gram', desc: 'Withdraw your funds via Money Gram service.', select: 'Select Money Gram', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
];

export default function Withdraw() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [showMethodSelector, setShowMethodSelector] = useState(false);
  const [selected, setSelected] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  const [withdrawals, setWithdrawals] = useState([]);
  const [page, setPage] = useState(1);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const perPage = show;
  const [error, setError] = useState('');
  const [feePopup, setFeePopup] = useState(null);
  const [feeSuccess, setFeeSuccess] = useState(null);
  const [payingFee, setPayingFee] = useState(false);
  const [userFees, setUserFees] = useState([]);
  const prevFeesRef = useRef([]);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [coin, setCoin] = useState('USDT');
  const [network, setNetwork] = useState('TRC20');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [withdrawalCode, setWithdrawalCode] = useState('');

  const inputStyle = { width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '10px', padding: '10px 12px', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { color: t.subText, fontSize: '9px', display: 'block', marginBottom: '6px', fontWeight: '600' };

  const FEE_LABELS = {
    processing: 'Withdrawal Processing Fee',
    tax: 'Tax / Compliance Fee',
    conversion: 'Asset Conversion Fee',
    inactivity: 'Inactivity Fee',
    maintenance: 'Account Maintenance Fee',
    registration: 'Registration Fee',
  };

  const FEE_DESCRIPTIONS = {
    processing: 'A Withdrawal Processing Fee covers the administrative and operational costs required to securely process your withdrawal request, including payment gateway charges and transaction verification.',
    tax: 'A Tax / Compliance Fee is a mandatory regulatory charge that ensures your withdrawal complies with applicable tax laws and financial regulations governing international fund transfers.',
    conversion: 'A Currency Conversion Fee is applied to cover the cost of converting your funds between currencies or cryptocurrency pairs at the current market exchange rate.',
    inactivity: 'Your account has been temporarily deactivated due to inactivity. To reactivate your account and resume full access to all platform features including withdrawals, the Inactivity Fee must be settled. Please contact support to complete this process.',
    maintenance: 'An Account Maintenance Fee covers the ongoing costs of securing and maintaining your trading account, including platform access, security monitoring, and dedicated support.',
    registration: 'A Registration Fee is required to fully activate your trading account and unlock complete access to all platform investment and withdrawal features.',
  };

  const fetchUserFees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/user/fees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.fees) {
        const prevFees = prevFeesRef.current;
        const prevUnpaidIds = prevFees.filter(f => !f.paid && f.type !== 'registration').map(f => String(f._id));
        const currentUnpaid = data.fees.find(f => !f.paid && f.type !== 'registration');
        const lastPaid = [...data.fees].filter(f => f.paid).pop();

        setUserFees(data.fees);
        prevFeesRef.current = data.fees;

        if (currentUnpaid) {
          const isNewFee = !prevUnpaidIds.includes(String(currentUnpaid._id));
          if (isNewFee && lastPaid && prevFees.length > 0) {
            setFeeSuccess({ paidFee: lastPaid, nextFee: currentUnpaid });
          } else {
            setFeePopup(currentUnpaid);
          }
        }
      }
    } catch {}
  };

  const handlePayFee = async (fee) => {
    setPayingFee(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/user/pay-fee/${fee._id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.nextFee) {
        setFeeSuccess({ paidFee: fee, nextFee: data.nextFee });
        setFeePopup(null);
      } else if (data.allPaid) {
        setFeeSuccess({ paidFee: fee, nextFee: null, allPaid: true });
        setFeePopup(null);
        setUserFees([]);
      } else {
        setError(data.message || 'Payment failed');
        setFeePopup(null);
      }
    } catch (e) {
      setError('Fee payment failed. Please try again.');
    }
    setPayingFee(false);
  };

  useEffect(() => {
    if (location.state?.success) {
      setShowSuccess(true);
      window.history.replaceState({}, document.title);
    }
    fetchUserFees();
  }, []);

  useEffect(() => {
    getWithdrawals().then(data => {
      if (Array.isArray(data)) setWithdrawals(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const validate = () => {
    if (!amount || isNaN(amount) || Number(amount) < 100) { setError('Minimum withdrawal is $100.00'); return false; }
    if (selected === 'crypto' && (!address || address.length < 20)) { setError('Please enter a valid wallet address.'); return false; }
    if (selected === 'bank') {
      if (!bankName) { setError('Please enter your bank name.'); return false; }
      if (!accountName) { setError('Please enter your account name.'); return false; }
      if (!accountNumber || !/^\d+$/.test(accountNumber)) { setError('Please enter a valid account number.'); return false; }
      if (!swiftCode) { setError('Please enter your SWIFT/BIC code.'); return false; }
    }
    if (selected === 'cashapp' && (!address || address.length < 3)) { setError('Please enter a valid CashApp account.'); return false; }
    if (selected === 'paypal' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) { setError('Please enter a valid PayPal email.'); return false; }
    if (['westernunion','moneygram'].includes(selected)) {
      if (!receiverName) { setError("Please enter receiver's name."); return false; }
      if (!receiverAddress) { setError("Please enter receiver's address."); return false; }
    }
    setError(''); return true;
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    const body = {
      amount: parseFloat(amount),
      method: selected,
      ...(selected === 'crypto' && { coin, network, walletAddress: address }),
      ...((selected === 'cashapp' || selected === 'paypal') && { accountEmail: address }),
      ...((selected === 'westernunion' || selected === 'moneygram') && { receiverName, receiverAddress, receiverPhone }),
      ...(selected === 'bank' && { bankName, accountName, accountNumber, routingNumber: swiftCode }),
    };
    navigate('/dashboard/withdraw/verify-code', { state: body });
  };

  const statusColor = s => s === 'approved' ? '#22c55e' : s === 'pending' ? '#f59e0b' : '#ef4444';
  const totalPages = Math.ceil(withdrawals.length / perPage);
  const filtered = withdrawals.filter(w =>
    w.method?.toLowerCase().includes(search.toLowerCase()) ||
    w.status?.toLowerCase().includes(search.toLowerCase())
  ).slice(0, show);

  return (
    <>
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Montserrat', 'Montserrat', sans-serif", color: t.text }}>

      {/* Method Selector Modal */}
      {showMethodSelector && !showForm && (
        <>
          <div onClick={() => setShowMethodSelector(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 151, background: t.bg, padding: '20px', width: '340px', borderRadius: '4px', border: `1px solid ${t.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ color: t.text, fontSize: '11px', fontWeight: '700' }}>Transfer Limit: </span>
                <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700' }}>$100</span>
              </div>
              <button onClick={() => setShowMethodSelector(false)} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {methods.map(m => (
                <div key={m.id} onClick={() => { setSelected(m.id); setShowForm(true); setError(''); }} style={{ background: t.cardBg, border: `1px solid ${t.border}`, padding: '12px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <svg width="13" height="13" fill="none" stroke="#818cf8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={m.icon} />
                    </svg>
                    <span style={{ color: t.text, fontSize: '8px', fontWeight: '700' }}>{m.label}</span>
                  </div>
                  <p style={{ color: t.subText, fontSize: '7px', lineHeight: '1.5', marginBottom: '8px' }}>{m.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', border: `2px solid ${t.border}` }} />
                    <span style={{ color: t.subText, fontSize: '7px' }}>{m.select}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Withdrawal Form Modal */}
      {showForm && (
        <>
          <div onClick={() => { setShowForm(false); setShowMethodSelector(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 151, background: t.bg, padding: '20px', width: '320px', borderRadius: '4px', border: `1px solid ${t.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => { setShowForm(false); }} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '9px', cursor: 'pointer' }}>← Back</button>
                <span style={{ color: t.text, fontSize: '11px', fontWeight: '700' }}>{methods.find(m => m.id === selected)?.label}</span>
              </div>
              <button onClick={() => { setShowForm(false); setShowMethodSelector(false); }} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>

            {selected === 'crypto' && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Select Coin</label>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {['BTC','ETH','USDT','BNB','XRP','SOL'].map(c => <button key={c} onClick={() => setCoin(c)} style={{ padding: '4px 8px', background: coin === c ? '#6366f1' : t.subtleBg, border: 'none', color: 'white', fontSize: '7px', fontWeight: '700', cursor: 'pointer' }}>{c}</button>)}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Select Network</label>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['TRC20','ERC20','BEP20'].map(n => <button key={n} onClick={() => setNetwork(n)} style={{ padding: '4px 8px', background: network === n ? '#6366f1' : t.subtleBg, border: 'none', color: 'white', fontSize: '7px', fontWeight: '700', cursor: 'pointer' }}>{n}</button>)}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Wallet Address ({network})</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} placeholder={'Enter your ' + coin + ' wallet address'} style={inputStyle} />
                </div>
              </>
            )}
            {selected === 'bank' && (
              <>
                {[['Bank Name', bankName, setBankName, 'Enter your bank name'],['Account Name', accountName, setAccountName, 'Enter account name'],['Account Number', accountNumber, setAccountNumber, 'Digits only'],['SWIFT / BIC Code', swiftCode, setSwiftCode, 'e.g. BOFAUS3N']].map(([lbl, val, set, ph]) => (
                  <div key={lbl} style={{ marginBottom: '10px' }}>
                    <label style={labelStyle}>{lbl}</label>
                    <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={inputStyle} />
                  </div>
                ))}
              </>
            )}
            {['cashapp','paypal'].includes(selected) && (
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>{selected === 'cashapp' ? 'CashApp $Cashtag or Email' : 'PayPal Email'}</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder={selected === 'cashapp' ? 'Enter $cashtag or email' : 'Enter PayPal email'} style={inputStyle} />
              </div>
            )}
            {['westernunion','moneygram'].includes(selected) && (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <label style={labelStyle}>Receiver's Full Name</label>
                  <input value={receiverName} onChange={e => setReceiverName(e.target.value)} placeholder="Full name" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={labelStyle}>Receiver's Address</label>
                  <textarea value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} placeholder="Street, city, country" style={{...inputStyle, height: '60px', resize: 'none'}} />
                </div>
                {selected === 'moneygram' && (
                  <div style={{ marginBottom: '10px' }}>
                    <label style={labelStyle}>Receiver's Phone</label>
                    <input value={receiverPhone} onChange={e => setReceiverPhone(e.target.value)} placeholder="Phone number" style={inputStyle} />
                  </div>
                )}
              </>
            )}

            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Amount (USD)</label>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter amount' style={inputStyle} />

              {Number(amount) > 0 && user?.currency && user?.currency !== 'USD' && (
                <div style={{ fontSize: '9px', color: '#f59e0b', marginTop: '4px', marginBottom: '4px' }}>
                  ≈ {formatAmountWithCode(Number(amount), user.currency)} in your currency
                </div>
              )}
            </div>
            <div style={{ color: t.faintText, fontSize: '7px', marginBottom: '8px' }}>Available balance: {formatAmount(user?.balance || 0, user?.currency)}</div>
            <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, padding: '10px', marginBottom: '12px' }}>
              {[['Withdrawal Fee','1%'],['Minimum','$100.00'],['Processing','1-3 Business Days']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: t.subText, fontSize: '8px' }}>{k}</span>
                  <span style={{ color: t.text, fontSize: '8px', fontWeight: '600' }}>{v}</span>
                </div>
              ))}
            </div>
            {error && <div style={{ color: '#ef4444', fontSize: '8px', marginBottom: '8px' }}>{error}</div>}
            <button onClick={() => { if (validate()) setShowConfirm(true); }} style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>
              REQUEST WITHDRAWAL
            </button>
          </div>
        </>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <>
          <div onClick={() => setShowConfirm(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Montserrat', sans-serif" }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='22' height='22' fill='none' stroke='#6366f1' viewBox='0 0 24 24' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M5 10l7-7m0 0l7 7m-7-7v18'/></svg>
            </div>
            <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Confirm Withdrawal</div>
            <div style={{ color: '#555', fontSize: '9px', marginBottom: '4px' }}>Amount: <strong>${amount}</strong></div>
            <div style={{ color: '#555', fontSize: '9px', marginBottom: '20px' }}>Method: <strong>{methods.find(m => m.id === selected)?.label}</strong></div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '10px', background: t.subtleBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirm} style={{ flex: 1, padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '9px', fontWeight: '600', cursor: 'pointer' }}>Confirm</button>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Montserrat', sans-serif" }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='22' height='22' fill='none' stroke='#22c55e' viewBox='0 0 24 24' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7'/></svg>
            </div>
            <div style={{ color: '#111', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Withdrawal Request Submitted!</div>
            <div style={{ color: '#555', fontSize: '11px', marginBottom: '8px', lineHeight: '1.8' }}>
              Dear Investor, your withdrawal request has been successfully submitted and is currently <strong>pending review</strong> by our team.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ color: '#888', fontSize: '9px', marginBottom: '6px', fontWeight: '600' }}>WHAT HAPPENS NEXT?</div>
              <div style={{ color: '#555', fontSize: '10px', lineHeight: '1.8' }}>
                1. Our team will review your request within 24-48 hours<br/>
                2. You will be notified via email once approved<br/>
                3. Funds will be sent to your provided details
              </div>
            </div>
            <div style={{ color: '#888', fontSize: '9px', marginBottom: '16px' }}>Check your withdrawal history for status updates.</div>
            <button onClick={() => setShowSuccess(false)} style={{ padding: '10px 28px', background: '#6366f1', border: 'none', color: 'white', fontSize: '11px', fontWeight: '700', cursor: 'pointer', borderRadius: '6px' }}>Check History</button>
          </div>
        </>
      )}

      {/* Header */}
      <PageHeader title="Withdraw" />
      {/* Fee Alert Banner - TOP */}
      {userFees.filter(f => !f.paid).length > 0 && (
        <div onClick={() => setFeePopup(userFees.find(f => !f.paid && f.type !== 'registration'))}
          style={{ margin: '10px 16px 0', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width='16' height='16' fill='none' stroke='#ef4444' strokeWidth='2' viewBox='0 0 24 24'><path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/><line x1='12' y1='9' x2='12' y2='13'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>
            <div>
              <div style={{ color: '#ef4444', fontSize: '10px', fontWeight: '700' }}>{userFees.find(f=>!f.paid&&f.type==='registration') ? 'Withdrawal Not Available' : "We're unable to process your withdrawal"}</div>
              <div style={{ color: '#ef4444', fontSize: '8px', opacity: 0.8 }}>{userFees.find(f=>!f.paid&&f.type==='registration') ? 'Pending Registration Fee — Click to view and pay' : userFees.filter(f=>!f.paid&&f.type!=='registration').map(f=>`${FEE_LABELS[f.type]||f.label} not settled`).join(', ')+' — Click to view and pay'}</div>
            </div>
          </div>
          <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700' }}>→</span>
        </div>
      )}

      

      <div style={{ padding: '16px' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => {
                const regFee = userFees.find(f => f.type === 'registration' && !f.paid);
                if (regFee) { setFeePopup(regFee); return; }
                navigate('/dashboard/withdraw/new');
              }} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '9px', fontWeight: '700', padding: '8px 14px', cursor: 'pointer' }}>
            + New Withdrawal
          </button>
          <span style={{ color: t.subText, fontSize: '9px' }}>Recent Withdrawals</span>
        </div>

        {/* Table */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.subtleBorder}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Show</span>
              <select value={show} onChange={e => setShow(Number(e.target.value))} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none' }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
              <span style={{ color: t.subText, fontSize: '8px' }}>entries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Search:</span>
              <input value={search} onChange={e => setSearch(e.target.value)} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '90px' }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: t.tableHeaderBg }}>
                {['Amount','Method','Status','Date Created'].map((h,i) => (
                  <th key={i} style={{ color: t.subText, fontSize: '8px', fontWeight: '700', padding: '8px 10px', borderRight: '1px solid #6366f1', borderBottom: '1px solid #6366f1', textAlign: 'left' }}>{h} ↕</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan='4' style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan='4' style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No data available in table</td></tr>
              ) : filtered.map((w, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${t.tableRowBorder}`, background: i % 2 === 0 ? 'transparent' : t.subtleBg }}>
                  <td style={{ padding: '8px 10px', color: '#ec4899', fontSize: '8px', fontWeight: '700', borderRight: `1px solid ${t.subtleBorder}` }}>-${w.amount?.toFixed(2)}</td>
                  <td style={{ padding: '8px 10px', color: t.subText, fontSize: '8px', borderRight: `1px solid ${t.subtleBorder}` }}>{w.method}</td>
                  <td style={{ padding: '8px 10px', borderRight: `1px solid ${t.subtleBorder}` }}>
                    <span style={{ background: statusColor(w.status) + '20', color: statusColor(w.status), fontSize: '7px', padding: '2px 6px', display: 'inline-block', textTransform: 'capitalize' }}>{w.status}</span>
                  </td>
                  <td style={{ padding: '8px 10px', color: t.subText, fontSize: '8px' }}>{new Date(w.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length} of {withdrawals.length} entries</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setPage(1)} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page === 1 ? 'default' : 'pointer' }}>«</button>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page === 1 ? 'default' : 'pointer' }}>‹</button>
              <span style={{ color: t.subText, fontSize: '8px' }}>Page {page} of {totalPages || 1}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page >= totalPages ? 'default' : 'pointer' }}>›</button>
              <button onClick={() => setPage(totalPages)} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page >= totalPages ? 'default' : 'pointer' }}>»</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "16px", color: t.faintText, fontSize: "7px", borderTop: `1px solid ${t.tableRowBorder}`, marginTop: "16px" }}>2020-2026 &copy; Quantyrex Markets</div>

    </div>

      {/* Fee Block Popup */}
      {feePopup && (
        <>
          <div onClick={() => setFeePopup(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 301, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Montserrat', sans-serif" }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='22' height='22' fill='none' stroke='#ef4444' viewBox='0 0 24 24' strokeWidth='2'><path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/><line x1='12' y1='9' x2='12' y2='13'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>
            </div>
            <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
              {feePopup.type === 'registration' ? 'Action Required' : feePopup.type === 'inactivity' ? 'Account Deactivated' : 'Unable to Process Withdrawal'}
            </div>
            <div style={{ color: '#ef4444', fontSize: '11px', fontWeight: '600', marginBottom: '12px' }}>
              {feePopup.type === 'inactivity' ? 'Inactivity Fee Required' : `${FEE_LABELS[feePopup.type] || feePopup.label} Not Settled`}
            </div>
            <div style={{ color: '#555', fontSize: '11px', marginBottom: '14px', lineHeight: '1.7' }}>
              {FEE_DESCRIPTIONS[feePopup.type] || FEE_DESCRIPTIONS.processing}
            </div>
            <div style={{ color: '#888', fontSize: '10px', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount Due</div>
            <div style={{ color: '#ef4444', fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>${parseFloat(feePopup.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
            <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.7' }}>
              Dear Investor, your withdrawal request is on hold. Please contact support to complete this payment.
            </div>
            <button onClick={() => { setFeePopup(null); window.dispatchEvent(new Event('openLiveChat')); }}
              style={{ width: '100%', padding: '11px', background: '#6366f1', border: 'none', color: 'white', fontSize: '11px', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>
              Contact Support
            </button>
            <button onClick={() => setFeePopup(null)}
              style={{ width: '100%', padding: '11px', background: 'transparent', border: '1px solid #e2e8f0', color: '#888', fontSize: '11px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </>
      )}

      {/* Fee Success + Next Fee Popup */}
      {feeSuccess && (
        <>
          <div onClick={() => setFeeSuccess(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 301, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Montserrat', sans-serif" }}>
            {feeSuccess.allPaid ? (
              <>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width='24' height='24' fill='none' stroke='#22c55e' strokeWidth='2.5' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12'/></svg>
                </div>
                <div style={{ color: '#111', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Payment Successful</div>
                <div style={{ color: '#888', fontSize: '11px', marginBottom: '16px' }}>{FEE_LABELS[feeSuccess.paidFee.type] || feeSuccess.paidFee.label} ${parseFloat(feeSuccess.paidFee.amount || 0).toFixed(2)} paid</div>
                <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.8', textAlign: 'left' }}>
                  All outstanding fees have been settled. Our team is now processing your withdrawal and funds will be released to your account shortly.
                </div>
                <button onClick={() => setFeeSuccess(null)}
                  style={{ width: '100%', padding: '11px', background: '#6366f1', border: 'none', color: 'white', fontSize: '11px', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>
                  Done
                </button>
              </>
            ) : (
              <>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width='22' height='22' fill='none' stroke='#22c55e' strokeWidth='2.5' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12'/></svg>
                </div>
                <div style={{ color: '#111', fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>Payment Successful</div>
                <div style={{ color: '#888', fontSize: '11px', marginBottom: '20px' }}>{FEE_LABELS[feeSuccess.paidFee.type] || feeSuccess.paidFee.label} ${parseFloat(feeSuccess.paidFee.amount || 0).toFixed(2)} paid</div>
                <div style={{ color: '#111', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Withdrawal Still Pending</div>
                <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.8' }}>
                  Dear Investor, your {FEE_LABELS[feeSuccess.paidFee.type] || feeSuccess.paidFee.label} has been successfully processed and we are currently working on processing your withdrawal. However, a {FEE_LABELS[feeSuccess.nextFee.type] || feeSuccess.nextFee.label} has not yet been paid. This fee is required to complete and release your funds.
                </div>
                <button onClick={() => { setFeePopup(feeSuccess.nextFee); setFeeSuccess(null); }}
                  style={{ width: '100%', padding: '11px', background: '#6366f1', border: 'none', color: 'white', fontSize: '11px', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>
                  Why this happened →
                </button>
                <button onClick={() => setFeeSuccess(null)}
                  style={{ width: '100%', padding: '11px', background: 'transparent', border: '1px solid #e2e8f0', color: '#888', fontSize: '11px', cursor: 'pointer' }}>
                  Close
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}