const baseTemplate = require('./base-enhanced');

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#78350f,#f59e0b);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/error.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#f59e0b;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">OUTSTANDING FEE</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Action Required</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">A fee must be settled before withdrawal</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 20px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, an outstanding fee has been applied to your account that must be settled before you can process a withdrawal request.
  </p>

  <!-- FEE DETAILS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">FEE TYPE</td>
            <td align="right" style="color:#f59e0b;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${feeLabel}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT DUE</td>
            <td align="right" style="color:#ef4444;font-size:20px;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(feeAmount || 0).toFixed(2)}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- WARNING NOTE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border-left:3px solid #f59e0b;">
    <tr>
      <td style="padding:14px 20px;">
        <p style="color:#94a3b8;font-size:11px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
          Please settle this fee at your earliest convenience. Failure to do so may result in further restrictions on your account. Contact our support team to complete this payment.
        </p>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:linear-gradient(135deg,#78350f,#f59e0b);color:#000000;font-size:12px;font-weight:600;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">CONTACT SUPPORT &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = feeRequiredEmail;
