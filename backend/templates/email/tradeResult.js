const baseTemplate = require('./base');

const tradeResultEmail = (name, symbol, type, amount, result, profit, newBalance, currency) => {
  const isWin = result === 'win';
  const resultColor = isWin ? '#22c55e' : '#ef4444';
  const resultText = isWin ? 'PROFIT' : 'LOSS';

  return baseTemplate(`
    <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
    <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your recent trade has been completed.</p>
    <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
      <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Symbol</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;">${symbol || 'N/A'}</span></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;">${currency} ${parseFloat(amount || 0).toFixed(2)}</span></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Result</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:${resultColor};font-size:12px;font-weight:500;">${isWin ? '+' : '-'}${currency} ${parseFloat(Math.abs(profit || 0)).toFixed(2)}</span></td></tr>
      <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:${resultColor};font-size:11px;font-weight:500;">${resultText}</span></td></tr>
    </table></td></tr></table>
    <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">VIEW TRADES</a>
    <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Thank you for trading with Quantyrex Markets.</p>
    <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
  `);
};

module.exports = tradeResultEmail;
