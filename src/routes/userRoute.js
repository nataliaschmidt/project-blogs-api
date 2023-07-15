const userRouter = require('express').Router();
const { userController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

userRouter.post('/', userController.createUser);
userRouter.get('/', validateJwt, userController.findAllUser);
userRouter.get('/:id', validateJwt, userController.findUserById);
module.exports = userRouter;