const baseTemplate = require('./base-enhanced');

const withdrawalCodeEmail = (name, code) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#4c1d95,#a78bfa);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/key.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#a78bfa;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">SECURITY CODE</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Withdrawal Code</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Required to process your withdrawal</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#a78bfa,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your withdrawal security code has been generated. Enter this code when prompted during the withdrawal process.
  </p>

  <!-- CODE BOX -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:36px 20px;text-align:center;">
        <p style="color:#475569;font-size:9px;letter-spacing:3px;margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;">YOUR WITHDRAWAL CODE</p>
        <p style="color:#a78bfa;font-size:42px;font-weight:200;margin:0;letter-spacing:10px;font-family:'Helvetica Neue',Arial,sans-serif;">${code || '------'}</p>
      </td>
    </tr>
  </table>

  <!-- SECURITY WARNING -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="color:#475569;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
          <span style="color:#ef4444;">&#9888;</span>&nbsp; <span style="color:#ffffff;">Never share this code</span> with anyone including Quantyrex Markets staff. This code is strictly for your personal use.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = withdrawalCodeEmail;
