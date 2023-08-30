import React from 'react';

import { COLOR_BLACK } from 'constants/Colors';

import styles from './PrimaryHeading.module.scss';

export default function PrimaryHeading({ txt, color }) {
  const { heading } = styles;
  return (
    <h1
      style={{
        color: color || COLOR_BLACK
      }}
      className={heading}>
      {txt || 'Primary Heading'}
    </h1>
  );
}
