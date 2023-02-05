const express = require('express');
const cors = require('cors');
const { routerApi } = require('./app/routes');
const errorHandler = require('./app/middleware/errorHandler');

const createApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  // app.use(express.static(path.join(__dirname, 'public')));
  // console.log(path.join(__dirname, 'public'));
  routerApi(app);
  app.use(errorHandler);
  return app;
};
module.exports = createApp;
