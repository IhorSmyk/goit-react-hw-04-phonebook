import { useState, useEffect } from 'react';
import { initialContacts } from 'data/initialContacts';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactTable from './ContactTable/ContactTable';
import { nanoid } from 'nanoid';

const LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

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
      : setContacts(prevContacts =>
          [].concat(createContact(newName, newNumber), prevContacts)
        );
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
