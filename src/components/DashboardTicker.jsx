import { useState, useEffect, memo, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const coins = [
  { id: 'bitcoin', symbol: 'BTC', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { id: 'ethereum', symbol: 'ETH', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { id: 'binancecoin', symbol: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { id: 'solana', symbol: 'SOL', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { id: 'ripple', symbol: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  { id: 'cardano', symbol: 'ADA', logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
  { id: 'dogecoin', symbol: 'DOGE', logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
  { id: 'tether', symbol: 'USDT', logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
];

function DashboardTicker() {
  const { current: t } = useTheme();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchPrices = () => {
      const ids = coins.map(c => c.id).join(',');
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`)
        .then(r => r.json())
        .then(data => {
          if (!cancelled) {
            setPrices(data);
            setLoading(false);
          }
        })
        .catch(() => { if (!cancelled) setLoading(false); });
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // 60s instead of 30s
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Memoize ticker items so they don't re-render unless prices change
  const tickerItems = useMemo(() => {
    return coins.map((coin) => {
      const data = prices[coin.id];
      if (!data) return null;
      const change = data.usd_24h_change?.toFixed(2);
      const isPos = parseFloat(change) >= 0;
      return (
        <div key={coin.id} style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          flexShrink: 0, padding: '0 14px',
          borderRight: `1px solid ${t.border}`
        }}>
          <img
            src={coin.logo}
            style={{ width: '12px', height: '12px', borderRadius: '50%' }}
            alt={coin.symbol}
            loading="lazy"
            onError={e => e.target.style.display = 'none'}
          />
          <span style={{ color: t.subText, fontSize: '8px' }}>{coin.symbol} to USD</span>
          <span style={{ color: t.text, fontSize: '8px', fontWeight: '600' }}>${data.usd?.toLocaleString()}</span>
          <span style={{ color: isPos ? '#22c55e' : '#ef4444', fontSize: '7px' }}>
            {isPos ? '+' : ''}{change}%
          </span>
        </div>
      );
    }).filter(Boolean);
  }, [prices, t.border, t.subText, t.text]);

  return (
    <div style={{
      background: 'transparent', padding: '5px 0',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', flexShrink: 0,
      borderBottom: `1px solid ${t.border}`,
      contain: 'layout paint',
    }}>
      <style>{`
        @keyframes dashTicker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .dash-ticker-track {
          display: flex;
          width: max-content;
          animation: dashTicker 60s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .dash-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      {loading ? (
        <span style={{ color: t.subText, fontSize: '8px', padding: '0 12px' }}>Loading...</span>
      ) : (
        <div className="dash-ticker-track">
          {tickerItems}
          {tickerItems}
        </div>
      )}
    </div>
  );
}

export default memo(DashboardTicker);
