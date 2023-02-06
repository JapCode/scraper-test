const usersRouter = require('express').Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  editUser,
  getUser,
} = require('../controller/usersController');
const { userExtractor } = require('../middleware/userExtractor');

usersRouter.get('/', [userExtractor], getAllUsers);
usersRouter.get('/account', [userExtractor], getUser);
usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.patch('/edit', [userExtractor], editUser);
module.exports = { usersRouter };
