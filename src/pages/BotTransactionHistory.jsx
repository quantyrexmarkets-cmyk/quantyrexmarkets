import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { getBots } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatAmount, getCurrencySymbol } from '../utils/currency';
import PageHeader from '../components/PageHeader';
import InlineLoader from '../components/InlineLoader';

const botColors = {
  'STARTER BOT': '#6366f1', 'SILVER BOT': '#6366f1', 'GOLD BOT': '#6366f1',
  'PLATINUM BOT': '#6366f1', 'DIAMOND BOT': '#6366f1', 'ELITE BOT': '#6366f1',
};
const botDays = {
  'STARTER BOT': 7, 'SILVER BOT': 14, 'GOLD BOT': 30,
  'PLATINUM BOT': 60, 'DIAMOND BOT': 90, 'ELITE BOT': 120,
};
const statusColor = s => s === 'active' ? '#22c55e' : s === 'completed' ? '#6366f1' : s === 'cancelled' ? '#ef4444' : '#f59e0b';

export default function BotTransactionHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    getBots().then(data => {
      if (data.bots) { setBots(data.bots); setTotalEarned(data.totalEarned || 0); }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const activeBots = bots.filter(b => b.status === 'active');
  const historyBots = bots.filter(b => b.status !== 'active');
  const totalInvested = bots.reduce((s, b) => s + (b.amount || 0), 0);

  const filtered = historyBots.filter(b =>
    b.botName?.toLowerCase().includes(search.toLowerCase()) ||
    b.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>

      {/* Header */}
      <PageHeader title="Bot History" />

      <div style={{ padding: '14px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ color: t.text, fontSize: '11px', fontWeight: '700' }}>Trading Bots</span>
          <button onClick={() => navigate('/dashboard/manage-bots')} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '8px', fontWeight: '700', padding: '7px 14px', cursor: 'pointer' }}>+ Subscribe Bot</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {[
            ['Active Bots', activeBots.length, '#22c55e'],
            ['Total Bots', bots.length, '#6366f1'],
            ['Total Earned', formatAmount(totalEarned, user?.currency), '#f59e0b'],
            ['Total Invested', formatAmount(totalInvested, user?.currency), '#ec4899'],
          ].map(([l,v,c]) => (
            <div key={l} style={{ background: t.cardBg, padding: '10px', border: `1px solid ${c}30` }}>
              <div style={{ color: t.subText, fontSize: '7px', marginBottom: '4px' }}>{l}</div>
              <div style={{ color: c, fontSize: '15px', fontWeight: '700' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Active Bots */}
        {activeBots.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/></svg>
              Active Bots
            </div>
            {activeBots.map((b, i) => {
              const totalDays = botDays[b.botName] || 7;
              const daysLeft = b.expiresAt ? Math.max(0, Math.ceil((new Date(b.expiresAt) - new Date()) / (1000*60*60*24))) : 0;
              const progress = Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100));
              const color = botColors[b.botName] || '#6366f1';
              return (
                <div key={i} style={{ background: t.cardBg, border: `1px solid ${color}40`, padding: '12px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color, fontSize: '10px', fontWeight: '700' }}>{b.botName}</span>
                    <span style={{ color: '#22c55e', fontSize: '8px', background: 'rgba(34,197,94,0.1)', padding: '2px 8px' }}>ACTIVE</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '10px' }}>
                    {[
                      ['Invested', formatAmount(b.amount || 0, user?.currency), 'white'],
                      ['Daily Rate', b.dailyRate, '#22c55e'],
                      ['Earned', formatAmount((b.earned||0), user?.currency), '#f59e0b'],
                      ['Days Left', daysLeft, 'white'],
                    ].map(([l,v,c]) => (
                      <div key={l} style={{ textAlign: 'center', background: t.tableHeaderBg, padding: '6px' }}>
                        <div style={{ color: t.subText, fontSize: '7px', marginBottom: '3px' }}>{l}</div>
                        <div style={{ color: c, fontSize: '11px', fontWeight: '700' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: '5px', background: t.border, borderRadius: '3px', marginBottom: '4px' }}>
                    <div style={{ width: progress + '%', height: '100%', background: color, borderRadius: '3px', transition: 'width 0.3s' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: t.faintText, fontSize: '7px' }}>{progress.toFixed(0)}% complete</span>
                    <span style={{ color: t.faintText, fontSize: '7px' }}>Expires: {new Date(b.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Transaction History Table */}
        <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Bot History
        </div>
        <div style={{ background: t.cardBg, border: `1px solid ${t.tableOuterBorder}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Show</span>
              <select value={show} onChange={e => setShow(Number(e.target.value))} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none' }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Search:</span>
              <input value={search} onChange={e => setSearch(e.target.value)} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '100px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr 1fr 0.8fr', background: t.tableHeaderBg, padding: '7px 10px', borderBottom: `1px solid ${t.tableOuterBorder}` }}>
            {['Bot Name','Amount','Earned','Status','Date','Duration'].map((h, i) => (
              <span key={i} style={{ color: t.subText, fontSize: '7px', fontWeight: '700', borderRight: '1px solid #6366f1', borderBottom: '1px solid #6366f1', padding: '4px 6px' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <InlineLoader text="Loading data..." compact />
          ) : filtered.length === 0 ? (
            <div style={{ padding: '28px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No completed or cancelled bots yet</div>
          ) : filtered.slice(0, show).map((b, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr 1fr 0.8fr', padding: '8px 10px', borderBottom: `1px solid ${t.tableRowBorder}`, background: i%2===0?'transparent':t.tableAltRow }}>
              <span style={{ color: '#6366f1', fontSize: '8px', fontWeight: '600' }}>{b.botName}</span>
              <span style={{ color: '#22c55e', fontSize: '8px' }}>${b.amount?.toLocaleString()}</span>
              <span style={{ color: '#f59e0b', fontSize: '8px' }}>${(b.earned||0).toFixed(2)}</span>
              <span style={{ color: statusColor(b.status), fontSize: '7px', textTransform: 'capitalize' }}>{b.status}</span>
              <span style={{ color: t.subText, fontSize: '7px' }}>{new Date(b.createdAt).toLocaleDateString()}</span>
              <span style={{ color: t.subText, fontSize: '7px' }}>{b.duration}</span>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {Math.min(filtered.length, show)} of {filtered.length} entries</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "16px", color: t.faintText, fontSize: "7px", borderTop: `1px solid ${t.tableRowBorder}`, marginTop: "16px" }}>2020-2026 &copy; Quantyrex Markets</div>

    </div>
  );
}