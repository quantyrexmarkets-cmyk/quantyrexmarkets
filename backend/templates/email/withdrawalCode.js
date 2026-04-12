const baseTemplate = require('./base');

const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">A withdrawal verification code has been set on your account for enhanced security. You will need this code to process any withdrawal requests.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your withdrawal verification code is:</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;border-radius:12px;"><tr><td style="padding:30px;text-align:center;">
    <span style="color:#6366f1;font-size:32px;font-weight:600;letter-spacing:8px;font-family:monospace;">${code || 'NOT SET'}</span>
  </td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Important:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Keep this code secure and do not share it with anyone</span></li>
    <li><span style="color:#6366f1;">You will be required to enter this code when processing withdrawals</span></li>
    <li><span style="color:#6366f1;">Contact support if you lose or forget your code</span></li>
  </ul>

  <!-- Security Warning Box -->
  <table width="100%" style="margin:20px 0;background:#1a0a0a;border:1px solid #ef4444;border-left:4px solid #ef4444;border-radius:12px;"><tr><td style="padding:16px;">
    <p style="color:#ef4444;font-size:12px;margin:0 0 6px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">⚠️ SECURITY NOTICE</p>
    <p style="color:#ffffff;font-size:11px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Never share your withdrawal code with anyone. Quantyrex Markets staff will never ask for your withdrawal code. If someone requests it, please report immediately.</p>
  </td></tr></table>

  <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">MAKE WITHDRAWAL</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you have any questions, please contact our support team.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = withdrawalCodeEmail;
