const { Category } = require('../models');
const { validateNameCategory } = require('./validations/validationsInputValues');

const createCategory = async (name) => {
  const error = validateNameCategory(name);
console.log(error);
  if (error) {
    return {
      status: error.status,
      data: { message: error.message },
    };
  }

  const createdCategory = await Category.create({ name });
  return { status: 'CREATED', data: createdCategory.dataValues };
};

module.exports = {
  createCategory,
};