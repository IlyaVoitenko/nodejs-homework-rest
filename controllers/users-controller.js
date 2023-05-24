const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const { createNewUsers } = require("../models/users");

const createUserController = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = createNewUsers(name, email, password);
  res.status(201).json(newUser);
};

module.exports = { createUserController: ctrlWrappen(createUserController) };
