const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { mongooseSchemaUsers } = require("../../schemas");

const Users = mongoose.model("users", mongooseSchemaUsers);

const createTokenUser = async (id, token) => {
  return await Users.findByIdAndUpdate(id, { token });
};

const getUsersByEmail = async (email) => {
  return await Users.findOne({ email });
};
const checkPasswordUser = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};
const createNewUsers = async (avatar, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return await Users.create({
    email: email,
    password: passwordHash,
    avatarURL: avatar,
  });
};

const updateUserById = async (req, res) => {
  const { id } = req.user;
  await Users.findByIdAndUpdate(id, { token: "" });
  res.json("logout succsess");
};

const getUserById = async (id) => {
  return await Users.findById(id);
};

const updateAvatarUserById = async (req, res) => {
  const { id, avatarURL } = req.user;
  await Users.findByIdAndUpdate(id, { avatarURL });
};
module.exports = {
  createNewUsers,
  getUsersByEmail,
  checkPasswordUser,
  createTokenUser,
  updateUserById,
  getUserById,
  updateAvatarUserById,
  Users,
};
