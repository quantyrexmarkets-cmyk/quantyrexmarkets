const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.isActive || user.isBlocked) return res.status(401).json({ message: 'Account disabled' });

    // Update lastOnline (throttled to once per minute to reduce DB writes)
    const now = new Date();
    const lastUpdate = user.lastOnline ? new Date(user.lastOnline) : new Date(0);
    if (now - lastUpdate > 60000) {
      User.findByIdAndUpdate(user._id, { lastOnline: now }).catch(() => {});
      user.lastOnline = now;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
