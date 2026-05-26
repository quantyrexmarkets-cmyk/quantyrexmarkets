const baseProTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    [data-ogsc] .force-light { background-color: #ffffff !important; color: #0f172a !important; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:'Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:24px 12px;background:#f5f7fa;border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:0;margin:0;">

      <!-- Main Container -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- DARK HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a1730 0%,#0f1e3f 100%);padding:28px 32px;border-bottom:3px solid #2563eb;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Logo Left -->
                <td valign="middle" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:14px;">
                        <div style="width:44px;height:44px;background:#1e3a8a;border-radius:8px;text-align:center;line-height:44px;font-size:22px;font-weight:700;color:#60a5fa;">Q</div>
                      </td>
                      <td valign="middle">
                        <span style="display:block;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2.5px;line-height:1;font-family:'Inter',Arial,sans-serif;">QUANTYREX</span>
                        <span style="display:block;color:#60a5fa;font-size:11px;font-weight:600;letter-spacing:5px;margin-top:5px;line-height:1;font-family:'Inter',Arial,sans-serif;">MARKETS</span>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Trust Badge Right -->
                <td valign="middle" align="right" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(96,165,250,0.3);text-align:center;line-height:34px;background:rgba(96,165,250,0.08);">
                          <span style="color:#60a5fa;font-size:18px;">🔒</span>
                        </div>
                      </td>
                      <td valign="middle" align="left">
                        <span style="display:block;color:#ffffff;font-size:12px;font-weight:600;line-height:1.4;">Secure. Trusted. Reliable.</span>
                        <span style="display:block;color:#94a3b8;font-size:10px;font-weight:400;line-height:1.4;margin-top:2px;">Institutional-Grade Security</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT BODY (white background) -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;padding:36px 32px;" class="force-light">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;border-top:1px solid #e2e8f0;padding:24px 32px;" class="force-light">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Security Left -->
                <td valign="top" width="38%" style="vertical-align:top;padding-right:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:32px;height:32px;border-radius:50%;border:1.5px solid #cbd5e1;text-align:center;line-height:32px;background:#f8fafc;">
                          <span style="color:#2563eb;font-size:14px;">🔒</span>
                        </div>
                      </td>
                      <td valign="middle">
                        <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;">Your security is our priority.</p>
                        <p style="margin:3px 0 0;color:#64748b;font-size:10px;line-height:1.5;">All transactions are protected with<br>bank-grade encryption.</p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Logo Center -->
                <td valign="middle" width="24%" align="center" style="vertical-align:middle;">
                  <div style="width:40px;height:40px;background:#dbeafe;border:1.5px solid #2563eb;border-radius:8px;text-align:center;line-height:40px;font-size:18px;font-weight:700;color:#2563eb;">Q</div>
                </td>

                <!-- Support Right -->
                <td valign="top" width="38%" align="right" style="vertical-align:top;padding-left:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:32px;height:32px;border-radius:50%;border:1.5px solid #cbd5e1;text-align:center;line-height:32px;background:#f8fafc;">
                          <span style="color:#2563eb;font-size:14px;">🎧</span>
                        </div>
                      </td>
                      <td valign="middle" align="left">
                        <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;">Need Assistance?</p>
                        <p style="margin:3px 0 0;color:#64748b;font-size:10px;line-height:1.5;">Our support team is available 24/7.<br><a href="mailto:support@quantyrexmarkets.com" style="color:#2563eb;text-decoration:none;font-weight:500;">support@quantyrexmarkets.com</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Divider + Bottom row -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
              <tr><td style="border-top:1px solid #e2e8f0;height:1px;font-size:0;line-height:0;"></td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
              <tr>
                <td align="left" style="color:#94a3b8;font-size:10px;">
                  &copy; ${new Date().getFullYear()} Quantyrex Markets. All Rights Reserved.
                </td>
                <td align="right" style="color:#94a3b8;font-size:10px;">
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
