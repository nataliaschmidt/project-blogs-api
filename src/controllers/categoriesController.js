const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
const { status, data } = await categoriesService.createCategory(name);
return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};