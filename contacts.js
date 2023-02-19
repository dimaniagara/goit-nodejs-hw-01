const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data ? data.find((el) => el.id === contactId.toString()) : null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [contact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone, id: uuidv4() };
  const data = await listContacts();
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
