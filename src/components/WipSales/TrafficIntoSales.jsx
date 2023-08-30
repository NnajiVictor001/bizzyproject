import React from 'react';
import { Link } from 'react-scroll';

import Button from 'components/Buttons/Button';

import styles from './TrafficIntoSales.module.scss';

function TrafficIntoSales() {
  const { main, main__text, main__heading, main__btn } = styles;
  return (
    <div className={main}>
      <p className={main__text}>Take Bizzy for a Spin. No obligation. No reason not to.</p>
      <h1 className={main__heading}>
        Turn traffic into sales with the <br /> best digital product tool.
      </h1>
      <Button className={main__btn}>
        <Link to="pricing" spy smooth duration={500}>
          Start your trial
        </Link>
      </Button>
    </div>
  );
}

export default TrafficIntoSales;
