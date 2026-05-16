const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

const registrationFeeEmail = (name, amount) => baseTemplate(`
  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">REGISTRATION FEE</p>
  <h1 style="color:#818cf8;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">${formatUSD(amount)}</h1>
  <p style="color:#f59e0b;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 28px;text-align:center;">ACTION REQUIRED</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#fff;">${name || 'Client'}</span>, a registration fee is required to activate your account fully.</p>
  <p style="color:#71717a;font-size:10px;text-align:center;">The Quantyrex Markets Finance Team</p>
`);
module.exports = registrationFeeEmail;
