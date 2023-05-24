const contactAddSchema = require("./contacts/contacts-schema");
const usersJoiSchema = require("./users/users-joi-schema");
const mongooseSchemaContacts = require("./contacts/contacts-mongoose-schema");
const mongooseSchemaUsers = require("./users/users-mongoose-schema");

module.exports = {
  contactAddSchema,
  usersJoiSchema,
  mongooseSchemaContacts,
  mongooseSchemaUsers,
};
