const postRouter = require('express').Router();
const { postController } = require('../controllers');
const validateJwt = require('../middleware/validateJWT');

postRouter.get('/', validateJwt, postController.findAllPosts);
postRouter.get('/:id', validateJwt, postController.findPostById);
postRouter.post('/', validateJwt, postController.createPost);
postRouter.put('/:id', validateJwt, postController.updatePost);
postRouter.delete('/:id', validateJwt, postController.deletePost);
module.exports = postRouter;