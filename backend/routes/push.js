const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Save subscription
router.post('/subscribe', auth, async (req, res) => {
  try {
    const { subscription } = req.body;
    await PushSubscription.findOneAndUpdate(
      { userId: req.user._id },
      { userId: req.user._id, subscription },
      { upsert: true, new: true }
    );
    res.json({ message: 'Subscribed' });
  } catch(e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send push to all admin subscriptions
router.post('/send-admin', async (req, res) => {
  try {
    const { title, body, url } = req.body;
    const subs = await PushSubscription.find();
    const payload = JSON.stringify({ title, body, url });
    await Promise.all(subs.map(s =>
      webpush.sendNotification(s.subscription, payload).catch(e => {
        if (e.statusCode === 410) PushSubscription.findByIdAndDelete(s._id);
      })
    ));
    res.json({ message: 'Sent' });
  } catch(e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
module.exports.sendUserPush = async (userId, { title, body, url }) => {
  try {
    const sub = await PushSubscription.findOne({ userId });
    if (!sub) return;
    const payload = JSON.stringify({ title, body, url: url || '/dashboard' });
    await webpush.sendNotification(sub.subscription, payload).catch(e => {
      if (e.statusCode === 410) PushSubscription.findByIdAndDelete(sub._id);
    });
  } catch(e) { console.log('Push error:', e.message); }
};

module.exports.sendAdminPush = async ({ title, body, url, chatId }) => {
  const subs = await PushSubscription.find();
  const payload = JSON.stringify({ title, body, url: url || '/admin', chatId });
  await Promise.all(subs.map(s =>
    webpush.sendNotification(s.subscription, payload).catch(e => {
      if (e.statusCode === 410) PushSubscription.findByIdAndDelete(s._id);
    })
  ));
};
