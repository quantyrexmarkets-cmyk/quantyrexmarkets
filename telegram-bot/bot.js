const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const http = require('http');

// Configuration
const BOT_TOKEN = process.env.BOT_TOKEN || '8815717797:AAE9XmlaDn3uiIuUrv_3-eyv2yL_MFhlPmM';
const ADMIN_ID = parseInt(process.env.ADMIN_ID || '7759205941');
const WEBSITE_URL = 'https://quantyrexmarkets.vercel.app';
const PORT = process.env.PORT || 10000;

// --- DUMMY HTTP SERVER FOR RENDER HEALTH CHECK ---
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('QuantyRex Telegram Bot is running live!\n');
}).listen(PORT, () => {
    console.log(`✅ Health check HTTP server listening on port ${PORT}`);
});

const bot = new Telegraf(BOT_TOKEN);

// --- ANTI-SPAM MIDDLEWARE ---
// Automatically deletes links posted by normal members
bot.use(async (ctx, next) => {
    if (!ctx.chat || ctx.chat.type === 'private') return next();
    if (!ctx.message) return next();

    const userId = ctx.from?.id;
    if (!userId) return next();

    // 1. Allow the Main Admin
    if (userId === ADMIN_ID) return next();

    // 2. Allow Group Admins & Creators
    try {
        const chatMember = await ctx.getChatMember(userId);
        if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
            return next();
        }
    } catch (e) {
        // Continue check
    }

    // 3. Inspect text for URLs and Telegram links
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

// --- COMMANDS ---

bot.help((ctx) => {
    ctx.replyWithMarkdown(`*QuantyRex Assistant Bot Commands:*\n\n/start - Initialize bot\n/plans - View AI Bot & Copy Trade plans\n/market - Live Crypto Prices\n/policy - Group rules & safety\n/support - Official Support contact`);
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

bot.command('postnews', (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return ctx.reply("🚫 Admin access required.");
    const news = ctx.message.text.split(' ').slice(1).join(' ');
    if (!news) return ctx.reply("Usage: /postnews <Your news message>");
    
    bot.telegram.sendMessage(ctx.chat.id, `🔔 *QUANTYREX MARKET NEWS* 🔔\n\n${news}`, { parse_mode: 'Markdown' });
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
    console.log('✅ QuantyRex Assistant Bot is running!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
