const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateListContacts = async (listContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(listContacts, null, 2));
};
const getListContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts) || null;
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (!contactIndex) {
    return null;
  }
  const [deletedContact] = contacts.splice(contactIndex, 1);
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
const updateContactById = async (idContact, data) => {
  const contacts = await getListContacts();
  const contact = contacts.findIndex((contact) => contact.id === idContact);
  if (!contact) return null;

  const { name, email, phone } = data;
  const updatedContact = {
    id: idContact,
    name: name,
    email: email,
    phone: phone,
  };
  contacts[contact] = { ...updatedContact };
  await updateListContacts(contacts);
  return updatedContact;
};
module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
