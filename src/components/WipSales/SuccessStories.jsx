import React from 'react';

import SecondaryHeading from 'components/Typography/SecondaryHeading';

import hubspot from 'img/hub-sopt.png';
import airBnb from 'img/airbnb.png';
import bookMyShow from 'img/book-my-show.png';
import styles from './SuccessStories.module.scss';

function SuccessStories() {
  const {
    main,
    main__left,
    main__right,
    main__card,
    main__textCont,
    main__feedback,
    main__author,
    main__position,
    main__hubspotCard,
    main__airbnbCard,
    main__bookMyShowCard,
    main__leftTop,
    main__leftText
  } = styles;
  return (
    <div className={main}>
      <div className={main__left}>
        <div className={main__leftTop}>
          <SecondaryHeading txt="Success Stories " />
          <p className={main__leftText}>
            Our customers have higher conversion rates and generate <br /> more sales
          </p>
        </div>
        <div className={`${main__card}  ${main__hubspotCard}`}>
          <img src={hubspot} alt="Hubspot" />
          <div className={main__textCont}>
            <p className={main__feedback}>
              To quickly start my startup landing page design, I was looking for a landing page UI
              Kit. Landify is one of the best landing page UI kit I have come across. It’s so
              flexible, well organised and easily editable.
            </p>
            <p className={main__author}>Floyd Miles</p>
            <p className={main__position}>Vice President, GoPro</p>
          </div>
        </div>
      </div>
      <div className={main__right}>
        <div className={`${main__card} ${main__airbnbCard}`}>
          <img src={airBnb} alt="airbnb" />
          <div className={main__textCont}>
            <p className={main__feedback}>
              I used landify and created a landing page for my startup within a week. The Landify UI
              Kit is simple and highly intuitive, so anyone can use it.
            </p>
            <p className={main__author}>Jane Cooper</p>
            <p className={main__position}>CEO, Airbnb</p>
          </div>
        </div>
        <div className={`${main__card}  ${main__bookMyShowCard}`}>
          <img src={bookMyShow} alt="Book My Show" />
          <div className={main__textCont}>
            <p className={main__feedback}>Landify saved our time in designing my company page.</p>
            <p className={main__author}>Kristin Watson</p>
            <p className={main__position}>Co-Founder, BookMyShow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;
