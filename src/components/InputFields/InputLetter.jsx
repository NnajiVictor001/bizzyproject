import React, { useState, useEffect } from 'react';
import picker from 'img/picker2.svg';
import eye from 'img/eye.svg';
import eye_slash from 'img/eye-slash.svg';
import styles from './InputLetter.module.scss';

function InputLetter(props) {
  const {
    type,
    placeholder,
    id,
    value,
    pickerBgColor,
    onChange,
    onBlur,
    onClick,
    pickerNo,
    name,
    className,
    onHandleClickEye = () => {},
    isEyeIcon,
    metadata
  } = props;
  const {
    input_letter_container,
    input,
    input__field,
    input__placeholder,
    pick_button_container,
    picker_no_border,
    icon_eye
  } = styles;

  const [isShow, setIsShow] = useState(true);

  const defaultColor = '#9A9A9A';

  useEffect(() => {
    if (metadata && metadata[id] && metadata[id].hide) {
      setIsShow(false);
    }
  }, []);

  const handleClick = () => {
    setIsShow(!isShow);
    if (onHandleClickEye) onHandleClickEye(id, isShow);
  };

  const placeholderTxt = <span className={input__placeholder}>{placeholder}</span>;

  return (
    <>
      {isEyeIcon &&
        (isShow ? (
          <img src={eye} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ) : (
          <img src={eye_slash} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ))}
      <div className={input_letter_container}>
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
            className={`${input__field} ${className} ${pickerNo && picker_no_border}`}
            type={type}
            id={id}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur && onBlur}
            name={name}
            required
          />
          {placeholderTxt}
        </div>
      </div>
    </>
  );
}

export default InputLetter;
