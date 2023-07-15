const joi = require('joi');

const newUserSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const newCategory = joi.string().required().messages({
  'any.required': '"name" is required',
});

module.exports = {
  newUserSchema,
  newCategory,
};