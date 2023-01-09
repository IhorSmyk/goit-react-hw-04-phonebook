import { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactTable from './ContactTable/ContactTable';
import { nanoid } from 'nanoid';

const LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  componentDidMount = () => {
    const parsedContacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (parsedContacts) {
      setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prev.contacts !== contacts) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
    }
  };

  const handleDeleteContact = idToDelete =>
    setContacts(contacts.filter(contact => contact.id !== idToDelete));

  const handleChangeFilter = e => setFilter(e.target.value.toLowerCase());

  const getFilteredContacts = () =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

  const createContact = (name, number) => {
    return {
      id: nanoid(),
      name,
      number,
    };
  };

  const handleAddContact = (newName, newNumber) => {
    contacts.some(({ name }) => name.toLowerCase() === newName.toLowerCase())
      ? alert(`a contact with the name ${newName} already exists`)
      : setContacts(prev =>
          [].concat(createContact(newName, newNumber), prev.contacts)
        );
      // : setState(prev => ({
      //     contacts: [].concat(createContact(newName, newNumber), prev.contacts),
      //   }));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm sendData={handleAddContact} />
      <h2>Contacts</h2>
      <Filter handleChangeFilter={handleChangeFilter} value={filter} />
      <ContactTable
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
