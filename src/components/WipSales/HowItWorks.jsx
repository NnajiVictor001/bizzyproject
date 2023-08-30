import React from 'react';
import { Link } from 'react-scroll';

import Button from 'components/Buttons/Button';
import { COLOR_BLACK, COLOR_WHITE } from 'constants/Colors';

import mockup from 'img/main-mockup.png';
import styles from './HowItWorks.module.scss';

function HowItWorks() {
  const cardsData = [
    {
      title: 'Visually design your products',
      description: 'Engineered to be the easiest digital prodcut builder.   skills required! '
    },
    {
      title: 'Instant Copy / or Sales Pages',
      description: 'copy that converts'
    },
    {
      title: 'Sales Pages / Or Emails & Marketing',
      description: 'copy that converts'
    },
    {
      title: 'Marketing made easy / or Dashbaord',
      description: 'copy that converts'
    }
  ];

  const {
    main,
    main__top,
    main__topLeft,
    main__topRight,
    main__topBtn,
    main__topHeading,
    main__topText,
    main__content,
    main__contentLeft,
    main__contentCard,
    main__contentRight,
    main__contentHeading,
    main__contentText,
    main__mockUp
  } = styles;
  return (
    <div className={main} id="resources">
      <div className={main__top}>
        <div className={main__topLeft}>
          <h2 className={main__topHeading}>How It Works</h2>
          <p className={main__topText}>
            Turn your hard-won web traffic into more leads and sales with a
            <br />
            complete digital product conversion toolkit!
          </p>
        </div>
        <div className={main__topRight}>
          <Button className={main__topBtn}>
            <Link to="pricing" spy smooth duration={500}>
              Sign up, it’s free
            </Link>
          </Button>
        </div>
      </div>
      <div className={main__content}>
        <div className={main__contentLeft}>
          {cardsData.map((item, index) => (
            <div
              style={{
                backgroundColor: index === 0 ? COLOR_BLACK : COLOR_WHITE
              }}
              key={index}
              className={main__contentCard}>
              <p
                style={{
                  color: index === 0 ? COLOR_WHITE : COLOR_BLACK
                }}
                className={main__contentHeading}>
                {item.title}
              </p>
              <p
                style={{
                  color: index === 0 ? COLOR_WHITE : COLOR_BLACK
                }}
                className={main__contentText}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className={main__contentRight}>
          <img draggable={false} src={mockup} className={main__mockUp} alt="Dashboard Mockup" />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
