const baseTemplate = require('./base');

const withdrawalApprovedEmail = (name, amount, currency, method, newBalance) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We are pleased to inform you that your withdrawal request has been successfully approved.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your funds are now being transferred and should reflect in your selected payment method shortly.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;font-weight:500;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Method</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#888888;font-size:12px;">${method || 'Crypto'}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Remaining Balance</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;">${currency} ${parseFloat(newBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#22c55e;font-size:11px;font-weight:500;">APPROVED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">What happens next:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>The transaction has been processed on our end</li>
    <li>Funds will arrive based on your payment provider's processing time</li>
    <li>You may receive a confirmation from your payment provider</li>
  </ul>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Thank you for trusting Quantyrex Markets with your investments.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = withdrawalApprovedEmail;
