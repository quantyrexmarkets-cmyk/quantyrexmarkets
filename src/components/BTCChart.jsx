import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function BTCChart() {
  const { current: t } = useTheme();
  const containerRef = useRef(null);
  const [symbol, setSymbol] = useState('BINANCE:BTCUSDT');

  const coins = [
    { label: 'BTC / USDT', value: 'BINANCE:BTCUSDT' },
    { label: 'ETH / USDT', value: 'BINANCE:ETHUSDT' },
    { label: 'BNB / USDT', value: 'BINANCE:BNBUSDT' },
    { label: 'SOL / USDT', value: 'BINANCE:SOLUSDT' },
    { label: 'XRP / USDT', value: 'BINANCE:XRPUSDT' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: 'W',
      timezone: 'Etc/UTC',
      theme: t.bg === '#f8fafc' ? 'light' : 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: t.bg === '#f8fafc' ? '#f8fafc' : t.bg === '#111111' ? '#111111' : '#252d3d',
      gridColor: t.tableRowBorder,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      range: '12M',
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div style={{ marginBottom: '12px', border: '1px solid rgba(99,102,241,0.5)', background: t.cardBg, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', borderBottom: `1px solid ${t.subtleBorder}`, background: t.cardBg, overflowX: 'auto' }}>
        {coins.map(c => (
          <button key={c.value} onClick={() => setSymbol(c.value)} style={{ padding: '3px 8px', fontSize: '8px', background: symbol === c.value ? '#6366f1' : t.hoverBg, border: 'none', color: symbol === c.value ? 'white' : t.text, cursor: 'pointer', whiteSpace: 'nowrap', borderRadius: '2px' }}>
            {c.label}
          </button>
        ))}
      </div>
      <div ref={containerRef} style={{ height: '500px', width: '100%' }}>
        <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
