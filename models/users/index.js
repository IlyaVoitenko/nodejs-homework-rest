const mongoose = require("mongoose");
const { mongooseSchemaUsers } = require("../../schemas");

const Users = mongoose.model("users", mongooseSchemaUsers);

const createNewUsers = async (name, email, password) => {
  return await Users.create({
    name: name,
    email: email,
    password: password,
  });
};
module.exports = { createNewUsers };
