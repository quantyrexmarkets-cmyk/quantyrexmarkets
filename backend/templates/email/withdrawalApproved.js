const baseTemplate = require('./base-enhanced');
const { formatLocalMoney } = require('./_money');

const withdrawalApprovedEmail = (name, amount, currency, method, newBalance) => baseTemplate(`
  <p style="color:#22c55e;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">TRANSACTION RECEIPT</p>
  <h1 style="color:#ffffff;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">${formatLocalMoney(amount, currency)}</h1>
  <p style="color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;">APPROVED</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your withdrawal has been approved. Funds are being transferred to your selected payment method.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">AMOUNT</td><td align="right" style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#22c55e;font-size:13px;font-weight:600;">${formatLocalMoney(amount, currency)}</td></tr>
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">METHOD</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;">${method || 'Crypto'}</td></tr>
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">NEW BALANCE</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;">${formatLocalMoney(newBalance, currency)}</td></tr>
    <tr><td style="padding:12px 16px;color:#a0a0a0;">STATUS</td><td align="right" style="padding:12px 16px;color:#22c55e;font-size:10px;font-weight:500;">&#10003; APPROVED</td></tr>
  </table>
  <p style="color:#71717a;font-size:10px;text-align:center;">The Quantyrex Markets Finance Team</p>
`);
module.exports = withdrawalApprovedEmail;
