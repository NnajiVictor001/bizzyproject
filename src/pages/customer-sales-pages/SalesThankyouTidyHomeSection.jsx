import React from 'react';
import styles from './SalesThankyouTidyHomeSection.module.scss';

function SalesThankyouTidyHomeSection() {
  const { main, main__top_txt, main__button, main__button_txt, main__tidy_home } = styles;

  return (
    <div className={main}>
      <h1>
        A<span className={main__tidy_home}>tidy home</span> can be your
      </h1>
      <h1>reality, even with</h1>
      <h1>chaotic lives!</h1>
      <p className={main__top_txt}>Cleaning is easier when you have a plan. Promise.</p>
      <div className={main__button}>
        <p className={main__button_txt}>Get The Simply Tidy Toolkit - $9.99</p>
      </div>
    </div>
  );
}

export default SalesThankyouTidyHomeSection;
