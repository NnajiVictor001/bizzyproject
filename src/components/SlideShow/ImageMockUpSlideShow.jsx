import React, { useState, useRef, useEffect } from 'react';
import completeMark from 'img/complete.svg';
import MockupCoverSection from 'pages/customer-sales-pages/MockupCoverSection';
import { useSelector } from 'react-redux';
import styles from './ImageMockUpSlideShow.module.scss';

function ImageMockUpSlideShow(props) {
  const { data, selectedData, handleSelectedData } = props;
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const selectedCover = useSelector((state) => state.productBranding.selectedCover);

  const {
    main,
    container,
    carousel_con,
    arrow_left_btn,
    arrow_right_btn,
    arrow_img,
    body_con,
    body_con__item,
    select_chip,
    complete_image
  } = styles;

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  const handleClickItem = (item) => {
    handleSelectedData(item);
  };

  return (
    <div className={main}>
      {data.length > 3 ? (
        <>
          <button onClick={movePrev} className={arrow_left_btn} disabled={isDisabled('prev')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={arrow_img}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={moveNext} className={arrow_right_btn} disabled={isDisabled('next')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={arrow_img}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}
      <div className={container}>
        <div className={carousel_con}>
          <div ref={carousel} className={body_con}>
            {data.map((item, index) => (
              <div
                key={index}
                className={body_con__item}
                onClick={() => handleClickItem(item)}
                style={{ marginLeft: item.id === 3 && '20px' }}>
                <MockupCoverSection
                  mockupId={item.id}
                  coverImage={selectedCover.image_preview}
                  width={item.id === 3 ? '130px' : '150px'}
                  height="170px"
                  mockupImage={item.file}
                  containerClassName={item.id === selectedData.id && select_chip}
                />
                {item.id === selectedData.id && (
                  <div className={complete_image}>
                    <img src={completeMark} alt="complete mark" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageMockUpSlideShow;
