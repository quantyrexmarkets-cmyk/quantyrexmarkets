const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Notification = require('../models/Notification');
const rateLimit = require('express-rate-limit');
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: { message: 'Too many messages. Try again later.' } });
const sendEmailUtil = require('../utils/sendEmail');
const sendEmail = sendEmailUtil;
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDeposits = await Transaction.countDocuments({ type: 'deposit' });
    const totalWithdrawals = await Transaction.countDocuments({ type: 'withdrawal' });
    const pendingDeposits = await Transaction.countDocuments({ type: 'deposit', status: 'pending' });
    const pendingWithdrawals = await Transaction.countDocuments({ type: 'withdrawal', status: 'pending' });
    const pendingKyc = await User.countDocuments({ kycStatus: 'pending' });
    res.json({ totalUsers, totalDeposits, totalWithdrawals, pendingDeposits, pendingWithdrawals, pendingKyc });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user balance
router.put('/users/:id/balance', adminAuth, async (req, res) => {
  try {
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { balance }, { new: true }).select('-password');
    res.json({ message: 'Balance updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user stats
router.put('/users/:id/stats', adminAuth, async (req, res) => {
  try {
    const { totalDeposits, totalWithdrawals, totalProfit, totalReferrals, totalPackages } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { totalDeposits, totalWithdrawals, totalProfit, totalReferrals, totalPackages },
      { new: true }
    ).select('-password');
    res.json({ message: 'Stats updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle withdrawal block
router.put('/users/:id/withdrawal-block', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.withdrawalBlocked = !user.withdrawalBlocked;
    await user.save();
    res.json({ message: `Withdrawals ${user.withdrawalBlocked ? 'blocked' : 'unblocked'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle account upgrade
router.put('/users/:id/account-upgrade', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.accountUpgraded = !user.accountUpgraded;
    await user.save();
    res.json({ message: `Account upgrade ${user.accountUpgraded ? 'approved' : 'revoked'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Set withdrawal code
router.put('/users/:id/withdrawal-code', adminAuth, async (req, res) => {
  try {
    const { withdrawalCodeRequired, generate } = req.body;
    let updateData = { withdrawalCodeRequired };

    if (generate) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      updateData.withdrawalCode = code;
    }

    if (withdrawalCodeRequired === false) {
      updateData.withdrawalCode = '';
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({ message: 'Withdrawal code updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Set user plan
router.put('/users/:id/plan', adminAuth, async (req, res) => {
  try {
    const { plan } = req.body;
    const planDetails = {
      BRONZE:   { maxWithdrawal: 500,   upgradeFee: 1000,   minInvestment: 500,    maxInvestment: 4999,    roi: '10% Daily', duration: '7 days',  features: ['Basic trading access', 'Standard support'] },
      SILVER:   { maxWithdrawal: 1000,  upgradeFee: 5000,   minInvestment: 5000,   maxInvestment: 9999,    roi: '15% Daily', duration: '14 days', features: ['Advanced trading tools', 'Priority support', 'Referral bonuses'] },
      GOLD:     { maxWithdrawal: 2000,  upgradeFee: 10000,  minInvestment: 10000,  maxInvestment: 24999,   roi: '20% Daily', duration: '21 days', features: ['Premium trading tools', 'Dedicated account manager', 'Higher referral bonuses'] },
      PLATINUM: { maxWithdrawal: 5000,  upgradeFee: 25000,  minInvestment: 25000,  maxInvestment: 49999,   roi: '25% Daily', duration: '30 days', features: ['VIP trading suite', 'Personal account manager', 'Weekly profit reports'] },
      DIAMOND:  { maxWithdrawal: 10000, upgradeFee: 50000,  minInvestment: 50000,  maxInvestment: 99999,   roi: '30% Daily', duration: '45 days', features: ['Exclusive trading signals', '24/7 VIP support', 'Automated profit reinvestment'] },
      ELITE:    { maxWithdrawal: 20000, upgradeFee: 100000, minInvestment: 100000, maxInvestment: 1000000, roi: '40% Daily', duration: '60 days', features: ['Full platform access', 'Private trading desk', 'Custom investment strategies', 'Direct CEO line'] },
    };
    const details = planDetails[plan] || {};
    const updateData = { currentPlan: plan };
    if (details.maxWithdrawal) updateData.minimumWithdrawal = details.maxWithdrawal;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (plan !== 'none') {
      await sendEmail({ to: user.email, type: 'planUpgrade', name: user.firstName, package: plan, planDetails: details });
    }
    res.json({ message: 'Plan updated and user notified', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send registration fee email
router.post('/users/:id/send-registration-fee', adminAuth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Valid amount is required' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Sync amount on user record so it shows correctly everywhere
    user.registrationFeeRequired = true;
    user.registrationFeePaid = false;
    user.registrationFeeAmount = Number(amount);
    await user.save();

    await sendEmail({
      to: user.email,
      type: 'registrationFee',
      name: user.firstName,
      amount: Number(amount),
      currency: user.currency || 'USD'
    });
    res.json({ success: true, message: 'Registration fee email sent in user\'s currency', user });
  } catch (err) {
    console.error('[send-registration-fee]', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Send upgrade promo email
router.post('/users/:id/send-upgrade-promo', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await sendEmail({ to: user.email, type: 'upgradePromo', name: user.firstName });
    res.json({ message: 'Upgrade promo email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send withdrawal code email
router.post('/users/:id/send-withdrawal-code', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.withdrawalCode) return res.status(400).json({ message: 'No withdrawal code set for this user' });
    await sendEmail({ to: user.email, type: 'withdrawalCode', name: user.firstName, code: user.withdrawalCode });
    res.json({ message: 'Withdrawal code sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Set minimum withdrawal
router.put('/users/:id/minimum-withdrawal', adminAuth, async (req, res) => {
  try {
    const { minimumWithdrawal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { minimumWithdrawal },
      { new: true }
    ).select('-password');
    res.json({ message: 'Minimum withdrawal updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle user block
router.put('/users/:id/block', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete withdrawal
router.delete('/withdrawals/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Withdrawal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all deposits
router.get('/deposits', adminAuth, async (req, res) => {
  try {
    const deposits = await Transaction.find({ type: 'deposit' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/reject deposit


// Delete deposit
router.delete('/deposits/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deposit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all withdrawals
router.get('/withdrawals', adminAuth, async (req, res) => {
  try {
    const withdrawals = await Transaction.find({ type: 'withdrawal' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/reject withdrawal


// Get all KYC


// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    // Delete all related data
    await Transaction.deleteMany({ user: userId });
    await Notification.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User and all related data deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message to user
router.post('/users/:id/message', adminAuth, async (req, res) => {
  try {
    const { message } = req.body;
    await User.findByIdAndUpdate(req.params.id, { adminMessage: message });
    res.json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id/message', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { adminMessage: '' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all trades
router.get('/trades', adminAuth, async (req, res) => {
  try {
    const Trade = require('../models/Trade');
    const trades = await Trade.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update trade result and status
router.put('/trades/:id', adminAuth, async (req, res) => {
  try {
    const Trade = require('../models/Trade');
    const { result, status } = req.body;
    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    trade.result = parseFloat(result);
    trade.status = status;
    if (status === 'closed') trade.closedAt = new Date();
    await trade.save();

    // Update user balance and profit if closed
    if (status === 'closed') {
      await User.findByIdAndUpdate(trade.user, {
        $inc: {
          balance: parseFloat(result),
          totalProfit: parseFloat(result) > 0 ? parseFloat(result) : 0,
        }
      });

    // Refund balance if cancelled and trade was real account
    if (status === 'cancelled' && trade.account === 'real') {
      await User.findByIdAndUpdate(trade.user, { $inc: { balance: trade.amount } });
    }
    }

    res.json({ message: 'Trade updated', trade });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete withdrawal
router.delete('/withdrawals/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Withdrawal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all deposits
router.get('/deposits', adminAuth, async (req, res) => {
  try {
    const deposits = await Transaction.find({ type: 'deposit' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject deposit
router.put('/deposits/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    transaction.status = status;
    await transaction.save();

    if (status === 'approved') {
      await User.findByIdAndUpdate(transaction.user, {
        $inc: { balance: transaction.amount, totalDeposits: transaction.amount }
      });

      // AUTO-GRANT PRO: if this deposit was tagged as pro_subscription
      if (transaction.purpose === 'pro_subscription') {
        try {
          const userToUpgrade = await User.findById(transaction.user);
          if (userToUpgrade) {
            const PRO_PRICE = 499;
            const PRO_DAYS = 365;
            const now = new Date();
            const currentExpiry = (userToUpgrade.subscription?.active && userToUpgrade.subscription?.expiresAt && new Date(userToUpgrade.subscription.expiresAt) > now)
              ? new Date(userToUpgrade.subscription.expiresAt)
              : now;
            const expiresAt = new Date(currentExpiry.getTime() + PRO_DAYS * 24 * 60 * 60 * 1000);

            userToUpgrade.subscription = {
              active: true,
              plan: 'Pro',
              startedAt: userToUpgrade.subscription?.startedAt || now,
              expiresAt,
              activatedBy: 'auto_deposit',
            };

            // Deduct Pro subscription fee from balance
            if (userToUpgrade.balance >= PRO_PRICE) {
              userToUpgrade.balance -= PRO_PRICE;
            }
            await userToUpgrade.save();
            console.log('[AUTO-PRO] Granted Pro subscription to', userToUpgrade.email, 'until', expiresAt);
          }
        } catch (proErr) {
          console.error('[AUTO-PRO] Failed to grant Pro:', proErr.message);
        }
      }
    }

    // Send email notification
    try {
      const user = await User.findById(transaction.user);
      if (user) {
        const isApproved = status === 'approved';

        // Extract currency code
        const rawCurrency = user.currency || 'USD';
        let currencyCode = 'USD';
        const currMatch = rawCurrency.match(/\(([A-Z]{3})\)/);
        if (currMatch) currencyCode = currMatch[1];
        else if (rawCurrency.length === 3) currencyCode = rawCurrency.toUpperCase();

        // Amounts
        const usdAmount = parseFloat(transaction.amount) || 0;
        let displayAmount = usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2 });

        // Get updated balance
        const updatedUser = await User.findById(transaction.user);
        const rawBalance = updatedUser ? updatedUser.balance : 0;
        let displayBalance = rawBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });

        try {
          const ratesRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const ratesData = await ratesRes.json();
          const rate = ratesData.rates[currencyCode];

          if (rate && currencyCode !== 'USD') {
            const convertedAmount = usdAmount * rate;
            displayAmount = new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(convertedAmount);

            const convertedBalance = rawBalance * rate;
            displayBalance = new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(convertedBalance);

            console.log(`DEPOSIT CONVERSION: ${usdAmount} USD * ${rate} = ${displayAmount} ${currencyCode}`);
            console.log(`DEPOSIT BALANCE: ${rawBalance} USD * ${rate} = ${displayBalance} ${currencyCode}`);
          }
        } catch (err) {
          console.log('Deposit rate conversion failed, using USD fallback');
        }

        await sendEmail({
          type: isApproved ? 'depositApproved' : 'depositRejected',
          to: user.email,
          name: user.firstName,
          amount: displayAmount,
          currency: currencyCode,
          newBalance: displayBalance
        });
      }
    } catch(emailErr) { console.log('Deposit email error:', emailErr.message); }

    res.json({ message: 'Deposit ' + status, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete deposit
router.delete('/deposits/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deposit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all withdrawals
router.get('/withdrawals', adminAuth, async (req, res) => {
  try {
    const withdrawals = await Transaction.find({ type: 'withdrawal' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/reject withdrawal


// Get all KYC


// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    // Delete all related data
    await Transaction.deleteMany({ user: userId });
    await Notification.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User and all related data deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message to user
router.post('/users/:id/message', adminAuth, async (req, res) => {
  try {
    const { message } = req.body;
    await User.findByIdAndUpdate(req.params.id, { adminMessage: message });
    res.json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id/message', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { adminMessage: '' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all trades
router.get('/trades', adminAuth, async (req, res) => {
  try {
    const Trade = require('../models/Trade');
    const trades = await Trade.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update trade result and status
router.put('/trades/:id', adminAuth, async (req, res) => {
  try {
    const Trade = require('../models/Trade');
    const { result, status } = req.body;
    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    trade.result = parseFloat(result);
    trade.status = status;
    if (status === 'closed') trade.closedAt = new Date();
    await trade.save();

    // Update user balance and profit if closed
    if (status === 'closed') {
      await User.findByIdAndUpdate(trade.user, {
        $inc: {
          balance: parseFloat(result),
          totalProfit: parseFloat(result) > 0 ? parseFloat(result) : 0,
        }
      });

    // Refund balance if cancelled and trade was real account
    if (status === 'cancelled' && trade.account === 'real') {
      await User.findByIdAndUpdate(trade.user, { $inc: { balance: trade.amount } });
    }
    }

    res.json({ message: 'Trade updated', trade });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete withdrawal
router.delete('/withdrawals/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Withdrawal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all deposits
router.get('/deposits', adminAuth, async (req, res) => {
  try {
    const deposits = await Transaction.find({ type: 'deposit' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject deposit
router.put('/deposits/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    transaction.status = status;
    await transaction.save();

    if (status === 'approved') {
      await User.findByIdAndUpdate(transaction.user, {
        $inc: { balance: transaction.amount, totalDeposits: transaction.amount }
      });

      // AUTO-GRANT PRO: if this deposit was tagged as pro_subscription
      if (transaction.purpose === 'pro_subscription') {
        try {
          const userToUpgrade = await User.findById(transaction.user);
          if (userToUpgrade) {
            const PRO_PRICE = 499;
            const PRO_DAYS = 365;
            const now = new Date();
            const currentExpiry = (userToUpgrade.subscription?.active && userToUpgrade.subscription?.expiresAt && new Date(userToUpgrade.subscription.expiresAt) > now)
              ? new Date(userToUpgrade.subscription.expiresAt)
              : now;
            const expiresAt = new Date(currentExpiry.getTime() + PRO_DAYS * 24 * 60 * 60 * 1000);

            userToUpgrade.subscription = {
              active: true,
              plan: 'Pro',
              startedAt: userToUpgrade.subscription?.startedAt || now,
              expiresAt,
              activatedBy: 'auto_deposit',
            };

            // Deduct Pro subscription fee from balance
            if (userToUpgrade.balance >= PRO_PRICE) {
              userToUpgrade.balance -= PRO_PRICE;
            }
            await userToUpgrade.save();
            console.log('[AUTO-PRO] Granted Pro subscription to', userToUpgrade.email, 'until', expiresAt);
          }
        } catch (proErr) {
          console.error('[AUTO-PRO] Failed to grant Pro:', proErr.message);
        }
      }
    }

            // Send email notification
    try {
      const user = await User.findById(transaction.user);
      if (user) {
        const isApproved = status === 'approved';

        // Extract currency code
        const rawCurrency = user.currency || 'USD';
        let currencyCode = 'USD';
        if (rawCurrency.includes('(')) {
          const match = rawCurrency.match(/\(([A-Z]{3})\)/);
          if (match) currencyCode = match[1];
        } else if (rawCurrency.length === 3) {
          currencyCode = rawCurrency.toUpperCase();
        }

        // Convert deposit amount to user local currency
        const baseAmount = transaction.amount || 0;
        let displayAmount = baseAmount.toFixed(2);

        try {
          const ratesRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const ratesData = await ratesRes.json();
          const rate = ratesData.rates[currencyCode] || 1;
          const converted = baseAmount * rate;
          displayAmount = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(converted);
          console.log('DEPOSIT email - baseAmount:', baseAmount, 'rate:', rate, 'converted:', converted, 'currency:', currencyCode);
        } catch (rateErr) {
          console.error('Deposit rate fetch error:', rateErr.message);
        }

        await sendEmail({
          type: isApproved ? 'depositApproved' : 'depositRejected',
          to: user.email,
          name: user.firstName,
          amount: displayAmount,
          currency: currencyCode,
          newBalance: user.balance
        });
      }
    } catch(emailErr) { console.log('Deposit email error:', emailErr.message); }

    res.json({ message: 'Deposit ' + status, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete deposit
router.delete('/deposits/:id', adminAuth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deposit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all withdrawals
router.get('/withdrawals', adminAuth, async (req, res) => {
  try {
    const withdrawals = await Transaction.find({ type: 'withdrawal' }).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject withdrawal
router.put('/withdrawals/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const prevStatus = transaction.status;
    transaction.status = status;
    await transaction.save();

    if (status === 'approved' && prevStatus === 'pending') {
      await User.findByIdAndUpdate(transaction.user, {
        $inc: { totalWithdrawals: transaction.amount }
      });
    } else if (status === 'rejected' && prevStatus === 'pending') {
      await User.findByIdAndUpdate(transaction.user, {
        $inc: { balance: transaction.amount }
      });
    }

    const isApproved = status === 'approved';
    const user = await User.findById(transaction.user);

    if (user) {
      // 1. Extract Currency
      const rawCurrency = user.currency || 'USD';
      let currencyCode = 'USD';
      const currMatch = rawCurrency.match(/\(([A-Z]{3})\)/);
      if (currMatch) currencyCode = currMatch[1];
      else if (rawCurrency.length === 3) currencyCode = rawCurrency.toUpperCase();

      // 2. Fetch exchange rate once
      const usdAmount = parseFloat(transaction.amount) || 0;
      let displayAmount = usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2 });
      
      // Get updated balance after approval/rejection
      const updatedUser = await User.findById(transaction.user);
      const rawBalance = updatedUser ? updatedUser.balance : 0;
      let displayBalance = rawBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });

      try {
        const ratesRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const ratesData = await ratesRes.json();
        const rate = ratesData.rates[currencyCode];

        if (rate && currencyCode !== 'USD') {
          // Convert amount
          const convertedAmount = usdAmount * rate;
          displayAmount = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(convertedAmount);

          // Convert balance
          const convertedBalance = rawBalance * rate;
          displayBalance = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(convertedBalance);

          console.log(`CONVERSION: ${usdAmount} USD * ${rate} = ${displayAmount} ${currencyCode}`);
          console.log(`BALANCE: ${rawBalance} USD * ${rate} = ${displayBalance} ${currencyCode}`);
        }
      } catch (err) {
        console.log('Rate conversion failed, using USD fallback');
      }

      // 3. Send Email
      await sendEmail({
        type: isApproved ? 'withdrawalApproved' : 'withdrawalRejected',
        to: user.email,
        name: user.firstName,
        amount: displayAmount,
        currency: currencyCode,
        newBalance: displayBalance
      });

      // 4. Send Notification
      await Notification.create({
        user: transaction.user,
        title: isApproved ? 'Withdrawal Approved ✅' : 'Withdrawal Rejected ❌',
        message: `Your withdrawal of ${displayAmount} ${currencyCode} ${isApproved ? 'has been approved' : 'was rejected'}.`,
        type: 'withdrawal'
      });
    }

    res.json({ message: 'Withdrawal ' + status, transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all KYC submissions
router.get('/kyc', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ kycStatus: { $in: ['submitted', 'approved', 'rejected'] } }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject KYC
router.put('/kyc/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { kycStatus: status }, { new: true }).select('-password');
    try {
      await sendEmail({
        type: status === 'approved' ? 'kycApproved' : 'kycRejected',
        to: user.email,
        name: user.firstName
      });
    } catch(emailErr) { console.log('KYC email error:', emailErr.message); }
    try {
      await Notification.create({
        user: user._id,
        title: status === 'approved' ? 'KYC Verified' : 'KYC Rejected',
        message: status === 'approved' ? 'Your identity has been verified. You now have full access.' : 'Your KYC was rejected. Please resubmit your documents.',
        type: status === 'approved' ? 'success' : 'error'
      });
    } catch(e) {}
    res.json({ message: 'KYC ' + status, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Send email to user
router.post('/users/:id/email', adminAuth, async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ message: 'Subject and message required' });
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await sendEmail({
      to: user.email,
      type: 'adminMessage',
      name: user.firstName,
      message,
      subject: subject,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

// Send bulk email to all users
router.post('/email/bulk', adminAuth, async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ message: 'Subject and message required' });

    const users = await User.find({ isActive: true }).select('email firstName lastName');
    
    let sent = 0;
    for (const user of users) {
      try {
        await sendEmail({
          to: user.email,
          type: 'adminMessage',
          name: user.firstName,
          subject,
          message,
        });
        sent++;
      } catch(e) {}
    }
    res.json({ message: `Email sent to ${sent} users` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send bulk email', error: err.message });
  }
});

// Get user's bots
router.get('/users/:id/bots', adminAuth, async (req, res) => {
  try {
    const Bot = require('../models/Bot');
    const bots = await Bot.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(bots);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's investments/packages
router.get('/users/:id/investments', adminAuth, async (req, res) => {
  try {
    const Investment = require('../models/Investment');
    const investments = await Investment.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user investment
router.delete('/users/:id/investments/:investmentId', adminAuth, async (req, res) => {
  try {
    const Investment = require('../models/Investment');
    const inv = await Investment.findById(req.params.investmentId);
    if (!inv) return res.status(404).json({ message: 'Investment not found' });

    // If active, return the invested amount to user balance
    if (inv.status === 'active') {
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { balance: inv.amount }
      });
    }

    await Investment.findByIdAndDelete(req.params.investmentId);
    res.json({ message: 'Investment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add manual profit to user
router.post('/users/:id/profit', adminAuth, async (req, res) => {
  try {
    const { amount, note } = req.body;
    if (!amount || isNaN(amount)) return res.status(400).json({ message: 'Valid amount required' });
    const user = await User.findByIdAndUpdate(req.params.id, 
      { $inc: { balance: parseFloat(amount), totalProfit: parseFloat(amount) } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: `$${amount} profit added to ${user.firstName}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Set total profit directly (admin override - replaces, doesn't add)
router.put('/users/:id/total-profit', adminAuth, async (req, res) => {
  try {
    const { totalProfit } = req.body;
    if (totalProfit === undefined || isNaN(totalProfit)) {
      return res.status(400).json({ message: 'Valid totalProfit required' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { totalProfit: parseFloat(totalProfit) } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: `Total profit set to $${totalProfit}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin generate password reset link for user
router.post('/users/:id/reset-password', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(req.params.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${user.email}`;

    res.json({ 
      success: true, 
      resetLink,
      message: 'Reset link generated. Valid for 1 hour. Copy and send to user manually.',
      expiresAt: resetExpires
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Send custom email to user
router.post('/users/:id/email', adminAuth, async (req, res) => {
  try {
    const { subject, message, type } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const sendEmailUtil = require('../utils/sendEmail');
const sendEmail = sendEmailUtil;
    await sendEmail({
      to: user.email,
      type: type || 'custom',
      name: user.firstName,
      subject: subject,
      message: message,
    });
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

// ===================== FEE MANAGEMENT =====================

// Add a fee to user
router.post('/users/:id/fees', adminAuth, async (req, res) => {
  try {
    const { type, label, amount } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { pendingFees: { type, label, amount, paid: false } } },
      { new: true }
    );
    // Send email notification
    const sendEmailUtil = require('../utils/sendEmail');
const sendEmail = sendEmailUtil;
    await sendEmail({
      to: user.email,
      type: 'feeRequired',
      name: user.firstName,
      feeLabel: label,
      feeAmount: amount,
      feeType: type,
    }).catch(() => {});
    res.json({ message: 'Fee added', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a fee from user
router.delete('/users/:id/fees/:feeId', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { pendingFees: { _id: req.params.feeId } } },
      { new: true }
    );
    res.json({ message: 'Fee removed', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark fee as paid (admin override)
router.put('/users/:id/fees/:feeId/paid', adminAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, 'pendingFees._id': req.params.feeId },
      { $set: { 'pendingFees.$.paid': true, 'pendingFees.$.paidAt': new Date() } },
      { new: true }
    );
    res.json({ message: 'Fee marked as paid', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Set registration fee
router.put('/users/:id/registration-fee', adminAuth, async (req, res) => {
  try {
    const { required, amount } = req.body;
    const updateData = { registrationFeeRequired: required, registrationFeeAmount: amount || 0, registrationFeePaid: false };
    if (required) {
      updateData.adminMessage = 'Thank you for registering with us. To fully activate your account and gain access to all features, a one-time registration fee is required. This fee helps us maintain platform security and provide you with a seamless experience. Kindly complete your payment at your earliest convenience to proceed.';
    } else {
      updateData.adminMessage = '';
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'Registration fee updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User pays a fee (deduct from balance)
router.post('/users/:id/fees/:feeId/pay', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const fee = user.pendingFees.id(req.params.feeId);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    if (fee.paid) return res.status(400).json({ message: 'Already paid' });
    if (user.balance < fee.amount) return res.status(400).json({ message: 'Insufficient balance' });
    
    user.balance -= fee.amount;
    fee.paid = true;
    fee.paidAt = new Date();
    await user.save();
    res.json({ message: 'Fee paid', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Test email templates
router.post('/test-email', adminAuth, async (req, res) => {
  try {
    const { type, email } = req.body;
    const sendEmailUtil = require('../utils/sendEmail');
const sendEmail = sendEmailUtil;
    const testData = {
      to: email || 'quantyrexmarkets@gmail.com',
      name: 'Kelvin',
      type: type || 'welcome',
      amount: '500.00',
      currency: '$',
      method: 'Crypto',
      newBalance: '4500.00',
      plan: 'GOLD',
      symbol: 'BTC/USD',
      result: '150.00',
      profit: '250.00',
      botName: 'GOLD BOT',
      code: 'ABC123',
      subject: 'Test Message',
      message: 'This is a test admin message from Quantyrex Markets.',
      reason: 'Document quality was too low. Please resubmit clearer photos.',
    };
    await sendEmail(testData);
    res.json({ message: 'Test email sent to ' + (email || 'quantyrexmarkets@gmail.com') });
  } catch (err) {
    res.status(500).json({ message: 'Failed: ' + err.message });
  }
});


// ========== ADMIN SUBSCRIPTION MANAGEMENT ==========

router.post('/users/:id/subscription/grant', adminAuth, async (req, res) => {
  try {
    const { days = 365 } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = new Date();
    const currentExpiry = (user.subscription?.active && user.subscription?.expiresAt && new Date(user.subscription.expiresAt) > now)
      ? new Date(user.subscription.expiresAt)
      : now;
    const expiresAt = new Date(currentExpiry.getTime() + days * 24 * 60 * 60 * 1000);

    user.subscription = {
      active: true,
      plan: 'Pro',
      startedAt: user.subscription?.startedAt || now,
      expiresAt,
      activatedBy: 'admin',
    };
    await user.save();
    res.json({ success: true, message: 'Pro subscription granted for ' + days + ' days', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/users/:id/subscription/revoke', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { 'subscription.active': false, 'subscription.expiresAt': new Date() } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: 'Subscription revoked', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/users/:id/subscription/extend', adminAuth, async (req, res) => {
  try {
    const { days = 30 } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = new Date();
    const base = (user.subscription?.expiresAt && new Date(user.subscription.expiresAt) > now)
      ? new Date(user.subscription.expiresAt)
      : now;
    const expiresAt = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);

    user.subscription = {
      ...user.subscription,
      active: true,
      plan: 'Pro',
      startedAt: user.subscription?.startedAt || now,
      expiresAt,
    };
    await user.save();
    res.json({ success: true, message: 'Extended by ' + days + ' days', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




// Admin manually adds a deposit for a user (off-platform payment, bonus, adjustment)
router.post('/users/:id/add-deposit', adminAuth, async (req, res) => {
  try {
    const { amount, method, notes, sendEmail: shouldEmail } = req.body;
    const usdAmount = parseFloat(amount);

    if (!usdAmount || isNaN(usdAmount) || usdAmount <= 0) {
      return res.status(400).json({ message: 'Valid amount required' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create approved deposit transaction (record only)
    const transaction = new Transaction({
      user: user._id,
      type: 'deposit',
      amount: usdAmount,
      method: method || 'admin_credit',
      status: 'approved',
      notes: notes || 'Recorded by admin',
      purpose: 'general'
    });
    await transaction.save();

    // ONLY update totalDeposits stat — balance is NOT affected
    user.totalDeposits = (user.totalDeposits || 0) + usdAmount;
    await user.save();

    // Optional email (only when explicitly requested + note provided)
    if (shouldEmail && notes) {
      sendEmailUtil({
        to: user.email,
        type: 'depositConfirmed',
        name: user.firstName,
        amount: usdAmount,
        currency: user.currency || 'USD',
        newBalance: user.balance,
        method: notes
      }).catch(err => console.error('[add-deposit email]', err.message));
    }

    res.json({
      success: true,
      message: shouldEmail ? 'Deposit recorded · email sent' : 'Deposit recorded silently',
      user: user.toObject(),
      transaction
    });
  } catch (err) {
    console.error('[add-deposit]', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark registration fee as paid (admin manually) + send confirmation email
router.put('/users/:id/registration-fee/mark-paid', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { registrationFeePaid: true } },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fire confirmation email (non-blocking)
    sendEmail({
      to: user.email,
      type: 'registrationFeePaid',
      name: user.firstName,
      amount: user.registrationFeeAmount || 0,
      currency: user.currency || 'USD'
    }).catch(err => console.error('[regFeePaid email]', err.message));

    res.json({ success: true, message: 'Registration fee marked as paid · confirmation email sent', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Revoke registration fee requirement entirely
router.put('/users/:id/registration-fee/revoke', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { registrationFeeRequired: false, registrationFeePaid: false, registrationFeeAmount: 0 } },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: 'Registration fee requirement revoked', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;

// Contact form submission
router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });
    if (name.length > 100) return res.status(400).json({ message: 'Name too long' });
    if (message.length > 1000) return res.status(400).json({ message: 'Message too long' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email address' });
    
    // Store in DB as a simple log
    const Contact = require('../models/Contact');
    await Contact.create({ name, email, message });
    
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact messages
router.get('/contacts', adminAuth, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bots
router.get('/bots/all', adminAuth, async (req, res) => {
  try {
    const Bot = require('../models/Bot');
    const bots = await Bot.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(bots);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all stakes
router.get('/stakes/all', adminAuth, async (req, res) => {
  try {
    const Stake = require('../models/Stake');
    const stakes = await Stake.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(stakes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel bot
router.put('/bots/:id/cancel', adminAuth, async (req, res) => {
  try {
    const Bot = require('../models/Bot');
    const bot = await Bot.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json({ success: true, bot });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete bot
router.delete('/bots/:id', adminAuth, async (req, res) => {
  try {
    const Bot = require('../models/Bot');
    await Bot.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel stake
router.put('/stakes/:id/cancel', adminAuth, async (req, res) => {
  try {
    const Stake = require('../models/Stake');
    const stake = await Stake.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json({ success: true, stake });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete stake
router.delete('/stakes/:id', adminAuth, async (req, res) => {
  try {
    const Stake = require('../models/Stake');
    await Stake.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Thu Mar  5 19:10:40 IST 2026

// Update bot earned
router.put('/bots/:id/earned', adminAuth, async (req, res) => {
  try {
    const Bot = require('../models/Bot');
    const bot = await Bot.findByIdAndUpdate(req.params.id, { earned: req.body.earned }, { new: true });
    res.json({ success: true, bot });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update stake earned
router.put('/stakes/:id/earned', adminAuth, async (req, res) => {
  try {
    const Stake = require('../models/Stake');
    const stake = await Stake.findByIdAndUpdate(req.params.id, { earned: req.body.earned }, { new: true });
    res.json({ success: true, stake });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

