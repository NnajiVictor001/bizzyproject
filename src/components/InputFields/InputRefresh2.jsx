import React from 'react';
import picker from 'img/picker2.svg';
import styles from './InputRefresh.module.scss';

function InputRefresh2(props) {
  const {
    type,
    placeholder,
    id,
    value,
    pickerBgColor,
    onChange,
    onClick,
    textArea,
    format,
    pickerNo,
    name,
    className
  } = props;
  const {
    input_refresh_container,
    input,
    input__field,
    input__field__long_con,
    input__field__middle_con,
    textArea_field,
    textArea_field__long_con,
    textArea_field__middle_con,
    input__placeholder,
    pick_button_container,
    picker_no_border
  } = styles;

  const defaultColor = '#667656';

  const inputClasses = `${input__field} ${
    format === 'long'
      ? input__field__long_con
      : format === 'middle'
      ? input__field__middle_con
      : null
  }`;
  const inputTextAreaClasses = `${textArea_field} ${
    format === 'long'
      ? textArea_field__long_con
      : format === 'middle'
      ? textArea_field__middle_con
      : null
  }`;

  const placeholderTxt = <span className={input__placeholder}>{placeholder}</span>;

  return (
    <div className={input_refresh_container}>
      {!pickerNo && (
        <div
          className={`${pick_button_container} ${textArea && inputTextAreaClasses}`}
          style={{ backgroundColor: pickerBgColor || defaultColor }}
          onClick={onClick}>
          <img src={picker} alt={`picker${id}`} />
        </div>
      )}
      <div className={input}>
        {textArea ? (
          <textarea
            className={`${inputClasses} ${className} ${pickerNo && picker_no_border}`}
            type={type}
            id={id}
            value={value || ''}
            onChange={onChange}
            name={name}
            required
          />
        ) : (
          <input
            className={`${inputClasses} ${className} ${pickerNo && picker_no_border}`}
            type={type}
            id={id}
            value={value || ''}
            onChange={onChange}
            name={name}
            required
          />
        )}
        {placeholderTxt}
        {/* <div className={refresh_button_container}>
          <img src={refresh} alt={`refresh${id}`} onClick={clickR} />
        </div> */}
      </div>
    </div>
  );
}

export default InputRefresh2;
