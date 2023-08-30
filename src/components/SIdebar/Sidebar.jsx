import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SimpleTab from 'components/Tabs/SimpleTab';
import NestedTab from 'components/Tabs/NestedTab';
import UpgradePopupHelper from 'helpers/UpgradePopupHelper';

import helpSmall from 'img/help-small.png';
import toggleSmall from 'img/toggle-small.png';
import styles from './Sidebar.module.scss';
import stylesProducts from './SidebarProducts.module.scss';

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

function Sidebar(props) {
  const { routes } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const smallSideBarUrls = [
    '/dashboard/product-type',
    '/dashboard/product-part2',
    '/dashboard/sales-niche-topic',
    '/dashboard/create-product',
    '/dashboard/start-sales'
  ];
  let activeStyles;
  if (smallSideBarUrls.includes(pathname) || pathname.startsWith('/dashboard/website-creation/')) {
    activeStyles = stylesProducts;
  } else {
    activeStyles = styles;
  }
  const { sidebar, sidebar_expand, top, bottom, bottom__tab, sidebar__icon } = activeStyles;
  const [upgradePopupState, setUpgradePopupState] = useState('close');
  const [sidebarExpand, setSidebarExpand] = useState(false);
  const plan = useSelector((state) => state.pricingPlan.plan);

  // let scrollTop = false;
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (window.pageYOffset > 340) {
  //       scrollTop = true;
  //     } else {
  //       scrollTop = false;
  //     }
  //   });
  // }, []);

  const handleClickOutside = () => {
    setSidebarExpand(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const onClick = (evt) => {
    evt.preventDefault();
    setUpgradePopupState('open');
  };

  const handleSidebarClick = () => {
    if (smallSideBarUrls.includes(pathname)) {
      setSidebarExpand(!sidebarExpand);
    }
  };

  const onClickBugReport = () => {
    // setChatState("step1");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate('/dashboard/bug-report');
  };

  return (
    <div
      className={`${sidebar} ${sidebarExpand && sidebar_expand}`}
      onClick={handleSidebarClick}
      ref={ref}>
      <ul className={top}>
        {routes?.map((item, index) => (
          <li key={index} className={sidebar__icon}>
            {item.subTitles ? (
              <NestedTab
                title={item.title}
                icon={item.icon}
                targetPath={item.targetPath}
                subTitles={item.subTitles}
              />
            ) : (
              <SimpleTab
                title={item.title}
                icon={item.icon}
                targetPath={item.targetPath}
                onClick={item.title === 'Promo Packs' && plan.title === 'Free' && onClick}
              />
            )}
          </li>
        ))}
        <li className={sidebar__icon}>
          <SimpleTab
            title="Your List"
            icon={toggleSmall}
            targetPath="/dashboard/your-list"
            onClick={plan.title === 'Free' && onClick}
          />
        </li>
      </ul>
      <ul className={bottom}>
        <li className={bottom__tab}>
          <SimpleTab
            title="Help"
            icon={helpSmall}
            targetPath="/dashboard/bug-report"
            onClick={onClickBugReport}
          />
        </li>
      </ul>
      <UpgradePopupHelper
        upgradePopupState={upgradePopupState}
        setUpgradePopupState={setUpgradePopupState}
        plan={plan}
        isFree
      />
    </div>
  );
}

export default Sidebar;
