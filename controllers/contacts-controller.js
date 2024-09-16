const { ctrlWrappen } = require("../decorators");
const { ErrorHttp } = require("../helpers");
const {
  getListContacts,
  getContactById,
  removeContact,
  updateStatusContact,
  updateContactById,
  addContact,
} = require("../models/contacts");

const getListContactsController = async (req, res) => {
  const listContacts = await getListContacts(req);
  if (!listContacts) throw ErrorHttp(404, "contacts not found");

  res.status(200).json(listContacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) throw ErrorHttp(404);
  res.status(200).json(contact);
};

const createContactController = async (req, res) => {
  const newContact = await addContact(req);
  if (!newContact) throw ErrorHttp(404, "contact not found");

  res.status(201).json(newContact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const deteledContact = await removeContact(contactId);
  if (!deteledContact) throw ErrorHttp(404);
  res.status(200).json("contact deleted");
};

const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) throw ErrorHttp(404);
  const updatedContact = await updateContactById(contactId, req.body);
  res.json(updatedContact);
};

const getContactsFavoriteFieldController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const result = await updateStatusContact(contactId, body);
  if (!result) throw ErrorHttp(404, "Not found");
  res.json(result).status(200);
};

module.exports = {
  updateContactByIdController: ctrlWrappen(updateContactByIdController),
  getListContactsController: ctrlWrappen(getListContactsController),
  getContactByIdController: ctrlWrappen(getContactByIdController),
  createContactController: ctrlWrappen(createContactController),
  removeContactController: ctrlWrappen(removeContactController),
  getContactsFavoriteFieldController: ctrlWrappen(
    getContactsFavoriteFieldController
  ),
};
