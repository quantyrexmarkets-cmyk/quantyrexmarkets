const baseTemplate = require('./base');

const passwordResetEmail = (name, resetUrl) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Reset Your Password 🔐</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    We received a request to reset your password. Click the button below to create a new password.
  </p>
  
  <div style="text-align:center;margin:35px 0;">
    <a href="${resetUrl}" 
       style="background:#6366f1;color:white;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 12px rgba(99,102,241,0.3);">
      🔑 Reset Password
    </a>
  </div>
  
  <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#92400e;margin:0;font-size:13px;">
      ⏰ <strong>This link expires in 24 hours</strong>
    </p>
  </div>
  
  <p style="color:#64748b;font-size:13px;line-height:1.6;margin:20px 0 0;">
    If the button doesn't work, copy and paste this link:<br/>
    <a href="${resetUrl}" style="color:#6366f1;word-break:break-all;">${resetUrl}</a>
  </p>
  
  <div style="background:#f8fafc;border-left:4px solid #94a3b8;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <p style="color:#64748b;margin:0;font-size:13px;">
      🛡️ <strong>Security tip:</strong> If you didn't request this password reset, please ignore this email or contact support immediately.
    </p>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = passwordResetEmail;
