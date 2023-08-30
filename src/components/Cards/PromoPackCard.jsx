import React from 'react';

import DownloadButton from 'components/Buttons/DownloadButton';

import { CircularProgress } from '@mui/material';

import checkBox from 'img/small-tick-white.png';
import checkBoxBlack from 'img/small-tick-black.png';
import { COLOR_ORANGE } from 'constants/Colors';
import styles from './PromoPackCard.module.scss';

function PromoPackCard(props) {
  const { title, isActive, details, children, buttonAction, buttonText, isLoading } = props;

  const {
    card,
    header,
    header__left,
    header__right,
    header__heading,
    header__text,
    body,
    body__button,
    body__btnCont
  } = styles;

  return (
    <div className={card}>
      <div className={header}>
        <img src={isActive ? checkBoxBlack : checkBox} alt="Check Box" className={header__left} />
        <div className={header__right}>
          <p className={header__heading}>{title}</p>
          <p className={header__text}>{details}</p>
        </div>
      </div>
      <div className={body}>
        {children}
        <div className={body__btnCont}>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <DownloadButton
              className={body__button}
              bgColor={COLOR_ORANGE}
              txt={buttonText}
              onClick={buttonAction}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PromoPackCard;
