const avatarError = (error, req, res) => {
  res.status(400).send({
    error: error.message,
  });
};

module.exports = avatarError;
