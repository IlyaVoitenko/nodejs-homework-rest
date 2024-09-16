const { isValidObjectId } = require("mongoose");

const { ErrorHttp } = require("./ErrorHttp");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) next(ErrorHttp(404, `${id} is not valid id `));
  next();
};
module.exports = isValidId;
