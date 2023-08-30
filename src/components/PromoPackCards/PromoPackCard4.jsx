import React, { useState } from 'react';

import Toggle from 'components/Layouts/Toggle';
import ArrowNavigation from 'components/Navigation/ArrowNavigation';

import videoMain from 'img/video-image.png';
import styles from './PromoPackCard4.module.scss';

function PromoPackCard4() {
  const [isToggle, setIsToggle] = useState(false);
  const {
    card,
    card__toggle,
    card__slider,
    card__toggleCont,
    main,
    main__left,
    main__right,
    main__rightText,
    main__arrowCont
  } = styles;
  const onToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className={card}>
      <div className={card__toggleCont}>
        <Toggle
          first="Sales  Video"
          second="Training Video"
          isToggled={isToggle}
          onToggle={onToggle}
          className={card__toggle}
          sliderClass={card__slider}
        />
      </div>
      <div className={main}>
        <div className={main__left}>
          <img src={videoMain} alt="Video" />
          <div className={main__arrowCont}>
            <ArrowNavigation maxValue={3} />
          </div>
        </div>
        <div className={main__right}>
          <p className={main__rightText}>
            Lesson planning is meant to make life easier, NOT more complicated. That is why we have
            created our... <br />
            <br /> We know how easy it is to overcomplicate your day. We all need structure to help
            us simplify. This worksheet is designed to help you...
            <br />
            <br /> Just like it helped me. I created this because I am like you... I also struggle
            with... I knew I needed a solution that was doable.
            <br />
            <br />
            Lesson planning is meant to make life easier, NOT more complicated. That is why we have
            created our... <br />
            <br /> We know how easy it is to overcomplicate your day. We all need structure to help
            us simplify. This worksheet is designed to help you...
            <br />
            <br /> Just like it helped me. I created this because I am like you... I also struggle
            with... I knew I needed a solution that was doable.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PromoPackCard4;
