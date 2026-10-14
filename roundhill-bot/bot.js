import { Telegraf, Markup } from 'telegraf';
import express from 'express';
import Parser from 'rss-parser';

// --- CONFIGURATION FOR ROUNDHILL INVESTMENTS ---
const BOT_TOKEN = process.env.BOT_TOKEN || '8865237359:AAHafU092hTh2_YaoAW1NtODJmVQGpf_-XQ';
const ADMIN_ID = 7759205941; // Admin Telegram ID
const SUPPORT_LINK = 'https://t.me/QUANTYREX_SUPPORT_OFFICAL'; // Official Admin Direct Chat
const RENDER_BOT_URL = process.env.RENDER_URL || 'https://roundhill-investments-bot.onrender.com';

let TARGET_GROUP_ID = process.env.TARGET_GROUP_ID || '';

const bot = new Telegraf(BOT_TOKEN);
const parser = new Parser();
let lastNewsTitle = '';

// --- DUMMY HTTP SERVER FOR RENDER 24/7 HEALTH CHECK ---
const app = express();
const PORT = process.env.PORT || 10001;

app.get('/', (req, res) => {
  res.send('ROUNDHILL INVESTMENTS BOT IS LIVE AND RUNNING 24/7!');
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
    `RoundHill Investments provides institutional-grade AI trading, arbitrage strategies, and market-making returns. Secure your guaranteed 5X payout in 24 Hours!\n\n` +
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
    `• 🛡 *Risk Mitigation:* 100% Capital Guaranteed Protection\n` +
    `• 💳 *Withdrawal Options:* UPI, Bank Transfer (IMPS/NEFT), USDT TRC20\n\n` +
    `🚀 *HOW TO GET STARTED:* \n` +
    `1️⃣ Pick your investment package (₹10k to ₹100k).\n` +
    `2️⃣ Tap *"🏛 Deposit & Invest Now"* to connect with Senior Account Managers.\n` +
    `3️⃣ Receive your fast 5X payout direct to your bank or wallet!\n\n` +
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
      [Markup.button.url('📊 Trade Signals with RoundHill', SUPPORT_LINK)],
      [Markup.button.url('💬 Contact Support', SUPPORT_LINK)]
    ]);

    await bot.telegram.sendPhoto(TARGET_GROUP_ID, imageUrl, {
      caption: caption,
      parse_mode: 'Markdown',
      ...keyboard
    });
    console.log('[RoundHill Auto-News] Broadcasted news photo to group');
  } catch (err) {
    console.error('[RoundHill Auto-News Error]:', err.message);
  }
}

// Check news every 30 mins
setInterval(fetchAndBroadcastNews, 30 * 60 * 1000);

// --- AUTOMATED 2-HOUR INR PROMO BROADCAST ---
setInterval(async () => {
  if (!TARGET_GROUP_ID) return;
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getRoundHillINRText(), {
      parse_mode: 'Markdown',
      ...getRoundHillButtons()
    });
    console.log('[RoundHill Auto-INR] Broadcasted investment tiers');
  } catch (err) {
    console.error('[RoundHill Auto-INR Error]:', err.message);
  }
}, 2 * 60 * 60 * 1000);

// --- ANTI-SPAM LINK FILTER ---
bot.use(async (ctx, next) => {
  if (ctx.message && ctx.message.text && ctx.chat.type !== 'private') {
    const text = ctx.message.text;
    const isLink = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.)/i.test(text);
    const isAdmin = ctx.from.id === ADMIN_ID;

    if (isLink && !isAdmin) {
      try {
        await ctx.deleteMessage();
        const warnMsg = await ctx.reply(`⚠️ ${ctx.from.first_name}, promotional links are restricted in RoundHill group.`);
        setTimeout(() => ctx.telegram.deleteMessage(ctx.chat.id, warnMsg.message_id).catch(() => {}), 5000);
        return;
      } catch (err) {
        console.error('Failed to delete spam link:', err.message);
      }
    }
  }
  return next();
});

// --- COMMAND HANDLERS ---
bot.start((ctx) => {
  const welcomeText =
    `🏛 *Welcome to ROUNDHILL INVESTMENTS TRADING BOT!*\n\n` +
    `Your high-yielding institutional trading partner offering 5X guaranteed return multiplier plans and real-time market insights.\n\n` +
    `📌 *Available Commands:*\n` +
    `• /inr or /plans - 5X INR Investment Tiers (₹10k - ₹100k)\n` +
    `• /howitworks - Quickstart Investment Guide\n` +
    `• /market - Live Price Tracker (BTC, ETH, SOL, BNB)\n` +
    `• /news - Latest Market News\n` +
    `• /support - Direct 24/7 Account Desk`;

  ctx.replyWithMarkdown(welcomeText, getRoundHillButtons());
});

bot.help((ctx) => {
  ctx.replyWithMarkdown(
    `ℹ️ *ROUNDHILL INVESTMENTS HELP DESK*\n\nNeed assistance with deposits or account activation?\nContact Official Support: ${SUPPORT_LINK}`,
    getRoundHillButtons()
  );
});

bot.command(['inr', 'plans'], (ctx) => {
  ctx.replyWithMarkdown(getRoundHillINRText(), getRoundHillButtons());
});

bot.command('howitworks', (ctx) => {
  const text =
    `📖 *HOW ROUNDHILL INVESTMENTS WORKS*\n\n` +
    `1️⃣ *Select Tier:* Choose an INR Investment Tier (₹10,000 - ₹100,000).\n` +
    `2️⃣ *Fund Account:* Submit deposit via UPI, Bank Wire, or Crypto (USDT).\n` +
    `3️⃣ *Automated Arbitrage:* Our high-frequency algorithms execute trades.\n` +
    `4️⃣ *Guaranteed Payout:* Receive your 5X return settlement in 24 hours!`;

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
    ctx.reply('❌ Unable to update market prices right now.');
  }
});

bot.command('news', async (ctx) => {
  await fetchAndBroadcastNews();
  ctx.reply('📰 Checked and updated latest market news.');
});

bot.command('support', (ctx) => {
  ctx.replyWithMarkdown(
    `💬 *ROUNDHILL DEDICATED SUPPORT*\n\nConnect with your assigned Account Manager:\nTelegram: ${SUPPORT_LINK}`,
    Markup.inlineKeyboard([[Markup.button.url('💬 Chat with Support', SUPPORT_LINK)]])
  );
});

// --- ADMIN COMMANDS ---
bot.command('setgroup', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  TARGET_GROUP_ID = ctx.chat.id.toString();
  ctx.reply(`✅ RoundHill target broadcast group updated to: \`${TARGET_GROUP_ID}\``, { parse_mode: 'Markdown' });
});

bot.command('postinr', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    return ctx.reply('❌ Unauthorized. Admin only command.');
  }
  if (!TARGET_GROUP_ID) {
    return ctx.reply('⚠️ Please run /setgroup inside the RoundHill Telegram group first!');
  }
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getRoundHillINRText(), {
      parse_mode: 'Markdown',
      ...getRoundHillButtons()
    });
    ctx.reply('✅ RoundHill INR investment alert posted successfully!');
  } catch (err) {
    ctx.reply(`❌ Broadcast failed: ${err.message}`);
  }
});

// GLOBAL ERROR HANDLER
bot.catch((err, ctx) => {
  console.error(`[RoundHill Bot Error] in ${ctx.updateType}:`, err);
});

// LAUNCH BOT
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('🤖 RoundHill Investments Bot launched successfully!'))
  .catch((err) => console.error('Failed to start RoundHill bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
