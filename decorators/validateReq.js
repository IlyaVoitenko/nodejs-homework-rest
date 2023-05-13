const { ErrorHttp } = require("../helpers");

const validateRequire = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw next(ErrorHttp(400, error.message));
    next(error);
  };
};

module.exports = validateRequire;
