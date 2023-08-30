import React from 'react';
import MyProductLibrary from 'components/Products/MyProductLibrary';

import styles from './Products.module.scss';

function PromoPacksSidebar() {
  const { products } = styles;

  return (
    <div className={products}>
      <MyProductLibrary onlyPromoteProducts />
    </div>
  );
}

export default PromoPacksSidebar;
