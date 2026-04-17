const baseTemplate = require('./base-enhanced');

const depositRejectedEmail = (name, amount, currency, reason) => baseTemplate(`

  <p style="color:#ef4444;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">DEPOSIT UPDATE</p>
  <h1 style="color:#ffffff;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
  <p style="color:#ef4444;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">NOT APPROVED</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your deposit could not be processed at this time.
  </p>

  ${reason ? `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:14px 16px;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:1px;margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;">REASON</p>
        <p style="color:#a1a1aa;font-size:12px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">${reason}</p>
      </td>
    </tr>
  </table>
  ` : ''}

  <p style="color:#a1a1aa;font-size:12px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Please contact our support team if you need assistance or wish to resubmit.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">CONTACT SUPPORT</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = depositRejectedEmail;
