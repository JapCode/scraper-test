const { UserModel } = require('../model/userSchema');
const { encryptPassword } = require('../utils/encryptPassword');

function getUser(req, res, next) {
  try {
    const user = {
      name: 'pepe',
      password: 'paawaaa',
    };
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
async function createUser(req, res, next) {
  const { body } = req;
  const { username, email, password } = body;
  try {
    if (password.length > 8) {
      const securePassword = await encryptPassword(password);
      const user = await new UserModel({
        username,
        email,
        password: securePassword,
      });
      await user.save();
      res.status(200).json({ username, email, password });
    } else {
      res
        .status(400)
        .json({ message: 'Your password must have more than 8 characters' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
}
module.exports = { getUser, createUser };
