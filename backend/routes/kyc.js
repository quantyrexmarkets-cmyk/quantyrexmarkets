const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { submitKyc, getKycStatus } = require('../controllers/kycController');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 3
  },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|pdf/i;
    const mimeOk = allowed.test(file.mimetype);
    if (mimeOk) return cb(null, true);
    cb(new Error('Only JPG, PNG, WEBP or PDF files are allowed'));
  }
});

// Wrap multer to catch its errors and return clean JSON
const kycUpload = (req, res, next) => {
  upload.fields([
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: 'File too large. Each document must be under 5MB. Please compress and try again.'
        });
      }
      return res.status(400).json({ message: err.message || 'Upload failed' });
    }
    next();
  });
};

router.post('/', auth, kycUpload, submitKyc);
router.get('/', auth, getKycStatus);

module.exports = router;
