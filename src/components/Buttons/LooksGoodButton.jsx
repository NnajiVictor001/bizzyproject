import React from 'react';
import styles from './LooksGoodButton.module.scss';

function LooksGoodButton(props) {
  const { buttonGood, buttonGood__input, buttonGood__label, buttonGood__span } = styles;
  const { handleCheck } = props;
  const looksGoodButtonHandler = () => {
    handleCheck();
  };

  return (
    <div className={buttonGood}>
      <input
        type="checkbox"
        id="looksgood"
        name="looksgood"
        className={buttonGood__input}
        onChange={looksGoodButtonHandler}
        checked
        readOnly
      />
      <label className={buttonGood__label} htmlFor="looksgood">
        Looks GREAT!
        <span className={buttonGood__span}>NEXT &raquo; </span>
      </label>
    </div>
  );
}

export default LooksGoodButton;
