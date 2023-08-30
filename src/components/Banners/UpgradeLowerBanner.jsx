import React from 'react';

import listIcon from 'img/list_icon.png';
import styles from './UpgradeLowerBanner.module.scss';

function UpgradeLowerBanner(props) {
  const { onClick } = props;
  const {
    banner,
    banner__right,
    banner__left,
    banner__waProducts,
    banner__itUpgrade,
    banner__li,
    banner__listIcon
  } = styles;
  return (
    <div onClick={onClick} className={banner}>
      <div className={banner__left}>
        <p className={banner__waProducts}>WANT MORE PRODUCTS?? </p>
        <p className={banner__itUpgrade}>
          IT’S TIME TO <br />
          UPGRADE
        </p>
      </div>
      <div className={banner__right}>
        <p className={banner__li}>
          <img className={banner__listIcon} src={listIcon} alt="List Icon" /> Get Access to Our Pro
          Templates &amp; UNLIMITED Products!
        </p>
        <p className={banner__li}>
          <img className={banner__listIcon} src={listIcon} alt="List Icon" /> Create Sales Pages
          Instantly to Match Your Products!
        </p>
        <p className={banner__li}>
          <img className={banner__listIcon} src={listIcon} alt="List Icon" /> Have Promotional
          Content Written FOR YOU!!
        </p>
      </div>
    </div>
  );
}

export default UpgradeLowerBanner;
