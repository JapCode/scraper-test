const scraperRouter = require('express').Router();
const { getNews } = require('../controller/scraperController');
const { userExtractor } = require('../middleware/userExtractor');

scraperRouter.post('/', [userExtractor], getNews);

module.exports = { scraperRouter };
