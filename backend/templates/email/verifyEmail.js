const baseTemplate = require('./base-enhanced');

const verifyEmailTemplate = (name, link) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#3730a3,#6366f1);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/email.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">ONE LAST STEP</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Verify Your Email</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Confirm your address to activate your account</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 28px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, please click the button below to verify your email address and activate your Quantyrex Markets account.
  </p>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VERIFY EMAIL &rarr;</a>
      </td>
    </tr>
  </table>

  <!-- SECURITY NOTE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="color:#475569;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
          <span style="color:#f59e0b;">&#9888;</span>&nbsp; This link expires in <span style="color:#ffffff;">24 hours</span>. If you did not create an account, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = verifyEmailTemplate;
