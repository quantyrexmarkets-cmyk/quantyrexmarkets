const baseTemplate = require('./base');

const kycRejectedEmail = (name, reason) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We regret to inform you that your recent KYC (Know Your Customer) verification was not approved.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Reason</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ef4444;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${reason || 'Documents unclear or invalid'}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#ef4444;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">REJECTED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">This may be due to one or more of the following reasons:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Submitted documents are unclear or incomplete</span></li>
    <li><span style="color:#6366f1;">Information does not match your account details</span></li>
    <li><span style="color:#6366f1;">Expired or invalid identification provided</span></li>
  </ul>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">What you can do next:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Re-submit clear and valid identification documents</span></li>
    <li><span style="color:#6366f1;">Ensure all information matches your account details</span></li>
    <li><span style="color:#6366f1;">Follow the upload guidelines provided on your dashboard</span></li>
  </ul>
  <p style="color:#ffffff;font-size:12px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Please note that completing your KYC verification is required to access full account features, including withdrawals.</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">RESUBMIT DOCUMENTS</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you need assistance, our support team is available to guide you through the process.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We appreciate your understanding and look forward to resolving this promptly.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = kycRejectedEmail;
