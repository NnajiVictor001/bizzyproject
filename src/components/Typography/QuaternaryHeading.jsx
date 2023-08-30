import React from 'react';
import styles from './QuaternaryHeading.module.scss';

function QuaternaryHeading(props) {
  const { quarHeading } = styles;
  const { txt } = props;

  return <h4 className={quarHeading}>{txt}</h4>;
}

export default QuaternaryHeading;
