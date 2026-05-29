const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

const PLAN_PRICE = 499;
const PLAN_DURATION_DAYS = 365;
const PLAN_NAME = 'Pro';

router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('subscription balance');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const sub = user.subscription || {};
    const now = new Date();
    const isActive = sub.active && sub.expiresAt && new Date(sub.expiresAt) > now;
    const daysLeft = isActive ? Math.ceil((new Date(sub.expiresAt) - now) / (1000 * 60 * 60 * 24)) : 0;
    if (sub.active && sub.expiresAt && new Date(sub.expiresAt) <= now) {
      await User.findByIdAndUpdate(req.user._id, { 'subscription.active': false });
    }
    res.json({
      active: isActive,
      plan: sub.plan,
      startedAt: sub.startedAt,
      expiresAt: sub.expiresAt,
      daysLeft,
      balance: user.balance,
      planPrice: PLAN_PRICE,
      planDuration: PLAN_DURATION_DAYS,
      planName: PLAN_NAME,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/activate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.subscription?.active && user.subscription?.expiresAt && new Date(user.subscription.expiresAt) > new Date()) {
      return res.status(400).json({ message: 'You already have an active Pro subscription' });
    }
    if (user.balance < PLAN_PRICE) {
      return res.status(400).json({
        message: 'Insufficient balance. You need $' + PLAN_PRICE + ' but your balance is $' + user.balance.toFixed(2) + '. Please deposit funds.',
        needsDeposit: true,
        required: PLAN_PRICE,
        current: user.balance
      });
    }
    const now = new Date();
    const expiresAt = new Date(now.getTime() + PLAN_DURATION_DAYS * 24 * 60 * 60 * 1000);
    user.balance -= PLAN_PRICE;
    user.subscription = {
      active: true,
      plan: PLAN_NAME,
      startedAt: now,
      expiresAt,
      activatedBy: 'user',
    };
    await user.save();
    res.json({
      success: true,
      message: 'Pro subscription activated! Valid until ' + expiresAt.toLocaleDateString(),
      subscription: user.subscription,
      newBalance: user.balance,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
