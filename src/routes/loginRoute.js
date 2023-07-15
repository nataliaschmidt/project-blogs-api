const loginRouter = require('express').Router();
const { loginController } = require('../controllers');

loginRouter.post('/', loginController.loginUser);

module.exports = loginRouter;