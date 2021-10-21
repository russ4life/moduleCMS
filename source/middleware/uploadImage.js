const multer = require('multer');

const uploadImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      return cb(new Error('File must be an Image'), undefined);
    }
    cb(undefined, true);
  },
});

module.exports = uploadImage;
