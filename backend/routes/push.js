const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const User = require('../models/User');
const auth = require('../middleware/auth');

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Save subscription - support multiple devices per user (by endpoint)
router.post('/subscribe', auth, async (req, res) => {
  try {
    const { subscription } = req.body;
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: 'Invalid subscription' });
    }
    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      { userId: req.user._id, subscription, endpoint: subscription.endpoint },
      { upsert: true, new: true }
    );
    res.json({ message: 'Subscribed' });
  } catch(e) {
    console.error('Subscribe error:', e.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsubscribe
router.post('/unsubscribe', auth, async (req, res) => {
  try {
    const { endpoint } = req.body;
    if (endpoint) await PushSubscription.deleteOne({ endpoint });
    res.json({ message: 'Unsubscribed' });
  } catch(e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Helper: send to a single subscription with cleanup
async function sendToSub(sub, payload) {
  try {
    await webpush.sendNotification(sub.subscription, payload);
    return true;
  } catch (e) {
    if (e.statusCode === 410 || e.statusCode === 404) {
      await PushSubscription.findByIdAndDelete(sub._id);
      console.log('Removed dead subscription:', sub._id);
    } else {
      console.log('Push error:', e.statusCode, e.message);
    }
    return false;
  }
}

// Send push to a specific user (all their devices)
module.exports.sendUserPush = async (userId, { title, body, url, chatId, icon, badge, image }) => {
  try {
    const subs = await PushSubscription.find({ userId });
    if (!subs.length) return 0;
    const payload = JSON.stringify({
      title,
      body,
      url: url || '/dashboard',
      chatId,
      icon: image || icon || '/icon-192.png',
      badge: badge || '/icon-192.png',
      image: image || undefined
    });
    const results = await Promise.all(subs.map(s => sendToSub(s, payload)));
    return results.filter(Boolean).length;
  } catch(e) {
    console.error('sendUserPush error:', e.message);
    return 0;
  }
};

// Send push to ALL admins (all their devices)
module.exports.sendAdminPush = async ({ title, body, url, chatId, icon, badge, image }) => {
  try {
    const admins = await User.find({ $or: [{ isAdmin: true }, { role: 'admin' }] }).select('_id');
    if (!admins.length) return 0;
    const adminIds = admins.map(a => a._id);
    const subs = await PushSubscription.find({ userId: { $in: adminIds } });
    if (!subs.length) return 0;
    const payload = JSON.stringify({
      title,
      body,
      url: url || '/admin/support',
      chatId,
      icon: image || icon || '/icon-192.png',
      badge: badge || '/icon-192.png',
      image: image || undefined
    });
    const results = await Promise.all(subs.map(s => sendToSub(s, payload)));
    console.log(`Admin push: ${results.filter(Boolean).length}/${subs.length} delivered`);
    return results.filter(Boolean).length;
  } catch(e) {
    console.error('sendAdminPush error:', e.message);
    return 0;
  }
};
