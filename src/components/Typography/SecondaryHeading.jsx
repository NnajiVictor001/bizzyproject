import React from 'react';

import { COLOR_BLACK } from 'constants/Colors';

import styles from './SecondaryHeading.module.scss';

export default function SecondaryHeading({ txt, color }) {
  const { heading } = styles;
  return (
    <h1
      style={{
        color: color || COLOR_BLACK
      }}
      className={heading}>
      {txt || 'Secondary Heading'}
    </h1>
  );
}
