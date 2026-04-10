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
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding:30px 40px;border-bottom:1px solid #1a1a1a;">
              <table width="100%">
                <tr>
                  <td width="50" valign="middle">
                    <!-- Logo Icon -->
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 2.5L5 12.5V32.5L25 47.5L45 32.5V12.5L25 2.5Z" fill="#0a0a0a" stroke="#6366F1" stroke-width="1.5"/>
                      <path d="M25 10L10 17.5V32.5L25 42.5L40 32.5V17.5L25 10Z" fill="#0a0a0a" stroke="#6366F1" stroke-width="1.3" opacity="0.7"/>
                      <path d="M25 17.5L15 22.5V27.5L25 35L35 27.5V22.5L25 17.5Z" fill="#6366F1"/>
                    </svg>
                  </td>
                  <td valign="middle" style="padding-left:15px;">
                    <div style="line-height:1;">
                      <span style="color:#ffffff;font-size:16px;font-weight:600;letter-spacing:0.5px;">QUANTYREX</span>
                      <span style="color:#6366f1;font-size:16px;font-weight:600;"> MARKETS</span>
                    </div>
                    <div style="color:#666666;font-size:9px;margin-top:4px;letter-spacing:0.5px;">
                      Your Gateway to Financial Freedom
                    </div>
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
