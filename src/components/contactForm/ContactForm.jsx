import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from '../../myCss/index.module.css';

const INITIAL_STATE = {
  phone: '',
  name: '',
};

export default class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();
    if (isValidatedForm) {
      onAdd({ id: nanoid(), name, phone });
      this.resetForm();
    }
  };

  validateForm = () => {
    const { name, phone } = this.state;
    const { getUniqueContacts } = this.props;
    if (!name || !phone) {
      alert('Please fill in all fields!');
      return false;
    }
    return getUniqueContacts(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, phone } = this.state;
    return (
      <form className={styles.decorForm} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.decorInput}
          type="text"
          name="name"
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleChangeForm}
        />
        <input
          className={styles.decorInput}
          type="text"
          name="phone"
          placeholder="Enter phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={this.handleChangeForm}
        />
        <button className={styles.decorButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
