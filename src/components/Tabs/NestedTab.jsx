import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './NestedTab.module.scss';

function NestedTab(props) {
  const { title, icon, targetPath, subTitles } = props;
  const { simpleTab, simpleTabActive, simpleTab__icon, nestedTab_con, nestedTab_con__item } =
    styles;
  const location = useLocation();

  const getPathStatus = (path1, path2) => path1 === path2;

  return (
    <>
      <NavLink
        to={targetPath}
        className={getPathStatus(targetPath, location.pathname) ? simpleTabActive : simpleTab}>
        <span />
        <img className={simpleTab__icon} src={icon} alt={`${targetPath} Icon`} />
        <em>{title}</em>
      </NavLink>
      <aside className={nestedTab_con}>
        {subTitles.map((item, index) => (
          <NavLink key={index} to={item.targetPath} className={nestedTab_con__item}>
            <span />
            <img className={simpleTab__icon} src={item.icon} alt={`${item.targetPath} Icon`} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </aside>
    </>
  );
}

export default NestedTab;
