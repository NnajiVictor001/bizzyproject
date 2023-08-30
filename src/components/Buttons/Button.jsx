import { COLOR_BLACK, COLOR_WHITE } from 'constants/Colors';
import React from 'react';

import styles from './Button.module.scss';

function Button(props) {
  const { className, onClick, color, bgColor, children, rest } = props;
  const { button } = styles;

  return (
    <button
      style={{
        color: color || COLOR_WHITE,
        backgroundColor: bgColor || COLOR_BLACK
      }}
      onClick={onClick}
      {...rest}
      className={`${button} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
