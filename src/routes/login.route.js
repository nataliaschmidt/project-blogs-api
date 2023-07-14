const loginRoute = require('express').Router();
const { loginController } = require('../controllers');

loginRoute.post('/', loginController.loginUser);

module.exports = loginRoute;