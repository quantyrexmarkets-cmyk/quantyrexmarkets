const baseTemplate = require('./base');

const kycRejectedEmail = (name, reason) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
    Your identity verification could not be completed. Please resubmit your documents.
  </p>
  
  <table width="100%" style="margin:0 0 30px;">
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Reason</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#ef4444;font-size:11px;">${reason || 'Documents unclear'}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;">
        <span style="color:#666666;font-size:11px;">Status</span>
      </td>
      <td align="right" style="padding:12px 0;">
        <span style="color:#ef4444;font-size:11px;font-weight:500;">REJECTED</span>
      </td>
    </tr>
  </table>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    RESUBMIT
  </a>
`);

module.exports = kycRejectedEmail;
