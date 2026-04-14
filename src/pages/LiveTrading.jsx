import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { formatAmount } from '../utils/currency';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import { getTrades, createTrade } from '../services/api';

const SYMBOLS = [
  { label: 'BTC/USD', tv: 'BINANCE:BTCUSDT' },
  { label: 'ETH/USD', tv: 'BINANCE:ETHUSDT' },
  { label: 'XRP/USD', tv: 'BINANCE:XRPUSDT' },
  { label: 'SOL/USD', tv: 'BINANCE:SOLUSDT' },
  { label: 'BNB/USD', tv: 'BINANCE:BNBUSDT' },
  { label: 'ADA/USD', tv: 'BINANCE:ADAUSDT' },
];

const DURATIONS = ['30 seconds','1 minute','2 minutes','5 minutes','10 minutes','15 minutes','30 minutes','1 hour'];

export default function LiveTrading() {
  const { user } = useAuth();
  const { current: t } = useTheme();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState(user?.currency || 'USD');
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [symbol, setSymbol] = useState(SYMBOLS[0]);
  const [direction, setDirection] = useState('buy');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('5 minutes');
  const [leverage, setLeverage] = useState('1x');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('open');
  const [showForm, setShowForm] = useState(false);
  const [sheetDir, setSheetDir] = useState('buy');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/user/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBalance(data.user?.balance ?? data.balance ?? 0);
      setCurrency(data.user?.currency || user?.currency || 'USD');
    } catch {}
    try {
      const data = await getTrades();
      if (data?.trades) setTrades(data.trades);
      if (data?.stats) setStats(data.stats);
    } catch {}
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) < 10) { setError('Minimum $10'); return; }
    setSubmitting(true); setError(''); setMsg('');
    try {
      await createTrade({
        symbol: symbol.label, type: sheetDir, direction: sheetDir,
        account: 'real', amount: parseFloat(amount), duration, leverage
      });
      setMsg('Trade placed!');
      setAmount('');
      setTimeout(() => { setMsg(''); setShowForm(false); fetchAll(); }, 1500);
    } catch (e) { setError(e.message || 'Failed'); }
    setSubmitting(false);
  };

  const openTrades = trades.filter(tr => tr.status === 'open');
  const closedTrades = trades.filter(tr => tr.status !== 'open');
  const currentList = tab === 'open' ? openTrades : closedTrades;
  const filtered = currentList.filter(tr =>
    !search || tr.symbol?.toLowerCase().includes(search.toLowerCase()) ||
    tr.type?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / show));
  const paginated = filtered.slice((page-1)*show, page*show);

  const tvSrc = `https://www.tradingview.com/widgetembed/?frameElementId=tv_${symbol.tv.replace(':','_')}&symbol=${symbol.tv}&interval=15&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=0&saveimage=0&toolbarbg=${t.bg === '#f8fafc' ? 'ffffff' : '0f172a'}&studies=[]&theme=${t.bg === '#f8fafc' ? 'light' : 'dark'}&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=quantyrexmarkets.vercel.app`;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>
      <PageHeader title="Live Trading" />

      {/* New Trade Fullscreen */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column', background: t.bg }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: `1px solid ${t.border}`, flexShrink: 0, background: t.cardBg }}>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
              {SYMBOLS.map(s => (
                <button key={s.label} onClick={() => setSymbol(s)}
                  style={{ padding: '4px 10px', background: symbol.label === s.label ? '#6366f1' : t.subtleBg, border: 'none', color: symbol.label === s.label ? 'white' : t.text, fontSize: '9px', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                  {s.label}
                </button>
              ))}
            </div>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', fontSize: '22px', padding: '0 4px' }}>×</button>
          </div>

          {/* Chart - fixed height */}
          <iframe
            key={symbol.tv + t.bg}
            src={tvSrc}
            width="100%"
            height="60%"
            frameBorder="0"
            allowFullScreen={true}
            style={{ display: 'block', flexShrink: 0 }}
          />

          {/* Form */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', background: t.cardBg, borderTop: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button onClick={() => setSheetDir('buy')} style={{ flex: 1, padding: '10px', background: sheetDir === 'buy' ? '#16a34a' : t.subtleBg, border: 'none', color: sheetDir === 'buy' ? 'white' : t.text, fontSize: '12px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px' }}>BUY ▲</button>
              <button onClick={() => setSheetDir('sell')} style={{ flex: 1, padding: '10px', background: sheetDir === 'sell' ? '#dc2626' : t.subtleBg, border: 'none', color: sheetDir === 'sell' ? 'white' : t.text, fontSize: '12px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px' }}>SELL ▼</button>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Amount (USD)</div>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Min $10'
                style={{ width: '100%', background: t.inputBg, border: `1px solid ${sheetDir === 'buy' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`, color: t.text, fontSize: '13px', fontWeight: '700', padding: '8px 10px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div>
                <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Duration</div>
                <select value={duration} onChange={e => setDuration(e.target.value)}
                  style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '7px', outline: 'none', borderRadius: '6px' }}>
                  {DURATIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Leverage</div>
                <select value={leverage} onChange={e => setLeverage(e.target.value)}
                  style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '7px', outline: 'none', borderRadius: '6px' }}>
                  {['1x','2x','5x','10x','20x','50x','100x'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            {msg && <div style={{ color: '#22c55e', fontSize: '10px', marginBottom: '8px', fontWeight: '600' }}>{msg}</div>}
            {error && <div style={{ color: '#ef4444', fontSize: '10px', marginBottom: '8px' }}>{error}</div>}
            <button onClick={handleTrade} disabled={submitting}
              style={{ width: '100%', padding: '12px', background: sheetDir === 'buy' ? '#16a34a' : '#dc2626', border: 'none', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', borderRadius: '8px' }}>
              {submitting ? 'Placing...' : `Confirm ${sheetDir === 'buy' ? 'Buy' : 'Sell'}`}
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { label: 'Balance', value: formatAmount(balance || 0, currency), icon: <DollarSign size={14} color="#6366f1"/>, color: '#6366f1' },
            { label: 'Open', value: openTrades.length, icon: <BarChart2 size={14} color="#22c55e"/>, color: '#22c55e' },
            { label: 'Closed', value: closedTrades.length, icon: <TrendingUp size={14} color="#ef4444"/>, color: '#ef4444' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: '13px', fontWeight: '700' }}>{s.value}</div>
              <div style={{ color: t.subText, fontSize: '8px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* New Trade Button */}
        <button onClick={() => setShowForm(true)}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>
          + New Trade
        </button>

        {/* Trades Table */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.tableOuterBorder}`, borderRadius: '10px', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}` }}>
            {[['open', 'Open Trades'], ['closed', 'Closed Trades']].map(([key, label]) => (
              <button key={key} onClick={() => { setTab(key); setPage(1); }}
                style={{ flex: 1, padding: '10px', background: tab === key ? (t.bg === '#f8fafc' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.15)') : 'transparent', border: 'none', borderBottom: tab === key ? '2px solid #6366f1' : '2px solid transparent', color: tab === key ? '#6366f1' : t.mutedText, fontSize: '9px', fontWeight: tab === key ? '700' : '400', cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ padding: '8px 10px', borderBottom: `1px solid ${t.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search..."
              style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '5px 8px', outline: 'none', borderRadius: '4px' }} />
            <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }}
              style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '5px', outline: 'none', borderRadius: '4px' }}>
              {[10,25,50].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: t.tableHeaderBg }}>
                {(tab === 'open'
                  ? ['Symbol','Type','Amount','Duration','Leverage','Status','Action']
                  : ['Symbol','Type','Amount','Result','%','Status']
                ).map((h,i) => (
                  <th key={i} style={{ color: t.subText, fontSize: '8px', fontWeight: '700', padding: '8px 6px', borderBottom: `1px solid ${t.tableOuterBorder}`, textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '9px' }}>No {tab} trades</td></tr>
              ) : paginated.map((tr, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${t.tableRowBorder}`, background: i%2===0 ? 'transparent' : t.tableAltRow }}>
                  <td style={{ padding: '8px 6px', color: '#6366f1', fontSize: '8px', fontWeight: '700' }}>{tr.symbol}</td>
                  <td style={{ padding: '8px 6px', color: tr.type === 'buy' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase' }}>{tr.type}</td>
                  <td style={{ padding: '8px 6px', color: t.text, fontSize: '8px' }}>{formatAmount(parseFloat(tr.amount), user?.currency)}</td>
                  {tab === 'open' ? (
                    <>
                      <td style={{ padding: '8px 6px', color: t.subText, fontSize: '8px' }}>{tr.duration}</td>
                      <td style={{ padding: '8px 6px', color: t.subText, fontSize: '8px' }}>{tr.leverage}</td>
                      <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '7px', padding: '2px 6px' }}>{tr.status}</span></td>
                      <td style={{ padding: '8px 6px' }}><button onClick={() => fetchAll()} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '7px', padding: '2px 6px', cursor: 'pointer' }}>Close</button></td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.result != null ? formatAmount(parseFloat(tr.result), user?.currency) : '—'}</td>
                      <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.amount ? `${((tr.result / tr.amount) * 100).toFixed(1)}%` : '—'}</td>
                      <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(107,114,128,0.1)', color: '#9ca3af', fontSize: '7px', padding: '2px 6px' }}>{tr.status}</span></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length === 0 ? 0 : (page-1)*show+1}–{Math.min(page*show, filtered.length)} of {filtered.length}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setPage(1)} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1 ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page===1 ? 'default' : 'pointer' }}>«</button>
              <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1 ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page===1 ? 'default' : 'pointer' }}>‹</button>
              <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages ? t.faintText : t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page>=totalPages ? 'default' : 'pointer' }}>›</button>
              <button onClick={() => setPage(totalPages)} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages ? t.faintText : t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page>=totalPages ? 'default' : 'pointer' }}>»</button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '16px', color: t.faintText, fontSize: '7px', borderTop: `1px solid ${t.tableRowBorder}`, marginTop: '8px' }}>2020-2026 © Quantyrex Markets</div>
      </div>
    </div>
  );
}
