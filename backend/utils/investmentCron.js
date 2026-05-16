const Investment = require('../models/Investment');
const User = require('../models/User');
const Notification = require('../models/Notification');
const sendEmail = require('../utils/sendEmail');

const processInvestments = async () => {
  try {
    const now = new Date();

    // ============================================================
    // STEP 1: Process MATURED investments
    // Credit full maturity amount and mark as completed
    // ============================================================
    const maturedInvestments = await Investment.find({
      status: 'active',
      expiresAt: { $lte: now }
    }).populate('user');

    if (maturedInvestments.length > 0) {
      console.log(`Processing ${maturedInvestments.length} matured investments...`);
    }

    for (const inv of maturedInvestments) {
      // Calculate maturity amount correctly
      const roiRate = inv.roiRate || parseFloat(inv.roi) || 0;
      const durationDays = inv.durationDays || parseInt(inv.duration) || 0;
      const dailyProfit = parseFloat((inv.amount * roiRate / 100).toFixed(2));
      const totalProfit = parseFloat((dailyProfit * durationDays).toFixed(2));
      const maturityAmount = parseFloat((inv.amount + totalProfit).toFixed(2));

      // Credit full maturity amount to user balance
      await User.findByIdAndUpdate(inv.user._id || inv.user, {
        $inc: {
          balance: maturityAmount,
          totalProfit: totalProfit
        }
      });

      // Mark investment as completed
      await Investment.findByIdAndUpdate(inv._id, {
        status: 'completed',
        maturedAt: now,
        creditedAt: now,
        earned: totalProfit,
        profit: totalProfit,
        dailyProfit: dailyProfit,
        totalProfit: totalProfit,
        maturityAmount: maturityAmount,
      });

      // Send notification
      try {
        await Notification.create({
          user: inv.user._id || inv.user,
          title: '🎉 Investment Matured!',
          message: `Your ${inv.plan} plan has matured! $${maturityAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} has been credited to your balance.`,
          type: 'profit',
        });
      } catch(e) {}

      // Send maturity email
      try {
        const user = inv.user;
        if (user && user.email) {
          await sendEmail({
            type: 'investmentMatured',
            to: user.email,
            name: user.firstName,
            plan: inv.plan,
            amount: inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            totalProfit: totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            maturityAmount: maturityAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            roiRate: inv.roi || roiRate + '% Daily',
            duration: inv.duration || durationDays + ' days',
          });
        }
      } catch(emailErr) {
        console.log('Maturity email error:', emailErr.message);
      }

      console.log(`MATURED: Plan=${inv.plan} Amount=$${inv.amount} Profit=$${totalProfit} Credited=$${maturityAmount}`);
    }

    // ============================================================
    // STEP 2: Log active investments count
    // ============================================================
    const activeCount = await Investment.countDocuments({ status: 'active' });
    if (activeCount > 0) {
      console.log(`Active investments: ${activeCount}`);
    }

  } catch (err) {
    console.error('Investment cron error:', err.message);
  }
};

module.exports = processInvestments;
