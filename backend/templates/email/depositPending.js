const baseTemplate = require('./base');

const depositPendingEmail = (name, amount, currency, method) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Deposit Received ⏳</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    We've received your deposit request and it's currently being processed. You'll receive a confirmation email once it's approved.
  </p>
  
  <div style="background:linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.9);margin:0 0 8px;font-size:14px;">Deposit Amount</p>
    <h1 style="color:white;margin:0;font-size:36px;font-weight:700;">
      ${currency} ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h1>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Payment Method</span>
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
        <span style="background:#fef3c7;color:#92400e;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">Pending</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Processing Time</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#1e293b;font-size:15px;">10-30 minutes</strong>
      </td>
    </tr>
  </table>
  
  <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#0369a1;margin:0;font-size:13px;">
      💡 <strong>Tip:</strong> Deposits are usually confirmed within 30 minutes. Large deposits may take up to 24 hours for security verification.
    </p>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = depositPendingEmail;
