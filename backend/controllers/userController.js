const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary');
const Transaction = require('../models/Transaction');
const Trade = require('../models/Trade');
const Investment = require('../models/Investment');

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const recentTransactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(10);
    const recentTrades = await Trade.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(10);
    const activeInvestments = await Investment.find({ user: req.user._id, status: 'active' });

    res.json({ user, recentTransactions, recentTrades, activeInvestments });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log('--- UPDATE PROFILE HIT ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('User ID:', req.user._id);

    const {
      firstName, lastName, phone, phoneCode,
      country, state, city, address, dob, currency
    } = req.body;

    const update = {
      firstName, lastName, phone, phoneCode,
      country, state, city, address, dob, currency
    };

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file, 'quantyrex/avatars');
        update.avatar = result.secure_url;
      } catch (uploadErr) {
        console.log('Avatar upload failed:', uploadErr.message);
        // Convert to base64 as fallback
        const base64 = req.file.buffer.toString('base64');
        update.avatar = 'data:' + req.file.mimetype + ';base64,' + base64;
      }
    }

    console.log('Update object:', update);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      update,
      { new: true }
    ).select('-password');

    console.log('Updated user:', user);

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('UPDATE PROFILE ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: '' },
      { new: true }
    ).select('-password');
    res.json({ message: 'Avatar removed', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { updateProfile, getDashboard, deleteAvatar };
