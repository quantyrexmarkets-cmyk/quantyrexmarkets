const { uploadToCloudinary } = require('../utils/cloudinary');
const User = require('../models/User');

exports.submitKyc = async (req, res) => {
  try {
    const { idType, idNumber } = req.body;

    if (!idType || !idNumber) {
      return res.status(400).json({ message: 'ID type and number are required.' });
    }

    if (!req.files || !req.files.idFront || !req.files.idBack || !req.files.selfie) {
      return res.status(400).json({ message: 'All documents (ID front, back, and selfie) are required.' });
    }

    // Upload all three images to Cloudinary in parallel
    let idFrontUrl, idBackUrl, selfieUrl;
    try {
      const [front, back, selfie] = await Promise.all([
        uploadToCloudinary(req.files.idFront[0], 'kyc'),
        uploadToCloudinary(req.files.idBack[0], 'kyc'),
        uploadToCloudinary(req.files.selfie[0], 'kyc'),
      ]);
      idFrontUrl = front.secure_url;
      idBackUrl = back.secure_url;
      selfieUrl = selfie.secure_url;
    } catch (uploadErr) {
      console.error('[KYC] Cloudinary upload failed:', uploadErr.message);
      return res.status(500).json({
        message: 'Failed to upload documents. Please ensure images are clear and under 5MB each, then try again.',
        error: uploadErr.message
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      kycStatus: 'submitted',
      kycData: {
        idType,
        idNumber,
        idFront: idFrontUrl,
        idBack: idBackUrl,
        selfie: selfieUrl,
        submittedAt: new Date(),
      },
    });

    res.json({ success: true, message: 'KYC submitted successfully. Under review.' });
  } catch (err) {
    console.error('[KYC] Submit error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getKycStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('kycStatus kycData');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
