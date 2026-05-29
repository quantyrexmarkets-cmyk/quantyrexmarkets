const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.createDeposit = async (req, res) => {
  try {
    const { amount, method, purpose } = req.body;
    if (!amount || amount < 10) {
      return res.status(400).json({ message: 'Minimum deposit is $10' });
    }

    // Upload payment proof — Cloudinary with base64 fallback
    let proofUrl = '';
    if (req.file) {
      try {
        const uploaded = await uploadToCloudinary(req.file, 'vertextrade/proofs');
        proofUrl = uploaded.secure_url;
      } catch (uploadErr) {
        console.warn('[DEPOSIT] Cloudinary failed, using base64 fallback:', uploadErr.message);
        const base64 = req.file.buffer.toString('base64');
        proofUrl = 'data:' + req.file.mimetype + ';base64,' + base64;
      }
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'deposit',
      amount: parseFloat(amount),
      method,
      status: 'pending',
      proofImage: proofUrl,
      purpose: purpose === 'pro_subscription' ? 'pro_subscription' : 'general',
    });

    res.status(201).json({ message: 'Deposit submitted successfully', transaction });
  } catch (err) {
    console.error('[DEPOSIT] Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Transaction.find({ user: req.user._id, type: 'deposit' }).sort({ createdAt: -1 });
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
