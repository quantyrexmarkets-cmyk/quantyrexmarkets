import React, { useState, useEffect, useRef } from 'react';
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


function LiveTradingChart({ symbol, theme, bg }) {
  const containerRef = React.useRef(null);
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container';
    widget.style.height = '100%';
    widget.style.width = '100%';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    widget.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: '15',
      timezone: 'Etc/UTC',
      theme: theme,
      style: '1',
      locale: 'en',
      backgroundColor: '#' + bg,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      allow_symbol_change: false,
      save_image: false,
    });

    widget.appendChild(script);
    containerRef.current.appendChild(widget);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [symbol, theme]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}


function TradingChart({ symbol, theme }) {
  const isDark = theme === 'dark';
  const src = `https://www.tradingview.com/widgetembed/?frameElementId=tv_live_${symbol.replace(':','_')}&symbol=${symbol}&interval=15&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=0&saveimage=0&toolbarbg=${isDark ? '0f172a' : 'ffffff'}&studies=[]&theme=${theme}&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=quantyrexmarkets.vercel.app`;

  return (
    <iframe
      key={src}
      src={src}
      style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
      allowFullScreen={true}
    />
  );
}

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

  // Chart now uses iframe

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://quantyrexmarkets-api.vercel.app/api/user/dashboard', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBalance(data.user?.balance ?? data.balance ?? 0);
      setCurrency(data.user?.currency || user?.currency || 'USD');
    } catch {}
    try {
      const data = await getTrades();
      setTrades(Array.isArray(data) ? data : (data.trades || []));
    } catch {}
    try {
      const token = localStorage.getItem('token');
      const sres = await fetch('https://quantyrexmarkets-api.vercel.app/api/trade/stats', { headers: { Authorization: `Bearer ${token}` } });
      const sdata = await sres.json();
      setStats(sdata);
    } catch {}
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) { setError('Enter a valid amount'); return; }
    if (parseFloat(amount) < 10) { setError('Minimum trade amount is $10'); return; }
    if (balance !== null && parseFloat(amount) > parseFloat(balance)) { setError(`Insufficient balance`); return; }
    setSubmitting(true); setError(''); setMsg('');
    try {
      const res = await createTrade({ symbol: symbol.label, type: sheetDir, direction: sheetDir, account: 'real', amount: parseFloat(amount), duration, leverage });
      setMsg('Trade placed successfully!');
      setAmount('');
      setTimeout(() => { setShowForm(false); setMsg(''); fetchAll(); }, 1500);
    } catch (e) {
      setError(e.message || 'Failed to place trade');
    }
    setSubmitting(false);
  };

  const openTrades = trades.filter(tr => tr.status === 'pending' || tr.status === 'active');
  const closedTrades = trades.filter(tr => tr.status === 'closed' || tr.status === 'cancelled');
  const currentList = tab === 'open' ? openTrades : closedTrades;
  const filtered = currentList.filter(tr => !search || tr.symbol?.toLowerCase().includes(search.toLowerCase()) || tr.type?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / show));
  const paginated = filtered.slice((page-1)*show, page*show);

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>
      <PageHeader title="Live Trading" />

      {/* New Trade Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', background: t.bg }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {SYMBOLS.map(s => (
                <button key={s.label} onClick={() => setSymbol(s)} style={{ padding: '4px 10px', background: symbol.label === s.label ? '#6366f1' : t.subtleBg, border: 'none', color: symbol.label === s.label ? 'white' : t.text, fontSize: '9px', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', whiteSpace: 'nowrap' }}>{s.label}</button>
              ))}
            </div>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', fontSize: '22px', flexShrink: 0 }}>×</button>
          </div>
          {/* Chart - using same approach as BTCChart */}
          <TradingChart symbol={symbol.tv} theme={t.bg === '#f8fafc' ? 'light' : 'dark'} />
          {/* Trade form */}
          <div style={{ flexShrink: 0, borderTop: `1px solid ${t.border}`, padding: '12px 14px', background: t.cardBg, maxHeight: '45vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button onClick={() => setSheetDir('buy')} style={{ flex: 1, padding: '8px', background: sheetDir === 'buy' ? '#16a34a' : t.subtleBg, border: 'none', color: sheetDir === 'buy' ? 'white' : t.text, fontSize: '11px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px' }}>BUY</button>
              <button onClick={() => setSheetDir('sell')} style={{ flex: 1, padding: '8px', background: sheetDir === 'sell' ? '#dc2626' : t.subtleBg, border: 'none', color: sheetDir === 'sell' ? 'white' : t.text, fontSize: '11px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px' }}>SELL</button>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Amount (USD)</div>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Min $10' style={{ width: '100%', background: t.inputBg, border: `1px solid ${sheetDir === 'buy' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, color: t.text, fontSize: '12px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div>
                <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Duration</div>
                <select value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '6px' }}>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ color: t.subText, fontSize: '9px', marginBottom: '4px' }}>Leverage</div>
                <select value={leverage} onChange={e => setLeverage(e.target.value)} style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '6px', outline: 'none', borderRadius: '6px' }}>
                  {['1x','2x','5x','10x','20x','50x','100x'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            {msg && <div style={{ color: '#22c55e', fontSize: '9px', marginBottom: '8px' }}>{msg}</div>}
            {error && <div style={{ color: '#ef4444', fontSize: '9px', marginBottom: '8px' }}>{error}</div>}
            <button onClick={handleTrade} disabled={submitting} style={{ width: '100%', padding: '12px', background: sheetDir === 'buy' ? '#16a34a' : '#dc2626', border: 'none', color: 'white', fontSize: '13px', fontWeight: '800', cursor: 'pointer', borderRadius: '8px' }}>
              {submitting ? 'Placing...' : `Confirm ${sheetDir === 'buy' ? 'Buy ▲' : 'Sell ▼'}`}
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* New Trade button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
          <button onClick={() => navigate("/dashboard/new-trade")} style={{ background: '#6366f1', border: 'none', color: t.text, fontSize: '9px', fontWeight: '700', padding: '8px 14px', cursor: 'pointer' }}>+ New Trade</button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart2 size={14} color="#6366f1"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Total Trades</div>
            <div style={{ color: t.text, fontSize: '10px', fontWeight: '700' }}>{stats ? stats.totalTrades ?? 0 : '...'}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={14} color="#22c55e"/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Wins</div>
            <div style={{ color: '#22c55e', fontSize: '10px', fontWeight: '700' }}>{stats ? stats.wins ?? 0 : '...'}</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '6px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={14} color="#ef4444" style={{ transform: 'rotate(180deg)' }}/></div>
            <div style={{ color: t.subText, fontSize: '7px' }}>Losses</div>
            <div style={{ color: '#ef4444', fontSize: '10px', fontWeight: '700' }}>{stats ? stats.losses ?? 0 : '...'}</div>
          </div>
        </div>

        {/* Trades Table */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.tableOuterBorder}` }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}` }}>
            {[['open', `Open (${openTrades.length})`], ['closed', `Closed (${closedTrades.length})`]].map(([key, label]) => (
              <button key={key} onClick={() => { setTab(key); setPage(1); }} style={{ padding: '8px 14px', background: tab === key ? (t.bg === '#f8fafc' ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.15)') : 'transparent', border: 'none', borderBottom: tab === key ? '2px solid #6366f1' : '2px solid transparent', borderRadius: tab === key ? '6px 6px 0 0' : '0', color: tab === key ? '#6366f1' : t.mutedText, fontSize: '8px', fontWeight: tab === key ? '700' : '400', cursor: 'pointer' }}>{label}</button>
            ))}
          </div>

          {/* Show/Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Show</span>
              <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none' }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
              <span style={{ color: t.subText, fontSize: '8px' }}>entries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Search:</span>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '80px' }} />
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${t.tableOuterBorder}` }}>
            <thead>
              <tr style={{ background: t.tableHeaderBg }}>
                {tab === 'open'
                  ? ['Symbol','Dir','Amount','Duration','Leverage','Status','Action'].map((h,i) => (
                      <th key={i} style={{ color: t.subText, fontSize: '8px', fontWeight: '700', padding: '8px 6px', borderRight: `1px solid ${t.tableOuterBorder}`, borderBottom: `1px solid ${t.tableOuterBorder}`, textAlign: 'left' }}>{h}</th>
                    ))
                  : ['Symbol','Dir','Amount','Result','P&L%','Status'].map((h,i) => (
                      <th key={i} style={{ color: t.subText, fontSize: '8px', fontWeight: '700', padding: '8px 6px', borderRight: `1px solid ${t.tableOuterBorder}`, borderBottom: `1px solid ${t.tableOuterBorder}`, textAlign: 'left' }}>{h}</th>
                    ))
                }
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: t.faintText, fontSize: '8px' }}>No {tab} trades</td></tr>
              ) : paginated.map((tr, i) => (
                tab === 'open' ? (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.tableRowBorder}`, background: i%2===0?'transparent':t.tableAltRow }}>
                    <td style={{ padding: '8px 6px', color: '#6366f1', fontSize: '8px', fontWeight: '700' }}>{tr.symbol}</td>
                    <td style={{ padding: '8px 6px', color: tr.type === 'buy' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase' }}>{tr.type}</td>
                    <td style={{ padding: '8px 6px', color: t.text, fontSize: '8px' }}>{formatAmount(parseFloat(tr.amount), user?.currency)}</td>
                    <td style={{ padding: '8px 6px', color: t.subText, fontSize: '8px' }}>{tr.duration}</td>
                    <td style={{ padding: '8px 6px', color: t.subText, fontSize: '8px' }}>{tr.leverage}</td>
                    <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '7px', padding: '2px 6px', textTransform: 'uppercase' }}>{tr.status}</span></td>
                    <td style={{ padding: '8px 6px' }}><button onClick={() => fetchAll()} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '7px', padding: '2px 6px', cursor: 'pointer' }}>Close</button></td>
                  </tr>
                ) : (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.tableRowBorder}`, background: i%2===0?'transparent':t.tableAltRow }}>
                    <td style={{ padding: '8px 6px', color: '#6366f1', fontSize: '8px', fontWeight: '700' }}>{tr.symbol}</td>
                    <td style={{ padding: '8px 6px', color: tr.type === 'buy' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase' }}>{tr.type}</td>
                    <td style={{ padding: '8px 6px', color: t.text, fontSize: '8px' }}>{formatAmount(parseFloat(tr.amount), user?.currency)}</td>
                    <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.result != null ? formatAmount(parseFloat(tr.result), user?.currency) : '—'}</td>
                    <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.amount ? `${((tr.result / tr.amount) * 100).toFixed(1)}%` : '—'}</td>
                    <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(107,114,128,0.1)', color: '#9ca3af', fontSize: '7px', padding: '2px 6px', textTransform: 'capitalize' }}>{tr.status}</span></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length === 0 ? 0 : (page-1)*show+1}–{Math.min(page*show, filtered.length)} of {filtered.length} entries</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setPage(1)} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1?t.faintText:t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page===1?'default':'pointer' }}>«</button>
              <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1?t.faintText:t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page===1?'default':'pointer' }}>‹</button>
              <span style={{ color: t.subText, fontSize: '8px' }}>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages?t.faintText:t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page>=totalPages?'default':'pointer' }}>›</button>
              <button onClick={() => setPage(totalPages)} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages?t.faintText:t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page>=totalPages?'default':'pointer' }}>»</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px', color: t.faintText, fontSize: '7px', borderTop: `1px solid ${t.tableRowBorder}`, marginTop: '16px' }}>2020-2026 © Quantyrex Markets</div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}
