import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, FlaskConical, Heart } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { getTraders } from '../services/api';

const HEADSHOTS = {
  "Ross Cameron": "https://unavatar.io/twitter/DayTraderRoss",
  "Rayner Teo": "https://unavatar.io/twitter/rayner_teo",
  "Kathy Lien": "https://unavatar.io/twitter/kathylienfx",
  "Nicola Duke": "https://unavatar.io/twitter/nicoladuke",
  "Anton Kreil": "https://unavatar.io/twitter/antonkreil",
  "Timothy Sykes": "https://unavatar.io/twitter/timothysykes",
  "Nial Fuller": "https://unavatar.io/twitter/nialfuller",
  "Anne-Marie Baiynd": "https://unavatar.io/twitter/AnneMarieTrades"
};

const TRADERS_DEFAULT = [
  { id: 1, _id: '1', name: 'Ross Cameron', bio: 'A full-time day trader and founder of Warrior Trading.', location: 'Vermont, USA', flag: '🇺🇸', followers: '1.2k', risk: 6.5, favorite: 'AAPL', totalTrades: 300, totalLoss: 12, profitShare: 20.5, winRate: 75, img: HEADSHOTS["Ross Cameron"], verified: true },
  { id: 2, _id: '2', name: 'Rayner Teo', bio: 'A professional trader and author from Singapore.', location: 'Singapore', flag: '🇸🇬', followers: '3.4k', risk: 4.8, favorite: 'SPY', totalTrades: 820, totalLoss: 34, profitShare: 18.0, winRate: 82, img: HEADSHOTS["Rayner Teo"], verified: true },
  { id: 3, _id: '3', name: 'Kathy Lien', bio: 'Managing Director of FX Strategy at BK Asset Management.', location: 'New York, USA', flag: '🇺🇸', followers: '2.1k', risk: 5.4, favorite: 'EURUSD', totalTrades: 950, totalLoss: 21, profitShare: 15.2, winRate: 79, img: HEADSHOTS["Kathy Lien"], verified: true },
  { id: 4, _id: '4', name: 'Nicola Duke', bio: 'Forex educator and professional trader.', location: 'United Kingdom', flag: '🇬🇧', followers: '1.6k', risk: 5.2, favorite: 'GBPUSD', totalTrades: 540, totalLoss: 15, profitShare: 19.5, winRate: 81, img: HEADSHOTS["Nicola Duke"], verified: true },
  { id: 5, _id: '5', name: 'Anton Kreil', bio: 'Former Goldman Sachs trader.', location: 'London, UK', flag: '🇬🇧', followers: '2.8k', risk: 7.1, favorite: 'ETH', totalTrades: 1200, totalLoss: 45, profitShare: 12.5, winRate: 88, img: HEADSHOTS["Anton Kreil"], verified: true },
  { id: 6, _id: '6', name: 'Timothy Sykes', bio: 'Penny stock trader and entrepreneur.', location: 'Miami, USA', flag: '🇺🇸', followers: '4.1k', risk: 9.1, favorite: 'TSLA', totalTrades: 1800, totalLoss: 280, profitShare: 25.0, winRate: 65, img: HEADSHOTS["Timothy Sykes"], verified: true },
  { id: 7, _id: '7', name: 'Nial Fuller', bio: 'Price action specialist.', location: 'Australia', flag: '🇦🇺', followers: '1.8k', risk: 5.1, favorite: 'GBPUSD', totalTrades: 610, totalLoss: 18, profitShare: 22.3, winRate: 84, img: HEADSHOTS["Nial Fuller"], verified: true },
  { id: 8, _id: '8', name: 'Anne-Marie Baiynd', bio: 'Author of "The Trading Book".', location: 'Texas, USA', flag: '🇺🇸', followers: '1.4k', risk: 4.9, favorite: 'SPX', totalTrades: 720, totalLoss: 22, profitShare: 17.8, winRate: 80, img: HEADSHOTS["Anne-Marie Baiynd"], verified: true },
];

export default function CopyTrading() {
  const navigate = useNavigate();
  const { current: t } = useTheme();
  const [traders, setTraders] = useState(TRADERS_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTraders().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map(tr => ({
          ...tr,
          img: (tr.img && !tr.img.includes('ui-avatars.com') && tr.img.trim() !== '') ? tr.img : (HEADSHOTS[tr.name] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80')
        }));
        setTraders(mapped);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = traders.filter(tr =>
    (tr.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (tr.location || '').toLowerCase().includes(search.toLowerCase()) ||
    (tr.favorite || '').toLowerCase().includes(search.toLowerCase())
  );

  const riskColor = r => r <= 4 ? '#22c55e' : r <= 7 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif", color: t.text }}>
      <PageHeader title="Copy Trading" />
      <div style={{ padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <div style={{ width: '4px', height: '16px', background: '#6366f1' }} />
          <span style={{ color: t.text, fontSize: '11px', fontWeight: '700' }}>Copy Expert Traders</span>
        </div>
        <p style={{ fontSize: '8px', color: t.subText, margin: '0 0 14px' }}>Copy expert traders from all over the world and enhance your investment portfolio.</p>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={12} color={t.faintText} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search expert traders" style={{ width: '100%', background: t.cardBg, border: `1px solid ${t.border}`, color: t.text, fontSize: '9px', padding: '9px 10px 9px 28px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {filtered.map(tr => {
          const traderKey = tr._id || tr.id || tr.name;
          const photo = (tr.img && !tr.img.includes('ui-avatars.com') && tr.img.trim() !== '') ? tr.img : (HEADSHOTS[tr.name] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80');

          return (
            <div key={traderKey} style={{ background: t.cardBg, border: `1px solid ${t.subtleBorder}`, borderRadius: '12px', padding: '16px', marginBottom: '12px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '20px' }}>{tr.flag || '🌐'}</div>
              <div
                onClick={() => navigate(`/dashboard/copy-trading/${tr._id || tr.id || 1}`)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(99,102,241,0.5)', marginBottom: '8px' }}>
                  <img src={photo} alt={tr.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>{tr.name}</span>
                  {tr.verified !== false && (
                    <svg width="18" height="18" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 50.0,3.0 L 57.4,12.7 L 68.0,6.6 L 71.1,18.4 L 83.2,16.8 L 81.6,28.9 L 93.4,32.0 L 87.3,42.6 L 97.0,50.0 L 87.3,57.4 L 93.4,68.0 L 81.6,71.1 L 83.2,83.2 L 71.1,81.6 L 68.0,93.4 L 57.4,87.3 L 50.0,97.0 L 42.6,87.3 L 32.0,93.4 L 28.9,81.6 L 16.8,83.2 L 18.4,71.1 L 6.6,68.0 L 12.7,57.4 L 3.0,50.0 L 12.7,42.6 L 6.6,32.0 L 18.4,28.9 L 16.8,16.8 L 28.9,18.4 L 32.0,6.6 L 42.6,12.7 Z" fill="#3b82f6"/>
                      <path d="M32 51l12 12 24-26" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
                  <MapPin size={9} color={t.mutedText} />
                  <span style={{ fontSize: '8px', color: t.subText }}>{tr.location || 'Global'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: t.hoverBg, padding: '4px 8px', borderRadius: '20px' }}>
                  <Users size={9} color={t.dimText} />
                  <span style={{ fontSize: '8px', color: t.subText }}>{tr.followers || '1k+'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: t.hoverBg, padding: '4px 8px', borderRadius: '20px' }}>
                  <FlaskConical size={9} color={riskColor(tr.risk || 5)} />
                  <span style={{ fontSize: '8px', color: riskColor(tr.risk || 5) }}>{tr.risk || 5}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: t.hoverBg, padding: '4px 8px', borderRadius: '20px' }}>
                  <Heart size={9} color="#ef4444" fill="#ef4444" />
                  <span style={{ fontSize: '8px', color: t.subText }}>{tr.favorite || 'BTC'}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px' }}>
                {[{ label: 'Total trades', value: tr.totalTrades || 200, color: t.text }, { label: 'Total loss', value: tr.totalLoss || 15, color: '#ef4444' }, { label: 'Profit share', value: (tr.profitShare || 20) + '%', color: '#22c55e' }, { label: 'Win rate', value: (tr.winRate || 75) + '%', color: '#22c55e' }].map((s, i) => (
                  <div key={i} style={{ background: t.bg, border: `1px solid ${t.subtleBorder}`, borderRadius: '6px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '8px', color: t.subText }}>{s.label}</span>
                    <span style={{ fontSize: '9px', fontWeight: '700', color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => navigate('/dashboard/copy-trading/setup', { state: { trader: tr } })} style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: 'white', fontSize: '10px', fontWeight: '700', cursor: 'pointer', borderRadius: '6px' }}>
                Copy Trader Strategy
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: t.faintText, fontSize: '9px' }}>No traders found</div>}

        <div style={{ textAlign: 'center', padding: '16px', color: t.faintText, fontSize: '7px', borderTop: `1px solid ${t.tableRowBorder}`, marginTop: 'auto' }}>2020-2026 &copy; Quantyrex Markets</div>
      </div>
    </div>
  );
}
