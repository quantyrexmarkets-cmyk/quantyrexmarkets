const baseTemplate = require('./base');

const verifyEmailTemplate = (name, verifyUrl) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Welcome to Quantyrex Markets!</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">To complete your registration and activate your account, please verify your email address by clicking the link below:</p>
  <a href="${verifyUrl}" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">VERIFY MY EMAIL</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">This step is important to ensure the security of your account and to give you full access to our investment platform.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">Why verify your email?</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Secure your account from unauthorized access</li>
    <li>Enable deposits and withdrawals</li>
    <li>Receive important account notifications and updates</li>
  </ul>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">If you did not create an account with us, please ignore this email.</p>
  <p style="color:#666666;font-size:11px;margin:0 0 20px;line-height:1.8;">If the button above does not work, you can copy and paste the following link into your browser:<br/><a href="${verifyUrl}" style="color:#6366f1;word-break:break-all;">${verifyUrl}</a></p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We're excited to have you with us and look forward to supporting your investment journey.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = verifyEmailTemplate;
