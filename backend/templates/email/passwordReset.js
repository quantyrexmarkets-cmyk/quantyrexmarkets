const baseTemplate = require('./base');

const passwordResetEmail = (name, resetUrl) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We received a request to reset the password for your account.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">To proceed, please click the link below to create a new password:</p>
  <a href="${resetUrl}" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">RESET MY PASSWORD</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">For your security, this link will expire shortly. If you did not request a password reset, please ignore this email — your account will remain secure.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Security tips:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Do not share your password with anyone</span></li>
    <li><span style="color:#6366f1;">Choose a strong, unique password</span></li>
    <li><span style="color:#6366f1;">Contact support immediately if you notice any suspicious activity</span></li>
  </ul>
  <p style="color:#ffffff;font-size:11px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If the button above does not work, copy and paste the link below into your browser:<br/><a href="${resetUrl}" style="color:#6366f1;word-break:break-all;">${resetUrl}</a></p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you need assistance, our support team is always here to help.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = passwordResetEmail;
