const updateMe = async (req, res) => {
  const {
    body,
    user,
  } = req;
  const updates = Object.keys(body);
  const allowedUpdates = [
    'firstname',
    'middlename',
    'lastname',
    'username',
    'email',
    'password',
    'language',
    'live',
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates',
    });
  }
  try {
    updates.forEach((update) => {
      user[update] = body[update];
    });
    user.updatedUser = user._id;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = updateMe;
