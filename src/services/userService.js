const { User } = require('../models');
const { validateNewUser } = require('./validations/validationsInputValues');

const getByUserEmail = (email) => User.findOne({ where: { email } });

const findAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

const findUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: user };
};

const createUser = async ({ displayName, email, password, image }) => {
  const error = validateNewUser({ displayName, email, password, image });

  if (error) {
    return {
      status: error.status,
      data: { message: error.message },
    };
  }

  const isEmailExist = await getByUserEmail(email);
  if (isEmailExist) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const createdUser = await User.create({ displayName, email, password, image });

  return {
    status: 'CREATED',
    data: createdUser.dataValues,
  };
};

const deleteUser = async (userId) => {
const userDeleted = await User.destroy({ where: { id: userId } });

if (userDeleted !== 0) {
  return { status: 'DELETED' };
} 
return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
};

module.exports = {
  getByUserEmail,
  findAllUser,
  findUserById,
  createUser,
  deleteUser,
};