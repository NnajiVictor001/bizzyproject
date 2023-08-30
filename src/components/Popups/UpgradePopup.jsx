import React from 'react';

import PopupLayout from 'components/Layouts/PopupLayout';
import NavButton from 'components/Buttons/NavButton';
import { CircularProgress } from '@mui/material';
import { COLOR_YELLOW_LIGHTER } from 'constants/Colors';

import upgrade from 'img/upgrade.png';
import styles from './UpgradePopup.module.scss';

function UpgradePopup(props) {
  const { onClose, onClick, loading } = props;
  const { popup, popup__img, popup__heading, popup__details, popup__btn, popup__link } = styles;
  return (
    <PopupLayout onClose={onClose}>
      <div className={popup}>
        <img src={upgrade} className={popup__img} alt="Upgrade" />
        <h3 className={popup__heading}>It’s time to upgrade.</h3>
        <p className={popup__details}>
          You’ve reached the limit of your current plan.
          <br /> To add more product, you’ll need to upgrade.
        </p>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <NavButton
              onClick={onClick}
              className={popup__btn}
              bgColor={COLOR_YELLOW_LIGHTER}
              txt="View Options"
            />
            <p onClick={onClose} className={popup__link}>
              No, thanks
            </p>
          </>
        )}
      </div>
    </PopupLayout>
  );
}
export default UpgradePopup;
