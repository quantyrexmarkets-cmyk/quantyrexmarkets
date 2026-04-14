import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const coins = [
  { label: 'BTC', value: 'BINANCE:BTCUSDT' },
  { label: 'ETH', value: 'BINANCE:ETHUSDT' },
  { label: 'BNB', value: 'BINANCE:BNBUSDT' },
  { label: 'SOL', value: 'BINANCE:SOLUSDT' },
  { label: 'XRP', value: 'BINANCE:XRPUSDT' },
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

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const isDark = t.bg !== '#f8fafc';
    const bgColor = t.bg === '#f8fafc' ? '#ffffff' : t.bg === '#111111' ? '#111111' : '#0f172a';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[symbol.value]],
      chartOnly: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      colorTheme: isDark ? 'dark' : 'light',
      autosize: true,
      showVolume: true,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'candlesticks',
      maLineColor: '#2962FF',
      maLineWidth: 1,
      maLength: 9,
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1w|60', '1m|D', '3m|D', '12m|W', '60m|W'],
      backgroundColor: bgColor,
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [symbol, t.bg]);

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
        gap: '4px',
        flexWrap: 'wrap',
      }}>
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

      {/* Chart */}
      <div ref={containerRef} style={{ height: '420px', width: '100%' }} />
    </div>
  );
}
