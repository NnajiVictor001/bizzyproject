import React from 'react';
import checkMark from 'img/black_check.png';
import { useSelector } from 'react-redux';
import styles from './SalesSpendCheckSection.module.scss';

function SalesSpendCheckSection({ title, webBaseColor }) {
  const { main, main__check_txt } = styles;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main}>
      <img src={checkMark} alt="black check mark" />
      <p style={{ color: webBaseColor || selectedBaseWebsiteColor }} className={main__check_txt}>
        {title}
      </p>
    </div>
  );
}

export default SalesSpendCheckSection;
