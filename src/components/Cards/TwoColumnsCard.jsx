import React from 'react';
import { Link } from 'react-router-dom';

import SecondaryHeading from 'components/Typography/SecondaryHeading';

import styles from './TwoColumnsCard.module.scss';

function TwoColumnsCard({ image, heading, coloredTxt, description, imageRight, list, link }) {
  const {
    main,
    main__imgCont,
    main__img,
    main__content,
    main__text,
    main__colorText,
    main__list,
    main__listItem,
    main__link
  } = styles;

  return (
    <div style={{ flexDirection: imageRight && 'row-reverse' }} className={main}>
      <div className={main__imgCont}>
        <img className={main__img} src={image} alt="Cover" />
      </div>
      <div className={main__content}>
        <SecondaryHeading txt={heading} />
        <p className={main__text}>
          <span className={main__colorText}>{coloredTxt}:</span>
          {description}
        </p>
        {list && (
          <ul className={main__list}>
            {list?.map((item, index) => (
              <li className={main__listItem} key={index}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <div className={main__link}>
            <Link to={link?.path}>
              <span>{link?.text}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoColumnsCard;
