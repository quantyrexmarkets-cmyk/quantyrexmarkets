const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const http = require('http');

// Configuration
const BOT_TOKEN = process.env.BOT_TOKEN || '8815717797:AAE9XmlaDn3uiIuUrv_3-eyv2yL_MFhlPmM';
const ADMIN_ID = parseInt(process.env.ADMIN_ID || '7759205941');
const WEBSITE_URL = 'https://quantyrexmarkets.vercel.app';
const PORT = process.env.PORT || 10000;

// Dummy HTTP server for Render Health Check
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('QuantyRex Telegram Bot is running live!\n');
}).listen(PORT, () => {
    console.log(`✅ Health check HTTP server listening on port ${PORT}`);
});

const bot = new Telegraf(BOT_TOKEN);

// --- ANTI-SPAM MIDDLEWARE ---
bot.use(async (ctx, next) => {
    if (!ctx.chat || ctx.chat.type === 'private') return next();
    if (!ctx.message) return next();

    const userId = ctx.from?.id;
    if (!userId) return next();

    if (userId === ADMIN_ID) return next();

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
            const warning = await ctx.reply(`⚠️ @${ctx.from.username || ctx.from.first_name}, external links are not allowed in this group!`);
            setTimeout(() => {
                ctx.telegram.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {});
            }, 7000);
        } catch (err) {
            console.error('Anti-spam deletion failed:', err.message);
        }
        return;
    }

    return next();
});

// --- WELCOME MESSAGE ---
bot.on('new_chat_members', (ctx) => {
    const newUser = ctx.message.new_chat_members[0].first_name;
    ctx.replyWithMarkdown(`✨ *Welcome to QuantyRex Markets, ${newUser}!* ✨\n\nWe are glad to have you in our trading community.\n\nType /help to see all available commands!`, 
    Markup.inlineKeyboard([
        [Markup.button.url('🌐 Official Website', WEBSITE_URL)],
        [Markup.button.callback('📜 Group Rules', 'show_policy')]
    ]));
});

// --- PUBLIC COMMANDS ---

bot.help((ctx) => {
    ctx.replyWithMarkdown(`*QuantyRex Assistant Bot Commands:*\n\n/start - Initialize bot\n/news - Breaking Crypto News with pictures 📰\n/market - Live Crypto Prices 💹\n/plans - View AI Bot & Copy Trade plans 📊\n/policy - Group rules & safety ⚖️\n/support - Official Support contact 🆘`);
});

// /news - Live Crypto News with Pictures
bot.command('news', async (ctx) => {
    try {
        const res = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const articles = res.data?.Data;

        if (!articles || articles.length === 0) {
            return ctx.reply("❌ No news available at the moment.");
        }

        // Fetch top 2 articles
        const topArticles = articles.slice(0, 2);

        for (const item of topArticles) {
            const headline = item.title.trim();
            const summary = item.body.length > 180 ? item.body.substring(0, 180) + '...' : item.body;
            const source = item.source_info?.name || item.source;

            const caption = `📰 *${headline}*\n\n` +
                `${summary}\n\n` +
                `📡 *Source:* ${source}`;

            const keyboard = Markup.inlineKeyboard([
                [Markup.button.url('📖 Read Full Article', item.url)]
            ]);

            try {
                await ctx.replyWithPhoto(item.imageurl, {
                    caption: caption,
                    parse_mode: 'Markdown',
                    ...keyboard
                });
            } catch (imgErr) {
                // Fallback to text if photo URL fails
                await ctx.replyWithMarkdown(`${caption}\n🌐 [Read Article](${item.url})`, keyboard);
            }
        }
    } catch (e) {
        console.error('News fetch error:', e.message);
        ctx.reply("❌ Unable to load crypto news right now. Try again shortly.");
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
    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
        const data = res.data;
        const msg = `💹 *QuantyRex Market Update (USD)*\n\n` +
            `• *BTC:* $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change >= 0 ? '+' : ''}${data.bitcoin.usd_24h_change.toFixed(2)}%)\n` +
            `• *ETH:* $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change >= 0 ? '+' : ''}${data.ethereum.usd_24h_change.toFixed(2)}%)\n` +
            `• *SOL:* $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change >= 0 ? '+' : ''}${data.solana.usd_24h_change.toFixed(2)}%)\n` +
            `• *BNB:* $${data.binancecoin.usd.toLocaleString()} (${data.binancecoin.usd_24h_change >= 0 ? '+' : ''}${data.binancecoin.usd_24h_change.toFixed(2)}%)`;
        ctx.replyWithMarkdown(msg);
    } catch (e) {
        ctx.reply("❌ Market data temporarily unavailable. Try again shortly.");
    }
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

// Admin handles custom news with image or URL
bot.command('postnews', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return ctx.reply("🚫 Admin access required.");
    
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) return ctx.reply("Usage:\n1) /postnews <Your news message>\n2) /postnews <IMAGE_URL> | <Your news message>");

    let photoUrl = null;
    let newsText = text;

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

// Admin uploads image with caption /postnews ...
bot.on('photo', async (ctx, next) => {
    const caption = ctx.message.caption || '';
    if (ctx.from.id === ADMIN_ID && caption.startsWith('/postnews')) {
        const newsText = caption.replace('/postnews', '').trim();
        const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const newsMsg = `🔔 *QUANTYREX MARKET NEWS* 🔔\n\n${newsText || 'Major update from QuantyRex Markets.'}`;
        
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

console.log('Bot initialized...');
bot.launch().then(() => {
    console.log('✅ QuantyRex Assistant Bot is running with Picture News!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
