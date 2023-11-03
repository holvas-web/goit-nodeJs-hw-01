const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
}

function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
    const contacts = await readContacts();
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact === undefined) {
    return null;
    }
    return contact;
}

async function removeContact(contactId) {
    const contacts = await readContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
    return null;
    }

    const removedContact = contacts.splice(index, 1);

    await writeContacts(contacts);

    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };

    contacts.push(newContact);

    await writeContacts(contacts);
    return newContact;
}

module.exports = { 
    listContacts, 
    getContactById, 
    removeContact, 
    addContact };