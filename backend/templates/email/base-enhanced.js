const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#060d18;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#060d18;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- LOGO HEADER -->
          <tr>
            <td style="padding:0 0 28px 0;text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#4f46e5,#818cf8);display:inline-block;"></div>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="color:#ffffff;font-size:20px;font-weight:200;letter-spacing:4px;font-family:'Helvetica Neue',Arial,sans-serif;">QUANTYREX</span><span style="color:#6366f1;font-size:20px;font-weight:200;letter-spacing:4px;font-family:'Helvetica Neue',Arial,sans-serif;">&nbsp;MARKETS</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:#0d1421;border:1px solid #1e293b;">

              <!-- TOP ACCENT BAR -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,#3730a3,#6366f1,#a5b4fc);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- CONTENT AREA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:40px 36px 48px 36px;">
                    ${content}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px;background:linear-gradient(90deg,transparent,#1e293b,transparent);font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <p style="margin:0 0 6px;color:#334155;font-size:11px;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">QUANTYREX MARKETS</p>
              <p style="margin:0 0 6px;color:#1e293b;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">
                Questions? <a href="mailto:support@quantyrexmarkets.com" style="color:#4f46e5;text-decoration:none;">support@quantyrexmarkets.com</a>
              </p>
              <p style="margin:0;color:#1e293b;font-size:9px;font-family:'Helvetica Neue',Arial,sans-serif;">&copy; 2025 Quantyrex Markets. All rights reserved.</p>
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
