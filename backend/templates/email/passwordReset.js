const baseTemplate = require('./base-enhanced');

const passwordResetEmail = (name, link) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#92400e,#f59e0b);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/lock.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#f59e0b;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">SECURITY REQUEST</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Password Reset</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">A reset was requested for your account</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 28px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, we received a request to reset your password. Click the button below to create a new password. This link is valid for <span style="color:#f59e0b;">1 hour</span>.
  </p>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#92400e,#f59e0b);color:#000000;font-size:12px;font-weight:600;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">RESET PASSWORD &rarr;</a>
      </td>
    </tr>
  </table>

  <!-- SECURITY NOTE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="color:#475569;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
          <span style="color:#ef4444;">&#9888;</span>&nbsp; If you did not request a password reset, please <span style="color:#ffffff;">ignore this email</span> and your password will remain unchanged. Never share this link with anyone.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = passwordResetEmail;
