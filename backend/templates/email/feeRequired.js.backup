const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => baseTemplate(`
  <p style="color:#f59e0b;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">OUTSTANDING FEE</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;">Action Required</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;">A fee must be settled before withdrawal</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, an outstanding fee has been applied to your account that must be settled before you can process a withdrawal.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">FEE TYPE</td><td align="right" style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#f59e0b;font-size:12px;font-weight:600;">${feeLabel || feeType || 'processing'}</td></tr>
    <tr><td style="padding:12px 16px;color:#a0a0a0;">AMOUNT DUE</td><td align="right" style="padding:12px 16px;color:#ef4444;font-size:18px;font-weight:700;">${formatUSD(feeAmount)}</td></tr>
  </table>
  <p style="color:#a1a1aa;font-size:12px;line-height:1.8;">Please settle this fee at your earliest convenience. Contact support to complete this payment.</p>
  <p style="color:#71717a;font-size:10px;text-align:center;">The Quantyrex Markets Finance Team</p>
`);
module.exports = feeRequiredEmail;
