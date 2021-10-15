const {
  userRouter,
  courseRouter,
  languageRouter,
  layoutRouter,
} = require('./routers');

const Routes = {
  loadRoutes: (app) => {
    app.use('/users', userRouter);
    app.use('/courses', courseRouter);
    app.use('/languages', languageRouter);
    app.use('/layouts', layoutRouter);
  },
};

module.exports = Routes;
