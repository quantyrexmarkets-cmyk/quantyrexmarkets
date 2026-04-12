const baseTemplate = require('./base');

const depositPendingEmail = (name, amount, currency, method) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We would like to inform you that your recent deposit request is currently pending.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Our team is reviewing the transaction to ensure accuracy and security. This process is usually completed within a short time.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Method</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#888888;font-size:12px;">${method || 'Crypto'}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#f59e0b;font-size:11px;font-weight:500;">PENDING REVIEW</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">What this means for you:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Your deposit has been received and is under processing</li>
    <li>Funds will reflect in your account once verification is complete</li>
    <li>No further action may be required at this time</li>
  </ul>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">If you have already completed the required steps, kindly allow some time for processing.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Thank you for your patience and for choosing Quantyrex Markets.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = depositPendingEmail;
