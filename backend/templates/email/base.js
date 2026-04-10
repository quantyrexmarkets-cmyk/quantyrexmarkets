const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #1a1a1a;">
          
          <!-- Header -->
          <tr>
            <td style="padding:30px 40px;border-bottom:1px solid #1a1a1a;">
              <table width="100%">
                <tr>
                  <td>
                    <span style="color:#ffffff;font-size:16px;font-weight:600;letter-spacing:0.5px;">QUANTYREX</span>
                    <span style="color:#6366f1;font-size:16px;font-weight:600;"> MARKETS</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px;border-top:1px solid #1a1a1a;">
              <p style="color:#666666;font-size:11px;margin:0 0 10px;line-height:1.6;">
                This email was sent by Quantyrex Markets. If you have questions, contact us at support@quantyrexmarkets.com
              </p>
              <p style="color:#444444;font-size:10px;margin:0;">
                © 2026 Quantyrex Markets. All rights reserved.
              </p>
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
