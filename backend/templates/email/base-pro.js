const baseProTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:24px 12px;background:#000000;border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:0;margin:0;">

      <!-- Main Container -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;">

        <!-- HEADER -->
        <tr>
          <td style="background:#0a0e1a;border:1px solid #1a2236;border-radius:12px 12px 0 0;padding:20px 24px;border-bottom:1px solid #1e3a8a;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Logo Left -->
                <td valign="middle" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0a0e1a" stroke="#3b82f6" stroke-width="1.5"/>
                          <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0a0e1a" stroke="#3b82f6" stroke-width="1.2"/>
                          <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6" stroke="#3b82f6" stroke-width="1"/>
                        </svg>
                      </td>
                      <td valign="middle" style="padding-left:4px;">
                        <span style="display:block;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:1.5px;line-height:1;">QUANTYREX</span>
                        <span style="display:block;color:#3b82f6;font-size:11px;font-weight:600;letter-spacing:3.5px;margin-top:3px;line-height:1;">MARKETS</span>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Trust Badges Right -->
                <td valign="middle" align="right" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5">
                          <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/>
                          <path d="M9 12l2 2 4-4" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </td>
                      <td valign="middle" align="left">
                        <span style="display:block;color:#ffffff;font-size:11px;font-weight:500;line-height:1.3;">Secure • Trusted • Reliable</span>
                        <span style="display:block;color:#8b95a8;font-size:9px;font-weight:400;line-height:1.3;margin-top:2px;">Institutional-Grade Security</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT BODY -->
        <tr>
          <td style="background:#0a0e1a;border-left:1px solid #1a2236;border-right:1px solid #1a2236;padding:28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0f1424;border:1px solid #1a2236;border-radius:10px;">
              <tr>
                <td style="padding:28px 24px;">
                  ${content}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#0a0e1a;border:1px solid #1a2236;border-top:none;border-radius:0 0 12px 12px;padding:20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
              <tr>
                <!-- Security -->
                <td valign="top" width="35%" style="vertical-align:top;padding-right:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:8px;">
                        <div style="width:28px;height:28px;border-radius:50%;border:1px solid #1e3a8a;text-align:center;line-height:28px;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="vertical-align:middle;">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                        </div>
                      </td>
                      <td valign="middle">
                        <p style="margin:0;color:#ffffff;font-size:10px;font-weight:600;line-height:1.4;">Your security is our priority.</p>
                        <p style="margin:2px 0 0;color:#6b7280;font-size:9px;line-height:1.4;">All transactions are protected with<br>bank-grade encryption.</p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Logo Center -->
                <td valign="middle" width="30%" align="center" style="vertical-align:middle;">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0a0e1a" stroke="#3b82f6" stroke-width="1.2"/>
                    <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6" stroke="#3b82f6" stroke-width="1"/>
                  </svg>
                </td>

                <!-- Support Right -->
                <td valign="top" width="35%" align="right" style="vertical-align:top;padding-left:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:8px;">
                        <div style="width:28px;height:28px;border-radius:50%;border:1px solid #1e3a8a;text-align:center;line-height:28px;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="vertical-align:middle;">
                            <path d="M3 18v-6a9 9 0 0118 0v6"/>
                            <path d="M21 19a2 2 0 01-2 2h-1v-7h3v5zM3 19a2 2 0 002 2h1v-7H3v5z"/>
                          </svg>
                        </div>
                      </td>
                      <td valign="middle" align="left">
                        <p style="margin:0;color:#ffffff;font-size:10px;font-weight:600;line-height:1.4;">Need Assistance?</p>
                        <p style="margin:2px 0 0;color:#6b7280;font-size:9px;line-height:1.4;">Our support team is available 24/7.<br><a href="mailto:support@quantyrexmarkets.com" style="color:#3b82f6;text-decoration:none;">support@quantyrexmarkets.com</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Bottom row -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #1a2236;padding-top:12px;">
              <tr>
                <td align="left" style="color:#4b5563;font-size:9px;padding-top:12px;">
                  &copy; ${new Date().getFullYear()} Quantyrex Markets. All Rights Reserved.
                </td>
                <td align="right" style="color:#4b5563;font-size:9px;padding-top:12px;">
                  This is an automated message. Please do not reply.
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

module.exports = baseProTemplate;
