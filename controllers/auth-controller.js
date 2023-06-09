const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { Users } = require("../models/users");
const { ctrlWrappen } = require("../decorators");
const { ErrorHttp, cloudinary, sendEmail } = require("../helpers");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const { SECRET_KEY, PROJECT_URL } = process.env;
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

  const verificationCode = nanoid();
  const avatar = gravatar.url(email, { default: "mp" });

  await createNewUsers(avatar, email, password, verificationCode);

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanke" href="${PROJECT_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).end();
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUsersByEmail(email);
  if (!user) throw ErrorHttp(400);
  if (!user.verify) {
    throw ErrorHttp(401, "user is not verification");
  }
  const { _id: id } = user;

  const payload = { id };
  const passwordHash = user.password;
  const isMatch = await checkPasswordUser(password, passwordHash);
  if (!isMatch) throw ErrorHttp(401, "Email or password is wrong");

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await createTokenUser(id, token);
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
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
  // const newPath = path.join(avatarPath, filename);
  // await fs.rename(oldPath, newPath);
  // const avatar = path.join("avatars", filename);
  const fileData = await cloudinary.uploader.upload(oldPath, {
    folder: "avatars",
  });
  console.log(fileData);
  req.user.avatarURL = fileData.url;

  await fs.unlink(oldPath);
  await updateAvatarUserById(req);
  res.json("avatar updated");
};

const verifyController = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await Users.findOne({ verificationCode });
  if (!user) throw ErrorHttp(404);

  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json("verify success");
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) throw ErrorHttp(404);
  if (user.verify) throw ErrorHttp(400, "email alredy verify");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanke" href="${PROJECT_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json("email verify resend");
};
module.exports = {
  createUserController: ctrlWrappen(createUserController),
  loginUserController: ctrlWrappen(loginUserController),
  logoutUserController: ctrlWrappen(logoutUserController),
  getCurrentUser: ctrlWrappen(getCurrentUser),
  verifyController: ctrlWrappen(verifyController),
  updateAvatarUser: ctrlWrappen(updateAvatarUser),
  resendVerifyEmail: ctrlWrappen(resendVerifyEmail),
};
