import React from 'react';
import PossibilityCalculator from 'components/PossibilityCalculator/PossibilityCalculator';
import MyProductLibrary from 'components/Products/MyProductLibrary';
import styles from './Products.module.scss';

function Products(props) {
  const { website } = props;
  const { products } = styles;

  return (
    <div className={products}>
      <PossibilityCalculator />
      <MyProductLibrary website={website} />
    </div>
  );
}

export default Products;
