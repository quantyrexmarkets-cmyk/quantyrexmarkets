import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const coins = [
  { label: 'BTC', full: 'BTC/USDT', value: 'BINANCE:BTCUSDT' },
  { label: 'ETH', full: 'ETH/USDT', value: 'BINANCE:ETHUSDT' },
  { label: 'BNB', full: 'BNB/USDT', value: 'BINANCE:BNBUSDT' },
  { label: 'SOL', full: 'SOL/USDT', value: 'BINANCE:SOLUSDT' },
  { label: 'XRP', full: 'XRP/USDT', value: 'BINANCE:XRPUSDT' },
];

const intervals = [
  { label: '1H', value: '60' },
  { label: '4H', value: '240' },
  { label: '1D', value: 'D' },
  { label: '1W', value: 'W' },
];

export default function BTCChart() {
  const { current: t } = useTheme();
  const containerRef = useRef(null);
  const [symbol, setSymbol] = useState(coins[0]);
  const [interval, setInterval] = useState(intervals[2]);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous widget
    containerRef.current.innerHTML = '';
    
    const isDark = t.bg !== '#f8fafc';
    const bgColor = t.bg === '#f8fafc' ? '#ffffff' : t.bg === '#111111' ? '#111111' : '#0f172a';

    // Use the full-featured chart widget
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container';
    widget.style.height = '100%';
    widget.style.width = '100%';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = 'calc(100% - 32px)';
    widgetDiv.style.width = '100%';
    widget.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol.value,
      interval: interval.value,
      timezone: 'Etc/UTC',
      theme: isDark ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      backgroundColor: bgColor,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_side_toolbar: false,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
    });

    widget.appendChild(script);
    containerRef.current.appendChild(widget);
    widgetRef.current = widget;

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [symbol, interval, t.bg]);

  const activeTabStyle = {
    padding: '4px 10px',
    background: '#6366f1',
    border: 'none',
    color: 'white',
    fontSize: '9px',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  const inactiveTabStyle = {
    padding: '4px 10px',
    background: 'transparent',
    border: `1px solid ${t.border}`,
    color: t.subText,
    fontSize: '9px',
    fontWeight: '400',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  return (
    <div style={{ 
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: `1px solid ${t.border}`,
      background: t.cardBg,
    }}>
      {/* Header */}
      <div style={{ 
        padding: '8px 12px', 
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {/* Symbol selector */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {coins.map(c => (
            <button 
              key={c.value} 
              onClick={() => setSymbol(c)}
              style={symbol.value === c.value ? activeTabStyle : inactiveTabStyle}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Interval selector */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {intervals.map(iv => (
            <button
              key={iv.value}
              onClick={() => setInterval(iv)}
              style={interval.value === iv.value ? activeTabStyle : inactiveTabStyle}
            >
              {iv.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div 
        ref={containerRef} 
        style={{ height: '420px', width: '100%' }}
      />
    </div>
  );
}
