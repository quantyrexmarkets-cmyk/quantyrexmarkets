const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');
const CopyTrade = require('../models/CopyTrade');
const User = require('../models/User');
const Notification = require('../models/Notification');
const processCopyTradeProfits = require('../utils/copyTradeCron');

// External / Vercel cron trigger
router.get('/cron', async (req, res) => {
  try {
    await processCopyTradeProfits();
    res.json({ success: true, message: 'Copy trade profits processed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start copying a trader
router.post('/', auth, requireSubscription, async (req, res) => {
  try {
    const { traderId, traderName, traderImg, amount, profitShare, endDate } = req.body;
    if (!amount || amount < 10) return res.status(400).json({ message: 'Minimum investment is $10' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.balance < parseFloat(amount)) return res.status(400).json({ message: 'Insufficient balance. Please deposit funds.' });

    // Deduct balance
    user.balance -= parseFloat(amount);
    await user.save();

    const copyTrade = await CopyTrade.create({
      user: req.user._id,
      trader: traderId,
      traderName,
      traderImg,
      amount: parseFloat(amount),
      profitShare: profitShare || 20,
      endDate: endDate ? new Date(endDate) : null
    });

    await Notification.create({
      user: req.user._id,
      type: 'system',
      title: 'Copy Trading Started',
      message: `You are now copying ${traderName}.`
    });

    res.json({ success: true, copyTrade, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's active copy trades (with auto-accrual)
router.get('/', auth, async (req, res) => {
  try {
    try {
      await processCopyTradeProfits();
    } catch (cronErr) {
      console.error('On-demand copy trade profit error:', cronErr.message);
    }

    const trades = await CopyTrade.find({ user: req.user._id, status: 'active' }).sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Stop copying a trader
router.put('/:id/stop', auth, requireSubscription, async (req, res) => {
  try {
    const trade = await CopyTrade.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { status: 'stopped' }, { new: true });
    if (!trade) return res.status(404).json({ message: 'Copy trade not found' });
    res.json({ success: true, trade });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
