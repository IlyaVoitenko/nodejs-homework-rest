const Joi = require("joi");

const usersJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = usersJoiSchema;
