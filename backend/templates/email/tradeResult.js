const baseTemplate = require('./base');

const tradeResultEmail = (name, symbol, type, amount, result, profit, newBalance, currency) => {
  const isWin = result === 'win';
  const statusColor = isWin ? '#22c55e' : '#ef4444';
  
  return baseTemplate(`
    <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
      Hi ${name},
    </p>
    
    <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
      Your ${symbol} trade has been closed.
    </p>
    
    <table width="100%" style="margin:0 0 30px;">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#666666;font-size:11px;">Symbol</span>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#ffffff;font-size:12px;">${symbol}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#666666;font-size:11px;">Type</span>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#888888;font-size:12px;">${type?.toUpperCase() || 'TRADE'}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#666666;font-size:11px;">Amount</span>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#888888;font-size:12px;">${currency} ${parseFloat(amount || 0).toFixed(2)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#666666;font-size:11px;">Result</span>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:${statusColor};font-size:12px;font-weight:500;">${isWin ? '+' : '-'}${currency} ${parseFloat(Math.abs(profit || 0)).toFixed(2)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;">
          <span style="color:#666666;font-size:11px;">New Balance</span>
        </td>
        <td align="right" style="padding:12px 0;">
          <span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(newBalance || 0).toFixed(2)}</span>
        </td>
      </tr>
    </table>
    
    <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" 
       style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
      TRADE AGAIN
    </a>
  `);
};

module.exports = tradeResultEmail;
