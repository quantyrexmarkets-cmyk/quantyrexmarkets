const baseTemplate = require('./base-enhanced');

const tradeResultEmail = (name, symbol, type, amount, result, currency) => {
  const isProfit = parseFloat(result) >= 0;
  const accentColor = isProfit ? '#22c55e' : '#ef4444';
  const gradientStart = isProfit ? '#14532d' : '#7f1d1d';

  return baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,${gradientStart},${accentColor});border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/combo-chart.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:${accentColor};font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">TRADE CLOSED</p>
        <h1 style="margin:0 0 6px;color:${accentColor};font-size:32px;font-weight:200;font-family:'Helvetica Neue',Arial,sans-serif;">${isProfit ? '+' : ''}${currency || '$'}${parseFloat(result || 0).toFixed(2)}</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">${symbol} &middot; ${(type || '').toUpperCase()}</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,${accentColor},transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your trade has been closed and the result has been applied to your account balance.
  </p>

  <!-- TRADE DETAILS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">SYMBOL</td>
            <td align="right" style="color:#6366f1;font-size:13px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${symbol}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">DIRECTION</td>
            <td align="right" style="color:#ffffff;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;">${(type || '').toUpperCase()}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT</td>
            <td align="right" style="color:#ffffff;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toFixed(2)}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">RESULT</td>
            <td align="right" style="color:${accentColor};font-size:18px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${isProfit ? '+' : ''}${currency || '$'}${parseFloat(result || 0).toFixed(2)}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" style="display:inline-block;border:1px solid #6366f1;color:#6366f1;font-size:12px;font-weight:500;padding:14px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW TRADES &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Trading Team</p>

`);
};

module.exports = tradeResultEmail;
