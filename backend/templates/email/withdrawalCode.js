const baseTemplate = require('./base');

const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Your Withdrawal Code 🔐</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    For enhanced security, a withdrawal verification code has been set on your account. You'll need this code to process withdrawals.
  </p>
  
  <div style="background:linear-gradient(135deg, #0F172A 0%, #1e293b 100%);padding:35px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.7);margin:0 0 15px;font-size:14px;">Your Withdrawal Code:</p>
    <div style="background:#6366f1;padding:20px 40px;border-radius:8px;display:inline-block;">
      <span style="color:white;font-size:32px;font-weight:700;letter-spacing:6px;font-family:monospace;">${code || 'NOT SET'}</span>
    </div>
  </div>
  
  <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#92400e;margin:0;font-size:13px;">
      ⚠️ <strong>Important:</strong> Keep this code secure. You'll be asked to enter it when processing withdrawals.
    </p>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Make Withdrawal →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = withdrawalCodeEmail;
