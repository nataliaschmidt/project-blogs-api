const { Op } = require('sequelize');
const { BlogPost, Category, User, sequelize } = require('../models');

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
  if (isNotvalidateFields) return isNotvalidateFields;

  const isCategoryNotExist = await isCategoryValidate(categoryIds);
  if (isCategoryNotExist) return isCategoryNotExist;

  const result = await sequelize.transaction(async (t) => {
  const newPost = await BlogPost.create(
    { title, content, userId, published: new Date(), updated: new Date() },
    { transaction: t },
  );
  await newPost.setCategories(categoryIds, { transaction: t });
  return { status: 'CREATED', data: newPost };
});
return result;
};

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
      },
    ],
  });

  return {
    status: 'SUCCESSFUL',
    data: posts,
  };
};

const findPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
      },
    ],
  });

  if (!post) {
    return {
      status: 'NOT_FOUND', data: { message: 'Post does not exist' },
    };
  }

  return { status: 'SUCCESSFUL', data: post };
};

const updatePost = async (id, title, content, userId) => {
  if (!title || !content) {
    return { status: 'INVALID_VALUE', data: { message: 'Some required fields are missing' } };
  }

  if (Number(userId) === Number(id)) {
    await BlogPost.update(
      { title, content, updated: new Date() },
      { where: { id } },
    );
    const post = await findPostById(id);
    return { status: 'SUCCESSFUL', data: post.data };
  }
  return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
};

const deletePost = async (id, userId) => {
  const post = await findPostById(id);

  if (post.status === 'NOT_FOUND') {
    return post;
  }

  const userIdPost = post.data.dataValues.userId;

  if (Number(userIdPost) === Number(userId)) {
    await BlogPost.destroy({ where: { id } });
    return { status: 'DELETED' };
  }
  return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
};

const findByQueryParams = async (q) => {
  const findPost = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
      },
    ] });

  if (findPost.length === 0) {
    return { status: 'SUCCESSFUL', data: findPost };
  }

  const posts = findPost.map((post) => post.dataValues);
  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
  deletePost,
  findByQueryParams,
};

// const result = await sequelize.transaction(async (t) => {
//   const newPost = await BlogPost.create(
//     { title, content, userId, published: new Date(), updated: new Date() },
//     { transaction: t },
//   );
//   await newPost.setCategories(categoryIds);
//   return { status: 'CREATED', data: newPost };
// });

// return result;

// ACALHANDO O CODIGO DAQUI