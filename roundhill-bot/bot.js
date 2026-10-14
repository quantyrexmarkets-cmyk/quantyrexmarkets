import { Telegraf, Markup } from 'telegraf';
import express from 'express';
import Parser from 'rss-parser';

// --- CONFIGURATION FOR ROUNDHILL INVESTMENTS ---
const BOT_TOKEN = process.env.BOT_TOKEN || '8865237359:AAHafU092hTh2_YaoAW1NtODJmVQGpf_-XQ';
const KELVIN_ADMIN_ID = '8451430916';
const SUPPORT_LINK = 'https://t.me/Trader_kelvin53';
const RENDER_BOT_URL = process.env.RENDER_URL || 'https://roundhill-investments-bot.onrender.com';

let TARGET_GROUP_ID = process.env.TARGET_GROUP_ID || '';

const bot = new Telegraf(BOT_TOKEN);
const parser = new Parser();
let lastNewsTitle = '';

// --- ADVANCED ASYNC ADMIN CHECKER ---
async function isUserAdmin(ctx) {
  if (!ctx || !ctx.from) return false;
  
  const userId = String(ctx.from.id);
  const username = ctx.from.username || '';

  // 1. Direct Kelvin User ID
  if (userId === KELVIN_ADMIN_ID) return true;

  // 2. Telegram Anonymous Group Admin / Channel Post
  if (userId === '1088788430' || username === 'GroupAnonymousBot') return true;

  // 3. Telegram Group Administrator Role
  if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
    try {
      const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
      if (['creator', 'administrator'].includes(member.status)) return true;
    } catch (e) {
      console.error('Failed to fetch chat member status:', e.message);
    }
  }

  return false;
}

// --- DUMMY HTTP SERVER FOR RENDER 24/7 HEALTH CHECK ---
const app = express();
const PORT = process.env.PORT || 10001;

app.get('/', (req, res) => {
  res.send('ROUNDHILL INVESTMENTS BOT IS LIVE FOR TRADER KELVIN!');
});

app.listen(PORT, () => {
  console.log(`[RoundHill HTTP Server] Listening on port ${PORT}`);
});

// Self-ping to keep service active on Render
setInterval(async () => {
  if (RENDER_BOT_URL.startsWith('http')) {
    try {
      await fetch(RENDER_BOT_URL);
      console.log('[Self-Ping] Pinged RoundHill Bot Render URL');
    } catch (err) {
      console.error('[Self-Ping Error]:', err.message);
    }
  }
}, 4 * 60 * 1000);

// --- ROUNDHILL INR INVESTMENT MESSAGES ---
const getRoundHillINRText = () => {
  return (
    `🏛 *ROUNDHILL INVESTMENTS - HIGH-YIELD CAPITAL PLANS* 🏛\n` +
    `⚡ *GUARANTEED 5X MULTIPLIER TRADING PORTFOLIO* ⚡\n\n` +
    `RoundHill Investments provides institutional-grade AI trading and arbitrage strategies. Secure your guaranteed 5X payout in 24 Hours with Trader Kelvin!\n\n` +
    `💎 *ROUNDHILL INR INVESTMENT TIERS:* 💎\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔹 *₹10,000 Tier* ➔ Guaranteed Return: *₹50,000* (5x ROI)\n` +
    `🔹 *₹20,000 Tier* ➔ Guaranteed Return: *₹100,000* (5x ROI)\n` +
    `🔹 *₹30,000 Tier* ➔ Guaranteed Return: *₹150,000* (5x ROI)\n` +
    `🔹 *₹50,000 Tier* ➔ Guaranteed Return: *₹250,000* (5x ROI)\n` +
    `🔹 *₹75,000 Tier* ➔ Guaranteed Return: *₹375,000* (5x ROI)\n` +
    `🔹 *₹100,000 Tier* ➔ Guaranteed Return: *₹500,000* (5x ROI)\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📋 *INVESTMENT SPECIFICATIONS:*\n` +
    `• 🟢 *Min Capital:* ₹10,000\n` +
    `• 🔴 *Max Capital:* ₹100,000\n` +
    `• ⏱ *Payout Duration:* 24 Hours Max Settlement\n` +
    `• 🛡 *Risk Mitigation:* 100% Capital Guaranteed\n` +
    `• 💳 *Payout Methods:* UPI, Bank Transfer (IMPS/NEFT), USDT TRC20\n\n` +
    `🚀 *HOW TO GET STARTED:* \n` +
    `1️⃣ Pick your investment package (₹10k to ₹100k).\n` +
    `2️⃣ Tap *"🏛 Deposit & Invest Now"* to message Trader Kelvin.\n` +
    `3️⃣ Receive your fast 5X payout direct to your bank!\n\n` +
    `👇 *Select an option below to activate your slot now!*`
  );
};

const getRoundHillButtons = () => {
  return Markup.inlineKeyboard([
    [Markup.button.url('🏛 Deposit & Invest Now', SUPPORT_LINK)],
    [
      Markup.button.url('💬 Official Support', SUPPORT_LINK),
      Markup.button.url('📈 Market Signals', SUPPORT_LINK)
    ]
  ]);
};

// --- RSS AUTOMATED BREAKING NEWS BROADCASTER ---
async function fetchAndBroadcastNews() {
  if (!TARGET_GROUP_ID) return;
  try {
    const feed = await parser.parseURL('https://cointelegraph.com/rss');
    if (!feed.items || feed.items.length === 0) return;
    const latestItem = feed.items[0];
    if (latestItem.title === lastNewsTitle) return;
    lastNewsTitle = latestItem.title;

    let imageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
    if (latestItem.enclosure && latestItem.enclosure.url) {
      imageUrl = latestItem.enclosure.url;
    } else if (latestItem['media:content'] && latestItem['media:content'].$) {
      imageUrl = latestItem['media:content'].$.url;
    }

    const caption =
      `🏛 *ROUNDHILL BREAKING MARKET INTELLIGENCE*\n\n` +
      `🔥 *${latestItem.title}*\n\n` +
      `${latestItem.contentSnippet ? latestItem.contentSnippet.slice(0, 220) + '...' : ''}\n\n` +
      `🔗 [Read Full Analysis](${latestItem.link})`;

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.url('📊 Trade Signals with Kelvin', SUPPORT_LINK)],
      [Markup.button.url('💬 Contact Support', SUPPORT_LINK)]
    ]);

    await bot.telegram.sendPhoto(TARGET_GROUP_ID, imageUrl, { caption: caption, parse_mode: 'Markdown', ...keyboard });
    console.log('[RoundHill Auto-News] Broadcasted news photo to group');
  } catch (err) {
    console.error('News Error:', err.message);
  }
}

// Background timers
setInterval(fetchAndBroadcastNews, 30 * 60 * 1000);

setInterval(async () => {
  if (!TARGET_GROUP_ID) return;
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getRoundHillINRText(), { parse_mode: 'Markdown', ...getRoundHillButtons() });
    console.log('[RoundHill Auto-INR] Broadcasted investment tiers');
  } catch (err) { console.error('Auto-INR Error:', err.message); }
}, 2 * 60 * 60 * 1000);

// --- ANTI-SPAM LINK FILTER (EXEMPT FOR ADMINS) ---
bot.use(async (ctx, next) => {
  if (ctx.message && ctx.chat && ctx.chat.type !== 'private') {
    const text = ctx.message.text || ctx.message.caption || '';
    
    // Commands are ignored by anti-spam
    if (text.startsWith('/')) return next();

    const isLink = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.)/i.test(text);
    
    if (isLink) {
      const userIsAdmin = await isUserAdmin(ctx);
      if (!userIsAdmin) {
        try {
          await ctx.deleteMessage();
          const warn = await ctx.reply(`⚠️ ${ctx.from ? ctx.from.first_name : 'Member'}, promotional links are restricted in RoundHill group.`);
          setTimeout(() => ctx.telegram.deleteMessage(ctx.chat.id, warn.message_id).catch(() => {}), 5000);
          return;
        } catch (e) {}
      }
    }
  }
  return next();
});

// --- USER COMMAND HANDLERS ---
bot.start((ctx) => {
  const welcomeText =
    `🏛 *Welcome to ROUNDHILL INVESTMENTS TRADING BOT!*\n\n` +
    `Institutional AI Arbitrage Trading managed by Trader Kelvin. Capital growth with guaranteed 5X returns.\n\n` +
    `📌 *Available Commands:*\n` +
    `• /inr or /plans - 5X INR Investment Tiers (₹10k - ₹100k)\n` +
    `• /howitworks - Investment Quickstart Guide\n` +
    `• /market - Live Crypto Prices (BTC, ETH, SOL, BNB)\n` +
    `• /news - Latest Breaking Crypto News\n` +
    `• /policy - Community Rules & Safety\n` +
    `• /support - Connect with Trader Kelvin`;

  ctx.replyWithMarkdown(welcomeText, getRoundHillButtons());
});

bot.help((ctx) => {
  const helpText =
    `ℹ️ *ROUNDHILL INVESTMENTS HELP DESK*\n\n` +
    `• /inr - View 5X Investment Packages\n` +
    `• /howitworks - Read process guide\n` +
    `• /market - View live price tracker\n` +
    `• /news - Get instant news report\n` +
    `• /support - Direct Telegram Chat with Trader Kelvin`;

  ctx.replyWithMarkdown(helpText, getRoundHillButtons());
});

bot.command(['inr', 'plans'], (ctx) => {
  ctx.replyWithMarkdown(getRoundHillINRText(), getRoundHillButtons());
});

bot.command('howitworks', (ctx) => {
  const text =
    `📖 *HOW ROUNDHILL INVESTMENTS WORKS*\n\n` +
    `1️⃣ *Select Plan:* Choose an INR Investment Package (₹10,000 to ₹100,000).\n` +
    `2️⃣ *Submit Capital:* Deposit via UPI, Bank Wire, or USDT.\n` +
    `3️⃣ *AI Execution:* Arbitrage trading bots execute multi-exchange trades.\n` +
    `4️⃣ *Guaranteed Payout:* Receive your 5X settlement in 24 Hours directly!`;

  ctx.replyWithMarkdown(text, getRoundHillButtons());
});

bot.command('market', async (ctx) => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
    const data = await res.json();

    const text =
      `📊 *ROUNDHILL LIVE MARKET METRICS*\n\n` +
      `• *BTC/USD:* $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change.toFixed(2)}%)\n` +
      `• *ETH/USD:* $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change.toFixed(2)}%)\n` +
      `• *SOL/USD:* $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change.toFixed(2)}%)\n` +
      `• *BNB/USD:* $${data.binancecoin.usd.toLocaleString()} (${data.binancecoin.usd_24h_change.toFixed(2)}%)`;

    ctx.replyWithMarkdown(text);
  } catch (err) {
    ctx.reply('❌ Unable to fetch live market prices right now.');
  }
});

bot.command('news', async (ctx) => {
  try {
    const feed = await parser.parseURL('https://cointelegraph.com/rss');
    if (!feed.items || feed.items.length === 0) {
      return ctx.reply('📰 No news available at the moment.');
    }

    const latestItem = feed.items[0];
    let imageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
    if (latestItem.enclosure && latestItem.enclosure.url) {
      imageUrl = latestItem.enclosure.url;
    } else if (latestItem['media:content'] && latestItem['media:content'].$) {
      imageUrl = latestItem['media:content'].$.url;
    }

    const caption =
      `📰 *ROUNDHILL BREAKING NEWS*\n\n` +
      `🔥 *${latestItem.title}*\n\n` +
      `${latestItem.contentSnippet ? latestItem.contentSnippet.slice(0, 220) + '...' : ''}\n\n` +
      `🔗 [Read Full Analysis](${latestItem.link})`;

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.url('📊 Trade with Trader Kelvin', SUPPORT_LINK)],
      [Markup.button.url('💬 Official Support', SUPPORT_LINK)]
    ]);

    await ctx.replyWithPhoto(imageUrl, { caption: caption, parse_mode: 'Markdown', ...keyboard });
  } catch (err) {
    ctx.reply('❌ Failed to fetch breaking news story.');
  }
});

bot.command('policy', (ctx) => {
  const policyText =
    `🛡 *ROUNDHILL COMMUNITY & SECURITY POLICY*\n\n` +
    `1️⃣ *No Spam / Links:* Unauthorized links are deleted automatically.\n` +
    `2️⃣ *Verified Admin:* Trader Kelvin (${SUPPORT_LINK}) is the only official admin.\n` +
    `3️⃣ *Zero Impersonation:* Admins will never ask for your private key or password.`;

  ctx.replyWithMarkdown(policyText, getRoundHillButtons());
});

bot.command('support', (ctx) => {
  ctx.replyWithMarkdown(
    `💬 *ROUNDHILL OFFICIAL SUPPORT*\n\nConnect with Trader Kelvin directly for deposits, accounts, and 5X payouts:\nTelegram: ${SUPPORT_LINK}`,
    Markup.inlineKeyboard([[Markup.button.url('💬 Chat with Trader Kelvin', SUPPORT_LINK)]])
  );
});

// --- ADMIN COMMAND HANDLERS ---
bot.command('setgroup', async (ctx) => {
  const admin = await isUserAdmin(ctx);
  if (!admin) return ctx.reply('❌ Admin only command.');
  TARGET_GROUP_ID = ctx.chat.id.toString();
  ctx.reply(`✅ RoundHill target broadcast group updated to: \`${TARGET_GROUP_ID}\``, { parse_mode: 'Markdown' });
});

bot.command('postinr', async (ctx) => {
  const admin = await isUserAdmin(ctx);
  if (!admin) return ctx.reply('❌ Admin only command.');
  const target = TARGET_GROUP_ID || ctx.chat.id;
  try {
    await bot.telegram.sendMessage(target, getRoundHillINRText(), { parse_mode: 'Markdown', ...getRoundHillButtons() });
    ctx.reply('✅ INR 5X promo card posted successfully!');
  } catch (err) {
    ctx.reply(`❌ Failed to send promo: ${err.message}`);
  }
});

bot.command('testautonews', async (ctx) => {
  const admin = await isUserAdmin(ctx);
  if (!admin) return ctx.reply('❌ Admin only command.');
  await fetchAndBroadcastNews();
  ctx.reply('✅ Tested auto-news broadcast to group.');
});

// GLOBAL ERROR CATCH
bot.catch((err, ctx) => {
  console.error(`[RoundHill Bot Error] for ${ctx.updateType}:`, err);
});

// LAUNCH BOT
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('🤖 RoundHill Investments Bot launched successfully!'))
  .catch((err) => console.error('Failed to launch bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
