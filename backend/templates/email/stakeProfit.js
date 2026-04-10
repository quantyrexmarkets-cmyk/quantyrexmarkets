const baseTemplate = require('./base');

const stakeProfitEmail = (name, stakePlan, profit, totalEarned, newBalance, currency) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
    Your stake generated rewards.
  </p>
  
  <table width="100%" style="margin:0 0 30px;">
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Plan</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#ffffff;font-size:12px;">${stakePlan}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Reward</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#22c55e;font-size:12px;font-weight:500;">+${currency} ${parseFloat(profit || 0).toFixed(2)}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Total Earned</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#22c55e;font-size:12px;">+${currency} ${parseFloat(totalEarned || 0).toFixed(2)}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;">
        <span style="color:#666666;font-size:11px;">Balance</span>
      </td>
      <td align="right" style="padding:12px 0;">
        <span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(newBalance || 0).toFixed(2)}</span>
      </td>
    </tr>
  </table>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard/stake" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    VIEW STAKES
  </a>
`);

module.exports = stakeProfitEmail;
