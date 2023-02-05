const usersRouter = require('express').Router();
const { getUser, createUser } = require('../controller/usersController');

usersRouter.get('/', getUser);
usersRouter.post('/newUser', createUser);
module.exports = { usersRouter };
