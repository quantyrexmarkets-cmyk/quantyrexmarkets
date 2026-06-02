import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { createDeposit, getDeposits } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Copy, Crown, Lock, Check} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { formatAmountWithCode, formatAmount, getCurrencySymbol } from '../utils/currency';
import InlineLoader from '../components/InlineLoader';

export default function Deposit() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const isProDeposit = searchParams.get('purpose') === 'pro';
  const lockedAmount = searchParams.get('amount');
  const [depositMethod, setDepositMethod] = useState('crypto');
  const [amount, setAmount] = useState('');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [coin, setCoin] = useState('USDT');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const perPage = show;

  // Auto-fill from URL params (e.g. ?purpose=pro&amount=499)
  useEffect(() => {
    if (isProDeposit) {
      setShowForm(true);
      if (lockedAmount) setAmount(lockedAmount);
    }
  }, [isProDeposit, lockedAmount]);

    const coinData = {
    USDT: { address: 'TRLEtqXxtP9VV49nzvEuLhpo8S1UVFwGkS', network: 'TRC20 (Tron)' },
    ETH:  { address: '0xc6b676d4595687ac100dcb3f350fb6845df2daa8', network: 'Ethereum (ERC20)' },
    USDC: { address: '0xc6b676d4595687ac100dcb3f350fb6845df2daa8', network: 'BEP20 (Binance Smart Chain)' },
    BNB:  { address: '0xc6b676d4595687ac100dcb3f350fb6845df2daa8', network: 'BEP20 (Binance Smart Chain)' },
    SOL:  { address: 'EZT8kz4psrz7rTkbs8kN8ARbzQfkhzmutRRBefJLCiAN', network: 'Solana (SOL)' },
    BTC:  { address: '1B587SJUL5RSNjr41iU2e8eGencRRjUU8d', network: 'Bitcoin (BTC)' },
  };
  const walletAddress = coinData[coin]?.address || coinData['USDT'].address;
  const walletNetwork = coinData[coin]?.network || coinData['USDT'].network;

  useEffect(() => {
    getDeposits().then(data => {
      if (Array.isArray(data)) setDeposits(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).catch(() => {
      const el = document.createElement('textarea');
      el.value = walletAddress;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) < 10) { setError(`Minimum deposit is ${getCurrencySymbol(user?.currency)}10.`); return; }
    if (!fileData) { setError('Please upload payment proof.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('amount', Number(amount));
      formData.append('method', depositMethod);
      formData.append('purpose', isProDeposit ? 'pro_subscription' : 'general');
      formData.append('proof', fileData);
      const res = await createDeposit(formData);
      if (res.transaction) {
        setDeposits(prev => [res.transaction, ...prev]);
        setShowForm(false);
        setAmount('');
        setFileData(null);
        setFileName('No file chosen');
        setShowSuccess(true);
      } else {
        setError(res.message || 'Failed to submit deposit. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = s => s === 'approved' ? '#22c55e' : s === 'rejected' ? '#ef4444' : '#f59e0b';
  const statusLabel = s => s === 'approved' ? 'Approved' : s === 'rejected' ? 'Rejected' : 'Pending';

  const [page, setPage] = useState(1);
  
  const filtered = deposits.filter(d =>
    d.method?.toLowerCase().includes(search.toLowerCase()) ||
    d.status?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  const inputStyle = { width: '100%', background: t.cardBg, border: `1px solid ${t.tableOuterBorder}`, color: t.text, fontSize: '9px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { color: t.subText, fontSize: '8px', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>

      {/* Header */}
      <PageHeader title="Deposit" />

      

      {/* PRO Subscription Full Page */}
      {isProDeposit && (
        <div style={{ padding: '20px 16px', maxWidth: '480px', margin: '0 auto' }}>
          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 0 32px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.3)',
              animation: 'proGlow 2.5s ease-in-out infinite'
            }}>
              <Crown size={28} color="#ffffff" />
            </div>
            <style>{`@keyframes proGlow { 0%,100% { box-shadow: 0 0 32px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.3); } 50% { box-shadow: 0 0 48px rgba(99,102,241,0.8), 0 8px 32px rgba(99,102,241,0.5); } }`}</style>
            <div style={{ color: t.text, fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
              Activate <span style={{ color: '#818cf8' }}>Quantyrex Pro</span>
            </div>
            <div style={{ color: t.subText, fontSize: '11px' }}>
              Complete payment to unlock 365 days of full access
            </div>
          </div>

          {/* Amount Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.05))',
            border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '14px',
            textAlign: 'center'
          }}>
            <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '6px' }}>AMOUNT TO PAY</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
              <span style={{ color: '#818cf8', fontSize: '38px', fontWeight: '700', letterSpacing: '-1px' }}>${lockedAmount || 499}</span>
              <span style={{ color: t.subText, fontSize: '11px', fontWeight: '600' }}>USD</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(99,102,241,0.15)', padding: '4px 10px', borderRadius: '20px' }}>
              <Lock size={9} color="#818cf8"/>
              <span style={{ color: '#818cf8', fontSize: '9px', fontWeight: '600' }}>Fixed price · One-time payment</span>
            </div>
          </div>

          {/* Payment Instructions Card */}
          <div style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '14px'
          }}>
            <div style={{ color: t.text, fontSize: '11px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#6366f1', color: 'white', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>1</span>
              Send USDT to this address
            </div>

            {/* QR Code */}
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'inline-block', background: 'white', padding: '8px', borderRadius: '8px' }}>
                <img src='/qrcode.jpg' alt='QR' style={{ width: '140px', height: '140px', display: 'block' }}/>
              </div>
              <div style={{ color: t.subText, fontSize: '9px', marginTop: '6px', fontWeight: '600' }}>Network: TRC20 · USDT only</div>
            </div>

            {/* Address */}
            <div style={{ background: t.bg, border: `1px solid ${t.tableOuterBorder}`, borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
              <div style={{ color: t.subText, fontSize: '8px', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '4px' }}>USDT WALLET ADDRESS</div>
              <div style={{ color: '#818cf8', fontSize: '10px', wordBreak: 'break-all', fontFamily: 'monospace', marginBottom: '8px' }}>{walletAddress}</div>
              <button type="button" onClick={handleCopy} style={{
                width: '100%',
                background: copied ? '#22c55e' : '#6366f1',
                border: 'none',
                color: 'white',
                fontSize: '10px',
                fontWeight: '700',
                padding: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                letterSpacing: '0.5px'
              }}>
                <Copy size={11}/> {copied ? 'Copied!' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* Submit Card */}
          <div style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '14px'
          }}>
            <div style={{ color: t.text, fontSize: '11px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#6366f1', color: 'white', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>2</span>
              Upload payment proof
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: t.bg, border: `1px dashed ${t.tableOuterBorder}`, padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
              <label style={{ background: '#6366f1', color: 'white', fontSize: '10px', fontWeight: '600', padding: '8px 14px', cursor: 'pointer', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                Choose File
                <input type='file' accept='image/*' style={{ display: 'none' }} onChange={e => { if(e.target.files[0]){ setFileData(e.target.files[0]); setFileName(e.target.files[0].name); }}}/>
              </label>
              <span style={{ color: fileData ? t.text : t.faintText, fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {fileName || 'No file chosen'}
              </span>
            </div>

            {error && <div style={{ color: '#ef4444', fontSize: '10px', marginBottom: '10px', textAlign: 'center', background: 'rgba(239,68,68,0.1)', padding: '8px', borderRadius: '6px' }}>{error}</div>}

            <button type="button" onClick={handleSubmit} disabled={submitting} style={{
              display: 'flex',
              margin: '0 auto',
              padding: '10px 24px',
              background: submitting ? '#16a34a' : '#22c55e',
              border: 'none',
              color: 'white',
              fontSize: '13px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: 'inherit'
            }}>
              {!submitting && <Crown size={14}/>}
              {submitting ? 'Processing...' : 'Activate Pro Now'}
            </button>
            <div style={{ color: t.faintText, fontSize: '9px', marginTop: '8px', textAlign: 'center', lineHeight: '1.5' }}>
              Your Pro subscription activates automatically once approved.
            </div>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 8px', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={11} color="#22c55e" strokeWidth={3}/>
              <span style={{ color: t.subText, fontSize: '9px', fontWeight: '600' }}>Secure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={11} color="#22c55e" strokeWidth={3}/>
              <span style={{ color: t.subText, fontSize: '9px', fontWeight: '600' }}>365 Days</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={11} color="#22c55e" strokeWidth={3}/>
              <span style={{ color: t.subText, fontSize: '9px', fontWeight: '600' }}>No Renewals</span>
            </div>
          </div>
        </div>
      )}

      {!isProDeposit && showForm && (
        <>
          <div onClick={() => setShowForm(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 101, background: t.bg, border: '1px solid rgba(99,102,241,0.3)', padding: '16px', width: '320px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ color: t.text, fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isProDeposit && <Crown size={14} color="#818cf8"/>}
                {isProDeposit ? 'Activate Pro Subscription' : 'Deposit Funds'}
              </span>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: t.subText, cursor: 'pointer', fontSize: '16px' }}>×</button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {/* Form */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Payment Method</label>
                  <select value={depositMethod} onChange={e => setDepositMethod(e.target.value)}
                    style={{ width: '100%', background: t.cardBg, border: `1px solid ${t.tableOuterBorder}`, color: t.text, fontSize: '9px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}>
                    <option value='crypto'>Crypto (USDT)</option>
                    <option value='bank'>Bank Transfer</option>
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>{isProDeposit ? 'Pro Subscription Amount' : 'Amount (USD)'}</label>
                  <input
                    value={amount}
                    onChange={e => !isProDeposit && setAmount(e.target.value)}
                    readOnly={isProDeposit}
                    placeholder={`Min. ${getCurrencySymbol(user?.currency)}10.00`}
                    style={{
                      ...inputStyle,
                      ...(isProDeposit ? {
                        background: 'rgba(99,102,241,0.08)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        color: '#818cf8',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'not-allowed'
                      } : {})
                    }}
                  />
                  {isProDeposit && (
                    <div style={{ color: t.faintText, fontSize: '7px', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={7}/> Fixed price · 365 days full access
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Payment Proof</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: t.cardBg, border: `1px solid ${t.tableOuterBorder}`, padding: '5px 8px' }}>
                    <label style={{ background: t.border, color: t.text, fontSize: '7px', padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      Choose File
                      <input type='file' accept='image/*' style={{ display: 'none' }} onChange={e => { if(e.target.files[0]){ setFileData(e.target.files[0]); setFileName(e.target.files[0].name); }}}/>
                    </label>
                    <span style={{ color: fileData ? t.dimText : t.faintText, fontSize: '7px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</span>
                  </div>
                </div>
                {error && <div style={{ color: '#ef4444', fontSize: '8px', marginBottom: '8px' }}>{error}</div>}
                <button type="button" onClick={handleSubmit} disabled={submitting} style={{
                  width: '100%',
                  padding: '11px',
                  background: submitting ? '#4b4e9b' : (isProDeposit ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : '#22c55e'),
                  border: 'none',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.8px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: isProDeposit && !submitting ? '0 4px 12px rgba(99,102,241,0.35)' : 'none'
                }}>
                  {isProDeposit && !submitting && <Crown size={12}/>}
                  {submitting ? 'Submitting...' : (isProDeposit ? 'ACTIVATE PRO NOW' : 'Submit Deposit')}
                </button>
                {isProDeposit && !submitting && (
                  <div style={{ color: t.faintText, fontSize: '7px', marginTop: '6px', textAlign: 'center', lineHeight: '1.5' }}>
                    Your Pro subscription activates automatically once the deposit is approved.
                  </div>
                )}
              </div>

              {/* QR Panel */}
              <div style={{ width: '120px', flexShrink: 0, background: t.inputBg, border: `1px solid ${t.border}`, padding: '10px', textAlign: 'center' }}>
                <div style={{ color: t.subText, fontSize: '6px', marginBottom: '3px', textAlign: 'left' }}>USDT Address:</div>
                <div style={{ color: '#6366f1', fontSize: '6px', wordBreak: 'break-all', marginBottom: '4px', textAlign: 'left' }}>{walletAddress}</div>
                <button type="button" onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '3px', background: copied ? '#22c55e' : '#6366f1', border: 'none', color: 'white', fontSize: '6px', padding: '3px 6px', cursor: 'pointer', marginBottom: '6px', width: '100%', justifyContent: 'center' }}>
                  <Copy size={8}/> {copied ? 'Copied!' : 'Copy'}
                </button>
                <div style={{ color: t.text, fontSize: '7px', fontWeight: '700', marginBottom: '6px' }}>Deposit USDT to Quantyrex Markets</div>
                <img src='/qrcode.jpg' alt='QR' style={{ width: '80px', height: '80px', margin: '0 auto 6px', display: 'block' }}/>
                <div style={{ color: t.subText, fontSize: '6px', marginBottom: '3px' }}>Network: TRC20</div>
                <div style={{ color: t.faintText, fontSize: '5px' }}>*USDT only</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='22' height='22' fill='none' stroke='#22c55e' viewBox='0 0 24 24' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7'/></svg>
            </div>
            <div style={{ color: '#111', fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Deposit Submitted!</div>
            <div style={{ color: '#555', fontSize: '12px', marginBottom: '24px', lineHeight: '1.8' }}>Your deposit is pending approval. We'll notify you once confirmed.</div>
            <button type="button" onClick={() => setShowSuccess(false)} style={{ padding: '8px 28px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>Okay</button>
          </div>
        </>
      )}

      {!isProDeposit && (
      <div style={{ padding: '16px' }}>
        {/* Balance + New Deposit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <button type="button" onClick={() => navigate('/dashboard/deposit-funds')} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '9px', fontWeight: '700', padding: '8px 14px', cursor: 'pointer' }}>+ New Deposit</button>
        </div>

        {/* Table */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.tableOuterBorder}` }}>
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
              <input value={search} onChange={e => setSearch(e.target.value)} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '80px' }}/>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: t.tableRowBorder }}>
                {['Amount', 'Method', 'Status', 'Date'].map((h, i) => (
                  <th key={i} style={{ color: t.subText, fontSize: '8px', fontWeight: '700', padding: '8px 10px', borderRight: '1px solid #6366f1', borderBottom: '1px solid #6366f1', textAlign: 'left' }}>{h} ↕</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={99}><InlineLoader text="Loading data..." compact /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No deposits found</td></tr>
              ) : filtered.map((d, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${t.tableRowBorder}`, background: i % 2 === 0 ? 'transparent' : t.tableAltRow }}>
                  <td style={{ padding: '8px 10px', color: '#22c55e', fontSize: '8px', fontWeight: '700' }}>+{formatAmount(d.amount || 0, user?.currency)}</td>
                  <td style={{ padding: '8px 10px', color: t.subText, fontSize: '8px', textTransform: 'capitalize' }}>{d.method || 'crypto'}</td>
                  <td style={{ padding: '8px 10px' }}>
                    <span style={{ background: statusColor(d.status) + '20', color: statusColor(d.status), fontSize: '7px', padding: '2px 6px', display: 'inline-block' }}>{statusLabel(d.status)}</span>
                  </td>
                  <td style={{ padding: '8px 10px', color: t.subText, fontSize: '8px' }}>{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length === 0 ? 0 : (page-1)*perPage+1}–{Math.min(page*perPage, filtered.length)} of {filtered.length} entries</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button type="button" onClick={() => setPage(1)} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.dimText, fontSize: '8px', padding: '2px 6px', cursor: page === 1 ? 'default' : 'pointer' }}>«</button>
              <button type="button" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page === 1 ? t.faintText : t.dimText, fontSize: '10px', padding: '2px 8px', cursor: page === 1 ? 'default' : 'pointer' }}>‹</button>
              <span style={{ color: t.subText, fontSize: '8px' }}>Page {page} of {totalPages || 1}</span>
              <button type="button" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.dimText, fontSize: '10px', padding: '2px 8px', cursor: page >= totalPages ? 'default' : 'pointer' }}>›</button>
              <button type="button" onClick={() => setPage(totalPages)} disabled={page >= totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page >= totalPages ? t.faintText : t.dimText, fontSize: '8px', padding: '2px 6px', cursor: page >= totalPages ? 'default' : 'pointer' }}>»</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
