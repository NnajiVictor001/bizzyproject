import React from 'react';
import leftArrow from 'img/left_arrow.svg';
import styles from './ArrowButton.module.scss';

function ArrowButton(props) {
  const { className, type, bgColor, txt, onClick } = props;
  const { navButton, innerButton } = styles;

  return (
    <button
      type={type}
      className={`${className} ${navButton}`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}>
      <div className={innerButton}>
        <img src={leftArrow} alt="left arrow" />
        <p>{txt}</p>
      </div>
    </button>
  );
}

export default ArrowButton;
