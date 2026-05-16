const Investment = require('../models/Investment');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Plan config
const PLANS = {
  BRONZE:   { roiRate: 10,  durationDays: 7,  minInvestment: 500,    maxInvestment: 4999    },
  SILVER:   { roiRate: 15,  durationDays: 14, minInvestment: 5000,   maxInvestment: 9999    },
  GOLD:     { roiRate: 20,  durationDays: 21, minInvestment: 10000,  maxInvestment: 24999   },
  PLATINUM: { roiRate: 25,  durationDays: 30, minInvestment: 25000,  maxInvestment: 49999   },
  DIAMOND:  { roiRate: 30,  durationDays: 45, minInvestment: 50000,  maxInvestment: 99999   },
  ELITE:    { roiRate: 40,  durationDays: 60, minInvestment: 100000, maxInvestment: 1000000 },
};

exports.joinPlan = async (req, res) => {
  try {
    const { plan, amount } = req.body;
    const user = await User.findById(req.user._id);

    // Validate plan
    const planConfig = PLANS[plan?.toUpperCase()];
    if (!planConfig) return res.status(400).json({ message: 'Invalid plan' });

    const investAmount = parseFloat(amount);

    // Validate amount range
    if (investAmount < planConfig.minInvestment) {
      return res.status(400).json({ message: `Minimum investment for ${plan} is $${planConfig.minInvestment.toLocaleString()}` });
    }
    if (investAmount > planConfig.maxInvestment) {
      return res.status(400).json({ message: `Maximum investment for ${plan} is $${planConfig.maxInvestment.toLocaleString()}` });
    }

    // Check balance
    if (user.balance < investAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Calculate profits
    const roiRate = planConfig.roiRate;
    const durationDays = planConfig.durationDays;
    const dailyProfit = parseFloat((investAmount * roiRate / 100).toFixed(2));
    const totalProfit = parseFloat((dailyProfit * durationDays).toFixed(2));
    const maturityAmount = parseFloat((investAmount + totalProfit).toFixed(2));

    // Set dates
    const startDate = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Create investment
    const investment = await Investment.create({
      user: req.user._id,
      plan: plan.toUpperCase(),
      amount: investAmount,
      roi: roiRate + '% Daily',
      roiRate,
      duration: durationDays + ' days',
      durationDays,
      dailyProfit,
      totalProfit,
      maturityAmount,
      startDate,
      expiresAt,
      status: 'active',
    });

    // Deduct from balance
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { balance: -investAmount }
    });

    // Send confirmation email
    try {
      await sendEmail({
        type: 'investmentConfirmed',
        to: user.email,
        name: user.firstName,
        plan: plan.toUpperCase(),
        amount: investAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        dailyProfit: dailyProfit.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        totalProfit: totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        maturityAmount: maturityAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        roiRate: roiRate + '% Daily',
        duration: durationDays + ' days',
        startDate: startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        maturityDate: expiresAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
    } catch (emailErr) {
      console.log('Investment email error:', emailErr.message);
    }

    console.log(`INVESTMENT: ${user.email} joined ${plan} with $${investAmount} | Daily: $${dailyProfit} | Total profit: $${totalProfit} | Maturity: $${maturityAmount}`);

    res.status(201).json({
      message: 'Investment plan joined successfully',
      investment,
      summary: {
        plan: plan.toUpperCase(),
        amount: investAmount,
        dailyProfit,
        totalProfit,
        maturityAmount,
        maturityDate: expiresAt,
      }
    });
  } catch (err) {
    console.error('joinPlan error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Process matured investments - call this from a cron/scheduler
exports.processMaturedInvestments = async () => {
  try {
    const now = new Date();
    const matured = await Investment.find({
      status: 'active',
      expiresAt: { $lte: now }
    }).populate('user');

    console.log(`Processing ${matured.length} matured investments...`);

    for (const investment of matured) {
      // Credit maturity amount to user balance
      await User.findByIdAndUpdate(investment.user._id, {
        $inc: {
          balance: investment.maturityAmount,
          totalProfit: investment.totalProfit,
        }
      });

      // Mark investment as completed
      investment.status = 'completed';
      investment.maturedAt = now;
      investment.creditedAt = now;
      investment.earned = investment.totalProfit;
      investment.profit = investment.totalProfit;
      await investment.save();

      // Send maturity email
      try {
        const user = investment.user;
        await sendEmail({
          type: 'investmentMatured',
          to: user.email,
          name: user.firstName,
          plan: investment.plan,
          amount: investment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          totalProfit: investment.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          maturityAmount: investment.maturityAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          roiRate: investment.roi,
          duration: investment.duration,
        });
      } catch (emailErr) {
        console.log('Maturity email error:', emailErr.message);
      }

      console.log(`MATURED: ${investment.user.email} | Plan: ${investment.plan} | Amount: $${investment.maturityAmount}`);
    }

    return matured.length;
  } catch (err) {
    console.error('processMaturedInvestments error:', err);
    return 0;
  }
};
