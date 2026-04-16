const baseTemplate = require('./base');
const kycApprovedEmail = (name) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #22c55e;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h1 style="color:#22c55e;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Identity Verified</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">KYC APPROVED</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#22c55e;font-weight:500;">${name || 'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your identity verification has been successfully completed. Your account now has full access to all platform features including deposits, withdrawals, and premium investment plans.</p>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;">
    <tr><td style="padding:16px;">
      <table width="100%">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="color:#9ca3af;font-size:10px;font-family:'Montserrat',Arial,sans-serif;">KYC Status</span>
          </td>
          <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
            <span style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">● VERIFIED</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;">
            <span style="color:#9ca3af;font-size:10px;font-family:'Montserrat',Arial,sans-serif;">Account Level</span>
          </td>
          <td align="right" style="padding:10px 0;">
            <span style="color:#6366f1;font-size:11px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">FULL ACCESS</span>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>

  <p style="color:#9ca3af;font-size:11px;margin:0 0 8px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">You can now:</p>
  <table width="100%" style="margin:0 0 24px;">
    <tr><td style="padding:6px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">✓ &nbsp;Withdraw funds without restrictions</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">✓ &nbsp;Access all investment plans</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">✓ &nbsp;Participate in referral programs</td></tr>
  </table>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#22c55e;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">START INVESTING →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Compliance Team</p>
`);
module.exports = kycApprovedEmail;
