const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
    <tr>
      <td align="center" style="padding:30px 15px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#0a0a0a;border:1px solid #1f1f1f;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:28px 35px;border-bottom:1px solid #1f1f1f;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Q Logo Icon (Table-based for email compatibility) -->
                  <td width="44" valign="middle">
                    <table cellpadding="0" cellspacing="0" border="0" width="44" height="44">
                      <tr>
                        <td style="background:#0a0a0a;border:2px solid #6366f1;border-radius:10px;text-align:center;vertical-align:middle;">
                          <span style="color:#6366f1;font-size:24px;font-weight:bold;font-family:Georgia,serif;">Q</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Brand Name -->
                  <td valign="middle" style="padding-left:14px;">
                    <p style="margin:0;padding:0;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:1px;line-height:1.2;">
                      QUANTYREX
                    </p>
                    <p style="margin:2px 0 0 0;padding:0;color:#6366f1;font-size:10px;font-weight:400;letter-spacing:3px;line-height:1;">
                      MARKETS
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding:35px;">
              ${content}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding:22px 35px;border-top:1px solid #1f1f1f;">
              <p style="margin:0 0 6px 0;color:#505050;font-size:10px;line-height:1.5;">
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
