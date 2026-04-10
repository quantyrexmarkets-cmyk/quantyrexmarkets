const baseTemplate = require('./base');

const verifyEmailTemplate = (name, verifyUrl) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Verify Your Email Address</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Welcome to Quantyrex Markets! Please verify your email address to activate your account and start trading.
  </p>
  
  <div style="text-align:center;margin:35px 0;">
    <a href="${verifyUrl}" 
       style="background:#22c55e;color:white;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 12px rgba(34,197,94,0.3);">
      ✓ Verify My Email
    </a>
  </div>
  
  <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#92400e;margin:0;font-size:13px;">
      ⏰ <strong>This link expires in 24 hours</strong>
    </p>
  </div>
  
  <p style="color:#64748b;font-size:13px;line-height:1.6;margin:20px 0 0;">
    If the button doesn't work, copy and paste this link into your browser:<br/>
    <a href="${verifyUrl}" style="color:#6366f1;word-break:break-all;">${verifyUrl}</a>
  </p>
  
  <p style="color:#94a3b8;font-size:12px;margin:25px 0 0;border-top:1px solid #e2e8f0;padding-top:15px;">
    If you didn't create an account, please ignore this email.
  </p>
`);

module.exports = verifyEmailTemplate;
