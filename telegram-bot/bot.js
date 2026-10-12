import { Telegraf, Markup } from 'telegraf';
import express from 'express';
import Parser from 'rss-parser';

// --- CONFIGURATION ---
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('FATAL ERROR: BOT_TOKEN environment variable is missing!');
  process.exit(1);
}

const ADMIN_ID = 7759205941; // @QUANTYREX_SUPPORT_OFFICAL
const SUPPORT_LINK = 'https://t.me/QUANTYREX_SUPPORT_OFFICAL';
const WEBSITE_URL = 'https://quantyrexmarkets.vercel.app';
const RENDER_BOT_URL = 'https://quantyrex-telegram-bot-mtpro.onrender.com';

let TARGET_GROUP_ID = process.env.TARGET_GROUP_ID || '-1004302599281';

const bot = new Telegraf(BOT_TOKEN);
const parser = new Parser();
let lastNewsTitle = '';

// --- DUMMY HTTP SERVER FOR RENDER HEALTH CHECK & SELF-PING ---
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('QUANTYREX MARKETS BOT IS RUNNING 24/7 LIVE ON RENDER!');
});

app.listen(PORT, () => {
  console.log(`[HTTP Server] Listening on port ${PORT}`);
});

// Self-ping every 4 minutes to prevent Render free tier from sleeping
setInterval(async () => {
  try {
    await fetch(RENDER_BOT_URL);
    console.log('[Self-Ping] Pinged Render bot URL to keep alive');
  } catch (err) {
    console.error('[Self-Ping Error]:', err.message);
  }
}, 4 * 60 * 1000);

// --- INR INVESTMENT BROADCAST MESSAGE GENERATOR ---
const getINRBroadcastText = () => {
  return (
    `💎 *QUANTYREX MARKETS - EXCLUSIVE INR (₹) INVESTMENT PACKAGES* 💎\n` +
    `⚡ *5X GUARANTEED MULTIPLIER TRADING PLAN* ⚡\n\n` +
    `Maximize your capital with Quantyrex Automated AI High-Frequency Trading & Arbitrage Systems. Invest in Indian Rupees (₹) with guaranteed 5X ROI returns across all packages!\n\n` +
    `🔥 *AVAILABLE INR INVESTMENT TIERS:* 🔥\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔹 *₹10,000 Package (10k)* ➔ Return: *₹50,000* (5x ROI)\n` +
    `🔹 *₹20,000 Package (20k)* ➔ Return: *₹100,000* (5x ROI)\n` +
    `🔹 *₹30,000 Package (30k)* ➔ Return: *₹150,000* (5x ROI)\n` +
    `🔹 *₹50,000 Package (50k)* ➔ Return: *₹250,000* (5x ROI)\n` +
    `🔹 *₹75,000 Package (75k)* ➔ Return: *₹375,000* (5x ROI)\n` +
    `🔹 *₹100,000 Package (100k)* ➔ Return: *₹500,000* (5x ROI)\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📊 *KEY PACKAGE HIGHLIGHTS:*\n` +
    `• 🟢 *Minimum Investment:* ₹10,000 (10k)\n` +
    `• 🔴 *Maximum Investment:* ₹100,000 (100k)\n` +
    `• ⏱ *Trading Cycle:* 24 Hours Max Payout\n` +
    `• 🛡 *Capital Protection:* 100% Guaranteed AI Risk Shield\n` +
    `• 💳 *Payout Methods:* UPI, Bank Transfer (IMPS/NEFT), USDT (TRC20)\n\n` +
    `💡 *HOW TO INVEST:* \n` +
    `1️⃣ Select your desired package from ₹10k to ₹100k.\n` +
    `2️⃣ Click *"🚀 Invest Now in INR"* below to connect with Official Support.\n` +
    `3️⃣ Receive your guaranteed 5X payout directly to your bank account or crypto wallet!\n\n` +
    `👇 *Click below to activate your investment tier today!*`
  );
};

const getINRButtons = () => {
  return Markup.inlineKeyboard([
    [Markup.button.url('🚀 Invest Now in INR', SUPPORT_LINK)],
    [
      Markup.button.url('💬 Instant Support', SUPPORT_LINK),
      Markup.button.url('🌐 Official Website', WEBSITE_URL)
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

    let imageUrl = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80';
    if (latestItem.enclosure && latestItem.enclosure.url) {
      imageUrl = latestItem.enclosure.url;
    } else if (latestItem['media:content'] && latestItem['media:content'].$) {
      imageUrl = latestItem['media:content'].$.url;
    }

    const caption =
      `📰 *QUANTYREX BREAKING MARKET NEWS*\n\n` +
      `🔥 *${latestItem.title}*\n\n` +
      `${latestItem.contentSnippet ? latestItem.contentSnippet.slice(0, 220) + '...' : ''}\n\n` +
      `🔗 [Read Full Article](${latestItem.link})`;

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.url('📊 Trade This News on Quantyrex', WEBSITE_URL)],
      [Markup.button.url('💬 Contact Support', SUPPORT_LINK)]
    ]);

    await bot.telegram.sendPhoto(TARGET_GROUP_ID, imageUrl, {
      caption: caption,
      parse_mode: 'Markdown',
      ...keyboard
    });
    console.log('[Auto-News] Successfully broadcasted breaking news photo');
  } catch (err) {
    console.error('[Auto-News Error]:', err.message);
  }
}

// Check news every 30 minutes
setInterval(fetchAndBroadcastNews, 30 * 60 * 1000);

// --- AUTOMATED INR PROMO BROADCASTER ---
setInterval(async () => {
  if (!TARGET_GROUP_ID) return;
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getINRBroadcastText(), {
      parse_mode: 'Markdown',
      ...getINRButtons()
    });
    console.log('[Auto-INR] Successfully broadcasted INR investment package promo');
  } catch (err) {
    console.error('[Auto-INR Error]:', err.message);
  }
}, 2 * 60 * 60 * 1000); // Every 2 hours

// --- ANTI-SPAM LINK FILTER ---
bot.use(async (ctx, next) => {
  if (ctx.message && ctx.message.text && ctx.chat.type !== 'private') {
    const text = ctx.message.text;
    const isLink = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.)/i.test(text);
    const isAdmin = ctx.from.id === ADMIN_ID;

    if (isLink && !isAdmin) {
      try {
        await ctx.deleteMessage();
        const warnMsg = await ctx.reply(`⚠️ ${ctx.from.first_name}, unauthorized links are prohibited in this group.`);
        setTimeout(() => ctx.telegram.deleteMessage(ctx.chat.id, warnMsg.message_id).catch(() => {}), 5000);
        return;
      } catch (err) {
        console.error('Failed to delete spam link:', err.message);
      }
    }
  }
  return next();
});

// --- BOT COMMAND HANDLERS ---
bot.start((ctx) => {
  const welcomeText =
    `🚀 *Welcome to QUANTYREX MARKETS TRADING BOT!*\n\n` +
    `Your premier gateway to Automated AI Trading, High-Yield INR Packages, & Copy Trading Signals.\n\n` +
    `📌 *Available Commands:*\n` +
    `• /inr or /inrplans - Exclusive INR 5X Investment Packages (₹10k - ₹100k)\n` +
    `• /plans - AI Trading Tiers & Copy Trading Masters\n` +
    `• /howitworks - Quickstart Guide\n` +
    `• /market - Live Market Prices\n` +
    `• /news - Latest Crypto News\n` +
    `• /support - Direct Official Support`;

  const buttons = Markup.inlineKeyboard([
    [Markup.button.url('🚀 Invest Now in INR (₹)', SUPPORT_LINK)],
    [
      Markup.button.url('🌐 Visit Platform', WEBSITE_URL),
      Markup.button.url('💬 Official Support', SUPPORT_LINK)
    ]
  ]);

  ctx.replyWithMarkdown(welcomeText, buttons);
});

bot.help((ctx) => {
  ctx.reply(
    `ℹ️ *QUANTYREX HELP CENTER*\n\nFor support, deposits, and account activation, contact official support:\nTelegram: ${SUPPORT_LINK}\nWebsite: ${WEBSITE_URL}`,
    { parse_mode: 'Markdown' }
  );
});

// INR PLAN COMMAND (/inr or /inrplans)
bot.command(['inr', 'inrplans'], (ctx) => {
  ctx.replyWithMarkdown(getINRBroadcastText(), getINRButtons());
});

// MANUAL ADMIN INR BROADCAST COMMAND (/postinr)
bot.command('postinr', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    return ctx.reply('❌ Unauthorized command. Only admins can use /postinr.');
  }
  try {
    await bot.telegram.sendMessage(TARGET_GROUP_ID, getINRBroadcastText(), {
      parse_mode: 'Markdown',
      ...getINRButtons()
    });
    ctx.reply('✅ INR 5X Investment Broadcast posted successfully to target group!');
  } catch (err) {
    ctx.reply(`❌ Failed to send broadcast: ${err.message}`);
  }
});

// HOW IT WORKS
bot.command('howitworks', (ctx) => {
  const text =
    `📖 *HOW QUANTYREX MARKETS WORKS*\n\n` +
    `1️⃣ *Select Plan:* Choose an AI Tier or INR Package (₹10k - ₹100k).\n` +
    `2️⃣ *Deposit Capital:* Complete deposit via UPI, Bank, or Crypto.\n` +
    `3️⃣ *Automated Trading:* AI bots & Master Traders execute trades.\n` +
    `4️⃣ *Receive ROI:* Withdraw profits directly to your wallet/bank!`;

  ctx.replyWithMarkdown(text, Markup.inlineKeyboard([
    [Markup.button.url('🚀 Invest Now', SUPPORT_LINK)]
  ]));
});

// REGULAR PLANS COMMAND
bot.command('plans', (ctx) => {
  const plansText =
    `💼 *QUANTYREX AI TRADING & INR PACKAGES*\n\n` +
    `🇮🇳 *INR SPECIAL PACKAGES (5X RETURN):*\n` +
    `• ₹10,000 ➔ Return ₹50,000\n` +
    `• ₹20,000 ➔ Return ₹100,000\n` +
    `• ₹50,000 ➔ Return ₹250,000\n` +
    `• ₹100,000 ➔ Return ₹500,000\n\n` +
    `🤖 *GLOBAL AI BOT TIERS:*\n` +
    `• Starter AI: $500 Min | 10% Weekly ROI\n` +
    `• Pro AI: $2,500 Min | 25% Weekly ROI\n` +
    `• Elite AI: $25,000 Min | 70% Weekly ROI\n\n` +
    `Use /inr for complete INR package breakdown.`;

  ctx.replyWithMarkdown(plansText, getINRButtons());
});

// LIVE MARKET COMMAND
bot.command('market', async (ctx) => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
    const data = await res.json();

    const text =
      `📊 *LIVE MARKET SNAPSHOT*\n\n` +
      `• *BTC:* $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change.toFixed(2)}%)\n` +
      `• *ETH:* $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change.toFixed(2)}%)\n` +
      `• *SOL:* $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change.toFixed(2)}%)\n` +
      `• *BNB:* $${data.binancecoin.usd.toLocaleString()} (${data.binancecoin.usd_24h_change.toFixed(2)}%)`;

    ctx.replyWithMarkdown(text);
  } catch (err) {
    ctx.reply('❌ Unable to fetch market data right now.');
  }
});

// NEWS COMMAND
bot.command('news', async (ctx) => {
  await fetchAndBroadcastNews();
  ctx.reply('📰 Checked and fetched latest market news.');
});

// SET GROUP COMMAND (ADMIN)
bot.command('setgroup', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  TARGET_GROUP_ID = ctx.chat.id.toString();
  ctx.reply(`✅ Target group ID updated to: \`${TARGET_GROUP_ID}\``, { parse_mode: 'Markdown' });
});

// SUPPORT COMMAND
bot.command('support', (ctx) => {
  ctx.reply(
    `💬 *QUANTYREX DEDICATED SUPPORT*\n\nReach official support 24/7:\n Telegram: ${SUPPORT_LINK}\n Website Support: ${WEBSITE_URL}/support`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.url('💬 Chat with Support', SUPPORT_LINK)]])
    }
  );
});

// GLOBAL ERROR HANDLING
bot.catch((err, ctx) => {
  console.error(`[Bot Error] for ${ctx.updateType}:`, err);
});

// LAUNCH BOT WITH DROP PENDING UPDATES
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('🤖 Quantyrex Telegram Bot launched successfully!'))
  .catch((err) => console.error('Failed to launch bot:', err));

// GRACEFUL SHUTDOWN
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
