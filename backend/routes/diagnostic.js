const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// TEMPORARY: Test Cloudinary configuration
router.get('/cloudinary', async (req, res) => {
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'MISSING',
      api_key: process.env.CLOUDINARY_API_KEY ? 'SET (' + process.env.CLOUDINARY_API_KEY.length + ' chars)' : 'MISSING',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET (' + process.env.CLOUDINARY_API_SECRET.length + ' chars)' : 'MISSING',
    };

    // Try a simple Cloudinary API call (ping)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      const ping = await cloudinary.api.ping();
      return res.json({
        config,
        cloudinaryStatus: 'WORKING ✅',
        ping
      });
    } catch (pingErr) {
      return res.json({
        config,
        cloudinaryStatus: 'FAILED ❌',
        error: pingErr.message,
        errorCode: pingErr.http_code,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
