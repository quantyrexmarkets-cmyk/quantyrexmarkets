const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { uploadToCloudinary } = require('../utils/cloudinary');

router.get('/cloudinary', async (req, res) => {
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'MISSING',
      api_key: process.env.CLOUDINARY_API_KEY ? 'SET (' + process.env.CLOUDINARY_API_KEY.length + ' chars)' : 'MISSING',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET (' + process.env.CLOUDINARY_API_SECRET.length + ' chars)' : 'MISSING',
    };

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Test 1: Ping
    let pingResult;
    try {
      pingResult = await cloudinary.api.ping();
    } catch (e) {
      pingResult = { error: e.message };
    }

    // Test 2: Actually upload a tiny test image (1x1 pixel PNG)
    let uploadResult;
    try {
      const tinyPng = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        'base64'
      );
      const fakeFile = { buffer: tinyPng, mimetype: 'image/png' };
      const uploaded = await uploadToCloudinary(fakeFile, 'vertextrade/test');
      uploadResult = {
        success: true,
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    } catch (e) {
      uploadResult = {
        success: false,
        error: e.message,
        http_code: e.http_code,
        name: e.name,
      };
    }

    res.json({
      config,
      ping: pingResult,
      upload: uploadResult,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;
