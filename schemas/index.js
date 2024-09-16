const contactAddSchema = require("./contacts/contacts-schema");
const { usersJoiSchema, verifyUserAgain } = require("./auth/users-joi-schema");
const mongooseSchemaContacts = require("./contacts/contacts-mongoose-schema");
const mongooseSchemaUsers = require("./auth/users-mongoose-schema");
const loginJoiSchema = require("./login/login-joi-schema");

module.exports = {
  contactAddSchema,
  loginJoiSchema,
  verifyUserAgain,
  usersJoiSchema,
  mongooseSchemaContacts,
  mongooseSchemaUsers,
};
