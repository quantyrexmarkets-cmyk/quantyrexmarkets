const baseTemplate = require('./base-enhanced');

const kycApprovedEmail = (name) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#14532d,#22c55e);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/checkmark.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#22c55e;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">KYC APPROVED</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Identity Verified</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Your account now has full access</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your KYC verification has been successfully approved. Your account is now fully verified with complete access to all platform features.
  </p>

  <!-- STATUS TABLE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">KYC STATUS</td>
            <td align="right" style="color:#22c55e;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">&#9679; VERIFIED</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT LEVEL</td>
            <td align="right" style="color:#6366f1;font-size:12px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">FULL ACCESS</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- BENEFITS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:20px;">
        <p style="color:#22c55e;font-size:9px;letter-spacing:2px;margin:0 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;">WHAT THIS MEANS FOR YOU</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Deposit and withdraw without restrictions</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Access all premium investment plans</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Enhanced account security</td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#22c55e;">&#10003;</span>&nbsp; Participate in referral programs</td></tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#14532d,#22c55e);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">START INVESTING &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = kycApprovedEmail;
