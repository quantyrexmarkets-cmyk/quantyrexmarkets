const baseTemplate = require('./base');
const tradeResultEmail = (name, symbol, type, amount, result, currency) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">TRADE CLOSED</p>
    <h1 style="color:${parseFloat(result)>=0?'#22c55e':'#ef4444'};font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">${parseFloat(result)>=0?'+':''}${currency} ${parseFloat(result || 0).toFixed(2)}</h1>
    <p style="color:#505050;font-size:11px;margin:0;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">${symbol} · ${type?.toUpperCase()}</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,${parseFloat(result)>=0?'#22c55e':'#ef4444'},transparent);margin:0 0 24px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, your trade has been closed and the result has been applied to your account.</p>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">SYMBOL</td>
      <td align="right" style="padding:12px 16px;color:#6366f1;font-size:11px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${symbol}</td>
    </tr>
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">DIRECTION</td>
      <td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">${type?.toUpperCase()}</td>
    </tr>
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">AMOUNT</td>
      <td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount || 0).toFixed(2)}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">RESULT</td>
      <td align="right" style="padding:12px 16px;color:${parseFloat(result)>=0?'#22c55e':'#ef4444'};font-size:14px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${parseFloat(result)>=0?'+':''}${currency} ${parseFloat(result || 0).toFixed(2)}</td>
    </tr>
  </table>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" style="display:inline-block;background:transparent;color:#6366f1;font-size:10px;font-weight:500;padding:12px 32px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;border:1px solid #6366f1;">VIEW TRADES →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Trading Team</p>
`);
module.exports = tradeResultEmail;
