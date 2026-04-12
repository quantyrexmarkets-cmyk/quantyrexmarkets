const baseTemplate = require('./base');

const kycApprovedEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#22c55e;font-size:14px;margin:0 0 20px;line-height:1.8;font-weight:500;">Great news!</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your KYC verification has been successfully approved. Your account is now fully verified.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">KYC Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#22c55e;font-size:11px;font-weight:500;">VERIFIED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">What this means for you:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Deposit and withdraw funds without restrictions</li>
    <li>Your account security has been enhanced</li>
    <li>Full access to all investment features</li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">START INVESTING</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Thank you for choosing Quantyrex Markets.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = kycApprovedEmail;
