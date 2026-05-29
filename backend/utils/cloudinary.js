const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (file, folder = 'vertextrade') => {
  // Try direct upload via raw API as backup
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY ERROR]', error.message, '| code:', error.http_code, '| name:', error.name);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(file.buffer);
  });
};

module.exports = { cloudinary, uploadToCloudinary };
