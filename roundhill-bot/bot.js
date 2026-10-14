import { Telegraf, Markup } from 'telegraf';
import express from 'express';
import Parser from 'rss-parser';

// --- CONFIGURATION FOR ROUNDHILL INVESTMENTS ---
const BOT_TOKEN = process.env.BOT_TOKEN || '8865237359:AAHafU092hTh2_YaoAW1NtODJmVQGpf_-XQ';
const ADMIN_ID = 8451430916; // Trader Kelvin
const SUPPORT_HANDLE = '@Trader_kelvin53'; 
const SUPPORT_LINK = 'https://t.me/Trader_kelvin53';
const RENDER_BOT_URL = process.env.RENDER_URL || 'https://roundhill-investments-bot.onrender.com';

let TARGET_GROUP_ID = process.env.TARGET_GROUP_ID || '';

const bot = new Telegraf(BOT_TOKEN);
const parser = new Parser();
let lastNewsTitle = '';

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
    `• 🛡 *Risk Mitigation:* 100% Capital Guaranteed\n\n` +
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
    }

    const caption = `🏛 *ROUNDHILL BREAKING NEWS*\n\n🔥 *${latestItem.title}*\n\n🔗 [Read Full Analysis](${latestItem.link})`;
    const keyboard = Markup.inlineKeyboard([[Markup.button.url('📊 Trade with Kelvin', SUPPORT_LINK)]]);

    await bot.telegram.sendPhoto(TARGET_GROUP_ID, imageUrl, { caption: caption, parse_mode: 'Markdown', ...keyboard });
  } catch (err) { console.error('News Error:', err.message); }
}

setInterval(fetchAndBroadcastNews, 30 * 60 * 1000);

// --- AUTOMATED 2-HOUR INR PROMO ---
setInterval(async () => {
  if (!TARGET_GROUP_ID) return;
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getRoundHillINRText(), { parse_mode: 'Markdown', ...getRoundHillButtons() });
  } catch (err) { console.error('Auto-INR Error:', err.message); }
}, 2 * 60 * 60 * 1000);

// --- ANTI-SPAM LINK FILTER ---
bot.use(async (ctx, next) => {
  if (ctx.message && ctx.message.text && ctx.chat.type !== 'private') {
    const text = ctx.message.text;
    const isLink = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.)/i.test(text);
    if (isLink && ctx.from.id !== ADMIN_ID) {
      try { await ctx.deleteMessage(); return; } catch (e) {}
    }
  }
  return next();
});

// --- COMMAND HANDLERS ---
bot.start((ctx) => ctx.replyWithMarkdown(`🏛 *Welcome to ROUNDHILL INVESTMENTS!*\n\nHigh-yielding 5X multiplier plans by Trader Kelvin.\n\nUse /inr to see plans or /support to chat.`, getRoundHillButtons()));
bot.command(['inr', 'plans'], (ctx) => ctx.replyWithMarkdown(getRoundHillINRText(), getRoundHillButtons()));
bot.command('support', (ctx) => ctx.replyWithMarkdown(`💬 *ROUNDHILL SUPPORT*\n\nConnect with Trader Kelvin:\n${SUPPORT_LINK}`, getRoundHillButtons()));

// --- ADMIN COMMANDS ---
bot.command('setgroup', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  TARGET_GROUP_ID = ctx.chat.id.toString();
  ctx.reply(`✅ RoundHill group locked for broadcasting: \`${TARGET_GROUP_ID}\``);
});

bot.command('postinr', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID || !TARGET_GROUP_ID) return;
  await bot.telegram.sendMessage(TARGET_GROUP_ID, getRoundHillINRText(), { parse_mode: 'Markdown', ...getRoundHillButtons() });
  ctx.reply('✅ INR Alert Broadcasted.');
});

bot.launch({ dropPendingUpdates: true });
