import React from 'react';

import SecondaryHeading from 'components/Typography/SecondaryHeading';

import arrow from 'img/arrow.png';
import watch from 'img/watch.png';
import edit from 'img/edit-icon.png';
import heart from 'img/heart.png';
import thumbsUp from 'img/thumbs-up.png';
import sales from 'img/sales-page.png';
import styles from './WhatYouNeed.module.scss';

function WhatYouNeed() {
  const cardsData = [
    {
      title: 'Easy To Use',
      description: 'No tech skills required! Simple to use  easy point & click technology. ',
      icon: arrow
    },
    {
      title: 'minutes not months',
      description: 'Create the digital products and  pages you want — without any of the dev time',
      icon: watch
    },
    {
      title: 'instant Content',
      description: 'Skip writing anything with our automated content creator.',
      icon: edit
    },
    {
      title: 'Stunning Designs',
      description: '?????? templates to select from in 15 popular niche categories.',
      icon: heart
    },
    {
      title: 'Commercial License',
      description: 'Sell the designs as your own and keep 100% of the profits.',
      icon: thumbsUp
    },
    {
      title: 'Done for you Sales Page',
      description: 'Skip the sales page stress with our instant Sales page creator. ',
      icon: sales
    }
  ];

  const { main, main__container, main__card, main__icon, main__heading, main__text } = styles;
  return (
    <div className={main} id="features">
      <SecondaryHeading txt="We’ve Got What You Need" />
      <div className={main__container}>
        {cardsData.map((item, index) => (
          <div key={index} className={main__card}>
            <img className={main__icon} src={item.icon} alt="Icon" />
            <p className={main__heading}>{item.title}</p>
            <p className={main__text}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatYouNeed;
