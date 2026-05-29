const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');
const { joinPlan, getInvestments } = require('../controllers/packagesController');

router.post('/', auth, requireSubscription, joinPlan);
router.get('/', auth, getInvestments);

module.exports = router;
