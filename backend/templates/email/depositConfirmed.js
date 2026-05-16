const baseTemplate = require('./base-enhanced');
const { formatMoney } = require('./_money');

const depositConfirmedEmail = (name, amount, currency, newBalance) => baseTemplate(`
  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">DEPOSIT CONFIRMED</p>
  <h1 style="color:#ffffff;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">+ ${formatMoney(amount, currency)}</h1>
  <p style="color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 28px;text-align:center;">APPROVED</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#fff;">${name || 'Client'}</span>, your deposit has been confirmed and credited successfully.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 28px;background:#121212;">
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">AMOUNT</td><td align="right" style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#818cf8;font-weight:600;">+ ${formatMoney(amount, currency)}</td></tr>
    <tr><td style="padding:12px 16px;color:#a0a0a0;">NEW BALANCE</td><td align="right" style="padding:12px 16px;color:#fff;">${formatMoney(newBalance, currency)}</td></tr>
  </table>
  <p style="color:#71717a;font-size:10px;text-align:center;">The Quantyrex Markets Finance Team</p>
`);
module.exports = depositConfirmedEmail;
