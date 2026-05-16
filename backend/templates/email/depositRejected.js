const baseTemplate = require('./base-enhanced');
const { formatMoney } = require('./_money');

const depositRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <p style="color:#ef4444;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">DEPOSIT REJECTED</p>
  <h1 style="color:#ffffff;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">${formatMoney(amount, currency)}</h1>
  <p style="color:#ef4444;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 28px;text-align:center;">DECLINED</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#fff;">${name || 'Client'}</span>, your deposit could not be approved.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 28px;background:#121212;">
    <tr><td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;">AMOUNT</td><td align="right" style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#fff;font-weight:600;">${formatMoney(amount, currency)}</td></tr>
    <tr><td style="padding:12px 16px;color:#a0a0a0;">REASON</td><td align="right" style="padding:12px 16px;color:#ef4444;">${reason || 'Verification failed'}</td></tr>
  </table>
  <p style="color:#71717a;font-size:10px;text-align:center;">The Quantyrex Markets Finance Team</p>
`);
module.exports = depositRejectedEmail;
