const baseTemplate = require('./base-enhanced');

const kycApprovedEmail = (name) => baseTemplate(`

  <p style="color:#22c55e;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">KYC APPROVED</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Identity Verified</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Your account now has full access</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your KYC verification has been approved. You now have full access to all platform features.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">KYC STATUS</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">VERIFIED</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT LEVEL</td>
          <td align="right" style="color:#818cf8;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">FULL ACCESS</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <p style="color:#818cf8;font-size:9px;letter-spacing:2px;margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;">WHAT YOU CAN DO NOW</p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Deposit and withdraw without restrictions</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Access all premium investment plans</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Enhanced account security</td></tr>
    <tr><td style="padding:6px 0;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Participate in referral programs</td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#22c55e;color:#000000;font-size:11px;font-weight:600;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">START INVESTING</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = kycApprovedEmail;
