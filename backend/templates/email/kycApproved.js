const baseTemplate = require('./base');

const kycApprovedEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
    Your identity verification has been approved. You now have full access to all platform features.
  </p>
  
  <table width="100%" style="margin:0 0 30px;">
    <tr>
      <td style="padding:12px 0;">
        <span style="color:#666666;font-size:11px;">KYC Status</span>
      </td>
      <td align="right" style="padding:12px 0;">
        <span style="color:#22c55e;font-size:11px;font-weight:500;">VERIFIED</span>
      </td>
    </tr>
  </table>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    START TRADING
  </a>
`);

module.exports = kycApprovedEmail;
