import React, { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import { ContactsList } from './contactsList/ContactsList';
import Filter from './filter/Filter';
import styles from '../myCss/index.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  handleAddContact = newContact => {
    if (this.handleGetUniqueContacts(newContact.name)) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleRemoveContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleGetUniqueContacts = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(contact => contact.name === name);

    if (isExistContact) {
      alert('Контакт уже существует, убей его и создай новый:)');
    }

    return !isExistContact;
  };

  handleFilterChange = value => {
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={styles.container}>
        <h2 className={styles.formTitle}>Form Contact</h2>
        <ContactForm
          onAdd={this.handleAddContact}
          getUniqueContacts={this.handleGetUniqueContacts}
        />
        <h2 className={styles.formTitle}>Contact List</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactsList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}
