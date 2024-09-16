const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const {
  createNewUsers,
  getUsersByEmail,
  checkPasswordUser,
  createTokenUser,
  updateUserById,
  getUserById,
} = require("../models/users");

const createUserController = async (req, res) => {
  const { email, password } = req.body;
  const checkUserByEmail = await getUsersByEmail(email);
  if (checkUserByEmail)
    throw ErrorHttp(409, "users with the email already exists");
  await createNewUsers(email, password);
  res.status(201).end();
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  const checkUserByEmail = await getUsersByEmail(email);
  if (!checkUserByEmail) throw ErrorHttp(400);
  const { _id: id } = checkUserByEmail;

  const payload = { id };
  const passwordHash = checkUserByEmail.password;
  const isMatch = await checkPasswordUser(password, passwordHash);
  if (!isMatch) throw ErrorHttp(401, "Email or password is wrong");

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await createTokenUser(id, token);
  res.json({
    token,
    user: {
      email: checkUserByEmail.email,
      subscription: checkUserByEmail.subscription,
    },
  });
};

const logoutUserController = async (req, res) => {
  return await updateUserById(req, res);
};

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await getUserById(_id);
  const { email, subscription } = user;
  res.json({ email, subscription });
};

module.exports = {
  createUserController: ctrlWrappen(createUserController),
  loginUserController: ctrlWrappen(loginUserController),
  logoutUserController: ctrlWrappen(logoutUserController),
  getCurrentUser: ctrlWrappen(getCurrentUser),
};
