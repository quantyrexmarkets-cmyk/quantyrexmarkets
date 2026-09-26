try { require('dotenv').config(); } catch (e) {}
const mongoose = require('mongoose');
const Trader = require('./models/Trader');

const TRADERS = [
  { 
    name: 'Ross Cameron', 
    location: 'Vermont, USA', 
    flag: '🇺🇸', 
    followers: '1.2k', 
    risk: 6.5, 
    favorite: 'AAPL', 
    totalTrades: 300, 
    totalLoss: 12, 
    profitShare: 20.5, 
    winRate: 75, 
    img: 'https://unavatar.io/twitter/DayTraderRoss', 
    bio: 'A full-time day trader and founder of Warrior Trading. Ross is known for his small account challenge and momentum trading strategy.',
    verified: true,
    order: 1
  },
  { 
    name: 'Rayner Teo', 
    location: 'Singapore', 
    flag: '🇸🇬', 
    followers: '3.4k', 
    risk: 4.8, 
    favorite: 'SPY', 
    totalTrades: 820, 
    totalLoss: 34, 
    profitShare: 18.0, 
    winRate: 82, 
    img: 'https://unavatar.io/twitter/rayner_teo', 
    bio: 'Professional forex & equities trader. Author of "The Complete Trading Guide." Known for systematic trend-following strategies.',
    verified: true,
    order: 2
  },
  { 
    name: 'Kathy Lien', 
    location: 'New York, USA', 
    flag: '🇺🇸', 
    followers: '2.1k', 
    risk: 5.4, 
    favorite: 'EURUSD', 
    totalTrades: 950, 
    totalLoss: 21, 
    profitShare: 15.2, 
    winRate: 79, 
    img: 'https://unavatar.io/twitter/kathylienfx', 
    bio: 'Managing Director of FX Strategy at BK Asset Management, Kathy is a renowned forex expert and CNBC contributor.',
    verified: true,
    order: 3
  },
  { 
    name: 'Nicola Duke', 
    location: 'United Kingdom', 
    flag: '🇬🇧', 
    followers: '1.6k', 
    risk: 5.2, 
    favorite: 'GBPUSD', 
    totalTrades: 540, 
    totalLoss: 15, 
    profitShare: 19.5, 
    winRate: 81, 
    img: 'https://unavatar.io/twitter/nicoladuke', 
    bio: 'Forex educator and professional trader. Specializes in price action and technical analysis on major pairs.',
    verified: true,
    order: 4
  },
  { 
    name: 'Anton Kreil', 
    location: 'London, UK', 
    flag: '🇬🇧', 
    followers: '2.8k', 
    risk: 7.1, 
    favorite: 'ETH', 
    totalTrades: 1200, 
    totalLoss: 45, 
    profitShare: 12.5, 
    winRate: 88, 
    img: 'https://unavatar.io/twitter/antonkreil', 
    bio: 'Former Goldman Sachs trader. Managing partner at the Institute of Trading and Portfolio Management.',
    verified: true,
    order: 5
  },
  { 
    name: 'Timothy Sykes', 
    location: 'Miami, USA', 
    flag: '🇺🇸', 
    followers: '4.1k', 
    risk: 9.1, 
    favorite: 'TSLA', 
    totalTrades: 1800, 
    totalLoss: 280, 
    profitShare: 25.0, 
    winRate: 65, 
    img: 'https://unavatar.io/twitter/timothysykes', 
    bio: 'Turned $12k into $7M trading momentum and small-cap stocks. High-risk, high-reward strategy.',
    verified: true,
    order: 6
  },
  { 
    name: 'Nial Fuller', 
    location: 'Australia', 
    flag: '🇦🇺', 
    followers: '1.8k', 
    risk: 5.1, 
    favorite: 'GBPUSD', 
    totalTrades: 610, 
    totalLoss: 18, 
    profitShare: 22.3, 
    winRate: 84, 
    img: 'https://unavatar.io/twitter/nialfuller', 
    bio: 'Price action specialist and founder of Learn To Trade The Market. Focuses on clean chart setups.',
    verified: true,
    order: 7
  },
  { 
    name: 'Anne-Marie Baiynd', 
    location: 'Texas, USA', 
    flag: '🇺🇸', 
    followers: '1.4k', 
    risk: 4.9, 
    favorite: 'SPX', 
    totalTrades: 720, 
    totalLoss: 22, 
    profitShare: 17.8, 
    winRate: 80, 
    img: 'https://unavatar.io/twitter/AnneMarieTrades', 
    bio: 'Author of "The Trading Book" and senior market strategist combining technical analysis with behavioral finance.',
    verified: true,
    order: 8
  },
];

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ No MONGODB_URI found in environment");
  process.exit(1);
}

mongoose.connect(mongoUri).then(async () => {
  await Trader.deleteMany({});
  await Trader.insertMany(TRADERS);
  console.log('✅ Ross Cameron photo handle updated and database seeded!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
