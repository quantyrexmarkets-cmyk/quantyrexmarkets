import { useState, useEffect, useRef, useMemo } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { TrendingUp, TrendingDown, Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { createTrade, getTrades } from '../services/api';
import StatusPopup from '../components/StatusPopup';
import PageHeader from '../components/PageHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { toast } from 'react-toastify';
import { useCurrency } from '../context/CurrencyContext';

// Trading symbols (Binance pair → display)
const SYMBOLS = [
  { binance: 'btcusdt', label: 'BTC/USD', display: 'BTC', name: 'Bitcoin' },
  { binance: 'ethusdt', label: 'ETH/USD', display: 'ETH', name: 'Ethereum' },
  { binance: 'solusdt', label: 'SOL/USD', display: 'SOL', name: 'Solana' },
  { binance: 'xrpusdt', label: 'XRP/USD', display: 'XRP', name: 'Ripple' },
  { binance: 'bnbusdt', label: 'BNB/USD', display: 'BNB', name: 'Binance Coin' },
  { binance: 'adausdt', label: 'ADA/USD', display: 'ADA', name: 'Cardano' },
];

// Timeframes (UI → Binance interval)
const TIMEFRAMES = [
  { label: '1m', binance: '1m' },
  { label: '5m', binance: '5m' },
  { label: '15m', binance: '15m' },
  { label: '1H', binance: '1h' },
  { label: '4H', binance: '4h' },
  { label: '1D', binance: '1d' },
];

const QUICK_AMOUNTS = [10, 50, 100, 500];
const DURATIONS = ['30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour'];
const LEVERAGES = ['1x', '2x', '5x', '10x', '20x', '50x', '100x'];

export default function LiveTrading() {
  const { format, toUSD, symbol: currencySymbol, code: currencyCode } = useCurrency();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requireSub, handleApiError } = useSubscription();
  const { current: t } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Trading state
  const [symbol, setSymbol] = useState(SYMBOLS[0]);
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[2]); // 15m default
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [pricePercent, setPricePercent] = useState(0);

  // Trade form
  const [activeTab, setActiveTab] = useState('trade');
  const [tradeType, setTradeType] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('5 minutes');
  const [leverage, setLeverage] = useState('1x');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: 'success', title: '', message: '' });

  // Positions
  const [trades, setTrades] = useState([]);

  // Chart refs
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const wsRef = useRef(null);


  // ====== INITIALIZE CHART ======
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 360,
      layout: {
        background: { type: 'solid', color: t.bg },
        textColor: t.subText,
        fontSize: 11,
      },
      grid: {
        vertLines: { color: t.border },
        horzLines: { color: t.border },
      },
      rightPriceScale: { borderColor: t.border },
      timeScale: { borderColor: t.border, timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#6366f1',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Resize handler
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [t.bg, t.border, t.subText]);

  // ====== LOAD HISTORICAL CANDLES + LIVE WEBSOCKET ======
  useEffect(() => {
    if (!candleSeriesRef.current) return;

    let alive = true;

    // 1. Fetch historical klines from Binance
    const loadHistory = async () => {
      try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol.binance.toUpperCase()}&interval=${timeframe.binance}&limit=300`;
        const res = await fetch(url);
        const data = await res.json();
        if (!alive) return;

        const candles = data.map(k => ({
          time: Math.floor(k[0] / 1000),
          open: parseFloat(k[1]),
          high: parseFloat(k[2]),
          low: parseFloat(k[3]),
          close: parseFloat(k[4]),
        }));
        const volumes = data.map(k => ({
          time: Math.floor(k[0] / 1000),
          value: parseFloat(k[5]),
          color: parseFloat(k[4]) >= parseFloat(k[1]) ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)',
        }));

        candleSeriesRef.current.setData(candles);
        volumeSeriesRef.current.setData(volumes);

        if (candles.length > 0) {
          const last = candles[candles.length - 1];
          const first = candles[0];
          setCurrentPrice(last.close);
          setPriceChange(last.close - first.open);
          setPricePercent(((last.close - first.open) / first.open) * 100);
        }
      } catch (err) {
        console.warn('Failed to load history:', err);
      }
    };

    loadHistory();

    // 2. Open WebSocket for live kline updates
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.binance}@kline_${timeframe.binance}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const k = msg.k;
        if (!k || !candleSeriesRef.current) return;

        const candle = {
          time: Math.floor(k.t / 1000),
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };
        const volume = {
          time: Math.floor(k.t / 1000),
          value: parseFloat(k.v),
          color: parseFloat(k.c) >= parseFloat(k.o) ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)',
        };

        candleSeriesRef.current.update(candle);
        volumeSeriesRef.current.update(volume);
        setCurrentPrice(parseFloat(k.c));
      } catch (e) { /* ignore */ }
    };

    ws.onerror = () => console.warn('WebSocket error');

    return () => {
      alive = false;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [symbol, timeframe]);

  // ====== LOAD USER'S TRADES ======
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTrades();
        if (Array.isArray(data)) setTrades(data);
      } catch (e) { /* ignore */ }
    };
    load();
    const iv = setInterval(load, 15000);
    return () => clearInterval(iv);
  }, []);

  // ====== HANDLE TRADE EXECUTION ======
  const handleTrade = async () => {
    if (!requireSub('execute trade')) return;
    if (!amount || parseFloat(amount) < 10) {
      setPopup({ show: true, type: 'error', title: 'Invalid Amount', message: `Minimum trade amount is ${format(10)}` });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        account: 'real',
        market: 'Crypto',
        symbol: symbol.label,
        type: tradeType,
        amount: parseFloat(amount),
        leverage,
        duration,
        stopLoss: stopLoss ? parseFloat(stopLoss) : null,
        takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      };
      const res = await createTrade(payload);
      console.log('[Trade] Response:', res);
      console.log('Trade response:', res);
      if (res?.message && !res?.trade) {
        setPopup({ show: true, type: 'error', title: 'Trade Failed', message: res.message });
        setSubmitting(false);
        return;
      }
      if (res?.trade) {
        setPopup({ show: true, type: 'success', title: 'Trade Executed!', message: `${tradeType} ${symbol.label} for ${format(amount)}` });
        setAmount('');
        setStopLoss('');
        setTakeProfit('');
        // Reload trades
        const data = await getTrades();
        if (Array.isArray(data)) setTrades(data);
      } else {
        setPopup({ show: true, type: 'error', title: 'Trade Failed', message: res?.message || res?.error || 'Unable to place trade' });
      }
    } catch (e) {
      console.error('[Trade] Error:', e);
      setPopup({ show: true, type: 'error', title: 'Trade Failed', message: e?.message || 'Network error - please try again' });
    } finally {
      setSubmitting(false);
    }
  };

  // Filter active trades
  const activeTrades = useMemo(() => trades.filter(tr => tr.status === 'active'), [trades]);
  const closedTrades = useMemo(() => trades.filter(tr => tr.status === 'closed'), [trades]);
  const totalPnL = useMemo(() => closedTrades.reduce((sum, tr) => sum + (tr.result || 0), 0), [closedTrades]);

  const isUp = priceChange >= 0;
  const priceColor = isUp ? '#22c55e' : '#ef4444';


  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: "'Segoe UI', sans-serif", color: t.text, display: 'flex', flexDirection: 'column' }}>
      <PageHeader />
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <StatusPopup {...popup} onClose={() => setPopup(p => ({ ...p, show: false }))} />

      {/* SYMBOL SELECTOR ROW */}
      <div style={{ padding: '10px 12px', background: t.cardBg, borderBottom: `1px solid ${t.border}`, overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', gap: '6px' }}>
        {SYMBOLS.map(s => (
          <button
            type="button"
            key={s.binance}
            onClick={() => setSymbol(s)}
            style={{
              padding: '6px 12px',
              background: symbol.binance === s.binance ? 'rgba(99,102,241,0.18)' : 'transparent',
              border: `1px solid ${symbol.binance === s.binance ? '#6366f1' : t.border}`,
              borderRadius: '6px',
              color: symbol.binance === s.binance ? '#818cf8' : t.text,
              fontSize: '10px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
            {s.display}
          </button>
        ))}
      </div>

      {/* PRICE BAR */}
      <div style={{ padding: '14px 16px', background: t.cardBg, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: t.subText, fontSize: '11px', fontWeight: '400' }}>{symbol.name} · {symbol.label}</div>
            <div style={{ color: t.text, fontSize: '22px', fontWeight: '500', marginTop: '4px', fontFamily: "'SF Mono', Menlo, monospace" }}>
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: symbol.binance.startsWith('xrp') || symbol.binance.startsWith('ada') ? 4 : 2 })}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: priceColor, fontSize: '12px', fontWeight: '500' }}>
              {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
              {isUp ? '+' : ''}{priceChange.toFixed(2)}
            </div>
            <div style={{ color: priceColor, fontSize: '11px', fontWeight: '400', marginTop: '4px' }}>
              ({isUp ? '+' : ''}{pricePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {/* TIMEFRAME ROW */}
      <div style={{ padding: '8px 12px', background: t.cardBg, borderBottom: `1px solid ${t.border}`, display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {TIMEFRAMES.map(tf => (
          <button
            type="button"
            key={tf.binance}
            onClick={() => setTimeframe(tf)}
            style={{
              padding: '5px 12px',
              background: timeframe.binance === tf.binance ? '#6366f1' : 'transparent',
              border: `1px solid ${timeframe.binance === tf.binance ? '#6366f1' : t.border}`,
              borderRadius: '4px',
              color: timeframe.binance === tf.binance ? '#ffffff' : t.text,
              fontSize: '10px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
            {tf.label}
          </button>
        ))}
      </div>

      {/* CHART */}
      <div ref={chartContainerRef} style={{ width: '100%', height: '360px', background: t.bg }} />

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}`, background: t.cardBg }}>
        {[
          { id: 'trade', label: 'Trade' },
          { id: 'positions', label: `Positions (${activeTrades.length})` },
          { id: 'orders', label: 'Orders' },
          { id: 'pnl', label: 'P&L' },
        ].map(tab => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 4px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === tab.id ? '#818cf8' : t.subText,
              fontSize: '10px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div style={{ flex: 1, padding: '16px 12px' }}>

        {activeTab === 'trade' && (
          <>
            {/* Buy/Sell toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <button type="button" onClick={() => setTradeType('BUY')} style={{
                padding: '14px', background: tradeType === 'BUY' ? '#22c55e' : 'transparent',
                border: `1.5px solid ${tradeType === 'BUY' ? '#22c55e' : t.border}`, borderRadius: '8px',
                color: tradeType === 'BUY' ? '#ffffff' : t.text, fontSize: '12px', fontWeight: '500',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}><TrendingUp size={14}/> BUY</button>
              <button type="button" onClick={() => setTradeType('SELL')} style={{
                padding: '14px', background: tradeType === 'SELL' ? '#ef4444' : 'transparent',
                border: `1.5px solid ${tradeType === 'SELL' ? '#ef4444' : t.border}`, borderRadius: '8px',
                color: tradeType === 'SELL' ? '#ffffff' : t.text, fontSize: '12px', fontWeight: '500',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}><TrendingDown size={14}/> SELL</button>
            </div>

            {/* Quick amounts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
              {QUICK_AMOUNTS.map(amt => (
                <button type="button" key={amt} onClick={() => setAmount(String(amt))}
                  style={{ padding: '10px 0', background: amount === String(amt) ? 'rgba(99,102,241,0.15)' : t.inputBg,
                    border: `1px solid ${amount === String(amt) ? '#6366f1' : t.border}`, borderRadius: '6px',
                    color: amount === String(amt) ? '#818cf8' : t.subText, fontSize: '11px', fontWeight: '400', cursor: 'pointer' }}>
                  ${amt}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: t.subText, fontSize: '10px' }}>Amount (USD)</span>
              <span style={{ color: '#818cf8', fontSize: '10px', fontWeight: '400' }}>Bal: {format(user?.balance || 0)}</span>
            </div>
            <input type="number" value={amount ? Number(String(amount).replace(/,/g, '')).toLocaleString('en-US') : ''} onChange={e => { const raw = e.target.value.replace(/,/g, ''); if (raw === '' || /^\d*\.?\d*$/.test(raw)) setAmount(raw); }} placeholder={`Min ${format(10)}`}
              style={{ width: '100%', padding: '11px 12px', background: t.inputBg, border: `1px solid ${t.border}`,
                borderRadius: '6px', color: t.text, fontSize: '12px', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />

            {/* Duration + Leverage */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ color: t.subText, fontSize: '10px', marginBottom: '4px' }}>Duration</div>
                <select value={duration} onChange={e => setDuration(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: t.inputBg, border: `1px solid ${t.border}`,
                    borderRadius: '6px', color: t.text, fontSize: '11px', outline: 'none' }}>
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <div style={{ color: t.subText, fontSize: '10px', marginBottom: '4px' }}>Leverage</div>
                <select value={leverage} onChange={e => setLeverage(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: t.inputBg, border: `1px solid ${t.border}`,
                    borderRadius: '6px', color: t.text, fontSize: '11px', outline: 'none' }}>
                  {LEVERAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* Stop Loss + Take Profit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <div style={{ color: '#ef4444', fontSize: '10px', marginBottom: '4px', fontWeight: '400' }}>◎ Stop Loss</div>
                <input type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="Optional"
                  style={{ width: '100%', padding: '10px', background: t.inputBg, border: `1px solid ${t.border}`,
                    borderRadius: '6px', color: t.text, fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <div style={{ color: '#22c55e', fontSize: '10px', marginBottom: '4px', fontWeight: '400' }}>◎ Take Profit</div>
                <input type="number" value={takeProfit} onChange={e => setTakeProfit(e.target.value)} placeholder="Optional"
                  style={{ width: '100%', padding: '10px', background: t.inputBg, border: `1px solid ${t.border}`,
                    borderRadius: '6px', color: t.text, fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Execute Button */}
            <button type="button" disabled={submitting} onClick={handleTrade}
              style={{ width: '100%', padding: '15px', background: tradeType === 'BUY' ? '#22c55e' : '#ef4444',
                border: 'none', borderRadius: '8px', color: '#ffffff', fontSize: '13px', fontWeight: '500',
                cursor: submitting ? 'wait' : 'pointer', letterSpacing: '0.5px',
                opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Executing...' : `${tradeType} ${symbol.display} · ${format(amount || 0)}`}
            </button>
          </>
        )}

        {activeTab === 'positions' && (
          <div>
            {activeTrades.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: t.subText, fontSize: '12px' }}>
                <Clock size={32} color={t.faintText} style={{ marginBottom: '12px' }} />
                <div>No active positions</div>
                <div style={{ fontSize: '10px', marginTop: '6px' }}>Open a trade to see it here</div>
              </div>
            ) : (
              activeTrades.map(tr => (
                <div key={tr._id} style={{ padding: '12px', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: tr.type === 'BUY' ? '#22c55e' : '#ef4444', fontSize: '11px', fontWeight: '500' }}>
                        {tr.type === 'BUY' ? '▲' : '▼'} {tr.type}
                      </span>
                      <span style={{ color: t.text, fontSize: '11px', fontWeight: '400' }}>{tr.symbol}</span>
                      <span style={{ color: t.subText, fontSize: '9px' }}>{tr.leverage}</span>
                    </div>
                    <span style={{ color: t.text, fontSize: '11px', fontWeight: '400' }}>{format(tr.amount)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: t.subText }}>
                    <span>Entry: ${tr.openPrice?.toFixed(2)}</span>
                    <span>Duration: {tr.duration}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {trades.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: t.subText, fontSize: '12px' }}>
                No orders yet
              </div>
            ) : (
              trades.slice(0, 20).map(tr => (
                <div key={tr._id} style={{ padding: '10px 12px', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '6px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '400' }}>
                      <span style={{ color: tr.type === 'BUY' ? '#22c55e' : '#ef4444' }}>{tr.type}</span> {tr.symbol}
                    </div>
                    <div style={{ fontSize: '9px', color: t.subText, marginTop: '2px' }}>
                      {new Date(tr.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: '400' }}>{format(tr.amount)}</div>
                    <div style={{ fontSize: '9px', color: tr.status === 'closed' ? (tr.result > 0 ? '#22c55e' : '#ef4444') : '#f59e0b', marginTop: '2px', fontWeight: '400' }}>
                      {tr.status === 'closed' ? (tr.result > 0 ? `+${format(tr.result)}` : `${format(tr.result)}`) : tr.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'pnl' && (
          <div>
            <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '20px', marginBottom: '12px', textAlign: 'center' }}>
              <div style={{ color: t.subText, fontSize: '10px', letterSpacing: '1.5px', fontWeight: '400', marginBottom: '8px' }}>TOTAL P&L</div>
              <div style={{ color: totalPnL >= 0 ? '#22c55e' : '#ef4444', fontSize: '20px', fontWeight: '500' }}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </div>
              <div style={{ color: t.subText, fontSize: '10px', marginTop: '6px' }}>{closedTrades.length} closed trades</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#22c55e', fontSize: '16px', fontWeight: '500' }}>{closedTrades.filter(tr => tr.result > 0).length}</div>
                <div style={{ color: t.subText, fontSize: '9px', marginTop: '4px' }}>WINS</div>
              </div>
              <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#ef4444', fontSize: '16px', fontWeight: '500' }}>{closedTrades.filter(tr => tr.result < 0).length}</div>
                <div style={{ color: t.subText, fontSize: '9px', marginTop: '4px' }}>LOSSES</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '14px', color: t.faintText, fontSize: '9px', borderTop: `1px solid ${t.tableRowBorder}`, marginTop: 'auto' }}>
        2020-2026 © Quantyrex Markets
      </div>
    </div>
  );
}
