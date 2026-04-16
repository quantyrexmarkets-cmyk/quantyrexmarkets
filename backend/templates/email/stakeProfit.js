const baseTemplate = require('./base');
const stakeProfitEmail = (name, plan, profit, currency) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">STAKING REWARD</p>
    <h1 style="color:#6366f1;font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">+ ${currency} ${parseFloat(profit || 0).toFixed(2)}</h1>
    <p style="color:#505050;font-size:11px;margin:0;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">${plan || 'Staking Plan'}</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 24px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, your staking plan has generated returns and they have been credited to your account balance.</p>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">PLAN</td>
      <td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">${plan || 'Staking Plan'}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">PROFIT CREDITED</td>
      <td align="right" style="padding:12px 16px;color:#6366f1;font-size:14px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">+ ${currency} ${parseFloat(profit || 0).toFixed(2)}</td>
    </tr>
  </table>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">VIEW ACCOUNT →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Team</p>
`);
module.exports = stakeProfitEmail;
