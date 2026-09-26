import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, FlaskConical, Heart, Shield, Clock, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { startCopyTrade, getTraderById, getTraders } from '../services/api';

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
  { id: 1, _id: '1', name: 'Ross Cameron', location: 'Vermont, USA', flag: '🇺🇸', followers: '1.2k', risk: 6.5, favorite: 'AAPL', totalTrades: 300, totalLoss: 12, profitShare: 20.5, winRate: 75, img: HEADSHOTS["Ross Cameron"], verified: true, bio: 'Full-time momentum trader with 10+ years experience.', joined: 'Jan 2019', avgReturn: '+34.2%', totalFollowers: 1243, topAssets: ['AAPL', 'TSLA', 'AMZN', 'NVDA', 'MSFT'] },
  { id: 2, _id: '2', name: 'Rayner Teo', location: 'Singapore', flag: '🇸🇬', followers: '3.4k', risk: 4.8, favorite: 'SPY', totalTrades: 820, totalLoss: 34, profitShare: 18.0, winRate: 82, img: HEADSHOTS["Rayner Teo"], verified: true, bio: 'Professional forex & equities trader. Author of "The Complete Trading Guide."', joined: 'Mar 2017', avgReturn: '+28.7%', totalFollowers: 3412, topAssets: ['SPY', 'EUR/USD', 'GBP/USD', 'BTC', 'QQQ'] },
  { id: 3, _id: '3', name: 'Kathy Lien', location: 'New York, USA', flag: '🇺🇸', followers: '2.1k', risk: 5.4, favorite: 'EURUSD', totalTrades: 950, totalLoss: 21, profitShare: 15.2, winRate: 79, img: HEADSHOTS["Kathy Lien"], verified: true, bio: 'Managing Director of FX Strategy. Expert in G10 currencies.', joined: 'Jun 2018', avgReturn: '+22.1%', totalFollowers: 2134, topAssets: ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CHF'] },
  { id: 4, _id: '4', name: 'Nicola Duke', location: 'United Kingdom', flag: '🇬🇧', followers: '1.6k', risk: 5.2, favorite: 'GBPUSD', totalTrades: 540, totalLoss: 15, profitShare: 19.5, winRate: 81, img: HEADSHOTS["Nicola Duke"], verified: true, bio: 'Forex educator and professional trader.', joined: 'Sep 2019', avgReturn: '+31.5%', totalFollowers: 1589, topAssets: ['GBP/USD', 'EUR/GBP', 'GBP/JPY', 'FTSE', 'EUR/USD'] },
  { id: 5, _id: '5', name: 'Anton Kreil', location: 'London, UK', flag: '🇬🇧', followers: '2.8k', risk: 7.1, favorite: 'ETH', totalTrades: 1200, totalLoss: 45, profitShare: 12.5, winRate: 88, img: HEADSHOTS["Anton Kreil"], verified: true, bio: 'Former Goldman Sachs trader.', joined: 'Feb 2016', avgReturn: '+41.8%', totalFollowers: 2801, topAssets: ['ETH', 'BTC', 'SPX', 'AAPL', 'AMZN'] },
  { id: 6, _id: '6', name: 'Timothy Sykes', location: 'Miami, USA', flag: '🇺🇸', followers: '4.1k', risk: 9.1, favorite: 'TSLA', totalTrades: 1800, totalLoss: 280, profitShare: 25.0, winRate: 65, img: HEADSHOTS["Timothy Sykes"], verified: true, bio: 'Turned $12k into $7M trading penny stocks.', joined: 'Jan 2015', avgReturn: '+52.3%', totalFollowers: 4102, topAssets: ['TSLA', 'GME', 'AMC', 'NVDA', 'RIVN'] },
  { id: 7, _id: '7', name: 'Nial Fuller', location: 'Australia', flag: '🇦🇺', followers: '1.8k', risk: 5.1, favorite: 'GBPUSD', totalTrades: 610, totalLoss: 18, profitShare: 22.3, winRate: 84, img: HEADSHOTS["Nial Fuller"], verified: true, bio: 'Price action specialist.', joined: 'May 2018', avgReturn: '+26.9%', totalFollowers: 1821, topAssets: ['GBP/USD', 'EUR/USD', 'AUD/USD', 'USD/JPY', 'NZD/USD'] },
  { id: 8, _id: '8', name: 'Anne-Marie Baiynd', location: 'Texas, USA', flag: '🇺🇸', followers: '1.4k', risk: 4.9, favorite: 'SPX', totalTrades: 720, totalLoss: 22, profitShare: 17.8, winRate: 80, img: HEADSHOTS["Anne-Marie Baiynd"], verified: true, bio: 'Author of "The Trading Book" and senior market strategist.', joined: 'Aug 2020', avgReturn: '+19.4%', totalFollowers: 1432, topAssets: ['SPX', 'QQQ', 'AAPL', 'AMZN', 'GOOG'] },
];

const MOCK_TRADES = [
  { asset: 'AAPL', type: 'BUY', profit: '+6.47%', date: 'Mar 18, 2026', duration: '3d' },
  { asset: 'TSLA', type: 'SELL', profit: '+6.69%', date: 'Mar 14, 2026', duration: '5d' },
  { asset: 'NVDA', type: 'BUY', profit: '+4.03%', date: 'Mar 10, 2026', duration: '2d' },
];

const riskColor = r => r <= 4 ? '#22c55e' : r <= 7 ? '#f59e0b' : '#ef4444';
const riskLabel = r => r <= 4 ? 'Low' : r <= 7 ? 'Medium' : 'High';

export default function TraderProfile() {
  const { current: t } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [copying, setCopying] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    let matched = TRADERS_DEFAULT.find(tr => String(tr.id) === String(id) || String(tr._id) === String(id));
    if (matched) {
      setTrader(matched);
      setLoading(false);
    }

    getTraderById(id).then(data => {
      if (data && data.name) {
        setTrader(prev => ({
          ...data,
          joined: prev?.joined || 'Jan 2021',
          avgReturn: prev?.avgReturn || '+28.5%',
          totalFollowers: prev?.totalFollowers || 1500,
          topAssets: prev?.topAssets || ['BTC', 'ETH', 'AAPL', 'TSLA', 'SPY'],
          bio: data.bio || prev?.bio || 'Professional expert trader.',
          img: (data.img && !data.img.includes('ui-avatars.com') && data.img.trim() !== '') ? data.img : (HEADSHOTS[data.name] || prev?.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80')
        }));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading && !trader) {
    return (
      <div style={{minHeight:'100vh',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center', color: t.mutedText, fontSize: '11px'}}>Loading...</div>
      </div>
    );
  }

  if (!trader) {
    return (
      <div style={{minHeight:'100vh',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'12px',color:t.mutedText}}>Trader not found</p>
          <button type="button" onClick={() => navigate('/dashboard/copy-trading')} style={{marginTop:'12px',background:'#6366f1',border:'none',color:'white',padding:'8px 16px',borderRadius:'6px',cursor:'pointer',fontSize:'10px'}}>Go Back</button>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) < 10) { setCopyError('Minimum investment is $10'); return; }
    setCopying(true); setCopyError('');
    try {
      await startCopyTrade({
        traderId: trader._id || trader.id,
        traderName: trader.name,
        traderImg: trader.img,
        amount: parseFloat(amount),
        profitShare: trader.profitShare || 20
      });
      setCopySuccess('Strategy copied successfully!');
      setTimeout(() => { setModal(false); setCopySuccess(''); navigate('/dashboard/my-copy-trades'); }, 1500);
    } catch (err) {
      setCopyError(err.message || 'Failed. Check your balance.');
    }
    setCopying(false);
  };

  const photo = (trader.img && !trader.img.includes('ui-avatars.com') && trader.img.trim() !== '') ? trader.img : (HEADSHOTS[trader.name] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80');

  return (
    <div style={{minHeight:'100vh',background:t.bg,fontFamily:"'Segoe UI', sans-serif",color:t.text,paddingBottom:'40px'}}>
      <PageHeader title="Trader Profile" />
      <div style={{padding:'12px 14px 0'}}>
        <button type="button" onClick={() => navigate('/dashboard/copy-trading')} style={{display:'flex',alignItems:'center',gap:'5px',background:'none',border:'none',color:t.subText,cursor:'pointer',fontSize:'9px',padding:'0'}}>
          <ArrowLeft size={12}/> Back to Copy Trading
        </button>
      </div>

      <div style={{margin:'12px 14px 0',background:t.cardBg,border:`1px solid ${t.border}`,borderRadius:'14px',padding:'20px 16px 16px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'12px',right:'12px',fontSize:'22px'}}>{trader.flag || '🌐'}</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'14px'}}>
          <div style={{width:'76px',height:'76px',borderRadius:'50%',overflow:'hidden',border:'3px solid rgba(99,102,241,0.6)',marginBottom:'10px'}}>
            <img src={photo} alt={trader.name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e => e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'} />
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{fontSize:'15px',fontWeight:'800'}}>{trader.name}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'4px',marginTop:'4px'}}>
            <MapPin size={9} color={t.mutedText}/>
            <span style={{fontSize:'8px',color:t.mutedText}}>{trader.location || 'Global Trader'}</span>
          </div>
        </div>

        <button type="button" onClick={() => { setModal(true); setAmount(''); setCopyError(''); }} style={{width:'100%',padding:'11px',background:'#6366f1',border:'none',color:'white',fontSize:'10px',fontWeight:'700',cursor:'pointer',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
          <Copy size={12}/> Copy Trader Strategy
        </button>
      </div>

      {modal && (
        <div onClick={()=>setModal(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:9999,display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:t.cardBg,borderRadius:'16px 16px 0 0',padding:'20px 16px',width:'100%',maxWidth:'480px',border:`1px solid ${t.border}`}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
              <img src={photo} alt={trader.name} style={{width:'44px',height:'44px',borderRadius:'50%',border:'2px solid rgba(99,102,241,0.5)'}} />
              <div>
                <div style={{fontSize:'12px',fontWeight:'700'}}>{trader.name}</div>
                <div style={{fontSize:'8px',color:t.mutedText}}>{trader.profitShare || 20}% profit share • {trader.winRate || 75}% win rate</div>
              </div>
            </div>
            <div style={{fontSize:'8px',color:t.mutedText,marginBottom:'6px'}}>Investment Amount (min $10)</div>
            <div style={{position:'relative',marginBottom:'12px'}}>
              <span style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',color:t.mutedText,fontSize:'11px'}}>$</span>
              <input type="number" value={amount} onChange={e => { setAmount(e.target.value); setCopyError(''); }} placeholder="0.00" style={{width:'100%',background:t.inputBg,border:`1px solid ${t.border}`,color:t.text,fontSize:'13px',fontWeight:'700',padding:'11px 10px 11px 24px',borderRadius:'8px',outline:'none',boxSizing:'border-box'}} />
            </div>
            {copyError && <div style={{fontSize:'8.5px',color:'#ef4444',marginBottom:'10px'}}>{copyError}</div>}
            {copySuccess && <div style={{fontSize:'8.5px',color:'#22c55e',marginBottom:'10px'}}>{copySuccess}</div>}
            <button type="button" disabled={copying} onClick={handleCopy} style={{width:'100%',padding:'12px',background:'#6366f1',border:'none',color:'white',fontSize:'11px',fontWeight:'700',cursor:copying?'not-allowed':'pointer',borderRadius:'8px',opacity:copying?0.7:1}}>
              {copying ? 'Starting...' : 'Confirm Copy Trading'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
