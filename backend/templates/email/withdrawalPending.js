const baseTemplate = require('./base');

const withdrawalPendingEmail = (name, amount, currency, method) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
    Your withdrawal request has been submitted and is under review.
  </p>
  
  <table width="100%" style="margin:0 0 30px;">
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Amount</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#666666;font-size:11px;">Method</span>
      </td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <span style="color:#888888;font-size:12px;">${method || 'Crypto'}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;">
        <span style="color:#666666;font-size:11px;">Status</span>
      </td>
      <td align="right" style="padding:12px 0;">
        <span style="color:#f59e0b;font-size:11px;font-weight:500;">PENDING</span>
      </td>
    </tr>
  </table>
  
  <p style="color:#666666;font-size:11px;margin:0;line-height:1.7;">
    Processing time: 1-24 hours.
  </p>
`);

module.exports = withdrawalPendingEmail;
