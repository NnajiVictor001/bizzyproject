import React from 'react';

import Button from 'components/Buttons/Button';

import crown from 'img/crown.png';
import { COLOR_BLACK, COLOR_YELLOW_LIGHTER } from 'constants/Colors';
import style from './UpgradeTopBanner.module.scss';

function UpgradeTopBanner(props) {
  const { onClick } = props;
  const { top, top__text, top__highlight, top__btn, top__btnText, top__btnIcon } = style;
  return (
    <div className={top}>
      <p className={top__text}>
        Want <span className={top__highlight}>MORE</span> products &amp; features? Unlock everything
        Pro has to offer
      </p>
      <div className={top__btn}>
        <Button onClick={onClick} bgColor={COLOR_YELLOW_LIGHTER} color={COLOR_BLACK}>
          <div className={top__btnText}>
            <img src={crown} alt="Crown" className={top__btnIcon} />
            <span> Upgrade Plan</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default UpgradeTopBanner;
