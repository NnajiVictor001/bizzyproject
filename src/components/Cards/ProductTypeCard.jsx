import React from 'react';

import styles from './ProductTypeCard.module.scss';

function ProductTypeCard(props) {
  const { data } = props;
  const { name, description, image } = data;

  const { onClick } = props;
  const { productCard, card, productCard__title, productCard__description, card__img } = styles;

  const selectProductType = () => {
    onClick(data);
  };

  return (
    <div className={productCard} onClick={selectProductType}>
      <p className={productCard__title}>{name}</p>
      <p className={productCard__description}>{description}</p>
      <div className={card}>
        <img src={image} alt={name} className={card__img} />
      </div>
    </div>
  );
}

export default ProductTypeCard;
