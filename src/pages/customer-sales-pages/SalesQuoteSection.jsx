import React from 'react';

import quoteUser from 'img/quoteUser.png';
import styles from './SalesQuoteSection.module.scss';

function SalesQuoteSection({ title, content, position }) {
  const { main, main__body, position__top, position__bottom, position__middle } = styles;

  let mainClass;
  if (position === 'top') {
    mainClass = `${main} ${position__top}`;
  } else if (position === 'middle') {
    mainClass = `${main} ${position__middle}`;
  } else if (position === 'bottom') {
    mainClass = `${main} ${position__bottom}`;
  }

  return (
    <div className={mainClass}>
      <img src={quoteUser} alt="quote user" />
      <div className={main__body}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default SalesQuoteSection;
