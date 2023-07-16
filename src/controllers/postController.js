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

const findAllPosts = async (_req, res) => {
  try {
    const { status, data } = await postService.findAllPosts();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await postService.findPostById(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const userId = req.payload.data.id;
    const { id } = req.params;
    const { title, content } = req.body;
    const { status, data } = await postService.updatePost(id, title, content, userId);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.payload.data.id;
    const { id } = req.params;
    const { status, data } = await postService.deletePost(id, userId);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findByQueryParams = async (req, res) => {
  try {
    const { q } = req.query;
    const { status, data } = await postService.findByQueryParams(q);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
  deletePost,
  findByQueryParams,
};