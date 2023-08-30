import React from 'react';
import { Link } from 'react-scroll';

import Button from 'components/Buttons/Button';
import SecondaryHeading from 'components/Typography/SecondaryHeading';

import arrow from 'img/right-arrow.png';
import styles from './ActualSales.module.scss';

function ActualSales() {
  const { main, main__text, main__btn } = styles;
  return (
    <div className={main}>
      <p className={main__text}>Take Bizzy for a Spin. No obligation. No reason not to.</p>
      <SecondaryHeading txt="Ready to turn your hard-won traffic into actual sales?" />
      <Button className={main__btn}>
        <Link to="pricing" spy smooth duration={500}>
          Get Started
        </Link>
        <img src={arrow} alt="Arrow Right" />
      </Button>
    </div>
  );
}

export default ActualSales;
