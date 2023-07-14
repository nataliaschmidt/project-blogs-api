const { User } = require('../models');

const getByUserEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  getByUserEmail,
};