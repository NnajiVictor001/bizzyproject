import React from 'react';

import checkBox from 'img/checkbox.png';
import styles from './GetStartedCard.module.scss';

function GetStartedCard(props) {
  const { title, details, children, onClick } = props;
  const { card, header, header__left, header__right, header__heading, header__text, body } = styles;

  return (
    <div className={card} onClick={onClick}>
      <div className={header}>
        <img src={checkBox} alt="Check Box" className={header__left} />
        <div className={header__right}>
          <p className={header__heading}>{title}</p>
          <p className={header__text}>{details}</p>
        </div>
      </div>
      <div className={body}>{children}</div>
    </div>
  );
}

export default GetStartedCard;
