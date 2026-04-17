const baseTemplate = require('./base-enhanced');

const twoFactorOTPEmail = (name, code) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#3730a3,#6366f1);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/shield.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">TWO-FACTOR VERIFICATION</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Authentication Code</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Use this code to complete your login</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your two-factor authentication code is ready. Enter it on the login page to access your account.
  </p>

  <!-- OTP BOX -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:36px 20px;text-align:center;">
        <p style="color:#475569;font-size:9px;letter-spacing:3px;margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;">VERIFICATION CODE</p>
        <p style="color:#6366f1;font-size:42px;font-weight:200;margin:0 0 16px;letter-spacing:14px;font-family:'Helvetica Neue',Arial,sans-serif;">${code}</p>
        <p style="color:#334155;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Valid for <span style="color:#ffffff;">10 minutes</span></p>
      </td>
    </tr>
  </table>

  <!-- SECURITY NOTE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="color:#475569;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
          <span style="color:#ef4444;">&#9888;</span>&nbsp; Never share this code with anyone. Quantyrex Markets will <span style="color:#ffffff;">never</span> ask for your authentication code.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = twoFactorOTPEmail;
