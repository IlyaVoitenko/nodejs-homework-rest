const { mongooseSchemaContacts } = require("../../schemas");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

const contactsModel = mongoose.model("contacts", mongooseSchemaContacts);

const getListContacts = async (req) => {
  const { _id: owner } = req.user;

  return await contactsModel.find({ owner });
};

const getContactById = async (contactId) => {
  return await contactsModel.findById(contactId);
};

const updateStatusContact = async (contactId, dataUpdated) => {
  return await contactsModel.findByIdAndUpdate(contactId, dataUpdated, {
    new: true,
  });
};

const removeContact = async (contactId) => {
  return await contactsModel.findByIdAndDelete(contactId);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, phone, email } = req.body;

  return await contactsModel.create({
    name,
    email,
    phone,
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
