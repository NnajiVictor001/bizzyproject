import React from 'react';
import styles from './SelectedPlan.module.scss';

function SelectedPlan(props) {
  const { title, cost, desc, className, introductory = false } = props;
  const { plan, plan__title, plan__cost, plan__description, flex } = styles;

  return (
    <div className={`${className} ${plan}`}>
      <div className={flex}>
        <h1 className={plan__title}>{introductory ? 'Business Introductory' : title}</h1>
        <span>
          {/* {!introductory && (
            <NavLink className={plan__change} to="/register/user-plan">
              Change Plan
            </NavLink>
          )} */}
        </span>
      </div>
      <h2 className={plan__cost}>${introductory ? '243' : cost} /y</h2>
      <p className={plan__description}>
        {introductory
          ? 'This is our top-level commercial account, intended for the big businesses with enterprise-level  needs. This is our founding member rate.  Only 300 companies will be accepted as founders.'
          : desc}
      </p>
    </div>
  );
}

export default SelectedPlan;
