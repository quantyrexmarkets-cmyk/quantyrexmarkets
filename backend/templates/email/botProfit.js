const baseTemplate = require('./base');
const botProfitEmail = (name, botName, profit, currency) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#6366f115;border:2px solid #6366f1;"><img src="https://img.icons8.com/sf-regular/48/6366f1/bot.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <p style="color:#505050;font-size:10px;margin:0 0 8px;letter-spacing:3px;">BOT EARNINGS</p>
    <h1 style="color:#22c55e;font-size:28px;font-weight:300;margin:0;">+ ${currency} ${parseFloat(profit||0).toFixed(2)}</h1>
    <p style="color:#505050;font-size:11px;margin:4px 0 0;">${botName||'Trading Bot'}</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);margin:0 0 24px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 16px;line-height:1.9;font-weight:300;">Excellent news! Your trading bot has successfully generated profits and the earnings have been automatically credited to your account balance. Your investment is working hard for you.</p>
  <table width="100%" style="margin:0 0 20px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:10px 16px;color:#505050;font-size:10px;letter-spacing:1px;">BOT</td><td align="right" style="padding:10px 16px;color:#ffffff;font-size:11px;">${botName||'Trading Bot'}</td></tr>
    <tr><td style="padding:10px 16px;color:#505050;font-size:10px;letter-spacing:1px;">PROFIT EARNED</td><td align="right" style="padding:10px 16px;color:#22c55e;font-size:13px;font-weight:600;">+ ${currency} ${parseFloat(profit||0).toFixed(2)}</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 16px;line-height:1.9;font-weight:300;">Keep your bot active to continue earning daily returns. Log in to your dashboard to view your complete earnings history and manage your bot subscriptions.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;color:#22c55e;font-size:10px;padding:12px 32px;text-decoration:none;letter-spacing:2px;border:1px solid #22c55e;">VIEW EARNINGS →</a></div>
`);
module.exports = botProfitEmail;
