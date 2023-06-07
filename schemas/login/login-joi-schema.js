const Joi = require("joi");

const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginJoiSchema;
