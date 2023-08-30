import React from 'react';
import styles from './SalesThankyouBottomButton.module.scss';

function SalesThankyouBottomButton() {
  const { main, main__top_txt, main__button, main__button_txt } = styles;

  return (
    <div className={main}>
      <h1>2. Take it further!</h1>
      <p className={main__top_txt}>
        We have a community to cheer you on, and help you get results that stick!
      </p>
      <div className={main__button}>
        <p className={main__button_txt}>Get The Simply Tidy Toolkit - $9.99</p>
      </div>
    </div>
  );
}

export default SalesThankyouBottomButton;
