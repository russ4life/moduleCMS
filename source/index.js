/* eslint-disable no-console */
const { app, port } = require('./app');

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
