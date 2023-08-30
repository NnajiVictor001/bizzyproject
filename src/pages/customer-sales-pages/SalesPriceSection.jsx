import React from 'react';
import styles from './SalesPriceSection.module.scss';

function SalesPriceSection() {
  const { main, main__txt, main__txt__only } = styles;

  return (
    <div className={main}>
      <p className={main__txt}>Regular Price $32</p>
      <p className={main__txt}>
        Today’s Price <span className={main__txt__only}>ONLY</span> $9.99
      </p>
    </div>
  );
}

export default SalesPriceSection;
