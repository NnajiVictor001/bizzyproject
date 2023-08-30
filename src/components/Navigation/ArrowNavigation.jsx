import React, { useState } from 'react';
import activeArrow from 'img/active-arrow.png';
import inActiveArrow from 'img/inActive-arrow.png';
import styles from './ArrowNavigation.module.scss';

function ArrowNavigation(props) {
  const { maxValue } = props;
  const [activeNum, setActiveNum] = useState(1);
  const { nav, nav__leftArrow, nav__rightArrow } = styles;
  const max = maxValue || 2;
  const nextClick = () => {
    if (activeNum < max) {
      setActiveNum(activeNum + 1);
    } else {
      setActiveNum(max);
    }
  };
  const prevClick = () => {
    if (activeNum > 1) {
      setActiveNum(activeNum - 1);
    } else {
      setActiveNum(1);
    }
  };

  return (
    <div className={nav}>
      <img
        onClick={prevClick}
        className={nav__leftArrow}
        src={activeNum < 2 ? inActiveArrow : activeArrow}
        alt="Arrow"
      />
      <span>{`${activeNum}/${max}`}</span>
      <img
        onClick={nextClick}
        className={nav__rightArrow}
        src={activeNum < max ? activeArrow : inActiveArrow}
        alt="Arrow"
      />
    </div>
  );
}

export default ArrowNavigation;
