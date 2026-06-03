import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resendVerification } from '../services/api';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  // Resend states
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [resendErr, setResendErr] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/auth/verify-email/${token}`);
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setMessage(data.message);
          setTimeout(() => navigate('/signin'), 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Server error. Please try again.');
      }
    };
    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendMsg('');
    setResendErr('');

    if (!email || !email.includes('@')) {
      setResendErr('Please enter a valid email address');
      return;
    }

    setResending(true);
    try {
      const res = await resendVerification(email);
      if (res?.data?.success || res?.success) {
        setResendMsg('✓ A new verification link has been sent to your email. Please check your inbox (and spam folder).');
      } else {
        setResendErr(res?.data?.message || res?.message || 'Failed to resend. Please try again.');
      }
    } catch (err) {
      setResendErr(err?.response?.data?.message || 'Could not send verification email. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0e1628', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '8px', padding: '40px 32px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>

        {status === 'verifying' && (
          <>
            <div style={{ width: '52px', height: '52px', border: '3px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
            <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Verifying your email...</h2>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Please wait a moment</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ width: '56px', height: '56px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width='24' height='24' fill='none' stroke='#22c55e' viewBox='0 0 24 24' strokeWidth='2.5'><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7'/></svg>
            </div>
            <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Email Verified! 🎉</h2>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 20px', lineHeight: '1.6' }}>{message}</p>
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 20px' }}>Redirecting to login...</p>
            <button type="button" onClick={() => navigate('/signin')} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', padding: '10px 28px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Login Now</button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ width: '56px', height: '56px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width='24' height='24' fill='none' stroke='#ef4444' viewBox='0 0 24 24' strokeWidth='2.5'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
            </div>
            <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Verification Failed</h2>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 20px', lineHeight: '1.6' }}>{message}</p>

            {!resendMsg && (
              <form onSubmit={handleResend} style={{ marginBottom: '16px' }}>
                <p style={{ color: '#374151', fontSize: '12px', fontWeight: '600', margin: '0 0 10px', textAlign: 'left' }}>
                  Request a new verification link:
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setResendErr(''); }}
                  placeholder="Enter your email address"
                  required
                  disabled={resending}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    marginBottom: '10px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {resendErr && (
                  <p style={{ color: '#ef4444', fontSize: '12px', margin: '0 0 10px', textAlign: 'left' }}>{resendErr}</p>
                )}
                <button
                  type="submit"
                  disabled={resending}
                  style={{
                    width: '100%',
                    background: resending ? '#9ca3af' : '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '11px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: resending ? 'not-allowed' : 'pointer',
                    marginBottom: '10px'
                  }}>
                  {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </form>
            )}

            {resendMsg && (
              <div style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '12px',
                marginBottom: '16px',
                lineHeight: '1.5',
                textAlign: 'left'
              }}>
                {resendMsg}
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate('/signin')}
              style={{
                background: 'transparent',
                color: '#6366f1',
                border: '1px solid #6366f1',
                borderRadius: '6px',
                padding: '10px 28px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}>
              Go to Login
            </button>
          </>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
