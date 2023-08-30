import React from 'react';

import styles from './SalesVideoDeliveryHeading.module.scss';

export default function SalesVideoDeliveryHeading() {
  const { heading, heading__sub_header, heading__body, heading__toolkit } = styles;
  return (
    <div className={heading}>
      <div className={heading__body}>
        <p>
          Your
          <span className={heading__toolkit}>tool kit</span> is the
        </p>
        <p>shortcut to a clean</p>
        <p>home.</p>
      </div>
      <div className={heading__sub_header}>
        You don&apos;t need a cleaner, you need a system to organize so there is less to clean!
      </div>
    </div>
  );
}
