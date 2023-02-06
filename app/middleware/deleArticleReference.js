const { ArticlesModel } = require('../model/articlesSchema');
const { UserModel } = require('../model/userSchema');

async function removeArticleReference(req, res, next) {
  try {
    const { deleteId: articleId } = req.params;
    const { id } = req;
    console.log(id);
    const article = await ArticlesModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.articles.pull(articleId);
    await user.save();
    req.article = article;
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = { removeArticleReference };
