const postRouter = require('express').Router();
const { postController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

postRouter.get('/', validateJwt, postController.findAllPosts);
postRouter.get('/:id', validateJwt, postController.findPostById);
postRouter.post('/', validateJwt, postController.createPost);

module.exports = postRouter;