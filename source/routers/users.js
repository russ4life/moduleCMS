const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();

const { User } = require('../models');
const auth = require('../middleware/auth');
// const {
//   sendWelcomeEmail,
//   sendCancelationEmail,
// } = require('../emails/account');

router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
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
});

router.post('/login', async (req, res) => {
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
});

router.post('/logout', auth, async (req, res) => {
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
});

router.post('/logoutAll', auth, async (req, res) => {
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
});

router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/me', auth, async (req, res) => {
  const {
    body,
    user,
  } = req;
  const updates = Object.keys(body);
  const allowedUpdates = [
    'firstName',
    'middleName',
    'lastName',
    'userName',
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
});

router.delete('/me', auth, async (req, res) => {
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
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      return cb(new Error('File must be an Image'), undefined);
    }
    cb(undefined, true);
  },
});

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
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
}, (error, req, res) => {
  res.status(400).send({
    error: error.message,
  });
});

router.delete('/me/avatar', auth, async (req, res) => {
  const {
    user,
  } = req;
  user.avatar = undefined;
  user.updatedUser = user._id;
  await user.save();
  res.send();
});

router.get('/:id/avatar', async (req, res) => {
  try {
    const {
      params,
    } = req;
    const {
      id,
    } = params;
    const avatar = await User.findById(id);
    if (!avatar || !avatar.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png').send(avatar.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
