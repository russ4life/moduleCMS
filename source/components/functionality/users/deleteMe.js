// const {
//   sendCancelationEmail,
// } = require('../emails/account');

const deleteMe = async (req, res) => {
  try {
    const {
      user,
    } = req;
    await user.remove();
    // sendCancelationEmail(user.email, user.name);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = deleteMe;
