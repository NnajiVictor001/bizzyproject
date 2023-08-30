import React, { useState, useEffect } from 'react';

import Input from 'components/InputFields/Input';
import Loader from 'components/Loader/Loader';
import CopyBox from 'components/CopyBox/CopyBox';

import { CircularProgress, Skeleton } from '@mui/material';

import instaImg from 'img/instaPlace.png';
import styles from './PromoPackCard1.module.scss';
import PromoPackImgSection from '../../pages/customer-sales-pages/PromoPackImgSection';

function PromoPackCard1(props) {
  const {
    card,
    card__main,
    card__input,
    card__inputCont,
    card__instaCardCont,
    card__inputPlaceholder,
    card__inputContainer,
    card__inputWidth,
    card__mainInput,
    card__inputButton,
    card__open_btn,
    card__imgContainer,
    flexCenter
  } = styles;

  const {
    isLoading,
    textAd,
    setTextAd,
    websiteUrl,
    imageAd,
    isLoadingImage,
    isLoadingText,
    fetchRandomImageAd,
    fetchRandomTextAd,
    bookData
  } = props;
  const refreshText = () => {
    fetchRandomTextAd();
  };

  const handleInputChange = (evt) => {
    setTextAd(evt.target.value);
  };
  const [imageMockUp, setImageMockUp] = useState(instaImg);
  useEffect(() => {
    if (imageAd && imageAd.mockup && imageAd.mockup.length > 0) {
      setImageMockUp(imageAd.mockup);
    }
  }, [imageAd.mockup]);
  return (
    <div className={card}>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" height={190} />
          <br />
          <Skeleton variant="rounded" height={110} />
        </>
      ) : (
        <>
          <div className={card__main}>
            <div className={card__instaCardCont}>
              {isLoadingImage ? (
                <div className={flexCenter} style={{ width: '18.4rem' }}>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <div>
                  <div className={card__imgContainer} style={{ marginRight: '1rem' }}>
                    {Object.keys(bookData).length > 0 && (
                      <PromoPackImgSection
                        id={imageAd.id}
                        cover={bookData?.cover_image_preview}
                        bookColor={bookData?.options?.color_palette?.background_color1}
                        bookPage={bookData?.pages}
                        mockupGroup={imageAd.mockup_group}
                      />
                    )}
                    {imageMockUp ? (
                      <Loader
                        style={{ right: '-3.5rem' }}
                        clickHandler={() => {
                          fetchRandomImageAd();
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )}
            </div>
            {isLoadingText ? (
              <div className={flexCenter}>
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <Input
                loader
                loaderStyle={{
                  marginRight: '10px',
                  marginBottom: '5px'
                }}
                loaderPosition="bottom"
                placeholderClass={card__inputPlaceholder}
                textArea
                parentClass={card__inputCont}
                className={card__input}
                value={textAd}
                onChange={handleInputChange}
                placeholder="Description"
                name="input1"
                clickHandler={refreshText}
              />
            )}
          </div>
          <div className={card__inputContainer}>
            <div className={card__inputWidth}>
              <Input
                type="text"
                placeholder="Sales Page URL"
                className={card__mainInput}
                defaultValue={websiteUrl}
                noPointerEvents
                onChange={handleInputChange}
                name="url1"
              />
            </div>
            <CopyBox text={websiteUrl} className={card__inputButton}>
              Copy
            </CopyBox>
            <div className={card__open_btn} onClick={() => window.open(websiteUrl, '_blank')}>
              Open
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PromoPackCard1;
