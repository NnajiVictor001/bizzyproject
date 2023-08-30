import React from 'react';
import Button from 'components/Buttons/Button';

import bg from 'img/card-bg.png';
import { COLOR_WHITE } from 'constants/Colors';
import styles from './PromoPackCardEmailPlaceholder.module.scss';

function PromoPackCardEmailPlaceholder() {
  const {
    card,
    card__cover,
    card__banner,
    card__heading,
    card__heading_sub,
    card__content,
    card__content_title,
    card__content_details,
    card__content_btn,
    card__content_btn_txt
  } = styles;

  return (
    <div className={card}>
      <img className={card__cover} src={bg} alt="Card Cover" />
      <div className={card__banner}>
        <p className={card__heading}>thank you!</p>
        <p className={card__heading_sub}>For your purchase</p>
      </div>
      <div className={card__content}>
        <p className={card__content_title}>Hi Cali,</p>
        <p className={card__content_details}>
          Everyone could use a little organization to brighten up their day. That&apos;s why you can
          download your Sunshine planner right now!
        </p>
        <Button className={card__content_btn} color={COLOR_WHITE}>
          <div className={card__content_btn_txt}>Download Now</div>
        </Button>
      </div>
    </div>
  );
}

export default PromoPackCardEmailPlaceholder;
