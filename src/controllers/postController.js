const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  try {
    const userId = req.payload.data.id;
    const { title, content, categoryIds } = req.body;
    const { status, data } = await postService.createPost(title, content, categoryIds, userId);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllPosts = async (req, res) => {
  try {
    const { status, data } = await postService.findAllPosts();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  findAllPosts,
};