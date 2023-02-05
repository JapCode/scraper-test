const scraperRouter = require('express').Router();
const { getNews } = require('../controller/scraperController');

scraperRouter.get('/', getNews);
module.exports = { scraperRouter };
