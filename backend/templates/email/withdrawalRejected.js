const baseTemplate = require('./base');

const withdrawalRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We regret to inform you that your recent withdrawal request was not successful.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Reason</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ef4444;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${reason || 'Verification required'}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#ef4444;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">DECLINED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">This may be due to one or more of the following reasons:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Incomplete account verification (KYC)</span></li>
    <li><span style="color:#6366f1;">Incorrect withdrawal details</span></li>
    <li><span style="color:#6366f1;">Account restrictions or pending requirements</span></li>
  </ul>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">What you can do next:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Review and update your withdrawal information</span></li>
    <li><span style="color:#6366f1;">Complete any pending verification steps</span></li>
    <li><span style="color:#6366f1;">Contact your account manager or support team for assistance</span></li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">TRY AGAIN</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you believe this was an error, please reach out to our support team for further clarification.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We are here to assist you every step of the way.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = withdrawalRejectedEmail;
