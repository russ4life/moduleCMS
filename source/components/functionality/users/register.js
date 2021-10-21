const { User } = require('../../../models');

// const {
//   sendWelcomeEmail,
// } = require('../emails/account');

const register = async (req, res) => {
  try {
    const { body } = req;
    const user = new User(body);
    await user.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = register;
