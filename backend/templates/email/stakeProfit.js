const baseTemplate = require('./base');

const stakeProfitEmail = (name, stakePlan, profit, totalEarned, newBalance, currency) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#22c55e;font-size:13px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">Great news!</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your staking position has successfully generated rewards from the latest session.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Staking Summary:</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Stake Plan</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${stakePlan || 'Staking Plan'}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Reward Earned</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">+${currency} ${parseFloat(profit || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Total Earned</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">+${currency} ${parseFloat(totalEarned || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Account Balance</span></td><td align="right" style="padding:8px 0;"><span style="color:#ffffff;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${currency} ${parseFloat(newBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">The reward has been credited to your account balance and is now available.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Our system continues to monitor and optimize your staking performance.</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/stake" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">VIEW STAKING</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you need assistance, our support team is always available to help.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Thank you for trusting Quantyrex Markets.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = stakeProfitEmail;
