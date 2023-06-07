const gravatar = require("gravatar");
const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const {
  createNewUsers,
  getUsersByEmail,
  checkPasswordUser,
  createTokenUser,
  updateUserById,
  updateAvatarUserById,
  getUserById,
} = require("../models/users");

const avatarPath = path.resolve("public", "avatars");

const createUserController = async (req, res) => {
  const { email, password } = req.body;
  const checkUserByEmail = await getUsersByEmail(email);
  if (checkUserByEmail)
    throw ErrorHttp(409, "users with the email already exists");
  const avatar = gravatar.url(email, { default: "mp" });
  await createNewUsers(avatar, email, password);
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

const updateAvatarUser = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  req.user.avatarURL = avatar;
  await updateAvatarUserById(req);
  res.json("avatar updated");
};

module.exports = {
  createUserController: ctrlWrappen(createUserController),
  loginUserController: ctrlWrappen(loginUserController),
  logoutUserController: ctrlWrappen(logoutUserController),
  getCurrentUser: ctrlWrappen(getCurrentUser),
  updateAvatarUser: ctrlWrappen(updateAvatarUser),
};
