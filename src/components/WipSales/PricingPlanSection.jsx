import React from 'react';

import styles from './PricingPlanSection.module.scss';

function PricingPlanSection() {
  const { main } = styles;
  return (
    <div className={main}>
      <p>Smart plans for growing businesses</p>
      <h1>Our Pricing Plans</h1>
    </div>
  );
}

export default PricingPlanSection;
