const express = require('express');

const router = new express.Router();

const { auth, uploadImage } = require('../middleware');

const {
  register,
  login,
  logout,
  logoutAll,
  updateMe,
  deleteMe,
  avatarUpload,
  avatarError,
  avatarDelete,
  avatar,
} = require('../components/functionality/users');

router.post('/', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/logoutAll', auth, logoutAll);
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});
router.patch('/me', auth, updateMe);
router.delete('/me', auth, deleteMe);
router.post('/me/avatar', auth, uploadImage.single('avatar'), avatarUpload, avatarError);
router.delete('/me/avatar', auth, avatarDelete);

router.get('/:id/avatar', avatar);

module.exports = router;
