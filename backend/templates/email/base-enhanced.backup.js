const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;margin:0;padding:0;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:0;margin:0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#0a0a0a;border-collapse:collapse;">

          <tr>
            <td style="padding:20px 24px 16px 24px;text-align:center;background-color:#0a0a0a;">
              <span style="color:#ffffff;font-size:18px;font-weight:600;letter-spacing:3px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">QUANTYREX</span><span style="color:#6366f1;font-size:18px;font-weight:600;letter-spacing:3px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"> MARKETS</span>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;background-color:#0a0a0a;">
              ${content}
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 24px 24px;text-align:center;background-color:#0a0a0a;">
              <p style="margin:0 0 8px;color:#3f3f46;font-size:11px;letter-spacing:1px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">QUANTYREX MARKETS</p>
              <p style="margin:0 0 6px;color:#27272a;font-size:10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <a href="mailto:support@quantyrexmarkets.com" style="color:#6366f1;text-decoration:none;">support@quantyrexmarkets.com</a>
              </p>
              <p style="margin:0;color:#1f1f23;font-size:9px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&copy; 2025 Quantyrex Markets. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = baseTemplate;
