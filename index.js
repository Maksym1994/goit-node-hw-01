const { listContacts, getContactById, addContact, removeContact } = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const contacts =  await listContacts();
        console.table(contacts)
      break;

    case 'get':
        const getContact = await getContactById(id);
        console.table(getContact)
      break;

    case 'add':
        const addContacts = await addContact(name, email, phone);
        console.table(addContacts)
      break;

    case 'remove':
        const removeContacts = await removeContact(id);
        console.table(removeContacts)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);