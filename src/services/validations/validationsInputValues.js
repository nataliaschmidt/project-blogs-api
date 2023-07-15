const { newUserSchema } = require('./schema');

const validateNewUser = (userInfo) => {
  const { error } = newUserSchema.validate(userInfo);
 if (error) {
  return {
    status: 'INVALID_VALUE',
    message: error.message,
  };
 }
};

module.exports = {
  validateNewUser,
};