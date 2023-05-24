const Joi = require("joi");

const usersJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = usersJoiSchema;
