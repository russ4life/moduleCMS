const { User } = require('../../../models');

const login = async (req, res) => {
  const {
    body,
  } = req;
  const {
    email,
    password,
  } = body;
  try {
    const user = await User.findByCredentials(User, email, password);
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = login;
