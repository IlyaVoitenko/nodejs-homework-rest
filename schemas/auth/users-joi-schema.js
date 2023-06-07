const Joi = require("joi");

const usersJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyUserAgain = Joi.object({
  email: Joi.string().required(),
});

module.exports = { usersJoiSchema, verifyUserAgain };
