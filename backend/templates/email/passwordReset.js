const baseTemplate = require('./base');

const passwordResetEmail = (name, resetUrl) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.7;">
    A password reset was requested for your account. Click below to set a new password.
  </p>
  
  <a href="${resetUrl}" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    RESET PASSWORD
  </a>
  
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">
    Link expires in 24 hours. If you didn't request this, ignore this email.
  </p>
`);

module.exports = passwordResetEmail;
