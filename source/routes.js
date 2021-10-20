const {
  courseRouter,
  languageRouter,
  layoutRouter,
  loginRouter,
  manifestRouter,
  spaRouter,
  themeRouter,
  userRouter,
} = require('./routers');

const Routes = {
  app: {},
  loadRoutes: (app) => {
    app.use('/api/courses', courseRouter);
    app.use('/api/languages', languageRouter);
    app.use('/api/layouts', layoutRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/manifest', manifestRouter);
    app.use('/api/spa', spaRouter);
    app.use('/api/theme', themeRouter);
    app.use('/api/users', userRouter);
  },
  apidRoutes: () => {
  },
};

module.exports = Routes;
