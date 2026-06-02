import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, Zap, TrendingUp, Lock, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getSubscriptionStatus, activateSubscription } from '../services/api';
import PageHeader from '../components/PageHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import LoadingScreen from '../components/LoadingScreen';
import { toast } from 'react-toastify';

export default function Subscription() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const data = await getSubscriptionStatus();
      setStatus(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setActivating(true);
    try {
      const res = await activateSubscription();
      if (res?.success) {
        toast.success('Pro subscription activated! Welcome to Pro.');
        await loadStatus();
      } else if (res?.needsDeposit) {
        toast.error('Insufficient balance. Redirecting to deposit...');
        setTimeout(() => navigate('/dashboard/deposit'), 1500);
      } else {
        toast.error(res?.message || 'Failed to activate subscription');
      }
    } catch (e) {
      toast.error('Network error');
    } finally {
      setActivating(false);
    }
  };

  if (loading) return <LoadingScreen />;

  const features = [
    { icon: <TrendingUp size={14}/>, label: 'Execute Live Trades (Buy/Sell)' },
    { icon: <Zap size={14}/>, label: 'Copy Top Traders' },
    { icon: <Check size={14}/>, label: 'Join Investment Packages' },
    { icon: <Check size={14}/>, label: 'Create Staking Positions' },
    { icon: <Check size={14}/>, label: 'Run Trading Bots' },
    { icon: <Check size={14}/>, label: 'Deposit & Withdraw Funds' },
    { icon: <Check size={14}/>, label: 'Priority 24/7 Support' },
    { icon: <Check size={14}/>, label: 'Full Platform Access' },
  ];

  const isActive = status?.active;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text, display: 'flex', flexDirection: 'column' }}>
      <PageHeader />
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, padding: '16px', maxWidth: '600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', boxShadow: '0 0 32px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.3)', animation: 'proHeroPulse 2.5s ease-in-out infinite' }}>
            <Crown size={28} color="#ffffff" />
          </div>
          <style>{`@keyframes proHeroPulse { 0%,100% { box-shadow: 0 0 32px rgba(99,102,241,0.5), 0 8px 24px rgba(99,102,241,0.3); } 50% { box-shadow: 0 0 48px rgba(99,102,241,0.8), 0 8px 32px rgba(99,102,241,0.5); } }`}</style>
          <div style={{ fontSize: '20px', fontWeight: '400', marginBottom: '4px', fontFamily: 'inherit', letterSpacing: '0.5px' }}>Quantyrex <span style={{ color: '#818cf8' }}>Pro</span></div>
          <div style={{ fontSize: '11px', color: t.subText }}>Unlock the full power of trading</div>
        </div>

        {/* ACTIVE STATUS BADGE */}
        {isActive && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', padding: '14px 16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}/>
              <div style={{ color: '#22c55e', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px' }}>PRO ACTIVE</div>
            </div>
            <div style={{ color: t.text, fontSize: '12px' }}>
              Your subscription is active. Expires in <b>{status.daysLeft} days</b>
            </div>
            <div style={{ color: t.subText, fontSize: '10px', marginTop: '4px' }}>
              Valid until: {new Date(status.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        )}

        {/* SOCIAL PROOF */}
        {!isActive && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <div style={{ flex: 1, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ color: '#6366f1', fontSize: '15px', fontWeight: '700' }}>12K+</div>
              <div style={{ color: t.subText, fontSize: '8px', marginTop: '2px', letterSpacing: '0.05em' }}>PRO TRADERS</div>
            </div>
            <div style={{ flex: 1, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: '15px', fontWeight: '700' }}>4.9★</div>
              <div style={{ color: t.subText, fontSize: '8px', marginTop: '2px', letterSpacing: '0.05em' }}>USER RATING</div>
            </div>
            <div style={{ flex: 1, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: '15px', fontWeight: '700' }}>365</div>
              <div style={{ color: t.subText, fontSize: '8px', marginTop: '2px', letterSpacing: '0.05em' }}>DAYS ACCESS</div>
            </div>
          </div>
        )}

        {/* PRICING CARD */}
        <div style={{ background: t.cardBg, border: `2px solid ${isActive ? '#22c55e' : '#6366f1'}`, borderRadius: '14px', padding: '24px 20px', marginBottom: '14px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '16px', background: '#6366f1', color: '#ffffff', fontSize: '8px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', letterSpacing: '1.2px' }}>
            BEST VALUE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Crown size={16} color="#6366f1" />
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{status?.planName || 'Pro'} Plan</div>
          </div>
          <div style={{ color: t.subText, fontSize: '10px', marginBottom: '18px' }}>1 Year Full Access · {status?.planDuration || 365} days</div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: t.text, letterSpacing: '-1px' }}>${status?.planPrice || 499}</div>
            <div style={{ fontSize: '11px', color: t.subText, fontWeight: '600' }}>USD</div>
          </div>
          <div style={{ fontSize: '10px', color: t.subText, marginBottom: '22px' }}>One-time payment · Valid for {status?.planDuration || 365} days</div>

          {/* Features list */}
          <div style={{ marginBottom: '20px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < features.length - 1 ? `1px solid ${t.tableRowBorder}` : 'none' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                  <Check size={12} strokeWidth={3}/>
                </div>
                <div style={{ fontSize: '11px', color: t.text }}>{f.label}</div>
              </div>
            ))}
          </div>


          {/* Action Button */}
          {isActive ? (
            <div style={{ width: '100%', padding: '14px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', textAlign: 'center', color: '#22c55e', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px' }}>
              <Check size={14} style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}}/> ACTIVE - {status.daysLeft} days remaining
            </div>
          ) : (
            <>
              <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertCircle size={14} color="#818cf8" style={{flexShrink: 0, marginTop: '1px'}}/>
                <div style={{ fontSize: '11px', color: t.text, lineHeight: '1.5' }}>
                  Deposit <b>${status?.planPrice || 499}</b> to instantly activate your Pro membership. Your subscription is granted automatically once the deposit is approved — valid for {status?.planDuration || 365} days of full access.
                </div>
              </div>
              <button type="button" onClick={() => navigate('/dashboard/deposit?purpose=pro&amount=' + (status?.planPrice || 499))}
                style={{ width: '100%', padding: '11px', background: '#22c55e', border: 'none', borderRadius: '10px', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'inherit' }}>
                <Crown size={14}/> Deposit ${status?.planPrice || 499} to Activate Pro
              </button>
            </>
          )}
        </div>

        {/* TRUST BADGES */}
        {!isActive && (
          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-around', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} color="#22c55e" strokeWidth={3}/>
              </div>
              <div style={{ fontSize: '9px', color: t.subText, fontWeight: '600' }}>Secure</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} color="#22c55e" strokeWidth={3}/>
              </div>
              <div style={{ fontSize: '9px', color: t.subText, fontWeight: '600' }}>Instant</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} color="#22c55e" strokeWidth={3}/>
              </div>
              <div style={{ fontSize: '9px', color: t.subText, fontWeight: '600' }}>1 Year</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} color="#22c55e" strokeWidth={3}/>
              </div>
              <div style={{ fontSize: '9px', color: t.subText, fontWeight: '600' }}>No Renewals</div>
            </div>
          </div>
        )}

        {/* INFO CARD */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '14px 16px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Lock size={12} color="#6366f1"/>
            <div style={{ fontSize: '10px', color: '#6366f1', fontWeight: '700', letterSpacing: '1.5px' }}>WHY UPGRADE?</div>
          </div>
          <div style={{ color: t.subText, fontSize: '11px', lineHeight: '1.7' }}>
            Active trading, copy trading, staking, and bot deployment require an active Pro membership. Subscribe once and enjoy full platform access for an entire year — no recurring charges, no hidden fees.
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', padding: '14px', color: t.faintText, fontSize: '9px', borderTop: `1px solid ${t.tableRowBorder}`, marginTop: 'auto' }}>
        2020-2026 © Quantyrex Markets
      </div>
    </div>
  );
}
