const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const {
  getListContacts,
  getContactById,
  removeContact,
  updateContactById,
  addContact,
} = require("../models/contacts");

const getListContactsController = async (req, res) => {
  const listContacts = await getListContacts();
  res.status(200).json(listContacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) ErrorHttp(404);
  res.status(200).json(contact);
};

const createContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
};

const removeContactController = async (req, res) => {
  const { id } = req.params;
  const deteledContact = await removeContact(id);
  if (!deteledContact) ErrorHttp(404);
  res.status(200).json("contact deleted");
};

const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) ErrorHttp(404);
  const updatedContact = await updateContactById(contactId, req.body);
  res.json(updatedContact);
};
module.exports = {
  updateContactByIdController: ctrlWrappen(updateContactByIdController),
  getListContactsController: ctrlWrappen(getListContactsController),
  getContactByIdController: ctrlWrappen(getContactByIdController),
  createContactController: ctrlWrappen(createContactController),
  removeContactController: ctrlWrappen(removeContactController),
};
