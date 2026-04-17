const baseTemplate = require('./base-enhanced');

const botProfitEmail = (name, botName, profit, currency) => baseTemplate(`

  <p style="color:#22c55e;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">BOT EARNINGS</p>
  <h1 style="color:#22c55e;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">+ ${currency || '$'}${parseFloat(profit || 0).toFixed(2)}</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${botName || 'Trading Bot'}</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your trading bot has generated profits that have been credited to your account.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">BOT</td>
          <td align="right" style="color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${botName || 'Trading Bot'}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">PROFIT</td>
          <td align="right" style="color:#22c55e;font-size:16px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">+ ${currency || '$'}${parseFloat(profit || 0).toFixed(2)}</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <p style="color:#a1a1aa;font-size:12px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Keep your bot active to continue earning daily returns.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#121212;color:#22c55e;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW EARNINGS</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = botProfitEmail;
