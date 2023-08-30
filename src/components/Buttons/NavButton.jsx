import React from 'react';
import styles from './NavButton.module.scss';

function NavButton(props) {
  const { className, type, bgColor, txt, onClick, color, disabled } = props;
  const { navButton } = styles;

  return (
    <button
      type={type}
      className={`${className} ${navButton}`}
      style={{ backgroundColor: bgColor, color }}
      onClick={onClick}
      disabled={disabled}>
      {txt}
    </button>
  );
}

export default NavButton;
