const express = require('express');

require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const Routes = require('./routes');

Routes.loadRoutes(app);

module.exports = {
  app,
  port,
};
