import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { ArrowLeft, Settings, Shield, Bell, Lock, Eye, EyeOff, Palette } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(user?.twoFactorEnabled || false);
  const [twoFALoading, setTwoFALoading] = useState(false);
  const [notifDeposit, setNotifDeposit] = useState(localStorage.getItem('notif_deposit') !== 'false');
  const [notifWithdrawal, setNotifWithdrawal] = useState(localStorage.getItem('notif_withdrawal') !== 'false');
  const [notifTrade, setNotifTrade] = useState(localStorage.getItem('notif_trade') !== 'false');
  const [saved, setSaved] = useState(false);
  const { theme, changeTheme } = useTheme();

  const toggle2FA = async () => {
    setTwoFALoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/auth/2fa/toggle', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      }).then(r => r.json());
      if (res.twoFactorEnabled !== undefined) setTwoFAEnabled(res.twoFactorEnabled);
    } catch(e) {}
    setTwoFALoading(false);
  };


  const saveNotifSettings = () => {
    localStorage.setItem('notif_deposit', notifDeposit);
    localStorage.setItem('notif_withdrawal', notifWithdrawal);
    localStorage.setItem('notif_trade', notifTrade);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const ToggleSwitch = ({ value, onChange }) => (
    <div onClick={onChange} style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? '#6366f1' : t.border, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '3px', left: value ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
      <div style={{ color: t.subText, fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px', textTransform: 'uppercase' }}>{title}</div>
      {children}
    </div>
  );

  const Row = ({ icon, title, desc, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: t.text, fontSize: '11px', fontWeight: '600' }}>{title}</div>
        {desc && <div style={{ color: t.subText, fontSize: '9px', marginTop: '2px' }}>{desc}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div style={{ background: t.bg, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </button>
        <Settings size={18} color="#6366f1" />
        <span style={{ color: t.text, fontSize: '14px', fontWeight: '700' }}>Settings</span>
      </div>

      <div style={{ padding: '16px 12px' }}>

        {/* Theme */}
        <Section title="Appearance">
          <div style={{ padding: '10px 0' }}>
            <div style={{ color: t.text, fontSize: '11px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={16} color="#6366f1" />
              </div>
              Theme
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {Object.entries(themes).map(([key, t]) => (
                <div key={key} onClick={() => changeTheme(key)} style={{ flex: 1, cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: theme === key ? '2px solid #6366f1' : `2px solid ${t.border}`, transition: 'all 0.2s', boxShadow: theme === key ? '0 0 12px rgba(99,102,241,0.4)' : 'none' }}>
                  {/* Theme preview */}
                  <div style={{ background: t.bg, height: '60px', padding: '8px', position: 'relative' }}>
                    <div style={{ background: t.cardBg, borderRadius: '6px', height: '100%', border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '60%', height: '4px', borderRadius: '4px', background: t.accent }} />
                      <div style={{ width: '80%', height: '3px', borderRadius: '4px', background: t.subText }} />
                      <div style={{ width: '50%', height: '3px', borderRadius: '4px', background: t.subText }} />
                    </div>
                    {theme === key && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width='10' height='10' fill='none' stroke='white' viewBox='0 0 24 24' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                      </div>
                    )}
                  </div>
                  <div style={{ background: t.cardBg, padding: '6px', textAlign: 'center' }}>
                    <span style={{ color: t.text, fontSize: '9px', fontWeight: theme === key ? '700' : '400' }}>{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Security */}
        <Section title="Security">
          <Row
            icon={<Shield size={16} color="#6366f1" />}
            title="Two-Factor Authentication"
            desc="Require email OTP on every login"
            right={
              <button onClick={toggle2FA} disabled={twoFALoading} style={{ padding: '6px 16px', background: twoFAEnabled ? '#22c55e' : '#374151', border: 'none', color: t.text, fontSize: '10px', fontWeight: '700', cursor: 'pointer', borderRadius: '6px', minWidth: '60px' }}>
                {twoFALoading ? '...' : twoFAEnabled ? 'ON' : 'OFF'}
              </button>
            }
          />
          <Row
            icon={<Lock size={16} color="#6366f1" />}
            title="Change Password"
            desc="Update your account password"
            right={<button onClick={() => navigate('/dashboard/change-password')} style={{ padding: '6px 14px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', fontSize: '10px', cursor: 'pointer', borderRadius: '6px' }}>Edit</button>}
          />
        </Section>

        {/* Notifications */}
        <Section title="Notification Preferences">
          <Row
            icon={<Bell size={16} color="#6366f1" />}
            title="Deposit Alerts"
            desc="Get notified on deposit updates"
            right={<ToggleSwitch value={notifDeposit} onChange={() => setNotifDeposit(!notifDeposit)} />}
          />
          <Row
            icon={<Bell size={16} color="#6366f1" />}
            title="Withdrawal Alerts"
            desc="Get notified on withdrawal updates"
            right={<ToggleSwitch value={notifWithdrawal} onChange={() => setNotifWithdrawal(!notifWithdrawal)} />}
          />
          <Row
            icon={<Bell size={16} color="#6366f1" />}
            title="Trade Alerts"
            desc="Get notified on trade updates"
            right={<ToggleSwitch value={notifTrade} onChange={() => setNotifTrade(!notifTrade)} />}
          />
          <button onClick={saveNotifSettings} style={{ width: '100%', marginTop: '12px', padding: '10px', background: saved ? '#22c55e' : '#6366f1', border: 'none', color: t.text, fontSize: '11px', fontWeight: '700', cursor: 'pointer', borderRadius: '8px' }}>
            {saved ? '✓ Saved!' : 'Save Preferences'}
          </button>
        </Section>

        {/* Account */}
        <Section title="Account">
          <Row
            icon={<Eye size={16} color="#6366f1" />}
            title="KYC Verification"
            desc={user?.kycStatus === 'approved' ? '✅ Verified' : 'Complete identity verification'}
            right={<button onClick={() => navigate('/dashboard/kyc')} style={{ padding: '6px 14px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', fontSize: '10px', cursor: 'pointer', borderRadius: '6px' }}>View</button>}
          />
        </Section>

        <div style={{ textAlign: 'center', color: t.faintText, fontSize: '9px', padding: '16px 0' }}>Quantyrex Markets © 2020-2026</div>
      </div>
    </div>
  );
}
