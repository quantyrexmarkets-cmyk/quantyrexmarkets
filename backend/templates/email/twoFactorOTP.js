const baseTemplate = require('./base');

const twoFactorOTPEmail = (name, code) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Your Login Code 🔐</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Use the following code to complete your login:
  </p>
  
  <div style="background:linear-gradient(135deg, #0F172A 0%, #1e293b 100%);padding:35px;border-radius:12px;text-align:center;margin:30px 0;">
    <p style="color:rgba(255,255,255,0.7);margin:0 0 15px;font-size:14px;">Your verification code is:</p>
    <div style="background:#6366f1;padding:20px 40px;border-radius:8px;display:inline-block;">
      <span style="color:white;font-size:36px;font-weight:700;letter-spacing:8px;font-family:monospace;">${code}</span>
    </div>
  </div>
  
  <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#92400e;margin:0;font-size:13px;">
      ⏰ <strong>This code expires in 10 minutes</strong>
    </p>
  </div>
  
  <div style="background:#f8fafc;border-left:4px solid #94a3b8;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#64748b;margin:0;font-size:13px;">
      🛡️ <strong>Security:</strong> If you didn't try to log in, someone may be trying to access your account. Please change your password immediately.
    </p>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = twoFactorOTPEmail;
