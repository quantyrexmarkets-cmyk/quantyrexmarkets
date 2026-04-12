const baseTemplate = require('./base');

const passwordResetEmail = (name, resetUrl) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We received a request to reset the password for your account.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 24px;line-height:1.8;">To proceed, please click the link below to create a new password:</p>
  <a href="${resetUrl}" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">RESET MY PASSWORD</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">For your security, this link will expire shortly. If you did not request a password reset, please ignore this email—your account will remain secure.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">Security tips:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Do not share your password with anyone</li>
    <li>Choose a strong, unique password</li>
    <li>Contact support immediately if you notice any suspicious activity</li>
  </ul>
  <p style="color:#666666;font-size:11px;margin:0 0 20px;line-height:1.8;">If the button above does not work, copy and paste the link below into your browser:<br/><a href="${resetUrl}" style="color:#6366f1;word-break:break-all;">${resetUrl}</a></p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">If you need assistance, our support team is always here to help.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = passwordResetEmail;
