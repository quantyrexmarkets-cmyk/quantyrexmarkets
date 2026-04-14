import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { formatAmount } from '../utils/currency';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { TrendingUp, DollarSign, ClipboardList, Activity, Target, Zap, ArrowUpCircle, ArrowDownCircle, Clock, Award } from 'lucide-react';
import { getTrades, createTrade } from '../services/api';

const SYMBOLS = [
  { label: 'BTC/USD', tv: 'BINANCE:BTCUSDT', id: 'bitcoin' },
  { label: 'ETH/USD', tv: 'BINANCE:ETHUSDT', id: 'ethereum' },
  { label: 'XRP/USD', tv: 'BINANCE:XRPUSDT', id: 'ripple' },
  { label: 'SOL/USD', tv: 'BINANCE:SOLUSDT', id: 'solana' },
  { label: 'BNB/USD', tv: 'BINANCE:BNBUSDT', id: 'binancecoin' },
  { label: 'ADA/USD', tv: 'BINANCE:ADAUSDT', id: 'cardano' },
];
const DURATIONS = ['30 seconds','1 minute','2 minutes','5 minutes','10 minutes','15 minutes','30 minutes','1 hour'];
const QUICK_AMOUNTS = [10, 50, 100, 500];
const INTERVALS = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '1H', value: '60' },
  { label: '4H', value: '240' },
  { label: '1D', value: 'D' },
];

export default function LiveTrading() {
  const { user } = useAuth();
  const { current: t } = useTheme();
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState(user?.currency || 'USD');
  const [trades, setTrades] = useState([]);
  const [symbol, setSymbol] = useState(SYMBOLS[0]);
  const [direction, setDirection] = useState('buy');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('5 minutes');
  const [leverage, setLeverage] = useState('1x');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tvInterval, setTvInterval] = useState('15');
  const [bottomTab, setBottomTab] = useState('trade');
  const [tab, setTab] = useState('open');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [prices, setPrices] = useState({});
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [tradeNotif, setTradeNotif] = useState(null);

  const fetchPrices = useCallback(async () => {
    try {
      const ids = SYMBOLS.map(s => s.id).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_high_24h=true&include_low_24h=true`);
      const data = await res.json();
      setPrices(data);
    } catch {}
  }, []);

  useEffect(() => {
    fetchAll();
    fetchPrices();
    const iv = setInterval(fetchPrices, 15000);
    return () => clearInterval(iv);
  }, [fetchPrices]);

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
      if (data?.trades) setTrades(data.trades);
    } catch {}
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) < 10) { setError('Minimum $10'); return; }
    setSubmitting(true); setError(''); setMsg('');
    try {
      await createTrade({ symbol: symbol.label, type: direction, direction, account: 'real', amount: parseFloat(amount), duration, leverage, stopLoss: stopLoss || undefined, takeProfit: takeProfit || undefined });
      setMsg('Trade placed!');
      setTradeNotif({ type: direction, symbol: symbol.label, amount });
      setTimeout(() => setTradeNotif(null), 4000);
      setAmount(''); setStopLoss(''); setTakeProfit('');
      setTimeout(() => { setMsg(''); fetchAll(); }, 1500);
    } catch (e) { setError(e.message || 'Failed'); }
    setSubmitting(false);
  };

  const openTrades = trades.filter(tr => tr.status === 'open');
  const closedTrades = trades.filter(tr => tr.status !== 'open');
  const wonTrades = closedTrades.filter(tr => tr.result > 0);
  const winRate = closedTrades.length > 0 ? ((wonTrades.length / closedTrades.length) * 100).toFixed(0) : 0;
  const totalPnL = closedTrades.reduce((s, tr) => s + (tr.result || 0), 0);
  const bestTrade = closedTrades.reduce((best, tr) => tr.result > (best?.result || 0) ? tr : best, null);
  const currentList = tab === 'open' ? openTrades : closedTrades;
  const filtered = currentList.filter(tr => !search || tr.symbol?.toLowerCase().includes(search.toLowerCase()) || tr.type?.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / show));
  const paginated = filtered.slice((page-1)*show, page*show);
  const currentPrice = prices[symbol.id];
  const tvTheme = t.bg === '#f8fafc' ? 'light' : 'dark';
  const tvSrc = `https://www.tradingview.com/widgetembed/?frameElementId=tv_${symbol.tv.replace(':','_')}&symbol=${symbol.tv}&interval=${tvInterval}&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=0&saveimage=0&toolbarbg=${t.bg === '#f8fafc' ? 'ffffff' : '0f172a'}&studies=[]&theme=${tvTheme}&style=1&timezone=Etc%2FUTC&locale=en&utm_source=quantyrexmarkets.vercel.app`;
  const pnlAmount = parseFloat(amount) || 0;
  const leverageNum = parseFloat(leverage) || 1;
  const potentialProfit = (pnlAmount * leverageNum * 0.8).toFixed(2);
  const potentialLoss = (pnlAmount * 0.9).toFixed(2);
  const CS = { background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '8px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', boxShadow: '0 4px 24px rgba(99,102,241,0.1)', minWidth: '70px' };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text }}>
      <PageHeader title="Live Trading" />

      {tradeNotif && (
        <div style={{ position: 'fixed', top: '70px', right: '16px', zIndex: 500, background: tradeNotif.type === 'buy' ? '#16a34a' : '#dc2626', color: 'white', padding: '12px 16px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '600' }}>
          {tradeNotif.type === 'buy' ? <ArrowUpCircle size={16}/> : <ArrowDownCircle size={16}/>}
          {tradeNotif.type.toUpperCase()} {tradeNotif.symbol} — ${tradeNotif.amount}
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column', background: t.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: t.cardBg, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>←</button>
              <div>
                <div style={{ color: t.text, fontSize: '13px', fontWeight: '700' }}>{symbol.label}</div>
                <div style={{ color: currentPrice?.usd_24h_change >= 0 ? '#22c55e' : '#ef4444', fontSize: '9px' }}>
                  {currentPrice ? `$${currentPrice.usd?.toLocaleString()} ${currentPrice.usd_24h_change >= 0 ? '▲' : '▼'} ${Math.abs(currentPrice.usd_24h_change || 0).toFixed(2)}%` : 'Loading...'}
                </div>
              </div>
              <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: '7px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>● LIVE</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
              {SYMBOLS.map(s => (
                <button key={s.label} onClick={() => setSymbol(s)} style={{ padding: '3px 8px', background: symbol.label === s.label ? '#6366f1' : t.subtleBg, border: `1px solid ${symbol.label === s.label ? '#6366f1' : t.border}`, color: symbol.label === s.label ? 'white' : t.subText, fontSize: '8px', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                  {s.label.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', background: t.cardBg2, borderBottom: `1px solid ${t.border}`, flexShrink: 0, overflowX: 'auto' }}>
            <Clock size={10} color={t.subText}/>
            {INTERVALS.map(iv => (
              <button key={iv.value} onClick={() => setTvInterval(iv.value)} style={{ padding: '2px 8px', background: tvInterval === iv.value ? '#6366f1' : 'transparent', border: `1px solid ${tvInterval === iv.value ? '#6366f1' : t.border}`, color: tvInterval === iv.value ? 'white' : t.subText, fontSize: '8px', fontWeight: '700', cursor: 'pointer', borderRadius: '4px' }}>
                {iv.label}
              </button>
            ))}
            {currentPrice && (
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexShrink: 0 }}>
                <span style={{ fontSize: '8px', color: t.subText }}>H: <span style={{ color: '#22c55e' }}>${currentPrice.usd_24h_high?.toLocaleString()}</span></span>
                <span style={{ fontSize: '8px', color: t.subText }}>L: <span style={{ color: '#ef4444' }}>${currentPrice.usd_24h_low?.toLocaleString()}</span></span>
              </div>
            )}
          </div>

          {/* Price Ticker inside chart */}
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto', borderBottom: `1px solid ${t.border}`, background: t.cardBg, flexShrink: 0 }}>
            {SYMBOLS.map(s => {
              const p = prices[s.id];
              const isPos = (p?.usd_24h_change || 0) >= 0;
              return (
                <div key={s.id} onClick={() => setSymbol(s)}
                  style={{ flexShrink: 0, padding: '5px 12px', cursor: 'pointer', borderRight: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: '6px', background: symbol.label === s.label ? 'rgba(99,102,241,0.1)' : 'transparent' }}>
                  <span style={{ color: symbol.label === s.label ? '#6366f1' : t.text, fontSize: '8px', fontWeight: '700' }}>{s.label.split('/')[0]}</span>
                  <span style={{ color: t.text, fontSize: '8px', fontWeight: '800' }}>{p ? `$${p.usd?.toLocaleString()}` : '...'}</span>
                  <span style={{ color: isPos ? '#22c55e' : '#ef4444', fontSize: '7px', fontWeight: '600' }}>{isPos ? '▲' : '▼'}{Math.abs(p?.usd_24h_change || 0).toFixed(2)}%</span>
                </div>
              );
            })}
          </div>

          <iframe key={symbol.tv + tvInterval + t.bg} src={tvSrc} width="100%" height="50%" frameBorder="0" allowFullScreen={true} style={{ display: 'block', flexShrink: 0 }}/>

          <div style={{ flexShrink: 0, background: t.cardBg, borderTop: `1px solid ${t.border}`, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
              {[{ key: 'trade', label: 'Trade', icon: <Zap size={10}/> }, { key: 'positions', label: 'Positions', icon: <Activity size={10}/> }, { key: 'orders', label: 'Orders', icon: <ClipboardList size={10}/> }, { key: 'pnl', label: 'P&L', icon: <Target size={10}/> }].map(bt => (
                <button key={bt.key} onClick={() => setBottomTab(bt.key)} style={{ flex: 1, padding: '7px 4px', background: bottomTab === bt.key ? (t.bg === '#f8fafc' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.15)') : 'transparent', border: 'none', borderBottom: bottomTab === bt.key ? '2px solid #6366f1' : '2px solid transparent', color: bottomTab === bt.key ? '#6366f1' : t.subText, fontSize: '8px', fontWeight: bottomTab === bt.key ? '700' : '400', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                  {bt.icon} {bt.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
              {bottomTab === 'trade' && (
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <button onClick={() => setDirection('buy')} style={{ flex: 1, padding: '8px', background: direction === 'buy' ? '#16a34a' : t.subtleBg, border: `2px solid ${direction === 'buy' ? '#16a34a' : t.border}`, color: direction === 'buy' ? 'white' : t.text, fontSize: '11px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <ArrowUpCircle size={14}/> BUY
                    </button>
                    <button onClick={() => setDirection('sell')} style={{ flex: 1, padding: '8px', background: direction === 'sell' ? '#dc2626' : t.subtleBg, border: `2px solid ${direction === 'sell' ? '#dc2626' : t.border}`, color: direction === 'sell' ? 'white' : t.text, fontSize: '11px', fontWeight: '800', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <ArrowDownCircle size={14}/> SELL
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                    {QUICK_AMOUNTS.map(a => (
                      <button key={a} onClick={() => setAmount(String(a))} style={{ flex: 1, padding: '4px', background: amount === String(a) ? '#6366f1' : t.subtleBg, border: `1px solid ${amount === String(a) ? '#6366f1' : t.border}`, color: amount === String(a) ? 'white' : t.subText, fontSize: '8px', cursor: 'pointer', borderRadius: '4px' }}>${a}</button>
                    ))}
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ color: t.subText, fontSize: '8px' }}>Amount (USD)</span>
                      <span style={{ color: '#22c55e', fontSize: '8px' }}>Bal: {formatAmount(balance || 0, currency)}</span>
                    </div>
                    <input value={amount} onChange={e => setAmount(e.target.value)} placeholder='Min $10' style={{ width: '100%', background: t.inputBg, border: `2px solid ${direction === 'buy' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`, color: t.text, fontSize: '13px', fontWeight: '700', padding: '7px 10px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px' }}/>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                    <div>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Duration</div>
                      <select value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '6px', outline: 'none', borderRadius: '6px' }}>
                        {DURATIONS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <div style={{ color: t.subText, fontSize: '8px', marginBottom: '3px' }}>Leverage</div>
                      <select value={leverage} onChange={e => setLeverage(e.target.value)} style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '6px', outline: 'none', borderRadius: '6px' }}>
                        {['1x','2x','5x','10x','20x','50x','100x'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ color: '#ef4444', fontSize: '8px', marginBottom: '3px' }}><Target size={9}/> Stop Loss</div>
                      <input value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder='Optional' style={{ width: '100%', background: t.inputBg, border: '1px solid rgba(239,68,68,0.3)', color: t.text, fontSize: '9px', padding: '6px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px' }}/>
                    </div>
                    <div>
                      <div style={{ color: '#22c55e', fontSize: '8px', marginBottom: '3px' }}><Target size={9}/> Take Profit</div>
                      <input value={takeProfit} onChange={e => setTakeProfit(e.target.value)} placeholder='Optional' style={{ width: '100%', background: t.inputBg, border: '1px solid rgba(34,197,94,0.3)', color: t.text, fontSize: '9px', padding: '6px', outline: 'none', boxSizing: 'border-box', borderRadius: '6px' }}/>
                    </div>
                  </div>
                  {msg && <div style={{ color: '#22c55e', fontSize: '9px', marginBottom: '6px', fontWeight: '600' }}>{msg}</div>}
                  {error && <div style={{ color: '#ef4444', fontSize: '9px', marginBottom: '6px' }}>{error}</div>}
                  <button onClick={handleTrade} disabled={submitting} style={{ width: '100%', padding: '11px', background: direction === 'buy' ? '#16a34a' : '#dc2626', border: 'none', color: 'white', fontSize: '12px', fontWeight: '800', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {submitting ? 'Placing...' : direction === 'buy' ? <><ArrowUpCircle size={14}/> Confirm Buy</> : <><ArrowDownCircle size={14}/> Confirm Sell</>}
                  </button>
                </div>
              )}
              {bottomTab === 'positions' && (
                <div>
                  {openTrades.length === 0 ? <div style={{ textAlign: 'center', padding: '20px', color: t.faintText, fontSize: '9px' }}>No open positions</div>
                  : openTrades.map((tr, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <div>
                        <span style={{ color: '#6366f1', fontSize: '10px', fontWeight: '700' }}>{tr.symbol}</span>
                        <span style={{ color: tr.type === 'buy' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700', marginLeft: '6px' }}>{tr.type === 'buy' ? '▲' : '▼'} {tr.type?.toUpperCase()}</span>
                        <div style={{ color: t.subText, fontSize: '7px' }}>{tr.duration} • {tr.leverage}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: t.text, fontSize: '10px', fontWeight: '700' }}>${parseFloat(tr.amount || 0).toFixed(2)}</div>
                        <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '7px', padding: '1px 5px', borderRadius: '4px' }}>● OPEN</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {bottomTab === 'orders' && (
                <div>
                  {closedTrades.length === 0 ? <div style={{ textAlign: 'center', padding: '20px', color: t.faintText, fontSize: '9px' }}>No closed orders</div>
                  : closedTrades.slice(0,15).map((tr, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${t.tableRowBorder}` }}>
                      <div>
                        <span style={{ color: '#6366f1', fontSize: '10px', fontWeight: '700' }}>{tr.symbol}</span>
                        <span style={{ color: tr.type === 'buy' ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700', marginLeft: '6px' }}>{tr.type?.toUpperCase()}</span>
                        <div style={{ color: t.subText, fontSize: '7px' }}>${parseFloat(tr.amount || 0).toFixed(2)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '10px', fontWeight: '700' }}>{tr.result > 0 ? '+' : ''}{parseFloat(tr.result || 0).toFixed(2)}</div>
                        <div style={{ color: t.subText, fontSize: '7px' }}>{tr.amount ? `${((tr.result / tr.amount) * 100).toFixed(1)}%` : '—'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {bottomTab === 'pnl' && (
                <div>
                  <div style={{ color: t.text, fontSize: '10px', fontWeight: '700', marginBottom: '10px' }}>P&L Calculator</div>
                  <div style={{ background: t.cardBg2, borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                    <div style={{ color: t.subText, fontSize: '8px', marginBottom: '4px' }}>Amount: <span style={{ color: t.text, fontWeight: '700' }}>${pnlAmount}</span></div>
                    <div style={{ color: t.subText, fontSize: '8px', marginBottom: '8px' }}>Leverage: <span style={{ color: t.text, fontWeight: '700' }}>{leverage}</span></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ color: t.subText, fontSize: '7px' }}>Potential Profit</div>
                        <div style={{ color: '#22c55e', fontSize: '13px', fontWeight: '800' }}>+${potentialProfit}</div>
                      </div>
                      <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ color: t.subText, fontSize: '7px' }}>Max Loss</div>
                        <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: '800' }}>-${potentialLoss}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: t.faintText, fontSize: '7px', textAlign: 'center' }}>* Estimates only.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setShowForm(true)} style={{ background: '#6366f1', border: 'none', color: 'white', fontSize: '9px', fontWeight: '700', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12}/> New Trade
          </button>
        </div>



        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'Balance', value: formatAmount(balance || 0, currency), icon: <DollarSign size={14} color="#6366f1"/>, color: '#6366f1', iconBg: 'rgba(99,102,241,0.15)' },
            { label: 'Open Trades', value: openTrades.length, icon: <Activity size={14} color="#22c55e"/>, color: '#22c55e', iconBg: 'rgba(34,197,94,0.15)' },
            { label: 'Win Rate', value: `${winRate}%`, icon: <Award size={14} color="#f59e0b"/>, color: '#f59e0b', iconBg: 'rgba(245,158,11,0.15)' },
            { label: 'Total P&L', value: `${totalPnL >= 0 ? '+' : ''}${formatAmount(totalPnL, currency)}`, icon: <TrendingUp size={14} color={totalPnL >= 0 ? '#22c55e' : '#ef4444'}/>, color: totalPnL >= 0 ? '#22c55e' : '#ef4444', iconBg: totalPnL >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)' },
          ].map((s, i) => (
            <div key={i} style={{ ...CS }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '7px' }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: '10px', fontWeight: '700' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {bestTrade && (
          <div style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(99,102,241,0.1))', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} color="#f59e0b"/>
            <div>
              <div style={{ color: t.text, fontSize: '9px', fontWeight: '700' }}>Best Trade</div>
              <div style={{ color: t.subText, fontSize: '8px' }}>{bestTrade.symbol} • +${parseFloat(bestTrade.result || 0).toFixed(2)}</div>
            </div>
          </div>
        )}

        <div style={{ background: t.cardBg, border: `1px solid ${t.tableOuterBorder}` }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}` }}>
            {[['open','Open',openTrades.length],['closed','Closed',closedTrades.length]].map(([key,label,count]) => (
              <button key={key} onClick={() => { setTab(key); setPage(1); }} style={{ flex: 1, padding: '10px', background: tab === key ? (t.bg === '#f8fafc' ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.15)') : 'transparent', border: 'none', borderBottom: tab === key ? '2px solid #6366f1' : '2px solid transparent', color: tab === key ? '#6366f1' : t.mutedText, fontSize: '9px', fontWeight: tab === key ? '700' : '400', cursor: 'pointer' }}>
                {label} <span style={{ background: tab === key ? '#6366f1' : t.subtleBg, color: tab === key ? 'white' : t.subText, fontSize: '7px', padding: '1px 5px', borderRadius: '10px', marginLeft: '4px' }}>{count}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Show</span>
              <select value={show} onChange={e => { setShow(Number(e.target.value)); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '2px 5px', outline: 'none' }}>
                <option>10</option><option>25</option><option>50</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: t.subText, fontSize: '8px' }}>Search:</span>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ background: t.border, border: `1px solid ${t.border}`, color: t.text, fontSize: '8px', padding: '3px 8px', outline: 'none', width: '90px' }}/>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: t.tableHeaderBg }}>
                {(tab === 'open' ? ['Symbol','Type','Amount','Duration','Leverage','Status',''] : ['Symbol','Type','Amount','Result','%','Status']).map((h,i) => (
                  <th key={i} style={{ color: t.subText, fontSize: '7px', fontWeight: '700', padding: '7px 6px', borderRight: `1px solid ${t.tableOuterBorder}`, borderBottom: `1px solid ${t.tableOuterBorder}`, textAlign: 'left' }}>{h}</th>
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
                  {tab === 'open' ? (<>
                    <td style={{ padding: '8px 6px', color: t.subText, fontSize: '7px' }}>{tr.duration}</td>
                    <td style={{ padding: '8px 6px', color: t.subText, fontSize: '7px' }}>{tr.leverage}</td>
                    <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '6px', padding: '2px 5px', borderRadius: '3px' }}>● {tr.status}</span></td>
                    <td style={{ padding: '8px 6px' }}><button onClick={fetchAll} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '6px', padding: '2px 5px', cursor: 'pointer', borderRadius: '3px' }}>Close</button></td>
                  </>) : (<>
                    <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.result > 0 ? '+' : ''}{formatAmount(parseFloat(tr.result || 0), user?.currency)}</td>
                    <td style={{ padding: '8px 6px', color: tr.result > 0 ? '#22c55e' : '#ef4444', fontSize: '8px', fontWeight: '700' }}>{tr.amount ? `${((tr.result / tr.amount) * 100).toFixed(1)}%` : '—'}</td>
                    <td style={{ padding: '8px 6px' }}><span style={{ background: 'rgba(107,114,128,0.1)', color: '#9ca3af', fontSize: '6px', padding: '2px 5px', borderRadius: '3px' }}>{tr.status}</span></td>
                  </>)}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', borderTop: `1px solid ${t.tableRowBorder}` }}>
            <span style={{ color: t.faintText, fontSize: '8px' }}>Showing {filtered.length === 0 ? 0 : (page-1)*show+1}–{Math.min(page*show, filtered.length)} of {filtered.length}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setPage(1)} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1?t.faintText:t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page===1?'default':'pointer' }}>«</button>
              <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ background: t.border, border: `1px solid ${t.border}`, color: page===1?t.faintText:t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page===1?'default':'pointer' }}>‹</button>
              <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages?t.faintText:t.paginationText, fontSize: '10px', padding: '2px 8px', cursor: page>=totalPages?'default':'pointer' }}>›</button>
              <button onClick={() => setPage(totalPages)} disabled={page>=totalPages} style={{ background: t.border, border: `1px solid ${t.border}`, color: page>=totalPages?t.faintText:t.paginationText, fontSize: '8px', padding: '2px 6px', cursor: page>=totalPages?'default':'pointer' }}>»</button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', color: t.faintText, fontSize: '7px', borderTop: `1px solid ${t.tableRowBorder}` }}>2020-2026 © Quantyrex Markets</div>
      </div>
    </div>
  );
}
