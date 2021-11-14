const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const contacts = JSON.parse(await fs.readFile(contactsPath));
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
  }
  
async function getContactById(contactId) {
    try {
        const contacts = JSON.parse(await fs.readFile(contactsPath));
        const contact = contacts.filter((contact) => String(contact.id) === contactId);
        return contact;
    } catch (error) {
        console.log(error.message);
    }
  }
  
async function removeContact(contactId) {
    try {
        const contacts = JSON.parse(await fs.readFile(contactsPath));
        const contactsList = contacts.filter((contact) => contact.id !== Number(contactId));
        await fs.writeFile(contactsPath, JSON.stringify(contactsList));
        return contactsList;
    } catch (error) {
        console.log(error.message);
    }
  }
  
async function addContact(name, email, phone) {
    const newContact = {id: uuidv4(), name, email, phone};
    try {
        const contacts = JSON.parse(await fs.readFile(contactsPath));
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
}
  
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};