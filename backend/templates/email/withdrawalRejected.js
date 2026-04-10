const baseTemplate = require('./base');

const withdrawalRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Withdrawal Request Declined ❌</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Unfortunately, your withdrawal request could not be processed. Your balance has been restored.
  </p>
  
  <div style="background:linear-gradient(135deg, #ef4444 0%, #f87171 100%);padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.9);margin:0 0 8px;font-size:14px;">Withdrawal Amount</p>
    <h1 style="color:white;margin:0;font-size:36px;font-weight:700;">
      ${currency} ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h1>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Status</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="background:#fee2e2;color:#dc2626;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">Declined</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Reason</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#dc2626;font-size:14px;">${reason || 'Verification required'}</strong>
      </td>
    </tr>
  </table>
  
  <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#991b1b;margin:0;font-size:13px;">
      ⚠️ <strong>Common reasons:</strong> Incomplete KYC, invalid wallet address, or security verification required.
    </p>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Try Again →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = withdrawalRejectedEmail;
