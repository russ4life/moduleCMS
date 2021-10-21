const { User } = require('../../../models');

const avatar = async (req, res) => {
  try {
    const {
      params,
    } = req;
    const {
      id,
    } = params;
    const user = await User.findById(id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png').send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
};

module.exports = avatar;
