const { ArticlesModel } = require('../model/articlesSchema');
const { UserModel } = require('../model/userSchema');

async function getAllArticles(req, res, next) {
  try {
    const articles = await ArticlesModel.find({});
    if (articles.length > 0) {
      res
        .status(200)
        .json({ message: 'All articles found successfully', articles });
    } else {
      res.status(404).json({ message: 'Articles are empty' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function getFilterArticles(req, res, next) {
  const { scrapingBy, author, category } = req.query;
  try {
    const filter = {};
    if (scrapingBy) {
      const user = await UserModel.findOne({
        username: { $regex: new RegExp(`^${scrapingBy}$`, 'i') },
      });
      if (user) {
        console.log(user);
        filter.scraping_by = user._id;
      } else {
        res.status(404).json({ message: 'No users found with that name' });
        return;
      }
    }
    if (author) filter.author = { $regex: new RegExp(`^${author}$`, 'i') };
    if (category)
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };

    const articles = await ArticlesModel.find(filter);
    console.log(articles);
    if (articles > 0) {
      res.status(200).json(articles);
    } else {
      res
        .status(400)
        .json({ message: 'Could not find articles using the filter data' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
}
async function deleteArticle(req, res, next) {
  const { deleteId } = req.params;
  try {
    const deletedArticle = await ArticlesModel.findByIdAndDelete(deleteId);
    if (!deletedArticle) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json({ message: 'Article deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function deleteAllArticles(req, res, next) {
  const { id } = req;
  try {
    await ArticlesModel.deleteMany({ scraping_by: id });
    const user = await UserModel.findByIdAndUpdate(id, {
      $set: { articles: [] },
    });
    res.status(200).json({ message: 'Articles deleted successfully', user });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports = {
  getAllArticles,
  deleteArticle,
  deleteAllArticles,
  getFilterArticles,
};
