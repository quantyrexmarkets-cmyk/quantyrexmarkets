const baseTemplate = require('./base');
const kycRejectedEmail = (name, reason) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #ef4444;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#ef4444" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
    <h1 style="color:#ef4444;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Verification Unsuccessful</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">KYC REJECTED</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#ef4444,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Unfortunately, your KYC verification could not be approved at this time. Please review the reason below and resubmit your documents.</p>

  ${reason ? `<table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #2d1212;"><tr><td style="padding:16px;"><p style="color:#505050;font-size:10px;margin:0 0 8px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">REJECTION REASON</p><p style="color:#ef4444;font-size:12px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${reason}</p></td></tr></table>` : ''}

  <p style="color:#9ca3af;font-size:11px;margin:0 0 8px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">To resubmit, please ensure:</p>
  <table width="100%" style="margin:0 0 24px;">
    <tr><td style="padding:6px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">→ &nbsp;Documents are clear and not expired</td></tr>
    <tr><td style="padding:6px 0;border-bottom:1px solid #111;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">→ &nbsp;All corners of the document are visible</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">→ &nbsp;Selfie matches the photo ID clearly</td></tr>
  </table>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" style="display:inline-block;background:#ef4444;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">RESUBMIT KYC →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Compliance Team</p>
`);
module.exports = kycRejectedEmail;
