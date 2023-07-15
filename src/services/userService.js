const { User } = require('../models');
const { validateNewUser } = require('./validations/validationsInputValues');

const getByUserEmail = (email) => User.findOne({ where: { email } });

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

module.exports = {
  getByUserEmail,
  createUser,
};