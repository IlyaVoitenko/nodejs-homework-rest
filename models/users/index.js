const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { mongooseSchemaUsers } = require("../../schemas");

const Users = mongoose.model("users", mongooseSchemaUsers);

const getUsersByEmail = async (email) => {
  return await Users.findOne({ email });
};
const checkPasswordUser = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};
const createNewUsers = async (name, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return await Users.create({
    name: name,
    email: email,
    password: passwordHash,
  });
};
module.exports = { createNewUsers, getUsersByEmail, checkPasswordUser };
