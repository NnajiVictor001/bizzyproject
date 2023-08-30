import React from 'react';
import styles from './Input.module.scss';

function Input({ type, className, rest }) {
  const { input } = styles;
  return <input {...rest} className={`${input} ${className}`} type={type || 'text'} />;
}

export default Input;
