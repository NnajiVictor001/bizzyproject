import React from 'react';

import loadIcon from 'img/load-icon.png';
import styles from './Loader.module.scss';

function Loader(props) {
  const { position, className, clickHandler, isLoadingSalesEmailData, style } = props;
  const { loader__top, loader__bottom, loader__spin } = styles;
  const loaderClassName = position === 'top' ? loader__top : loader__bottom;

  const onClick = () => {
    clickHandler();
  };

  return (
    <img
      className={`${loaderClassName} ${className} ${isLoadingSalesEmailData ? loader__spin : ''}`}
      src={loadIcon}
      alt="Loader"
      style={style}
      onClick={onClick}
    />
  );
}

export default Loader;
