const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @keyframes none {}
  </style>
</head>
<body style="margin:0;padding:0;background:#060d18;font-family:'Montserrat',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#060d18;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">

          <!-- Header/Logo -->
          <tr>
            <td style="padding:0 0 24px 0;text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;">
                    <img src="https://img.icons8.com/sf-regular/24/6366f1/hexagon.png" width="24" height="24" style="display:block;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Montserrat',Arial,sans-serif;color:#ffffff;font-size:18px;font-weight:300;letter-spacing:3px;">QUANTYREX</span>
                    <span style="font-family:'Montserrat',Arial,sans-serif;color:#6366f1;font-size:18px;font-weight:300;letter-spacing:3px;">&nbsp;MARKETS</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:#0d1421;border:1px solid #1e293b;border-radius:0;">
              <!-- Top accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:3px;background:linear-gradient(90deg,#4f46e5,#6366f1,#818cf8);font-size:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Content -->
              <tr>
                <td style="padding:32px 32px 40px 32px;">
                  ${content}
                </td>
              </tr>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px solid #1e293b;padding-top:20px;text-align:center;">
                    <p style="margin:0 0 8px;color:#334155;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">QUANTYREX MARKETS</p>
                    <p style="margin:0 0 6px;color:#1e293b;font-size:9px;font-family:'Montserrat',Arial,sans-serif;">Questions? <a href="mailto:support@quantyrexmarkets.com" style="color:#4f46e5;text-decoration:none;">support@quantyrexmarkets.com</a></p>
                    <p style="margin:0;color:#1e293b;font-size:9px;font-family:'Montserrat',Arial,sans-serif;">&copy; 2026 Quantyrex Markets. All rights reserved.</p>
                  </td>
                </tr>
              </table>
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
