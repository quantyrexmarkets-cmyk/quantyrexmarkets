const baseTemplate = require('./base');

const stakeProfitEmail = (name, stakePlan, profit, totalEarned, newBalance, currency) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#22c55e;font-size:14px;margin:0 0 20px;line-height:1.8;font-weight:500;">Great news!</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your staking position has generated rewards.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Plan</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;">${stakePlan || 'Staking Plan'}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Reward</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;font-weight:500;">+${currency} ${parseFloat(profit || 0).toFixed(2)}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Total Earned</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;">+${currency} ${parseFloat(totalEarned || 0).toFixed(2)}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Balance</span></td><td align="right" style="padding:8px 0;"><span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(newBalance || 0).toFixed(2)}</span></td></tr>
  </table></td></tr></table>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/stake" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">VIEW STAKING</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Thank you for trusting Quantyrex Markets.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = stakeProfitEmail;
