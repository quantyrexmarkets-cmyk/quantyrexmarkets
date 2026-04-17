const baseTemplate = require('./base-enhanced');

const kycRejectedEmail = (name, reason) => baseTemplate(`

  <p style="color:#ef4444;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">KYC REJECTED</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Verification Unsuccessful</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Please review and resubmit your documents</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your KYC verification could not be approved. Please review the details below and resubmit.
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

  <p style="color:#818cf8;font-size:9px;letter-spacing:2px;margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;">TIPS FOR RESUBMISSION</p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#f59e0b;">&#8250;</span>&nbsp; Ensure documents are clear and not blurry</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#f59e0b;">&#8250;</span>&nbsp; All four corners must be visible</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #121212;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#f59e0b;">&#8250;</span>&nbsp; Document must not be expired</td></tr>
    <tr><td style="padding:6px 0;color:#a1a1aa;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#f59e0b;">&#8250;</span>&nbsp; Name must match your account details</td></tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" style="display:inline-block;background-color:#ef4444;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">RESUBMIT KYC</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Compliance Team</p>

`);

module.exports = kycRejectedEmail;
