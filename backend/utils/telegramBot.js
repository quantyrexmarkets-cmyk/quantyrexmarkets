const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const groupId = process.env.TELEGRAM_GROUP_ID;

const bot = new TelegramBot(token, {
  polling: {
    interval: 2000,
    autoStart: true,
    params: { timeout: 10 }
  }
});

bot.on('polling_error', (err) => {
  if (err.code !== 'EFATAL') console.log('Polling retry...', err.code);
});

console.log('🤖 Quantyrex Official Bot is running...');

// ═══════════════════════════════════
// 1. WELCOME MESSAGE (Auto on join)
// ═══════════════════════════════════
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  msg.new_chat_members.forEach((member) => {
    const name = member.first_name || 'Investor';
    const welcome = `
👋 *Welcome to Quantyrex Markets, ${name}!*

We're excited to have you join our official investor community.

📊 *What we offer:*
• AI-Powered Smart Trading
• Structured Investment Plans (10%-40% Daily)
• Copy Trading & Bot Automation
• Secure Crypto & Bank Withdrawals

🚀 *Get started now:*
[Open Platform](https://quantyrexmarkets.vercel.app)

📌 *Read the pinned message* for full details on our plans, features, and how to get started.

⚠️ *Security:* Admins will NEVER DM you first or ask for passwords, private keys, or withdrawal codes.

Welcome aboard! 💎
    `;
    bot.sendMessage(chatId, welcome, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
  });
});

// ═══════════════════════════════════
// 2. INVESTMENT PLANS
// ═══════════════════════════════════
const sendPlans = () => {
  const plans = `
💎 *QUANTYREX INVESTMENT PLANS*
━━━━━━━━━━━━━━━━━━━━━━

🥉 *BRONZE* — $500 to $4,999
├ ROI: 10% Daily
└ Duration: 7 Days

🥈 *SILVER* — $5,000 to $9,999
├ ROI: 15% Daily
└ Duration: 14 Days

🥇 *GOLD* — $10,000 to $24,999
├ ROI: 20% Daily
└ Duration: 21 Days

💠 *PLATINUM* — $25,000 to $49,999
├ ROI: 25% Daily
└ Duration: 30 Days

💎 *DIAMOND* — $50,000 to $99,999
├ ROI: 30% Daily
└ Duration: 45 Days

👑 *ELITE* — $100,000 to $1,000,000
├ ROI: 40% Daily
└ Duration: 60 Days

━━━━━━━━━━━━━━━━━━━━━━
🚀 [Start Investing Now](https://quantyrexmarkets.vercel.app/signup)
  `;
  bot.sendMessage(groupId, plans, { parse_mode: 'Markdown', disable_web_page_preview: true });
  console.log('📋 Plans posted');
};

// ═══════════════════════════════════
// 3. MARKET UPDATE
// ═══════════════════════════════════
const sendMarketUpdate = async () => {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,dogecoin&vs_currencies=usd&include_24hr_change=true');
    const d = res.data;

    const arrow = (val) => val >= 0 ? '🟢' : '🔴';
    const pct = (val) => (val >= 0 ? '+' : '') + val.toFixed(2) + '%';

    const update = `
📈 *LIVE MARKET UPDATE*
━━━━━━━━━━━━━━━━━━━━━━

${arrow(d.bitcoin.usd_24h_change)} *BTC:* $${d.bitcoin.usd.toLocaleString()} (${pct(d.bitcoin.usd_24h_change)})
${arrow(d.ethereum.usd_24h_change)} *ETH:* $${d.ethereum.usd.toLocaleString()} (${pct(d.ethereum.usd_24h_change)})
${arrow(d.binancecoin.usd_24h_change)} *BNB:* $${d.binancecoin.usd.toLocaleString()} (${pct(d.binancecoin.usd_24h_change)})
${arrow(d.solana.usd_24h_change)} *SOL:* $${d.solana.usd.toLocaleString()} (${pct(d.solana.usd_24h_change)})
${arrow(d.ripple.usd_24h_change)} *XRP:* $${d.ripple.usd.toLocaleString()} (${pct(d.ripple.usd_24h_change)})
${arrow(d.dogecoin.usd_24h_change)} *DOGE:* $${d.dogecoin.usd.toLocaleString()} (${pct(d.dogecoin.usd_24h_change)})

━━━━━━━━━━━━━━━━━━━━━━
📊 [Trade Now](https://quantyrexmarkets.vercel.app/dashboard/live-trading)
    `;
    bot.sendMessage(groupId, update, { parse_mode: 'Markdown', disable_web_page_preview: true });
    console.log('📈 Market update posted');
  } catch (e) {
    console.log('Market update failed:', e.message);
  }
};

// ═══════════════════════════════════
// 4. CRYPTO NEWS
// ═══════════════════════════════════
const sendNews = async () => {
  try {
    const res = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&limit=3');
    const articles = res.data.Data.slice(0, 3);

    let newsMsg = `📰 *CRYPTO NEWS UPDATE*\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    articles.forEach((a, i) => {
      newsMsg += `*${i + 1}. ${a.title}*\n`;
      newsMsg += `${a.body.substring(0, 120)}...\n`;
      newsMsg += `[Read more](${a.url})\n\n`;
    });

    newsMsg += `━━━━━━━━━━━━━━━━━━━━━━\n📊 Stay ahead with [Quantyrex Markets](https://quantyrexmarkets.vercel.app)`;

    bot.sendMessage(groupId, newsMsg, { parse_mode: 'Markdown', disable_web_page_preview: true });
    console.log('📰 News posted');
  } catch (e) {
    console.log('News fetch failed:', e.message);
  }
};

// ═══════════════════════════════════
// 5. DAILY ANALYSIS
// ═══════════════════════════════════
const sendAnalysis = async () => {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true');
    const btc = res.data.bitcoin;
    const eth = res.data.ethereum;

    const btcTrend = btc.usd_24h_change >= 0 ? 'Bullish 📈' : 'Bearish 📉';
    const ethTrend = eth.usd_24h_change >= 0 ? 'Bullish 📈' : 'Bearish 📉';

    const analysis = `
🔍 *DAILY MARKET ANALYSIS*
━━━━━━━━━━━━━━━━━━━━━━

₿ *Bitcoin (BTC)*
├ Price: $${btc.usd.toLocaleString()}
├ 24h Change: ${btc.usd_24h_change.toFixed(2)}%
├ Market Cap: $${(btc.usd_market_cap / 1e9).toFixed(1)}B
├ 24h Volume: $${(btc.usd_24h_vol / 1e9).toFixed(1)}B
└ Trend: ${btcTrend}

Ξ *Ethereum (ETH)*
├ Price: $${eth.usd.toLocaleString()}
├ 24h Change: ${eth.usd_24h_change.toFixed(2)}%
├ Market Cap: $${(eth.usd_market_cap / 1e9).toFixed(1)}B
├ 24h Volume: $${(eth.usd_24h_vol / 1e9).toFixed(1)}B
└ Trend: ${ethTrend}

━━━━━━━━━━━━━━━━━━━━━━

💡 *Insight:* ${btc.usd_24h_change >= 0 ? 'Markets showing strength. Good time to consider adding to positions.' : 'Markets pulling back. Watch for support levels before entering.'}

━━━━━━━━━━━━━━━━━━━━━━
📊 [View Live Charts](https://quantyrexmarkets.vercel.app/dashboard/live-trading)
    `;
    bot.sendMessage(groupId, analysis, { parse_mode: 'Markdown', disable_web_page_preview: true });
    console.log('🔍 Analysis posted');
  } catch (e) {
    console.log('Analysis failed:', e.message);
  }
};

// ═══════════════════════════════════
// 6. MOTIVATIONAL / ENGAGEMENT POSTS
// ═══════════════════════════════════
const tips = [
  '💡 *Trading Tip:* Never invest more than you can afford to lose. Diversify across multiple plans for stability.',
  '💡 *Reminder:* Complete your KYC verification to unlock full withdrawal access. Stay verified, stay secure.',
  '💡 *Did you know?* Our AI bots trade 24/7 — earning profits even while you sleep. Activate yours today!',
  '💡 *Pro Tip:* Use our Copy Trading feature to mirror expert traders automatically. No experience needed!',
  '💡 *Security Alert:* Always use a strong, unique password and enable 2FA on your Quantyrex account.',
  '💡 *Fun Fact:* Bitcoin was created in 2009 by Satoshi Nakamoto. Today it powers millions of portfolios worldwide.',
  '💡 *Growth Mindset:* Consistency beats intensity. Small daily returns compound into massive wealth over time.',
  '💡 *Referral Bonus:* Invite friends to Quantyrex Markets and earn referral rewards. Share your code today!',
];

const sendTip = () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const tipMsg = `
${randomTip}

━━━━━━━━━━━━━━━━━━━━━━
🚀 [Join Quantyrex Markets](https://quantyrexmarkets.vercel.app)
  `;
  bot.sendMessage(groupId, tipMsg, { parse_mode: 'Markdown', disable_web_page_preview: true });
  console.log('💡 Tip posted');
};

// ═══════════════════════════════════
// AUTOMATIC SCHEDULES
// ═══════════════════════════════════

// Market Update — every 3 hours
cron.schedule('0 */3 * * *', () => sendMarketUpdate());

// News — every 6 hours
cron.schedule('0 */2 * * *', () => sendNews());

// Plans — twice a day (9 AM and 9 PM)
cron.schedule('0 9 * * *', () => sendPlans());
cron.schedule('0 21 * * *', () => sendPlans());

// Analysis — once a day at 8 AM
cron.schedule('0 */4 * * *', () => sendAnalysis());

// Tips — 3 times a day (random tips)
cron.schedule('0 */3 * * *', () => sendTip());

// ═══════════════════════════════════
// ADMIN COMMANDS (Manual triggers)
// ═══════════════════════════════════
bot.onText(/\/post_plans/, () => sendPlans());
bot.onText(/\/post_update/, () => sendMarketUpdate());
bot.onText(/\/post_news/, () => sendNews());
bot.onText(/\/post_analysis/, () => sendAnalysis());
bot.onText(/\/post_tip/, () => sendTip());

// ═══════════════════════════════════
// INITIAL STARTUP POST
// ═══════════════════════════════════
setTimeout(() => {
  sendMarketUpdate();
  console.log('🚀 Initial market update posted');
}, 5000);

module.exports = bot;

// ═══════════════════════════════════
// START & HELP COMMANDS
// ═══════════════════════════════════

// ═══════════════════════════════════
// START COMMAND
// ═══════════════════════════════════
bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'Investor';
  const startMsg = `
🏦 *Welcome to Quantyrex Markets, ${name}!*

Thank you for your interest in Quantyrex Markets. We are a trusted digital investment platform that empowers investors worldwide to grow their wealth through AI-powered trading and structured investment plans.

━━━━━━━━━━━━━━━━━━━━━━

❓ *What is Quantyrex Markets?*

Quantyrex Markets is a licensed digital investment and trading platform. We combine artificial intelligence, expert traders, and automated bots to generate consistent daily returns for our investors across global crypto and forex markets.

━━━━━━━━━━━━━━━━━━━━━━

📌 *How to Join:*

1️⃣ Visit [quantyrexmarkets.vercel.app](https://quantyrexmarkets.vercel.app/signup)
2️⃣ Create your free account with email
3️⃣ Verify your identity (KYC) for full access
4️⃣ Fund your account using any supported method
5️⃣ Select an investment plan that fits your goals
6️⃣ Start earning daily returns automatically

━━━━━━━━━━━━━━━━━━━━━━

⚙ *How Does It Work?*

Once you deposit funds and select a plan, our AI trading algorithms and professional traders begin working on your behalf — 24 hours a day, 7 days a week. Profits are calculated daily and credited directly to your account balance. You can withdraw your earnings at any time.

━━━━━━━━━━━━━━━━━━━━━━

💰 *What is an Investment Plan?*

An investment plan is a structured package where you commit a specific amount for a set duration. In return, you receive a fixed daily percentage as profit. The higher the plan tier, the greater the daily returns.

━━━━━━━━━━━━━━━━━━━━━━

💎 *Available Plans:*

🥉 *BRONZE* — $500+ → 10% Daily (7 Days)
🥈 *SILVER* — $5,000+ → 15% Daily (14 Days)
🥇 *GOLD* — $10,000+ → 20% Daily (21 Days)
💠 *PLATINUM* — $25,000+ → 25% Daily (30 Days)
💎 *DIAMOND* — $50,000+ → 30% Daily (45 Days)
👑 *ELITE* — $100,000+ → 40% Daily (60 Days)

━━━━━━━━━━━━━━━━━━━━━━

💳 *How to Deposit:*

We accept multiple payment methods:
• Bitcoin (BTC)
• Ethereum (ETH)
• Tether (USDT)
• Bank Transfer
• PayPal
• CashApp
• Western Union
• MoneyGram

━━━━━━━━━━━━━━━━━━━━━━

💸 *How to Withdraw:*

Log in to your dashboard, go to Withdrawals, enter the amount and select your preferred method. All withdrawals are processed within 24-48 hours. You must complete KYC verification before your first withdrawal.

━━━━━━━━━━━━━━━━━━━━━━

🤖 *Trading Tools Available:*

📈 *Live Trading* — Execute real-time trades
🔄 *Copy Trading* — Mirror expert traders automatically
🤖 *Bot Trading* — AI bots trade for you 24/7
💰 *Staking* — Earn passive rewards daily

━━━━━━━━━━━━━━━━━━━━━━

👥 *Referral Program:*

Invite friends using your unique referral code. When they sign up and deposit, you earn a referral bonus. There is no limit on how many people you can refer.

━━━━━━━━━━━━━━━━━━━━━━

🔐 *Is Quantyrex Markets Safe?*

✅ Bank-grade 256-bit encryption
✅ KYC verified accounts
✅ Two-factor authentication (2FA)
✅ Secure withdrawal codes
✅ 24/7 live customer support

⚠ Our admins will NEVER ask for your password, withdrawal code, or private keys. If someone contacts you claiming to be from Quantyrex, report them immediately.

━━━━━━━━━━━━━━━━━━━━━━

📱 *Quick Links:*

🌐 [Open Platform](https://quantyrexmarkets.vercel.app)
📝 [Create Account](https://quantyrexmarkets.vercel.app/signup)
📲 [Join Community](https://t.me/QuantyrexMarkets)
📧 support@quantyrexmarkets.com

━━━━━━━━━━━━━━━━━━━━━━
_© 2026 Quantyrex Markets. All rights reserved._
_Trade smarter. Grow stronger._
`;
  bot.sendPhoto(msg.chat.id, 'https://res.cloudinary.com/dunu5kpw6/image/upload/v1776541394/quantyrex/brand/bot_photo.jpg', {
    caption: '🏦 *Quantyrex Markets*\n_Trade smarter. Grow stronger._',
    parse_mode: 'Markdown'
  }).then(() => {
    bot.sendMessage(msg.chat.id, startMsg, { parse_mode: 'Markdown', disable_web_page_preview: true });
  });
});

// ═══════════════════════════════════
// HELP COMMAND
// ═══════════════════════════════════
bot.onText(/\/help/, (msg) => {
  const helpMsg = `
❓ *Quantyrex Markets — Help*
━━━━━━━━━━━━━━━━━━━━━━

*Available Commands:*

🚀 /start — About Quantyrex Markets
📈 /post\\_update — Live crypto prices
📰 /post\\_news — Latest crypto news
🔍 /post\\_analysis — Market analysis
💎 /post\\_plans — Investment plans
💡 /post\\_tip — Trading tip
❓ /help — This help menu

━━━━━━━━━━━━━━━━━━━━━━

*Frequently Asked Questions:*

❔ *How do I start investing?*
Create an account, verify KYC, deposit, and choose a plan.

❔ *What is the minimum investment?*
$500 with our Bronze plan.

❔ *How fast are withdrawals?*
Processed within 24-48 hours.

❔ *Do I need trading experience?*
No. Our bots and copy trading do the work for you.

❔ *Is my money safe?*
Yes. We use 256-bit encryption, 2FA, and KYC verification.

━━━━━━━━━━━━━━━━━━━━━━

🌐 [Visit Platform](https://quantyrexmarkets.vercel.app)
📧 support@quantyrexmarkets.com
`;
  bot.sendMessage(msg.chat.id, helpMsg, { parse_mode: 'Markdown', disable_web_page_preview: true });
});
