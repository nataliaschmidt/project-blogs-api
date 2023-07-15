const joi = require('joi');

const newUserSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

module.exports = {
  newUserSchema,
};