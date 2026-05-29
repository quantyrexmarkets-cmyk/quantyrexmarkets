const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');
const { createTrade, getTrades, getTradeStats } = require('../controllers/tradeController');

router.post('/', auth, requireSubscription, createTrade);
router.get('/', auth, getTrades);
router.get('/stats', auth, getTradeStats);

module.exports = router;
