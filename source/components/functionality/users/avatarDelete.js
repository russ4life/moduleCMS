const avatarDelete = async (req, res) => {
  const {
    user,
  } = req;
  user.avatar = undefined;
  user.updatedUser = user._id;
  await user.save();
  res.send();
};

module.exports = avatarDelete;
