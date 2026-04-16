const baseTemplate = require('./base');
const kycApprovedEmail = (name) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#22c55e15;border:2px solid #22c55e;"><img src="https://img.icons8.com/sf-regular/48/22c55e/checkmark.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Identity Verified</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">KYC APPROVED</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);margin:0 0 28px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-weight:300;">Dear <span style="color:#22c55e;">${name||'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Great news! Your KYC (Know Your Customer) verification has been successfully approved. Your account is now fully verified, giving you complete access to all platform features including deposits, withdrawals, and premium investment plans.</p>
  <table width="100%" style="margin:0 0 20px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:10px 16px;color:#505050;font-size:10px;letter-spacing:1px;">KYC STATUS</td><td align="right" style="padding:10px 16px;color:#22c55e;font-size:11px;font-weight:600;">● VERIFIED</td></tr>
    <tr><td style="padding:10px 16px;color:#505050;font-size:10px;letter-spacing:1px;">ACCOUNT LEVEL</td><td align="right" style="padding:10px 16px;color:#6366f1;font-size:11px;font-weight:500;">FULL ACCESS</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:11px;margin:0 0 6px;font-weight:300;">What this means for you:</p>
  <table width="100%" style="margin:0 0 20px;">
    <tr><td style="padding:5px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-weight:300;"><span style="color:#22c55e;">•</span> &nbsp;Deposit and withdraw funds without restrictions</td></tr>
    <tr><td style="padding:5px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-weight:300;"><span style="color:#22c55e;">•</span> &nbsp;Access all premium investment plans</td></tr>
    <tr><td style="padding:5px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-weight:300;"><span style="color:#22c55e;">•</span> &nbsp;Enhanced account security</td></tr>
    <tr><td style="padding:5px 0;color:#9ca3af;font-size:11px;font-weight:300;"><span style="color:#22c55e;">•</span> &nbsp;Participate in referral programs</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Thank you for completing the verification process. We appreciate your commitment to maintaining a secure account.</p>
  <div style="text-align:center;margin:24px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#22c55e;color:#22c55e;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">START INVESTING →</a>
  </div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;">The Quantyrex Markets Team</p>
`);
module.exports = kycApprovedEmail;
