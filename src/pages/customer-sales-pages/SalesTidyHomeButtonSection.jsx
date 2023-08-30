import React from 'react';
import styles from './SalesTidyHomeButtonSection.module.scss';

function SalesTidyHomeButtonSection() {
  const { main, main__top_txt, main__button, main__button_txt, main__tidy_home } = styles;

  return (
    <div className={main}>
      <p className={main__top_txt}>Cleaning is easier when you have a plan. Promise.</p>
      <h1>
        A<span className={main__tidy_home}>tidy home</span> can be your reality,
      </h1>
      <h1>even with chaotic lives!</h1>
      <div className={main__button}>
        <p className={main__button_txt}>Get The Simply Tidy Toolkit - $9.99</p>
      </div>
    </div>
  );
}

export default SalesTidyHomeButtonSection;
