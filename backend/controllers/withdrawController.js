const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { extractCurrencyCode, getSymbol } = require('../utils/currency');

// ✅ Simple exchange rates to USD (update or use live API if needed)
const EXCHANGE_RATES_TO_USD = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  NGN: 0.00065,
  INR: 0.012,
  GHS: 0.067,
  KES: 0.0077,
  ZAR: 0.054,
  CAD: 0.73,
  AUD: 0.65,
  JPY: 0.0066,
  CNY: 0.14,
  CHF: 1.11,
  AED: 0.27,
  SAR: 0.27,
  BRL: 0.20,
  MXN: 0.058,
  UGX: 0.00027,
  TZS: 0.00039,
  PKR: 0.0036,
  BDT: 0.0091,
  PHP: 0.018,
  IDR: 0.000064,
  MYR: 0.21,
  SGD: 0.74,
  HKD: 0.13,
  KRW: 0.00075,
  THB: 0.028,
  VND: 0.000040,
  TRY: 0.031,
  RUB: 0.011,
  EGP: 0.021,
  NZD: 0.60,
  SEK: 0.095,
  NOK: 0.094,
  DKK: 0.145,
  PLN: 0.25,
};

function convertToUSD(amount, currencyCode) {
  const rate = EXCHANGE_RATES_TO_USD[currencyCode] || 1;
  return parseFloat((amount * rate).toFixed(2));
}

exports.createWithdrawal = async (req, res) => {
  try {
    const {
      amount, method, walletAddress, coin, network,
      accountEmail, receiverName, receiverAddress, receiverPhone,
      bankName, accountName, accountNumber, routingNumber
    } = req.body;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
      return res.status(400).json({ message: 'Invalid withdrawal amount' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Extract user currency info
    const currencyCode = extractCurrencyCode(user.currency);
    const currencySymbol = getSymbol(currencyCode);

    // ✅ FIX: Extract user currency properly

    // ✅ FIX: Balance check uses correct currency symbol
    if (user.balance < parseFloat(amount))
      return res.status(400).json({
        message: `Insufficient balance. Your balance is ${currencySymbol}${user.balance.toFixed(2)}`
      });

    if (user.kycStatus !== 'approved')
      return res.status(400).json({ message: 'KYC verification required before withdrawing funds' });

    if (user.withdrawalBlocked)
      return res.status(400).json({ message: 'Your withdrawals have been temporarily suspended. Please contact support.' });

    if (!user.accountUpgraded)
      return res.status(400).json({
        message: 'Account upgrade required before withdrawing funds.',
        blockType: 'accountUpgrade',
        currentLimit: user.minimumWithdrawal || 100
      });

    if (user.withdrawalCodeRequired) {
      const { withdrawalCode } = req.body;
      if (!withdrawalCode)
        return res.status(400).json({ message: 'Withdrawal code is required. Please enter your withdrawal code.' });
      if (withdrawalCode !== user.withdrawalCode)
        return res.status(400).json({ message: 'Invalid withdrawal code. Please check and try again.' });
    }

    const withdrawalLimit = user.minimumWithdrawal || 100;
    if (parseFloat(amount) > withdrawalLimit) {
      return res.status(400).json({
        // ✅ FIX: Use correct currency symbol in limit message
        message: `Maximum allowed withdrawal is ${currencySymbol}${withdrawalLimit}`
      });
    }

    if (user.registrationFeeRequired && !user.registrationFeePaid) {
      return res.status(400).json({
        message: 'Registration fee payment required before withdrawing.',
        blockType: 'registrationFee',
        feeAmount: user.registrationFeeAmount,
      });
    }

    const unpaidFees = user.pendingFees ? user.pendingFees.filter(f => !f.paid) : [];
    if (unpaidFees.length > 0) {
      return res.status(400).json({
        message: 'You have outstanding fees that must be paid before withdrawing.',
        blockType: 'pendingFees',
        fees: unpaidFees,
      });
    }

    // Build payment details
    let bankDetails = {};
    if (method === 'crypto') bankDetails = { coin, network, walletAddress };
    else if (method === 'cashapp' || method === 'paypal') bankDetails = { accountEmail };
    else if (method === 'western_union' || method === 'moneygram') bankDetails = { receiverName, receiverAddress, receiverPhone };
    else if (method === 'bank') bankDetails = { bankName, accountName, accountNumber, routingNumber };

    // ✅ FIX: Convert to USD for backend record keeping
    const amountUSD = convertToUSD(parseFloat(amount), currencyCode);

    // Deduct balance
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        balance: -parseFloat(amount),
        totalWithdrawals: parseFloat(amount)
      }
    });

    // ✅ FIX: Save currency info with transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'withdrawal',
      amount: parseFloat(amount),
      currency: currencyCode,
      currencySymbol: currencySymbol,
      amountUSD: amountUSD,
      method,
      walletAddress: method === 'crypto' ? walletAddress : '',
      bankDetails,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Withdrawal request submitted',
      transaction,
      // ✅ Return currency info to frontend
      currency: currencyCode,
      currencySymbol: currencySymbol,
      displayAmount: `${currencySymbol}${parseFloat(amount).toFixed(2)}`
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Transaction.find({
      user: req.user._id,
      type: 'withdrawal'
    }).sort({ createdAt: -1 });

    // ✅ FIX: Attach user currency to each withdrawal if missing
    const user = await User.findById(req.user._id);

    const enriched = withdrawals.map(w => ({
      ...w.toObject(),
      currency: w.currency || currencyCode,
      currencySymbol: w.currencySymbol || currencySymbol,
      displayAmount: `${w.currencySymbol || currencySymbol}${w.amount.toFixed(2)}`
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
