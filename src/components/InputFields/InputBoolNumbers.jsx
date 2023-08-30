import React from 'react';
import styles from './InputBoolNumbers.module.scss';

function InputBoolNumbers(props) {
  const { onClick, className, value } = props;
  const {
    input_bool_container,
    radio_container,
    radio_container__circle,
    checked,
    radio_container__title
  } = styles;
  const selectedOption = value || 'numbers';

  return (
    <div className={`${input_bool_container} ${className}`}>
      <div className={radio_container} onClick={() => onClick('numbers')}>
        <div className={`${radio_container__circle} ${selectedOption === 'numbers' && checked}`} />
        <p className={radio_container__title}>Numbers</p>
      </div>
      <div className={radio_container} onClick={() => onClick('letters')}>
        <div className={`${radio_container__circle} ${selectedOption === 'letters' && checked}`} />
        <p className={radio_container__title}>Letters</p>
      </div>
      <div className={radio_container} onClick={() => onClick('week')}>
        <div className={`${radio_container__circle} ${selectedOption === 'week' && checked}`} />
        <p className={radio_container__title}>Week</p>
      </div>
    </div>
  );
}

export default InputBoolNumbers;
