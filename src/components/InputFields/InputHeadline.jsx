import React from 'react';
import picker from 'img/picker2.svg';
import styles from './InputHeadline.module.scss';

function InputHeadline(props) {
  const {
    type,
    placeholder,
    id,
    value,
    pickerBgColor,
    onChange,
    onClick,
    pickerNo,
    name,
    className
  } = props;
  const {
    input_refresh_container,
    input,
    input__field,
    input__placeholder,
    pick_button_container,
    picker_no_border
  } = styles;

  const defaultColor = '#51CC59';

  const placeholderTxt = <span className={input__placeholder}>{placeholder}</span>;

  return (
    <div className={`${input_refresh_container} ${className}`}>
      {!pickerNo && (
        <div
          className={pick_button_container}
          style={{ backgroundColor: pickerBgColor || defaultColor }}
          onClick={onClick}>
          <img src={picker} alt={`picker${id}`} />
        </div>
      )}
      <div className={input}>
        <input
          className={`${input__field} ${pickerNo && picker_no_border}`}
          type={type}
          id={id}
          value={value || ''}
          onChange={onChange}
          name={name}
          required
        />
        {placeholderTxt}
      </div>
    </div>
  );
}

export default InputHeadline;
