import React from 'react';
import styles from '../../myCss/index.module.css';

const ContactListItem = ({ id, name, phone, onRemove }) => {
  return (
    <li className={styles.decorItem}>
      {name}: {phone}{' '}
      <button className={styles.decorButtonKill} onClick={() => onRemove(id)}>
        Kill
      </button>
    </li>
  );
};

export const ContactsList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;

  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};
