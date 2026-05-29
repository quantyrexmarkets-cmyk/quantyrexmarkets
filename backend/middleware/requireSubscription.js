const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req.user.isAdmin || req.user.role === 'admin') return next();

    const user = await User.findById(req.user._id).select('subscription');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const sub = user.subscription || {};
    const now = new Date();
    const isActive = sub.active && sub.expiresAt && new Date(sub.expiresAt) > now;

    if (!isActive) {
      return res.status(403).json({
        message: 'Pro subscription required to perform this action',
        requiresSubscription: true,
        redirectTo: '/dashboard/subscription'
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
