const baseTemplate = require('./base');

const botProfitEmail = (name, botName, profit, totalEarned, newBalance, currency) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Bot Profit Earned 🤖💰</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Great news! Your trading bot has generated profit.
  </p>
  
  <div style="background:linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.9);margin:0 0 8px;font-size:14px;">Profit Earned</p>
    <h1 style="color:white;margin:0;font-size:36px;font-weight:700;">
      +${currency} ${parseFloat(profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h1>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Bot Name</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#1e293b;font-size:15px;">🤖 ${botName}</strong>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Total Earned</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#22c55e;font-size:15px;">+${currency} ${parseFloat(totalEarned).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">New Balance</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#1e293b;font-size:15px;">${currency} ${parseFloat(newBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
      </td>
    </tr>
  </table>
  
  <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#166534;margin:0;font-size:13px;">
      🚀 <strong>Your bot is working!</strong> Keep your bot active to continue earning passive income.
    </p>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/manage-bots" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      View Bot Performance →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = botProfitEmail;
