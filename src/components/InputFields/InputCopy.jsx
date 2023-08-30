import React from 'react';
import { Tooltip } from '@mui/material';

import styles from './InputCopy.module.scss';

function InputCopy(props) {
  const { type, placeholder, id, value, onChange, onClick, tooltipTitle } = props;
  const { input__field, input__placeholder, input, input_copy_container, copy_button_container } =
    styles;

  const inputClasses = `${input__field}`;

  const placeholderTxt = <span className={input__placeholder}>{placeholder}</span>;

  return (
    <div className={input_copy_container}>
      <div className={input}>
        <input
          className={inputClasses}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required
        />
        {placeholderTxt}
      </div>
      <Tooltip title={<span style={{ fontSize: '1.8rem' }}>{tooltipTitle}</span>} placement="top">
        <div className={copy_button_container}>
          <button type="button" onClick={onClick}>
            Copy
          </button>
        </div>
      </Tooltip>
    </div>
  );
}

export default InputCopy;
