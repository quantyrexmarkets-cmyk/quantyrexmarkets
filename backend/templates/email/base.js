const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#0a0a0a;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:20px 24px 16px 24px;" align="left">
              <span style="font-family:'Montserrat',Arial,sans-serif;color:#ffffff;font-size:24px;font-weight:300;letter-spacing:1px;">Quantyrex</span>
              <span style="font-family:'Montserrat',Arial,sans-serif;color:#6366f1;font-size:24px;font-weight:300;letter-spacing:1px;">&nbsp;&nbsp;Markets</span>
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding:20px 24px 32px 24px;">
              ${content}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding:24px;border-top:1px solid #1a1a1a;">
              <p style="margin:0 0 5px 0;color:#505050;font-size:10px;line-height:1.5;">
                Questions? Contact support@quantyrexmarkets.com
              </p>
              <p style="margin:0;color:#353535;font-size:9px;">
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
