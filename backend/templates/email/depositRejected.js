const baseTemplate = require('./base');

const depositRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We regret to inform you that your recent deposit request was not successful.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Reason</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ef4444;font-size:11px;">${reason || 'Verification failed'}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#ef4444;font-size:11px;font-weight:500;">REJECTED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">This may have occurred due to one of the following reasons:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Incorrect payment details</li>
    <li>Transaction not completed</li>
    <li>Verification requirements not met</li>
  </ul>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">What you can do next:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Review your payment details and try again</li>
    <li>Ensure all required steps are completed</li>
    <li>Contact support if you need assistance</li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/deposit" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">TRY AGAIN</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">We're here to help you complete your transaction successfully.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = depositRejectedEmail;
