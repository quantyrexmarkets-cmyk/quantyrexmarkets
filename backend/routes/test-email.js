const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

router.get('/test-email', async (req, res) => {
  try {
    await sendEmail({
      to: req.query.email || 'test@example.com',
      type: 'welcome',
      name: 'Test User'
    });
    res.json({ message: 'Test email sent! Check your inbox.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
