const { BlogPost, Category } = require('../models');

const isCategoryValidate = async (categoryIds) => {
  const isCategoryExistPromise = categoryIds.map((catId) => Category.findByPk(catId));
  const isCategoryNull = await (await Promise.all(isCategoryExistPromise))
    .some((cat) => cat === null);
  if (isCategoryNull) {
    return { status: 'INVALID_VALUE', data: { message: 'one or more "categoryIds" not found' } };
  }
};

const validateFieldsPost = (title, content, categoryIds) => {
  const validateFields = title && content && categoryIds;
  if (!validateFields) {
    return { status: 'INVALID_VALUE', data: { message: 'Some required fields are missing' } };
  }
};

const createPost = async (title, content, categoryIds, userId) => {
  const isNotvalidateFields = validateFieldsPost(title, content, categoryIds);
  if (isNotvalidateFields) { return isNotvalidateFields; }

  const isCategoryNotExist = await isCategoryValidate(categoryIds);
  if (isCategoryNotExist) { return isCategoryNotExist; }
  
      const newPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
      );
      await newPost.setCategories(categoryIds);
      return { status: 'CREATED', data: newPost };
};

module.exports = {
  createPost,
};

// try {
//   const result = await sequelize.transaction(async (t) => {
//     const newPost = await BlogPost.create(
//       { title, content, userId, published: new Date(), updated: new Date() },
//       { transaction: t },
//     );
//     await newPost.setCategories(categoryIds);
//     return { status: 'CREATED', data: newPost };
//   });

//   return result;
// } catch (error) {
//   console.log('CAI NO ERRO', error);
//   throw error;
// }