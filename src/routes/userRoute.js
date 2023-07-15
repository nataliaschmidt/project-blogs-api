const userRouter = require('express').Router();
const { userController } = require('../controllers');

userRouter.post('/', userController.createUser);

module.exports = userRouter;