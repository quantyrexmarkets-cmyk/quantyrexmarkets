const mongoose = require('mongoose');

const PushSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  subscription: { type: Object, required: true },
  endpoint: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PushSubscription', PushSubscriptionSchema);
