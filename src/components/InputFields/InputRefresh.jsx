import React from 'react';
import picker from 'img/picker2.svg';
import refreshImg from 'img/refresh.svg';
import styles from './InputRefresh.module.scss';

function InputRefresh(props) {
  const {
    type,
    placeholder,
    id,
    value,
    pickerBgColor,
    onChange,
    onClick,
    onBlur,
    textArea,
    format,
    pickerNo,
    changeColorHandler,
    name,
    clickR,
    refresh = true
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
    refresh_button_container,
    picker_no_border
  } = styles;

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

  const clickHandler = () => {
    changeColorHandler(id);
  };

  return (
    <div className={input_refresh_container}>
      {!pickerNo && (
        <div
          className={`${pick_button_container} ${textArea && inputTextAreaClasses}`}
          style={{ backgroundColor: pickerBgColor }}
          onClick={clickHandler}>
          <img
            src={picker}
            alt={`picker${id}`}
            style={{
              filter: !pickerBgColor ? 'grayscale(100%) brightness(50%) saturate(0%)' : null
            }}
          />
        </div>
      )}
      <div className={input}>
        {textArea ? (
          <textarea
            className={`${inputClasses} ${pickerNo && picker_no_border}`}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            required
          />
        ) : (
          <input
            className={`${inputClasses} ${pickerNo && picker_no_border}`}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            required
          />
        )}
        {placeholderTxt}
        <div className={refresh_button_container} onClick={onClick}>
          {refresh ? <img src={refreshImg} alt={`refresh${id}`} onClick={clickR} /> : ''}
        </div>
      </div>
    </div>
  );
}

export default InputRefresh;
