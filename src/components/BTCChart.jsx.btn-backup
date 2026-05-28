import React, { useState } from 'react';
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
  const [symbol, setSymbol] = useState(coins[0]);
  const [interval, setInterval] = useState(intervals[2]);

  const isDark = t.bg !== '#f8fafc';
  const theme = isDark ? 'dark' : 'light';

  const src = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${symbol.value}&interval=${interval.value}&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=0&saveimage=0&toolbarbg=${isDark ? '0f172a' : 'ffffff'}&studies=[]&theme=${theme}&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=quantyrexmarkets.vercel.app`;

  const activeTab = {
    padding: '4px 12px',
    background: '#6366f1',
    border: 'none',
    color: 'white',
    fontSize: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  const inactiveTab = {
    padding: '4px 12px',
    background: 'transparent',
    border: `1px solid ${t.border}`,
    color: t.subText,
    fontSize: '10px',
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
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {coins.map(c => (
            <button key={c.value} onClick={() => setSymbol(c)}
              style={symbol.value === c.value ? activeTab : inactiveTab}>
              {c.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {intervals.map(iv => (
            <button key={iv.value} onClick={() => setInterval(iv)}
              style={interval.value === iv.value ? activeTab : inactiveTab}>
              {iv.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart iframe */}
      <iframe
        key={`${symbol.value}-${interval.value}-${theme}`}
        src={src}
        style={{
          width: '100%',
          height: '420px',
          border: 'none',
          display: 'block',
        }}
        allowTransparency={true}
        scrolling="no"
        allowFullScreen={true}
      />
    </div>
  );
}
