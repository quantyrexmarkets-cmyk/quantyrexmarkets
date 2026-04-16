import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { formatAmountWithCode } from '../utils/currency';

export default function MyCopyTrades() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const [copyTrades, setCopyTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [showStopModal, setShowStopModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
    fetchCopyTrades();
    fetchCurrency();
  }, []);

  const fetchCurrency = async () => {
    try {
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/user/dashboard', {
        headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setCurrency(data?.user?.currency || 'USD');
    } catch {}
  };

  const fetchCopyTrades = async () => {
    try {
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/copy-trade', {
        headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setCopyTrades(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    if (!selectedTrade) return;
    try {
      const res = await fetch(`https://quantyrexmarkets-api.vercel.app/api/copy-trade/${selectedTrade._id}/stop`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchCopyTrades(); // Refresh the list
      }
    } catch (err) {
      console.error(err);
    }
    setShowStopModal(false);
    setSelectedTrade(null);
  };

  const totalInvested = copyTrades.reduce((s, t) => s + (t.amount || 0), 0);
  const totalReturns = copyTrades.reduce((s, t) => s + (t.totalEarned || 0), 0);

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Montserrat', sans-serif", color: t.text }}>
      <PageHeader title="My Copy Trades" />

      {/* Stop Confirmation Modal */}
      {showStopModal && (
        <>
          <div onClick={() => setShowStopModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100 }}/>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 101, background: t.cardBg, border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '20px', width: '320px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Stop Copy Trading?</div>
            <div style={{ fontSize: '10px', color: t.subText, marginBottom: '20px' }}>
              Are you sure you want to stop copying {selectedTrade?.traderName}?
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowStopModal(false)} style={{ flex: 1, padding: '8px', background: t.hoverBg, border: 'none', borderRadius: '6px', color: t.text, fontSize: '9px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleStop} style={{ flex: 1, padding: '8px', background: '#ef4444', border: 'none', borderRadius: '6px', color: t.text, fontSize: '9px', fontWeight: '700', cursor: 'pointer' }}>Stop</button>
            </div>
          </div>
        </>
      )}

      <div style={{ padding: '16px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ background: t.bg === '#f8fafc' ? t.cardBg : 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={14} color="#6366f1"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Total Invested</div>
            <div style={{ color: '#6366f1', fontSize: '10px', fontWeight: '700' }}>{formatAmountWithCode(totalInvested, currency)}</div>
          </div>
          <div style={{ background: t.bg === '#f8fafc' ? t.cardBg : 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: totalReturns >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={14} color={totalReturns >= 0 ? '#22c55e' : '#ef4444'}/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Total Returns</div>
            <div style={{ color: totalReturns >= 0 ? '#22c55e' : '#ef4444', fontSize: '10px', fontWeight: '700' }}>{formatAmountWithCode(Math.abs(totalReturns), currency)}</div>
          </div>
          <div style={{ background: t.bg === '#f8fafc' ? t.cardBg : 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={14} color="#f59e0b"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Active Trades</div>
            <div style={{ color: '#f59e0b', fontSize: '10px', fontWeight: '700' }}>{copyTrades.length}</div>
          </div>
        </div>

        {/* Active Trades */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: t.faintText, fontSize: '10px' }}>Loading...</div>
        ) : copyTrades.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: t.faintText, marginBottom: '10px' }}>No active copy trades</div>
            <button onClick={() => navigate('/dashboard/copy-trading')} style={{ padding: '8px 16px', background: '#6366f1', border: 'none', borderRadius: '6px', color: t.text, fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>Browse Traders</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#6366f1', marginBottom: '12px' }}>ACTIVE COPY TRADES</div>
            {copyTrades.map(trade => {
              const roi = trade.amount > 0 ? ((trade.totalEarned || 0) / trade.amount * 100) : 0;
              const isProfit = (trade.totalEarned || 0) >= 0;
              return (
                <div key={trade._id} style={{ background: t.bg === '#f8fafc' ? t.cardBg : 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: t.bg === '#f8fafc' ? `1px solid ${t.border}` : '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(trade.traderName)}&background=6366f1&color=fff&size=96`} 
                      style={{ width: '46px', height: '46px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.5)' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: '700' }}>{trade.traderName}</div>
                      <div style={{ fontSize: '7.5px', color: t.subText }}>{trade.profitShare}% profit share • Since {new Date(trade.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <button onClick={() => { setSelectedTrade(trade); setShowStopModal(true); }} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', padding: '6px 10px', borderRadius: '6px', color: '#ef4444', fontSize: '8px', cursor: 'pointer' }}>✕ Stop</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    <div style={{ background: t.bg, borderRadius: '8px', padding: '8px', textAlign: 'center', border: `1px solid ${t.tableRowBorder}` }}>
                      <div style={{ fontSize: '7px', color: t.faintText, marginBottom: '4px' }}>Invested</div>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: t.text }}>{formatAmountWithCode(trade.amount, currency)}</div>
                    </div>
                    <div style={{ background: t.bg, borderRadius: '8px', padding: '8px', textAlign: 'center', border: `1px solid ${t.tableRowBorder}` }}>
                      <div style={{ fontSize: '7px', color: t.faintText, marginBottom: '4px' }}>Earned</div>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: isProfit ? '#22c55e' : '#ef4444' }}>{(isProfit ? '+' : '-') + formatAmountWithCode(Math.abs(trade.totalEarned || 0), currency)}</div>
                    </div>
                    <div style={{ background: t.bg, borderRadius: '8px', padding: '8px', textAlign: 'center', border: `1px solid ${t.tableRowBorder}` }}>
                      <div style={{ fontSize: '7px', color: t.faintText, marginBottom: '4px' }}>ROI</div>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: isProfit ? '#22c55e' : '#ef4444' }}>{(isProfit ? '+' : '') + roi.toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
