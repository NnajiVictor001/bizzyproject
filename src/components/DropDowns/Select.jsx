import React from 'react';

import styles from './Select.module.scss';

function Select({ onChange, options }) {
  const { select } = styles;
  return (
    <select onChange={onChange} className={select}>
      {options?.map((item, index) => (
        <option key={index} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
