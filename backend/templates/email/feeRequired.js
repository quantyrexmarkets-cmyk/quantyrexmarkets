const baseTemplate = require('./base-enhanced');

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => baseTemplate(`

  <p style="color:#f59e0b;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">OUTSTANDING FEE</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Action Required</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">A fee must be settled before withdrawal</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, an outstanding fee has been applied to your account that must be settled before you can process a withdrawal.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">FEE TYPE</td>
          <td align="right" style="color:#f59e0b;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${feeLabel}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT DUE</td>
          <td align="right" style="color:#ef4444;font-size:18px;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(feeAmount || 0).toFixed(2)}</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <p style="color:#a1a1aa;font-size:12px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Please settle this fee at your earliest convenience. Contact support to complete this payment. Failure to do so may result in restrictions.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#f59e0b;color:#000000;font-size:11px;font-weight:600;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">CONTACT SUPPORT</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = feeRequiredEmail;
