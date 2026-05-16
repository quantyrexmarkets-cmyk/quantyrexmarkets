const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  roi: { type: String },
  roiRate: { type: Number }, // e.g. 10 for 10%
  duration: { type: String },
  durationDays: { type: Number },
  dailyProfit: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  maturityAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  profit: { type: Number, default: 0 },
  earned: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  maturedAt: { type: Date },
  creditedAt: { type: Date },
});

module.exports = mongoose.model('Investment', investmentSchema);
