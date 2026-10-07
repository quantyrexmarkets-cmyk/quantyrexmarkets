const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const http = require('http');
const Parser = require('rss-parser');

// Configuration
const BOT_TOKEN = process.env.BOT_TOKEN || '8815717797:AAGFh9lCyKcsd5kYNq-l98ENl9GzJXTj2aw';
const ADMIN_ID = parseInt(process.env.ADMIN_ID || '7759205941');
const SUPPORT_LINK = 'https://t.me/QUANTYREX_SUPPORT_OFFICAL';
const SUPPORT_HANDLE = '@QUANTYREX_SUPPORT_OFFICAL';
const WEBSITE_URL = 'https://quantyrexmarkets.vercel.app';
const RENDER_SERVICE_URL = 'https://quantyrex-telegram-bot-mtpro.onrender.com';
const PORT = process.env.PORT || 10000;

// Hardcode default group ID so restarts never lose the chat
let targetGroupId = process.env.GROUP_CHAT_ID ? parseInt(process.env.GROUP_CHAT_ID) : -1004302599281;
const seenArticles = new Set();
let isInitialNewsBoot = true;

// RSS Parser setup
const rssParser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent'],
            ['enclosure', 'enclosure'],
            ['content:encoded', 'contentEncoded']
        ]
    }
});

function extractImageUrl(item) {
    if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
        return item.mediaContent.$.url;
    }
    if (item.enclosure && item.enclosure.url && /\.(jpeg|jpg|gif|png|webp)/i.test(item.enclosure.url)) {
        return item.enclosure.url;
    }
    const htmlContent = item.contentEncoded || item.content || '';
    const match = htmlContent.match(/src=["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg|webp))["']/i);
    if (match) return match[1];
    return null;
}

// Health Check HTTP Server for Render
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`QuantyRex Telegram Bot is running live! Target Group: ${targetGroupId}\n`);
}).listen(PORT, () => {
    console.log(`✅ Health check HTTP server listening on port ${PORT}`);
});

// Self-Ping Keep-Alive to prevent Render Free Tier spin-down
setInterval(() => {
    axios.get(RENDER_SERVICE_URL)
        .then(() => console.log('⚡ Keep-alive self-ping successful'))
        .catch(err => console.log('Keep-alive ping:', err.message));
}, 4 * 60 * 1000); // Ping every 4 minutes

const bot = new Telegraf(BOT_TOKEN);

bot.catch((err, ctx) => {
    console.error(`Telegraf error for ${ctx?.updateType}:`, err.message);
});

// Middleware: Group ID detection + Anti-Spam
bot.use(async (ctx, next) => {
    if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
        if (targetGroupId !== ctx.chat.id) {
            targetGroupId = ctx.chat.id;
            console.log(`📌 Target group locked: ${targetGroupId}`);
        }
    }

    if (!ctx.chat || ctx.chat.type === 'private' || !ctx.message) return next();

    const userId = ctx.from?.id;
    if (!userId || userId === ADMIN_ID) return next();

    try {
        const chatMember = await ctx.getChatMember(userId);
        if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
            return next();
        }
    } catch (e) {}

    const text = ctx.message.text || ctx.message.caption || '';
    const hasLink = /(https?:\/\/[^\s]+)|(t\.me\/[^\s]+)|(telegram\.me\/[^\s]+)|(www\.[^\s]+)/gi.test(text);

    if (hasLink) {
        try {
            await ctx.deleteMessage();
            const warning = await ctx.reply(`⚠️ @${ctx.from.username || ctx.from.first_name}, external links are prohibited! Contact ${SUPPORT_HANDLE} for help.`);
            setTimeout(() => {
                ctx.telegram.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {});
            }, 6000);
        } catch (err) {}
        return;
    }

    return next();
});

// --- COMMANDS ---

bot.command('start', (ctx) => {
    ctx.replyWithMarkdown(
        `✨ *Welcome to QuantyRex Markets Assistant Bot!* ✨\n\n` +
        `QuantyRex Markets is an automated institutional crypto trading & copy trading platform.\n\n` +
        `Select an option below or type /help:`,
        Markup.inlineKeyboard([
            [Markup.button.callback('📖 How It Works', 'btn_howitworks'), Markup.button.callback('📊 Investment Plans', 'btn_plans')],
            [Markup.button.url('🌐 Register Account', `${WEBSITE_URL}/register`), Markup.button.url('🆘 Contact Support', SUPPORT_LINK)]
        ])
    );
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(
        `🤖 *QuantyRex Assistant Bot Commands:*\n\n` +
        `• /howitworks - Step-by-step platform guide 📖\n` +
        `• /plans - Full AI Bot & Copy Trading Investment Tiers 📊\n` +
        `• /news - Latest Breaking Crypto News with photos 📰\n` +
        `• /market - Live Crypto Prices 💹\n` +
        `• /policy - Group Rules & Security ⚖️\n` +
        `• /support - Official Support Contact 🆘`
    );
});

bot.command('howitworks', (ctx) => {
    sendHowItWorksMessage(ctx);
});

function sendHowItWorksMessage(ctx) {
    const text = `📖 *HOW QUANTYREX MARKETS WORKS* 📖\n\n` +
        `QuantyRex Markets provides automated crypto growth through AI Algorithmic Trading and Mirror Copy Trading.\n\n` +
        `*1️⃣ Step 1: Create an Account*\n` +
        `Sign up at [QuantyRex Markets](${WEBSITE_URL}/register) in under 60 seconds.\n\n` +
        `*2️⃣ Step 2: Deposit Funds*\n` +
        `Fund your wallet with BTC, ETH, USDT, SOL, or BNB on your personal Dashboard.\n\n` +
        `*3️⃣ Step 3: Choose Your Growth Engine*\n` +
        `• *AI Trading Bots:* Select a plan (Starter to Elite) and let automated algorithms trade 24/7.\n` +
        `• *Copy Trading:* Allocate capital to mirror real public traders (Ross Cameron, Rayner Teo, Kathy Lien) automatically.\n\n` +
        `*4️⃣ Step 4: Daily Profit Accrual*\n` +
        `Watch your trade returns accrue daily in your account dashboard.\n\n` +
        `*5️⃣ Step 5: Fast Withdrawals*\n` +
        `Withdraw capital and profits to your external crypto wallet anytime.`;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('🤖 View AI Bot Plans', 'btn_bot_plans'), Markup.button.callback('👥 View Copy Traders', 'btn_copy_traders')],
        [Markup.button.url('🚀 Launch Dashboard', `${WEBSITE_URL}/dashboard`)]
    ]);

    ctx.replyWithMarkdown(text, keyboard);
}

bot.command('plans', (ctx) => {
    sendPlansMenu(ctx);
});

function sendPlansMenu(ctx) {
    const text = `📊 *QUANTYREX INVESTMENT PLANS & TIERS* 📊\n\n` +
        `Choose between fully automated **AI Bot Strategies** or **Copy Trading Top Traders**.\n\n` +
        `Select a category below to see detailed ROI, minimums, and durations:`;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('🤖 AI Trading Bots (10% - 70%)', 'btn_bot_plans')],
        [Markup.button.callback('👥 Copy Expert Traders', 'btn_copy_traders')],
        [Markup.button.url('🌐 Activate Plan On Website', `${WEBSITE_URL}/dashboard/bot-trading`)]
    ]);

    ctx.replyWithMarkdown(text, keyboard);
}

bot.action('btn_howitworks', (ctx) => {
    ctx.answerCbQuery();
    sendHowItWorksMessage(ctx);
});

bot.action('btn_plans', (ctx) => {
    ctx.answerCbQuery();
    sendPlansMenu(ctx);
});

bot.action('btn_bot_plans', (ctx) => {
    ctx.answerCbQuery();
    const botText = `🤖 *QUANTYREX AI TRADING BOTS* 🤖\n\n` +
        `1️⃣ *Starter Bot*\n` +
        `• Min Deposit: *$500*\n` +
        `• Expected Return: *10% Profit*\n` +
        `• Duration: *7 Days*\n\n` +
        `2️⃣ *Silver Bot*\n` +
        `• Min Deposit: *$1,000*\n` +
        `• Expected Return: *16% Profit*\n` +
        `• Duration: *14 Days*\n\n` +
        `3️⃣ *Gold Bot*\n` +
        `• Min Deposit: *$2,500*\n` +
        `• Expected Return: *24% Profit*\n` +
        `• Duration: *30 Days*\n\n` +
        `4️⃣ *Platinum Bot*\n` +
        `• Min Deposit: *$5,000*\n` +
        `• Expected Return: *36% Profit*\n` +
        `• Duration: *60 Days*\n\n` +
        `5️⃣ *Diamond Bot*\n` +
        `• Min Deposit: *$10,000*\n` +
        `• Expected Return: *50% Profit*\n` +
        `• Duration: *90 Days*\n\n` +
        `6️⃣ *Elite Bot*\n` +
        `• Min Deposit: *$25,000*\n` +
        `• Expected Return: *70% Profit*\n` +
        `• Duration: *120 Days*`;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('👥 View Copy Traders', 'btn_copy_traders')],
        [Markup.button.url('🤖 Start AI Bot Now', `${WEBSITE_URL}/dashboard/bot-trading`)]
    ]);

    ctx.replyWithMarkdown(botText, keyboard);
});

bot.action('btn_copy_traders', (ctx) => {
    ctx.answerCbQuery();
    const copyText = `👥 *FEATURED QUANTYREX COPY TRADERS* 👥\n\n` +
        `Mirror verified trading positions automatically in real time:\n\n` +
        `• *Ross Cameron* — Day Trading Specialist\n` +
        `  📈 Win Rate: *88%* | 30d Avg ROI: *+34%*\n\n` +
        `• *Rayner Teo* — Price Action & Swing Trader\n` +
        `  📈 Win Rate: *85%* | 30d Avg ROI: *+29%*\n\n` +
        `• *Kathy Lien* — Forex & Macro Crypto\n` +
        `  📈 Win Rate: *82%* | 30d Avg ROI: *+26%*\n\n` +
        `• *Anton Kreil* — Institutional Strategy\n` +
        `  📈 Win Rate: *91%* | 30d Avg ROI: *+41%*\n\n` +
        `• *Nicola Duke* — Technical Pattern Expert\n` +
        `  📈 Win Rate: *80%* | 30d Avg ROI: *+22%*\n\n` +
        `• *Timothy Sykes* — Momentum Trader\n` +
        `  📈 Win Rate: *84%* | 30d Avg ROI: *+31%*`;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('🤖 View AI Bot Plans', 'btn_bot_plans')],
        [Markup.button.url('👥 Connect & Copy Trader', `${WEBSITE_URL}/dashboard/copy-trading`)]
    ]);

    ctx.replyWithMarkdown(copyText, keyboard);
});

bot.command('news', async (ctx) => {
    try {
        const feed = await rssParser.parseURL('https://cointelegraph.com/rss');
        const articles = feed.items ? feed.items.slice(0, 2) : [];

        if (articles.length === 0) return ctx.reply("❌ No news found.");

        for (const item of articles) {
            await sendArticleToChat(ctx.chat.id, item);
        }
    } catch (e) {
        console.error('Manual /news error:', e.message);
        ctx.reply("❌ Unable to load news feed.");
    }
});

bot.command('market', async (ctx) => {
    await sendMarketUpdate(ctx.chat.id);
});

bot.command('policy', (ctx) => {
    ctx.replyWithMarkdown(`⚖️ *Group Rules & Policy:*\n\n1. No external referral/promo links allowed.\n2. Respect all group members.\n3. Admins will NEVER send you a direct message first to ask for funds or secret keys.\n4. Always report suspicious users directly to ${SUPPORT_HANDLE}.`);
});

bot.action('show_policy', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithMarkdown(`⚖️ *Group Rules & Policy:*\n\n1. No external referral/promo links allowed.\n2. Respect all group members.\n3. Admins will NEVER DM you first for payments/passwords.\n4. Official Support: ${SUPPORT_HANDLE}`);
});

bot.command('support', (ctx) => {
    const text = `🆘 *QUANTYREX OFFICIAL SUPPORT* 🆘\n\n` +
        `• *Telegram Support:* [${SUPPORT_HANDLE}](${SUPPORT_LINK})\n` +
        `• *Website Help Center:* [quantyrexmarkets.vercel.app/support](${WEBSITE_URL}/support)\n\n` +
        `Tap the button below to start a direct chat with our support team:`;

    const keyboard = Markup.inlineKeyboard([
        [Markup.button.url('💬 Chat with Support Now', SUPPORT_LINK)],
        [Markup.button.url('🌐 Open Website Support', `${WEBSITE_URL}/support`)]
    ]);

    ctx.replyWithMarkdown(text, keyboard);
});

// --- ADMIN COMMANDS ---

bot.command('setgroup', (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    targetGroupId = ctx.chat.id;
    ctx.reply(`✅ Current group set as auto-broadcast target ID: ${targetGroupId}`);
});

bot.command('testautonews', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return ctx.reply("🚫 Admin access required.");
    const group = targetGroupId || ctx.chat.id;
    ctx.reply(`🔄 Triggering test auto-news broadcast to target group ${group}...`);
    try {
        const feed = await rssParser.parseURL('https://cointelegraph.com/rss');
        if (feed.items && feed.items.length > 0) {
            await sendArticleToChat(group, feed.items[0]);
            ctx.reply("✅ Test auto-news broadcast successful!");
        }
    } catch (err) {
        ctx.reply("❌ Test failed: " + err.message);
    }
});

bot.command('postnews', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return ctx.reply("🚫 Admin access required.");
    
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) return ctx.reply("Usage:\n1) /postnews <Your news message>\n2) /postnews <IMAGE_URL> | <Your news message>");

    let photoUrl = null, newsText = text;
    if (text.includes('|')) {
        const parts = text.split('|');
        photoUrl = parts[0].trim();
        newsText = parts.slice(1).join('|').trim();
    }

    const newsMsg = `🔔 *QUANTYREX MARKET NEWS* 🔔\n\n${newsText}`;

    try {
        if (photoUrl) {
            await bot.telegram.sendPhoto(ctx.chat.id, photoUrl, { caption: newsMsg, parse_mode: 'Markdown' });
        } else {
            await bot.telegram.sendMessage(ctx.chat.id, newsMsg, { parse_mode: 'Markdown' });
        }
    } catch (err) {
        ctx.reply("❌ Error posting news: " + err.message);
    }
});

bot.on('photo', async (ctx, next) => {
    const caption = ctx.message.caption || '';
    if (ctx.from.id === ADMIN_ID && caption.startsWith('/postnews')) {
        const newsText = caption.replace('/postnews', '').trim();
        const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const newsMsg = `🔔 *QUANTYREX MARKET NEWS* 🔔\n\n${newsText || 'Major market update from QuantyRex.'}`;
        
        try {
            await bot.telegram.sendPhoto(ctx.chat.id, photoId, { caption: newsMsg, parse_mode: 'Markdown' });
        } catch (err) {
            ctx.reply("❌ Failed to broadcast image news.");
        }
        return;
    }
    return next();
});

bot.command('signal', (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return ctx.reply("🚫 Admin access required.");
    const args = ctx.message.text.split(' ');
    if (args.length < 4) return ctx.reply("Usage: /signal BTC/USD BUY 65000 [TP: 68000]");
    
    const [_, pair, action, price, ...extra] = args;
    const notes = extra.join(' ');
    
    const signalMsg = `🚀 *OFFICIAL TRADE SETUP* 🚀\n\n` +
        `• Asset: *${pair.toUpperCase()}*\n` +
        `• Signal: *${action.toUpperCase()}*\n` +
        `• Entry Price: *${price}*\n` +
        (notes ? `• Details: *${notes}*\n` : '') +
        `\n⚠️ _Always practice risk management on QuantyRex Markets platform._`;
    
    bot.telegram.sendMessage(ctx.chat.id, signalMsg, { parse_mode: 'Markdown' });
});

// --- HELPER FUNCTIONS ---

async function sendArticleToChat(chatId, item) {
    const headline = item.title ? item.title.trim() : 'Crypto Breaking News';
    const rawSnippet = item.contentSnippet || item.content || '';
    const cleanSummary = rawSnippet.replace(/<[^>]*>?/gm, '').trim();
    const summary = cleanSummary.length > 180 ? cleanSummary.substring(0, 180) + '...' : cleanSummary;
    const imageUrl = extractImageUrl(item);

    const caption = `📰 *${headline}*\n\n${summary}\n\n📡 *Source:* CoinTelegraph`;
    const keyboard = Markup.inlineKeyboard([[Markup.button.url('📖 Read Full Article', item.link)]]);

    try {
        if (imageUrl) {
            await bot.telegram.sendPhoto(chatId, imageUrl, {
                caption: caption,
                parse_mode: 'Markdown',
                ...keyboard
            });
        } else {
            await bot.telegram.sendMessage(chatId, caption, {
                parse_mode: 'Markdown',
                ...keyboard
            });
        }
    } catch (err) {
        await bot.telegram.sendMessage(chatId, `${caption}\n\n🔗 [Read Full Story](${item.link})`, {
            parse_mode: 'Markdown',
            ...keyboard
        });
    }
}

async function sendMarketUpdate(chatId) {
    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
        const data = res.data;
        const msg = `💹 *QuantyRex Market Update (USD)*\n\n` +
            `• *BTC:* $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change >= 0 ? '+' : ''}${data.bitcoin.usd_24h_change.toFixed(2)}%)\n` +
            `• *ETH:* $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change >= 0 ? '+' : ''}${data.ethereum.usd_24h_change.toFixed(2)}%)\n` +
            `• *SOL:* $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change >= 0 ? '+' : ''}${data.solana.usd_24h_change.toFixed(2)}%)\n` +
            `• *BNB:* $${data.binancecoin.usd.toLocaleString()} (${data.binancecoin.usd_24h_change >= 0 ? '+' : ''}${data.binancecoin.usd_24h_change.toFixed(2)}%)`;
        await bot.telegram.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
    } catch (e) {
        console.error('Market update fetch error:', e.message);
    }
}

// --- AUTOMATED BACKGROUND LOOPS ---

async function checkAutoNews() {
    try {
        const feed = await rssParser.parseURL('https://cointelegraph.com/rss');
        const articles = feed.items || [];

        if (isInitialNewsBoot) {
            articles.forEach(item => seenArticles.add(item.guid || item.link));
            isInitialNewsBoot = false;
            console.log(`📡 Auto-news initialized with ${seenArticles.size} existing stories.`);
            return;
        }

        for (const item of articles.reverse()) {
            const itemKey = item.guid || item.link;
            if (!seenArticles.has(itemKey)) {
                seenArticles.add(itemKey);
                
                if (targetGroupId) {
                    console.log(`🚀 Auto-posting fresh news to group: ${item.title}`);
                    await sendArticleToChat(targetGroupId, item);
                }
            }
        }
    } catch (e) {
        console.error('Auto-news background error:', e.message);
    }
}

async function checkAutoMarket() {
    if (targetGroupId) {
        console.log(`📊 Auto-posting scheduled market update to group ${targetGroupId}...`);
        await sendMarketUpdate(targetGroupId);
    }
}

setInterval(checkAutoNews, 10 * 60 * 1000);
setInterval(checkAutoMarket, 6 * 60 * 60 * 1000);

setTimeout(checkAutoNews, 5000);

bot.launch({ dropPendingUpdates: true }).then(() => {
    console.log('✅ QuantyRex Assistant Bot updated with Keep-Alive self-ping!');
}).catch((err) => {
    console.error('Launch failed:', err.message);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
