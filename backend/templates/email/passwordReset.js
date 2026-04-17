const baseTemplate = require('./base-enhanced');

const passwordResetEmail = (name, link) => baseTemplate(`

  <p style="color:#f59e0b;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">SECURITY REQUEST</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Password Reset</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">A reset was requested for your account</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, we received a request to reset your password. Click the button below to create a new password. This link is valid for <span style="color:#f59e0b;">1 hour</span>.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="${link}" style="display:inline-block;background-color:#f59e0b;color:#000000;font-size:11px;font-weight:600;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">RESET PASSWORD</a>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;">
        <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.6;font-family:'Helvetica Neue',Arial,sans-serif;">
          If you did not request this, <span style="color:#a1a1aa;">ignore this email</span> and your password will remain unchanged. Never share this link.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = passwordResetEmail;
