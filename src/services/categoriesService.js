const { Category } = require('../models');
const { validateNameCategory } = require('./validations/validationsInputValues');

const createCategory = async (name) => {
  const error = validateNameCategory(name);
  
  if (error) {
    return {
      status: error.status,
      data: { message: error.message },
    };
  }

  const createdCategory = await Category.create({ name });
  return { status: 'CREATED', data: createdCategory.dataValues };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};