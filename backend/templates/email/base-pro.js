const baseProTemplate = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark only">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Montserrat',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="background:#000000;">
<tr><td align="center" style="padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="max-width:680px;background:#000000;">
${content}
</table>
</td></tr>
</table>
</body></html>`;

module.exports = baseProTemplate;
