import React, { useState } from 'react';

import PopupLayout from 'components/Layouts/PopupLayout';
import NavButton from 'components/Buttons/NavButton';
import { CircularProgress } from '@mui/material';
import SelectedPlan from 'components/Layouts/SelectedPlan';
import Toggle from 'components/Layouts/Toggle';

import { COLOR_YELLOW_LIGHTER } from 'constants/Colors';
import bee from 'img/bee.png';
import styles from './UpgradeFinalPopup.module.scss';

function UpgradeBusinessPopup(props) {
  const { onClose, onClick, loading, cost, upgradeToBusinessCost } = props;
  const { popup, popup__img, popup__heading, popup__details, popup__btn, marginsTB, wrapper } =
    styles;

  const [isToggle, setIsToggle] = useState(false);

  const onToggle = () => {
    setIsToggle(!isToggle);
    const interval = isToggle ? 'month' : 'year';
    upgradeToBusinessCost({ interval });
  };

  return (
    <PopupLayout onClose={onClose}>
      <div className={popup}>
        <img src={bee} className={popup__img} alt="Upgrade" />
        <h3 className={popup__heading}>Time to Upgrade!</h3>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <div className={wrapper}>
            <Toggle
              first="Monthly"
              second="Yearly"
              isToggled={isToggle}
              onToggle={onToggle}
              isMove
              className={marginsTB}
            />
            <SelectedPlan title="Business" cost={cost} desc="Unlock all the features" />
            <p className={popup__details}>
              You decided to upgrade to Business account. <br /> You will be charged ${cost}{' '}
              automatically. <br /> Are you sure?
            </p>

            <NavButton
              onClick={onClick}
              className={popup__btn}
              bgColor={COLOR_YELLOW_LIGHTER}
              txt={`Pay $${cost}`}
            />
          </div>
        )}
      </div>
    </PopupLayout>
  );
}
export default UpgradeBusinessPopup;
