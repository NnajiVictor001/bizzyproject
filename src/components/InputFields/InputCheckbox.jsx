import React from 'react';
import styles from './InputCheckbox.module.scss';

function InputCheckbox(props) {
  const {
    customCheckbox,
    customCheckbox__input,
    customCheckbox__checkMark,
    customCheckbox__inputWhite
  } = styles;
  const {
    id,
    label,
    labelStyle = {},
    onChange,
    checked,
    changed,
    className,
    readOnly,
    activeBgWhite,
    disabled
  } = props;

  return (
    <label
      htmlFor={id}
      className={`${customCheckbox} ${className}`}
      style={{ ...labelStyle, opacity: disabled ? 0.6 : 1 }}>
      {label}
      <input
        className={`${activeBgWhite ? customCheckbox__inputWhite : customCheckbox__input} `}
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={checked}
        readOnly={!!readOnly}
        required
        disabled={disabled}
      />
      <span
        className={` ${className} ${customCheckbox__checkMark} `}
        style={{ backgroundColor: !!changed && '#FFFFFF' }}
      />
    </label>
  );
}

export default InputCheckbox;
