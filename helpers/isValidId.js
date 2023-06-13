const { isValidObjectId } = require("mongoose");

const { ErrorHttp } = require("./ErrorHttp");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(ErrorHttp(404, `${contactId} is not valid id `));
  next();
};
module.exports = isValidId;
