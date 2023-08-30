import React from 'react';

import PopupLayout from 'components/Layouts/PopupLayout';
import NavButton from 'components/Buttons/NavButton';
import { COLOR_YELLOW_LIGHTER } from 'constants/Colors';

import bee from 'img/bee.png';
import styles from './UpgradeFinalPopup.module.scss';

function UpgradeFinalPopup(props) {
  const { onClose } = props;
  const { popup, popup__img, popup__heading, popup__details, popup__btn } = styles;
  return (
    <PopupLayout onClose={onClose}>
      <div className={popup}>
        <img src={bee} className={popup__img} alt="Upgrade" />
        <h3 className={popup__heading}>Awesome!</h3>
        <p className={popup__details}>You’re ready to create more digital products!! </p>
        <NavButton
          onClick={onClose}
          className={popup__btn}
          bgColor={COLOR_YELLOW_LIGHTER}
          txt="Start Creating!"
        />
      </div>
    </PopupLayout>
  );
}
export default UpgradeFinalPopup;
