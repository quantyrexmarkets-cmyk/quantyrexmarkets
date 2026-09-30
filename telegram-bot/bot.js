const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const http = require('http');
const Parser = require('rss-parser');

// Configuration
const BOT_TOKEN = process.env.BOT_TOKEN || '8815717797:AAE9XmlaDn3uiIuUrv_3-eyv2yL_MFhlPmM';
const ADMIN_ID = parseInt(process.env.ADMIN_ID || '7759205941');
const WEBSITE_URL = 'https://quantyrexmarkets.vercel.app';
const PORT = process.env.PORT || 10000;

let targetGroupId = process.env.GROUP_CHAT_ID ? parseInt(process.env.GROUP_CHAT_ID) : null;
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

// Dummy HTTP Server for Render
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`QuantyRex Telegram Bot is running! Target Group: ${targetGroupId || 'Auto-Detecting'}\n`);
}).listen(PORT, () => {
    console.log(`✅ Health check HTTP server listening on port ${PORT}`);
});

const bot = new Telegraf(BOT_TOKEN);

bot.catch((err, ctx) => {
    console.error(`Telegraf error for ${ctx?.updateType}:`, err.message);
});

// Middleware: Auto-detect group chat ID + Anti-Spam
bot.use(async (ctx, next) => {
    // 1. Auto-detect Group Chat ID
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

    // 2. Anti-Spam: delete links from regular users
    const text = ctx.message.text || ctx.message.caption || '';
    const hasLink = /(https?:\/\/[^\s]+)|(t\.me\/[^\s]+)|(telegram\.me\/[^\s]+)|(www\.[^\s]+)/gi.test(text);

    if (hasLink) {
        try {
            await ctx.deleteMessage();
            const warning = await ctx.reply(`⚠️ @${ctx.from.username || ctx.from.first_name}, external links are not allowed in this group!`);
            setTimeout(() => {
                ctx.telegram.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {});
            }, 6000);
        } catch (err) {
            console.error('Anti-spam deletion error:', err.message);
        }
        return;
    }

    return next();
});

// --- COMMANDS ---

bot.command('start', (ctx) => {
    ctx.replyWithMarkdown(`👋 Welcome to *QuantyRex Assistant Bot*!\n\nUse /help to see all available commands.`);
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(
        `🤖 *QuantyRex Assistant Bot Commands:*\n\n` +
        `• /news - Latest Crypto News with pictures 📰\n` +
        `• /market - Live Crypto Prices 💹\n` +
        `• /plans - AI Bot & Copy Trading Tiers 📊\n` +
        `• /policy - Community Rules ⚖️\n` +
        `• /support - Contact Official Support 🆘`
    );
});

// /news Command
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

bot.command('plans', (ctx) => {
    const planMsg = `📊 *QuantyRex Investment Tiers* 📊\n\n` +
        `🤖 *AI Bot Trading:* \n• Starter: 10% profit (7 days)\n• Silver: 16% profit (14 days)\n• Gold: 24% profit (30 days)\n• Platinum: 36% profit (60 days)\n• Diamond: 50% profit (90 days)\n• Elite: 70% profit (120 days)\n\n` +
        `👥 *Copy Trading:* \nMirror verified top traders (Ross Cameron, Rayner Teo, Kathy Lien) automatically on your account.`;
    
    ctx.replyWithMarkdown(planMsg, Markup.inlineKeyboard([
        [Markup.button.url('🚀 Start Trading Now', `${WEBSITE_URL}/dashboard/bot-trading`)]
    ]));
});

bot.command('market', async (ctx) => {
    await sendMarketUpdate(ctx.chat.id);
});

bot.command('policy', (ctx) => {
    ctx.replyWithMarkdown(`⚖️ *Group Rules & Policy:*\n\n1. No external referral/promo links allowed.\n2. Respect all group members.\n3. Admins will NEVER send you a direct message first to ask for funds or secret keys.\n4. Always report suspicious users to @QUANTYREX_SUPPORT_OFFICAL.`);
});

bot.action('show_policy', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithMarkdown(`⚖️ *Group Rules & Policy:*\n\n1. No external referral/promo links allowed.\n2. Respect all group members.\n3. Admins will NEVER DM you first for payments/passwords.`);
});

bot.command('support', (ctx) => {
    ctx.replyWithMarkdown(`🆘 *QuantyRex Official Support*\n\nContact Admin directly: @QUANTYREX_SUPPORT_OFFICAL\nWebsite Support: ${WEBSITE_URL}/support`);
});

// --- ADMIN COMMANDS ---

bot.command('setgroup', (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    targetGroupId = ctx.chat.id;
    ctx.reply(`✅ Current group set as auto-broadcast target ID: ${targetGroupId}`);
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

// --- AUTOMATED BACKGROUND MONITORING LOOPS ---

// 1. Check for Breaking News every 10 Minutes and auto-send to group
async function checkAutoNews() {
    try {
        const feed = await rssParser.parseURL('https://cointelegraph.com/rss');
        const articles = feed.items || [];

        if (isInitialNewsBoot) {
            // Seed existing articles so we don't spam old news on reboot
            articles.forEach(item => seenArticles.add(item.guid || item.link));
            isInitialNewsBoot = false;
            console.log(`📡 Auto-news initialized with ${seenArticles.size} existing stories.`);
            return;
        }

        // Check for new articles
        for (const item of articles.reverse()) { // process older to newest
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

// 2. Scheduled Market Updates every 6 Hours
async function checkAutoMarket() {
    if (targetGroupId) {
        console.log(`📊 Auto-posting scheduled market update to group ${targetGroupId}...`);
        await sendMarketUpdate(targetGroupId);
    }
}

// Start background timers
setInterval(checkAutoNews, 10 * 60 * 1000); // Every 10 mins
setInterval(checkAutoMarket, 6 * 60 * 60 * 1000); // Every 6 hours

// Run initial news boot check after 5 seconds
setTimeout(checkAutoNews, 5000);

// Launch Bot
bot.launch({ dropPendingUpdates: true }).then(() => {
    console.log('✅ QuantyRex Assistant Bot with Auto-News & Auto-Market is LIVE!');
}).catch((err) => {
    console.error('Launch failed:', err.message);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
