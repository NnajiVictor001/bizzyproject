import React, { useState } from 'react';
import Loader from 'components/Loader/Loader';

import styles from './Input.module.scss';

function Input(props) {
  const {
    type,
    placeholder,
    toggleIcon,
    id,
    value,
    onChange,
    className,
    textArea,
    parentClass,
    placeholderClass,
    loader,
    loaderPosition,
    loaderStyle,
    disabled,
    readOnly,
    onBlur,
    defaultValue,
    noPointerEvents,
    name,
    clickHandler,
    rows,
    onKeyDown,
    isLoadingSalesEmailData
  } = props;

  const { input__field, input__placeholder, input__toggle, rel, input } = styles;

  let eyeImg = '';
  let inputClasses = `${input__field} ${className}`;
  const [inputType, setinputType] = useState(type);

  const toggleinputType = () => {
    if (inputType === 'text') {
      setinputType('password');
    } else if (inputType === 'password') {
      setinputType('text');
    }
  };

  const dummyF = () => {};

  const placeholderTxt = (
    <span className={`${placeholderClass} ${input__placeholder}`}>{placeholder}</span>
  );

  if (toggleIcon) {
    eyeImg = (
      <img
        src={toggleIcon}
        className={input__toggle}
        alt="toggle password"
        onClick={toggleinputType}
      />
    );
    inputClasses = `${className} ${inputClasses} ${rel}`;
  }

  return (
    <div className={`${input} ${parentClass}`}>
      {textArea ? (
        <textarea
          className={inputClasses}
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          required
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          rows={rows}
          style={{ resize: 'none' }}
        />
      ) : (
        <input
          className={inputClasses}
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          required
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          defaultValue={defaultValue}
          style={{ pointerEvents: noPointerEvents && 'none' }}
          onKeyDown={onKeyDown}
        />
      )}

      {placeholderTxt}
      {eyeImg}
      {!textArea && loader && (
        <Loader
          clickHandler={disabled ? dummyF : clickHandler}
          position="top"
          isLoadingSalesEmailData={isLoadingSalesEmailData}
        />
      )}
      {textArea && loader && (
        <Loader
          clickHandler={disabled ? dummyF : clickHandler}
          position={loaderPosition || 'top'}
          style={loaderStyle}
          isLoadingSalesEmailData={isLoadingSalesEmailData}
        />
      )}
    </div>
  );
}

export default Input;
