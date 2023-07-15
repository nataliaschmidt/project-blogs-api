const categoriesRouter = require('express').Router();
const { categoriesController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

categoriesRouter.post('/', validateJwt, categoriesController.createCategory);

module.exports = categoriesRouter;