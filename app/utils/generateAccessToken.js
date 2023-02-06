const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/userSchema');
const { config } = require('../../config');

const { tokenSecret, expirationTime } = config;
const tokenExpiration = expirationTime || 60 * 60 * 24 * 7;
const generateAccessToken = async (data) => {
  const { username, password } = data;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      const error = new Error('Invalid username or password');
      error.name = 'invalidCredentials';
      throw error;
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      const error = new Error('Invalid username or password');
      error.name = 'invalidCredentials';
      throw error;
    }
    const userForToken = {
      // username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, tokenSecret, {
      expiresIn: tokenExpiration,
    });
    return { token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = generateAccessToken;
