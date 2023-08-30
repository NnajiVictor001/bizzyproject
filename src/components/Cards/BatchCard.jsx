import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import InputCheckbox from 'components/InputFields/InputCheckbox';
import { CircularProgress } from '@mui/material';
import styles from './BatchCard.module.scss';

function BatchCard(props) {
  const { onChange, onClick, data } = props;
  const { id, name, pages } = data;
  const {
    productCard,
    card,
    productCard__topSection,
    card__img,
    card__img__show,
    bottom_con,
    bottom_con__txt,
    bottom_con__total,
    bottom_con__rightIcon,
    content
  } = styles;

  const [checked, setChecked] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);

  const selectedBatches = useSelector((state) => state.productBatches.selectedBatches);

  useEffect(() => {
    setNumberOfPages(pages.length);
    const images = pages.map((item) => ({
      id: item.id,
      order: item.order,
      src: item.page.image_preview
    }));
    setPreviewImages(images);
  }, []);

  useEffect(() => {
    if (selectedBatches.some((item) => id === item.id)) {
      const temp = selectedBatches.filter((item) => item.id === id)[0].checked;
      setChecked(temp);
    } else {
      setChecked(false);
    }
  }, [selectedBatches]);

  return (
    <div className={productCard}>
      <div className={productCard__topSection}>
        <InputCheckbox id={id} checked={checked} label={name} onChange={onChange} />
      </div>
      <div className={content}>
        <div className={card} onClick={onClick}>
          {previewImages.length ? (
            <>
              <img src={previewImages[0].src} alt={previewImages[0].order} className={card__img} />
              <img
                src={previewImages[0].src}
                alt={previewImages[0].order}
                className={`${card__img} ${card__img__show}`}
              />
            </>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </div>
      </div>
      <div className={bottom_con}>
        <p className={bottom_con__txt}>
          1<span className={bottom_con__total}>/{numberOfPages}</span>
        </p>
        <div className={bottom_con__rightIcon} onClick={onClick}>
          &#62;
        </div>
      </div>
    </div>
  );
}

export default BatchCard;
