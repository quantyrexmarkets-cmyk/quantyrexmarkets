const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');
const { createWithdrawal, getWithdrawals } = require('../controllers/withdrawController');

router.post('/', auth, requireSubscription, createWithdrawal);
router.get('/', auth, getWithdrawals);

module.exports = router;
