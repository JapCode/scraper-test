const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const { tokenSecret } = config;

function userExtractor(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, tokenSecret);
    req.id = decodedToken.id;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports = { userExtractor };
