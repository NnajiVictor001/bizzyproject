import React from 'react';
import { Link } from 'react-scroll';

import { COLOR_BLACK } from 'constants/Colors';
import PrimaryHeading from 'components/Typography/PrimaryHeading';
import Button from 'components/Buttons/Button';

import bg from 'img/start-sell-bg.png';
import mainImg from 'img/img-thumbnail.png';
import styles from './StartSelling.module.scss';

function StartSelling() {
  const {
    main,
    main__bg,
    main__content,
    main__details,
    main__btns,
    main__btn1,
    main__btn2,
    main__btn1Text,
    main__btn2Text,
    main__img,
    main__imgCont
  } = styles;
  return (
    <div className={main}>
      <img className={main__bg} src={bg} alt="Start Sell" />
      <div className={main__content}>
        <PrimaryHeading txt="Start Selling In Minutes" />
        <p className={main__details}>
          Say goodbye to juggling countless apps and tools. Easily create, launch, promote, and sell
          digital <br /> products developed by expert marketers to turn clicks into customers.
        </p>
        <div className={main__btns}>
          <Button bgColor="transparent" className={main__btn1}>
            <Link className={main__btn1Text} to="pricing" spy smooth duration={500}>
              Get Started
            </Link>
          </Button>
          <Button bgColor={COLOR_BLACK} className={main__btn2}>
            <Link className={main__btn2Text} to="pricing" spy smooth duration={500}>
              Start free trial
            </Link>
          </Button>
        </div>
      </div>
      <div className={main__imgCont}>
        <img src={mainImg} className={main__img} alt="main" />
      </div>
    </div>
  );
}

export default StartSelling;
