const userRouter = require('./users');
const courseRouter = require('./courses');
const languageRouter = require('./languages');
const layoutRouter = require('./layouts');
const loginRouter = require('./login');
const manifestRouter = require('./manifest');
const spaRouter = require('./spa');
const themeRouter = require('./theme');

module.exports = {
  userRouter,
  courseRouter,
  languageRouter,
  layoutRouter,
  loginRouter,
  manifestRouter,
  spaRouter,
  themeRouter,
};
