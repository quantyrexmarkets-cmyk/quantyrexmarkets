const baseTemplate = require('./base');

const withdrawalApprovedEmail = (name, amount, currency, method, newBalance) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Withdrawal Approved ✅</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Great news! Your withdrawal request has been approved and is being processed.
  </p>
  
  <div style="background:linear-gradient(135deg, #22c55e 0%, #4ade80 100%);padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.9);margin:0 0 8px;font-size:14px;">Withdrawal Amount</p>
    <h1 style="color:white;margin:0;font-size:36px;font-weight:700;">
      ${currency} ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h1>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Withdrawal Method</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#1e293b;font-size:15px;">${method || 'Crypto'}</strong>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Status</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">Approved</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Remaining Balance</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#1e293b;font-size:15px;">${currency} ${parseFloat(newBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
      </td>
    </tr>
  </table>
  
  <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#166534;margin:0;font-size:13px;">
      ✅ <strong>Processing:</strong> Funds will arrive in your wallet within 1-24 hours depending on network congestion.
    </p>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      View Dashboard →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = withdrawalApprovedEmail;
