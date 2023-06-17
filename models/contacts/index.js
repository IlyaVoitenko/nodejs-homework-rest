const { mongooseSchemaContacts } = require("../../schemas");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs/promises");
const mongoose = require("mongoose");

const contactsModel = mongoose.model("contacts", mongooseSchemaContacts);

const getListContacts = async (req) => {
  const { _id: owner } = req.user;

  return await contactsModel.find({ owner });
};

const getContactById = async (contactId) => {
  return await contactsModel.findById(contactId);
};

const updateStatusContact = async (contactId, data) => {
  return await contactsModel.findByIdAndUpdate(contactId, data, {
    new: true,
  });
};

const removeContact = async (contactId) => {
  return await contactsModel.findByIdAndDelete(contactId);
};

const addContact = async (req, res) => {
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(contactsPath, filename);
  // await fs.rename(oldPath, newPath);
  // const avatar = path.join("public", "contacts", filename);
  const { _id: owner } = req.user;
  return await contactsModel.create({
    ...req.body,
    owner,
  });
};

const updateContactById = async (idContact, data) => {
  return await contactsModel.findByIdAndUpdate(idContact, data, { new: true });
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContactById,
  contactsModel,
};
