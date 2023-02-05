const express = require('express');
const { usersRouter } = require('./usersRouter');
const { scraperRouter } = require('./scraperRouter');

const router = express.Router();
function routerApi(app) {
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/scraper', scraperRouter);
}
module.exports = { routerApi };
