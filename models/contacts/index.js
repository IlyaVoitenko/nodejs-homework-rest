const { mongooseShemaContacts } = require("../../schemas");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

const contactsModel = mongoose.model("contacts", mongooseShemaContacts);

const getListContacts = async () => {
  return await contactsModel.find();
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

const addContact = async (name, email, phone) => {
  return await contactsModel.create({
    name: name,
    email: email,
    phone: phone,
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
};
