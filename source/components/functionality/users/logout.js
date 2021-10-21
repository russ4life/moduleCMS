const logout = async (req, res) => {
  try {
    const {
      user,
      token,
    } = req;
    const {
      tokens,
    } = user;
    user.tokens = tokens.filter((tokenArrayItem) => (tokenArrayItem.token !== token));
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = logout;
