import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavButton from 'components/Buttons/NavButton';
import { COLOR_LIGHT_ORANGE } from 'constants/Colors';
import UpgradePopupHelper from 'helpers/UpgradePopupHelper';
import { useBookCreation } from 'hooks/bookCreation';

import logo from 'img/header_logo.svg';
import toggle from 'img/toggle1.png';
import profile from 'img/profile.png';
import help from 'img/help.png';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import styles from './DashboardHeader.module.scss';

function DashboardHeader() {
  const navigate = useNavigate();

  const { header, left, right, left__logo, right__btnCont, right__btn, right__iconsCont } = styles;

  const { resetBookCreationData } = useBookCreation();
  const { resetWebsiteCreationData } = useWebsiteCreation();
  const [upgradePopupState, setUpgradePopupState] = useState('close');
  const plan = useSelector((state) => state.pricingPlan.plan);

  const handleProfileClick = () => {
    navigate('/dashboard/account-settings');
  };

  const handleHelpClick = () => {
    navigate('/dashboard/bug-report');
  };

  const handleBarsClick = () => {
    if (plan.title === 'Free') {
      setUpgradePopupState('open');
    } else {
      navigate('/dashboard/your-list');
    }
  };

  const handleCreateProductClick = () => {
    resetBookCreationData();
    resetWebsiteCreationData();
    navigate('/dashboard/product-type');
  };

  return (
    <div className={header}>
      <Link className={left} to="/dashboard">
        <img className={left__logo} src={logo} alt="Bizzy Logo" />
      </Link>
      <div className={right}>
        <div className={right__btnCont}>
          <NavButton
            className={right__btn}
            type="button"
            txt="Create Product"
            bgColor={COLOR_LIGHT_ORANGE}
            onClick={handleCreateProductClick}
          />
        </div>
        <div className={right__iconsCont}>
          <img onClick={handleBarsClick} src={toggle} alt="bars" />
          <img onClick={handleHelpClick} src={help} alt="help" />
          <img onClick={handleProfileClick} src={profile} alt="profile" />
        </div>
      </div>
      <UpgradePopupHelper
        upgradePopupState={upgradePopupState}
        setUpgradePopupState={setUpgradePopupState}
        plan={plan}
        isFree
      />
    </div>
  );
}

export default DashboardHeader;
