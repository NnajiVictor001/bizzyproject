import React from 'react';
import { Link } from 'react-scroll';

import PrimaryHeading from 'components/Typography/PrimaryHeading';
import Button from 'components/Buttons/Button';

import hero from 'img/hero-image.png';
import styles from './YourDigitalSol.module.scss';

function YourDigitalSol() {
  const { main, main__left, main__right, main__details, main__button, main__buttonText } = styles;
  return (
    <div className={main}>
      <div className={main__left}>
        <PrimaryHeading txt="Your Complete Digital Product Solution" />
        <p className={main__details}>
          Say goodbye to juggling countless apps and tools. Create, edit, launch, promote, and sell
          your digital products in minutes — without any of the tech!
        </p>
        <Button className={main__button}>
          <Link className={main__buttonText} to="pricing" spy smooth duration={500}>
            Get Started
          </Link>
        </Button>
      </div>
      <div className={main__right}>
        <img src={hero} alt="Dashboard Screenshot" />
      </div>
    </div>
  );
}

export default YourDigitalSol;
