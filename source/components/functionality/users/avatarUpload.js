const sharp = require('sharp');

const avatarUpload = async (req, res) => {
  const {
    user,
    file,
  } = req;
  const buffer = await sharp(file.buffer).resize({
    width: 250,
    height: 250,
  }).png().toBuffer();
  user.avatar = buffer;
  user.updatedUser = user._id;
  await user.save();
  res.send();
};

module.exports = avatarUpload;
