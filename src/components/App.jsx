import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactTable from './ContactTable/ContactTable';
import { nanoid } from 'nanoid';

const LOCAL_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    const parsedContacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
    }
  };

  handleDeleteContact = idToDelete =>
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== idToDelete),
    }));

  handleChangeFilter = e =>
    this.setState({
      filter: e.target.value.toLowerCase(),
    });

  getFilteredContacts = () =>
    this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );

  createContact = (name, number) => {
    return {
      id: nanoid(),
      name,
      number,
    };
  };

  handleAddContact = (newName, newNumber) => {
    this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    )
      ? alert(`a contact with the name ${newName} already exists`)
      : this.setState(prev => ({
          contacts: [].concat(
            this.createContact(newName, newNumber),
            prev.contacts
          ),
        }));
  };

  render() {
    const contacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm sendData={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          handleChangeFilter={this.handleChangeFilter}
          value={this.state.filter}
        />
        <ContactTable
          contacts={contacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
