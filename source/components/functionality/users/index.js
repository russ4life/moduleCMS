const register = require('./register');
const login = require('./login');
const logout = require('./login');
const logoutAll = require('./logoutAll');
const updateMe = require('./updateMe');
const deleteMe = require('./deleteMe');
const avatarUpload = require('./avatarUpload');
const avatarError = require('./avatarError');
const avatarDelete = require('./avatarDelete');
const avatar = require('./avatar');

module.exports = {
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
};
