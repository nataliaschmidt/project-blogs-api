const postRouter = require('express').Router();
const { postController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

postRouter.post('/', validateJwt, postController.createPost);

module.exports = postRouter;