const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (file, folder = 'vertextrade') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        type: 'upload',
        access_mode: 'public',
        use_filename: false,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY ERROR]', JSON.stringify({
            message: error.message,
            http_code: error.http_code,
            name: error.name,
          }));
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
