const baseTemplate = require('./base-enhanced');

const registrationFeeEmail = (name, amount, currency) => baseTemplate(`

  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT ACTIVATION</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Registration Fee Required</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">One-time payment to activate your account</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a one-time registration fee is required to fully activate your account and unlock all features.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:28px 20px;text-align:center;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:3px;margin:0 0 10px;font-family:'Helvetica Neue',Arial,sans-serif;">REGISTRATION FEE</p>
        <p style="color:#818cf8;font-size:36px;font-weight:200;margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p style="color:#71717a;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">One-time payment</p>
      </td>
    </tr>
  </table>

  <p style="color:#818cf8;font-size:9px;letter-spacing:2px;margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;">WHAT YOU GET</p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#818cf8;">&#10003;</span>&nbsp; Full account activation</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#818cf8;">&#10003;</span>&nbsp; Access to all investment plans</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#818cf8;">&#10003;</span>&nbsp; Deposit and withdrawal privileges</td></tr>
    <tr><td style="padding:6px 0;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#818cf8;">&#10003;</span>&nbsp; 24/7 priority support</td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">ACTIVATE ACCOUNT</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = registrationFeeEmail;
