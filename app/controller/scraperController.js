/* eslint-disable consistent-return */
const { ArticlesModel } = require('../model/articlesSchema');
const { UserModel } = require('../model/userSchema');
const { scraperArticle } = require('../utils/scraperArticle');

async function getNews(req, res, next) {
  const { id, body } = req;
  const { category, items } = body;
  try {
    let someExist = false;
    const articles = await scraperArticle(category, items);
    const savedArticles = await Promise.all(
      articles.map(async (item) => {
        const existingArticle = await ArticlesModel.findOne({
          source: item.sourceLink,
        });
        if (!existingArticle) {
          const article = new ArticlesModel({
            title: item.title,
            author: item.author,
            published_at: item.publishedAt,
            category: item.category,
            source: item.sourceLink,
            description: item.bodyDescription,
            scraping_by: id,
          });
          await article.save();
          const user = await UserModel.findById(id);
          user.articles.push(article.id);
          await user.save();
          return article;
        }
        someExist = true;
      }),
    );
    if (someExist) {
      res.status(409).json({
        message: 'some items already exist and not saved',
      });
    } else {
      res
        .status(200)
        .json({ message: 'Search find successfully', savedArticles });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getNews };
