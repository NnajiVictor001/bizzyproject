import React from 'react';

import avatar from 'img/avatar.png';
import styles from './QuoteSection.module.scss';

function QuoteSection() {
  const {
    main,
    main__heading,
    main__authorCont,
    main__avatarImg,
    main__detailsCont,
    main__name,
    main__position
  } = styles;
  return (
    <figure className={main}>
      <h1 className={main__heading}>
        Imagine the best product you’ve <br /> used, times it by ten, and you’ll
        <br /> have something similar
      </h1>
      <div className={main__authorCont}>
        <img className={main__avatarImg} src={avatar} alt="Elliot Rosenberg" />
        <div className={main__detailsCont}>
          <p className={main__name}>Elliot Rosenberg</p>
          <p className={main__position}>Product Lead</p>
        </div>
      </div>
    </figure>
  );
}

export default QuoteSection;
