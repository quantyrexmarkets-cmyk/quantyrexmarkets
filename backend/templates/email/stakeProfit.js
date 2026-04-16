const baseTemplate = require('./base-enhanced');
const stakeProfitEmail = (name, plan, profit, currency) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#22c55e15;border:2px solid #22c55e;"><img src="https://img.icons8.com/sf-regular/48/22c55e/combo-chart.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <p style="color:#505050;font-size:10px;margin:0 0 8px;letter-spacing:3px;">STAKING REWARD</p>
    <h1 style="color:#6366f1;font-size:28px;font-weight:300;margin:0;">+ ${currency} ${parseFloat(profit||0).toFixed(2)}</h1>
    <p style="color:#505050;font-size:11px;margin:4px 0 0;">${plan||'Staking'}</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 24px;"></div>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.7;">Dear ${name||'Valued Client'}, your staking returns have been credited.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">VIEW ACCOUNT →</a></div>
`);
module.exports = stakeProfitEmail;
