import React, { useState } from 'react';

import Input from 'components/InputFields/Input';
import Loader from 'components/Loader/Loader';

import { Skeleton } from '@mui/material';

import instaImg from 'img/planner_conv.png';
import styles from './PromoPackCard2.module.scss';

function PromoPackCard2(props) {
  const { card, card__textBox, img__container } = styles;
  const { imageCon, textCon, setTextCon, isLoading, fetchRandomConData } = props;

  const handleInputChange = (evt) => {
    setTextCon(evt.target.value);
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={card}>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" style={{ width: '60%' }} height={320} />
          <Skeleton variant="rounded" style={{ width: '40%' }} height={320} />
        </>
      ) : (
        <>
          <div className={img__container}>
            <img
              src={imageCon.length > 0 ? imageCon : instaImg}
              alt="insta post"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {imageLoaded && (
            <div className={card__textBox}>
              <Input
                textArea
                value={textCon}
                onChange={handleInputChange}
                placeholder="Description"
                name="input1"
              />
              <Loader clickHandler={fetchRandomConData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PromoPackCard2;
