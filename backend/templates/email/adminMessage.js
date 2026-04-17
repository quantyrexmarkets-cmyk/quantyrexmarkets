const baseTemplate = require('./base-enhanced');

const adminMessageEmail = (name, subject, message) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#3730a3,#6366f1);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/bell.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT NOTIFICATION</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:22px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">${subject || 'Message from Quantyrex'}</h1>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 20px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>,
  </p>

  <!-- MESSAGE BOX -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border-left:3px solid #6366f1;">
    <tr>
      <td style="padding:20px 24px;">
        <p style="color:#94a3b8;font-size:13px;margin:0;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">${message || ''}</p>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW DASHBOARD &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = adminMessageEmail;
