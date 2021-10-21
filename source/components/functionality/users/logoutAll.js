const logoutAll = async (req, res) => {
  try {
    const {
      user,
    } = req;
    user.tokens = [];
    user.updatedUser = user._id;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = logoutAll;
