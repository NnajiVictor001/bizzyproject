import React from 'react';
import styles from './InputCheckboxCustom.module.scss';

function InputCheckboxCustom(props) {
  const {
    container,
    customCheckbox,
    customCheckbox__label,
    customCheckbox__input,
    customCheckbox__checkMark
  } = styles;
  const { id, label, onChange, checked } = props;

  return (
    <span className={container}>
      <label htmlFor={id} className={customCheckbox}>
        <span className={customCheckbox__label}>{label}</span>
        <input
          className={customCheckbox__input}
          type="checkbox"
          id={id}
          onChange={onChange}
          checked={checked}
          required
        />
        <span className={customCheckbox__checkMark} />
      </label>
    </span>
  );
}

export default InputCheckboxCustom;
