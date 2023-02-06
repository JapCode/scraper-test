const articleRouter = require('express').Router();
const {
  getAllArticles,
  deleteArticle,
  deleteAllArticles,
  getFilterArticles,
} = require('../controller/articlesController');

const {
  removeArticleReference,
} = require('../middleware/deleArticleReference');
const { userExtractor } = require('../middleware/userExtractor');

articleRouter.get('/', [userExtractor], getAllArticles);
articleRouter.get('/filter', [userExtractor], getFilterArticles);
articleRouter.delete('/delete', [userExtractor], deleteAllArticles);
articleRouter.delete(
  '/delete/:deleteId',
  [userExtractor, removeArticleReference],
  deleteArticle,
);
module.exports = { articleRouter };
