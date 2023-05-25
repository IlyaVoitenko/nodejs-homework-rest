const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const {
  createNewUsers,
  getUsersByEmail,
  checkPasswordUser,
} = require("../models/users");

const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const checkUserByEmail = await getUsersByEmail(email);
  if (checkUserByEmail) ErrorHttp(409, "users with the email already exists");
  await createNewUsers(name, email, password);
  res.status(201).end();
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const checkUserByEmail = await getUsersByEmail(email);
  const passwordHash = checkUserByEmail.password;
  if (checkUserByEmail === null)
    ErrorHttp(401, "email or password is uncorrect");
  const isMatch = await checkPasswordUser(password, passwordHash);
  if (!isMatch) ErrorHttp(401, "email or password is uncorrect");
  res.json({ token: "token" });
};

module.exports = {
  createUserController: ctrlWrappen(createUserController),
  loginUserController: ctrlWrappen(loginUserController),
};
