const baseProTemplate = (header, body, footer) => `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light only">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
<tr><td align="center" style="padding:20px 8px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#0a1428;background-image:linear-gradient(135deg,#0a1428 0%,#0f1e3f 100%);border-radius:12px;overflow:hidden;border:1px solid #1a2236;">
${header}
${body}
${footer}
</table>
</td></tr></table>
</body></html>`;

module.exports = baseProTemplate;
