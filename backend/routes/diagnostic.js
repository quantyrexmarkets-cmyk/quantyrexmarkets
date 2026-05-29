const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const { uploadToCloudinary } = require('../utils/cloudinary');

router.get('/cloudinary', async (req, res) => {
  const results = {};

  // Config check
  results.config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'MISSING',
    api_key: process.env.CLOUDINARY_API_KEY ? 'SET (' + process.env.CLOUDINARY_API_KEY.length + ' chars)' : 'MISSING',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET (' + process.env.CLOUDINARY_API_SECRET.length + ' chars)' : 'MISSING',
  };

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  // Test 1: Ping (read API)
  try {
    results.ping = await cloudinary.api.ping();
  } catch (e) {
    results.ping = { error: e.message, code: e.http_code };
  }

  // Test 2: Account usage (account-level call)
  try {
    const usage = await cloudinary.api.usage();
    results.usage = {
      plan: usage.plan,
      credits_used: usage.credits?.used,
      credits_limit: usage.credits?.limit,
      storage: usage.storage,
      bandwidth: usage.bandwidth,
    };
  } catch (e) {
    results.usage = { error: e.message, code: e.http_code };
  }

  // Test 3: Direct REST API upload (no SDK)
  try {
    const tinyPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'vertextrade/test_rest';
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
      .digest('hex');

    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', `data:image/png;base64,${tinyPng.toString('base64')}`);
    form.append('api_key', process.env.CLOUDINARY_API_KEY);
    form.append('timestamp', timestamp.toString());
    form.append('folder', folder);
    form.append('signature', signature);

    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const f = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form, headers: form.getHeaders() }
    );
    const data = await f.json();
    results.restUpload = {
      status: f.status,
      ok: f.ok,
      data: f.ok ? { url: data.secure_url, id: data.public_id } : data,
    };
  } catch (e) {
    results.restUpload = { error: e.message };
  }

  // Test 4: SDK upload (current method)
  try {
    const tinyPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    const fakeFile = { buffer: tinyPng, mimetype: 'image/png' };
    const uploaded = await uploadToCloudinary(fakeFile, 'vertextrade/test_sdk');
    results.sdkUpload = { success: true, url: uploaded.secure_url };
  } catch (e) {
    results.sdkUpload = { error: e.message, code: e.http_code, name: e.name };
  }

  res.json(results);
});

module.exports = router;
