import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './SimpleTab.module.scss';

function SimpleTab(props) {
  const { title, icon, targetPath, showChat, onClick } = props;
  const { simpleTab, simpleTabActive, simpleTab__icon } = styles;
  const location = useLocation();

  const getPathStatus = (path1, path2) => path1 === path2;

  const linkClasses = getPathStatus(targetPath, location.pathname) ? simpleTabActive : simpleTab;

  return (
    <NavLink to={targetPath} className={linkClasses} onClick={showChat || onClick}>
      <span />
      <img className={simpleTab__icon} src={icon} alt={`${targetPath} Icon`} />
      <em>{title}</em>
    </NavLink>
  );
}

export default SimpleTab;
