const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.createDeposit = async (req, res) => {
  try {
    console.log('[DEPOSIT] Request received from user:', req.user?._id);
    console.log('[DEPOSIT] Body:', { amount: req.body.amount, method: req.body.method, purpose: req.body.purpose });
    console.log('[DEPOSIT] File:', req.file ? `Yes (${req.file.size} bytes, ${req.file.mimetype})` : 'No');

    const { amount, method, purpose } = req.body;
    if (!amount || amount < 10) {
      return res.status(400).json({ message: 'Minimum deposit is $10' });
    }

    let proofUrl = '';
    if (req.file) {
      try {
        console.log('[DEPOSIT] Uploading to Cloudinary...');
        const uploaded = await uploadToCloudinary(req.file, 'vertextrade/proofs');
        proofUrl = uploaded.secure_url;
        console.log('[DEPOSIT] Cloudinary success:', proofUrl);
      } catch (uploadErr) {
        console.error('[DEPOSIT] Cloudinary upload FAILED:', uploadErr.message);
        console.error('[DEPOSIT] Full error:', uploadErr);
        return res.status(500).json({
          message: 'Failed to upload payment proof. Try again or contact support.',
          error: uploadErr.message
        });
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

    console.log('[DEPOSIT] Created successfully:', transaction._id);
    res.status(201).json({ message: 'Deposit submitted successfully', transaction });
  } catch (err) {
    console.error('[DEPOSIT] FATAL ERROR:', err.message);
    console.error('[DEPOSIT] Stack:', err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Transaction.find({ user: req.user._id, type: 'deposit' }).sort({ createdAt: -1 });
    res.json(deposits);
  } catch (err) {
    console.error('[DEPOSITS GET] Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
