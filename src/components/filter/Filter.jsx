import React from 'react';
import styles from '../../myCss/index.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <input
      className={styles.decorInput}
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Enter name for Search"
    />
  );
};

export default Filter;
