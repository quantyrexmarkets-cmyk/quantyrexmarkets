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
    if (userId === ADMIN_ID) return next();
    try {
        const chatMember = await ctx.getChatMember(userId);
        if (chatMember.status === 'administrator' || chatMember.status === 'creator') return next();
    } catch (e) {}
    const text = ctx.message.text || ctx.message.caption || '';
    if (/(https?:\/\/[^\s]+)|(t\.me\/[^\s]+)|(www\.[^\s]+)/gi.test(text)) {
        try {
            await ctx.deleteMessage();
            const warning = await ctx.reply(`⚠️ @${ctx.from.username || ctx.from.first_name}, external links are not allowed!`);
            setTimeout(() => ctx.telegram.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {}), 5000);
        } catch (err) {}
        return;
    }
    return next();
});

// --- COMMANDS ---

bot.command('start', (ctx) => ctx.reply("Welcome to QuantyRex Markets Assistant! Use /help for commands."));

bot.command('news', async (ctx) => {
    try {
        // We add headers to look like a browser request
        const res = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
            timeout: 10000
        });

        const articles = res.data?.Data;
        if (!articles || articles.length === 0) return ctx.reply("❌ No news found.");

        const topArticles = articles.slice(0, 3);
        for (const item of topArticles) {
            const headline = `📰 *${item.title.trim()}*`;
            const summary = `${item.body.substring(0, 150)}...`;
            const caption = `${headline}\n\n${summary}\n\n📡 Source: *${item.source_info?.name || item.source}*`;

            try {
                await ctx.replyWithPhoto(item.imageurl, {
                    caption: caption,
                    parse_mode: 'Markdown',
                    ...Markup.inlineKeyboard([[Markup.button.url('📖 Read Full Article', item.url)]])
                });
            } catch (err) {
                await ctx.replyWithMarkdown(`${caption}\n\n🔗 [Read More](${item.url})`);
            }
        }
    } catch (e) {
        console.error('News API Error:', e.message);
        ctx.reply("❌ API limit reached or news server is down. Please try again in a few minutes.");
    }
});

bot.command('market', async (ctx) => {
    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
        const data = res.data;
        const msg = `💹 *Market Update*\n\n` +
            `• BTC: $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change.toFixed(2)}%)\n` +
            `• ETH: $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change.toFixed(2)}%)\n` +
            `• SOL: $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change.toFixed(2)}%)`;
        ctx.replyWithMarkdown(msg);
    } catch (e) {
        ctx.reply("❌ Market service busy.");
    }
});

bot.command('plans', (ctx) => {
    ctx.replyWithMarkdown(`📊 *QuantyRex Investment Tiers* 📊\n\n🤖 *AI Bot:* 10% - 70% Profit\n👥 *Copy Trading:* Mirror verified experts.\n\nReady to trade?`, Markup.inlineKeyboard([[Markup.button.url('🚀 Launch Dashboard', WEBSITE_URL)]]));
});

bot.command('support', (ctx) => ctx.reply("🆘 Contact official support: @QUANTYREX_SUPPORT_OFFICAL"));

// --- ADMIN COMMANDS ---
bot.command('postnews', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) return ctx.reply("Usage: /postnews <text> OR /postnews <url> | <text>");
    let photoUrl = null, newsText = text;
    if (text.includes('|')) {
        const parts = text.split('|');
        photoUrl = parts[0].trim();
        newsText = parts.slice(1).join('|').trim();
    }
    const msg = `🔔 *QUANTYREX NEWS* 🔔\n\n${newsText}`;
    try {
        if (photoUrl) await bot.telegram.sendPhoto(ctx.chat.id, photoUrl, { caption: msg, parse_mode: 'Markdown' });
        else await bot.telegram.sendMessage(ctx.chat.id, msg, { parse_mode: 'Markdown' });
    } catch (err) { ctx.reply("Error posting: " + err.message); }
});

bot.command('signal', (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    const args = ctx.message.text.split(' ');
    if (args.length < 4) return ctx.reply("Usage: /signal BTC/USD BUY 65000");
    const msg = `🚀 *TRADE SIGNAL*\n\nPair: *${args[1]}*\nAction: *${args[2].toUpperCase()}*\nEntry: *${args[3]}*`;
    bot.telegram.sendMessage(ctx.chat.id, msg, { parse_mode: 'Markdown' });
});

bot.launch().then(() => console.log('✅ Bot Updated Successfully!'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
