const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');
const { createDeposit, getDeposits } = require('../controllers/depositController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, requireSubscription, upload.single('proof'), createDeposit);
router.get('/', auth, getDeposits);

module.exports = router;
