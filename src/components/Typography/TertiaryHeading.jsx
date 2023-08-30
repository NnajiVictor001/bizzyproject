import React from 'react';
import styles from './TertiaryHeading.module.scss';

function TertiaryHeading(props) {
  const { difColor } = props;
  const { txt: coloredTxt, color } = difColor;
  const { txt } = props;
  const { tertHeading } = styles;

  return difColor ? (
    <h3 className={tertHeading}>
      {txt} <span style={{ color }}>{coloredTxt}</span>
    </h3>
  ) : (
    <h3 className={tertHeading}>{txt}</h3>
  );
}

export default TertiaryHeading;
