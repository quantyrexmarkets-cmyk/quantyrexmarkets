const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { updateProfile, getDashboard, deleteAvatar } = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/dashboard', auth, getDashboard);
router.put('/profile', auth, upload.single('avatar'), updateProfile);
router.delete('/avatar', auth, deleteAvatar);

// Pay a pending fee
router.post('/pay-fee/:feeId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const fee = user.pendingFees.id(req.params.feeId);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    if (fee.paid) return res.status(400).json({ message: 'Fee already paid' });
    if (user.balance < fee.amount) return res.status(400).json({ message: `Insufficient balance. You need $${fee.amount.toFixed(2)} but have $${user.balance.toFixed(2)}` });

    // Deduct balance and mark fee as paid
    user.balance -= fee.amount;
    fee.paid = true;
    fee.paidAt = new Date();
    await user.save();

    // Check for next unpaid fee
    const nextFee = user.pendingFees.find(f => !f.paid);

    // Check registration fee
    if (!nextFee && user.registrationFeeRequired && !user.registrationFeePaid) {
      return res.json({ 
        nextFee: { type: 'registration', label: 'Registration Fee', amount: user.registrationFeeAmount, _id: 'reg' },
        allPaid: false 
      });
    }

    if (nextFee) {
      return res.json({ nextFee, allPaid: false });
    }

    return res.json({ allPaid: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const Transaction = require('../models/Transaction');

router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await require('../models/User').findById(req.user.id).select('+password');
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect.' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully.' });
  } catch(e) {
    res.status(500).json({ message: 'Server error' });
  }
});
