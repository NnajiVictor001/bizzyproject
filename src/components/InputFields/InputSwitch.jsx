import React from 'react';
import styles from './InputSwitch.module.scss';

function InputSwitch(props) {
  const { id, isOn, handleToggle, onColor } = props;

  const { react_switch_checkbox, react_switch_label, react_switch_button } = styles;

  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={react_switch_checkbox}
        id={id}
        type="checkbox"
      />
      <label style={{ background: isOn && onColor }} className={react_switch_label} htmlFor={id}>
        <span className={react_switch_button} />
      </label>
    </>
  );
}

export default InputSwitch;
