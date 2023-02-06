const { UserModel } = require('../model/userSchema');
const { editUserData } = require('../utils/editUserData');
const { encryptPassword } = require('../utils/encryptPassword');
const generateAccessToken = require('../utils/generateAccessToken');

async function getAllUsers(req, res, next) {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
async function getUser(req, res, next) {
  const { id } = req;
  try {
    const users = await UserModel.findById(id).populate('articles');
    res.status(200).json(users);
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
async function editUser(req, res, next) {
  const { body, id } = req;
  const { username, email, password } = body;
  try {
    await editUserData(id, { username, email, password });
    res.status(200).json({ message: 'update successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
async function loginUser(req, res, next) {
  const { body } = req;
  const { username, password } = body;
  try {
    const token = await generateAccessToken({ username, password });
    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
module.exports = { getAllUsers, getUser, createUser, editUser, loginUser };
