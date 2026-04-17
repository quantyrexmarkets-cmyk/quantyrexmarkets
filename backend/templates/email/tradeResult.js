const baseTemplate = require('./base-enhanced');

const tradeResultEmail = (name, symbol, type, amount, result, currency) => {
  const isProfit = parseFloat(result) >= 0;
  const color = isProfit ? '#22c55e' : '#ef4444';

  return baseTemplate(`

  <p style="color:${color};font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">TRADE CLOSED</p>
  <h1 style="color:${color};font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${isProfit ? '+' : ''}${currency || '$'}${parseFloat(result || 0).toFixed(2)}</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${symbol} &middot; ${(type || '').toUpperCase()}</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your trade has been closed and the result applied to your balance.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">SYMBOL</td>
          <td align="right" style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${symbol}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">DIRECTION</td>
          <td align="right" style="color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${(type || '').toUpperCase()}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT</td>
          <td align="right" style="color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toFixed(2)}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">RESULT</td>
          <td align="right" style="color:${color};font-size:16px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${isProfit ? '+' : ''}${currency || '$'}${parseFloat(result || 0).toFixed(2)}</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" style="display:inline-block;background-color:#121212;color:#818cf8;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW TRADES</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Trading Team</p>

`);
};

module.exports = tradeResultEmail;
