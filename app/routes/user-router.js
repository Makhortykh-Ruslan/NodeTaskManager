const express = require('express');
const userController = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.route('/').get(userController.getUsers);

userRouter.route('/:id').delete(userController.deleteUser);

userRouter.route('/create').post(userController.createUser);
userRouter.route('/login').post(userController.login);

module.exports = userRouter;
