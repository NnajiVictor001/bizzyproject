import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pallete from 'components/SlideShow/Pallete';
import { productBrandingSliceActions } from 'store/product-branding';
import { productBatchesSliceActions } from 'store/product-batches';

import styles from './PalleteSlideShow.module.scss';

function PalleteSlideShow() {
  const palleteData = useSelector((state) => state.productBranding.palleteData);
  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const selectedPaletteArr = useSelector((state) => state.productBranding.selectedPaletteArr);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const dispatch = useDispatch();

  const { main, container, arrow_left_btn, arrow_right_btn, arrow_img, body_con } = styles;

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
    dispatch(
      productBrandingSliceActions.selectColorPallete({
        ...item,
        isUpdate: true
      })
    );
    const updatedDefaultPalette = selectedPaletteArr.find((palette) => palette.name === item.name);
    dispatch(productBrandingSliceActions.setDefaultPalette(updatedDefaultPalette));

    // Update Collor Pallete in selected pages
    const copiedPages = [...selectedTotalPages];
    const updatedPages = [];
    copiedPages.forEach((page) => {
      const ingredients = page.ingredients.map((ingredient) => {
        const ingredientData = { ...ingredient.ingredient_data };

        Object.keys(ingredientData).forEach((key) => {
          if (key.includes('color_key')) {
            const keyValue = key.replace('color_key', 'color');
            const colorId = ingredientData[key];

            if (updatedDefaultPalette[colorId]) {
              ingredientData[keyValue] = updatedDefaultPalette[colorId];
            }
          }
        });
        return {
          ...ingredient,
          ingredient_data: ingredientData
        };
      });
      updatedPages.push({
        ...page,
        ingredients
      });
    });

    dispatch(productBatchesSliceActions.setSelectPages(updatedPages));
  };

  return (
    <div className={main}>
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
      <div className={container}>
        <div ref={carousel} className={body_con}>
          {palleteData.map((resource, index) => (
            <Pallete
              resource={resource}
              key={index}
              handleClickItem={handleClickItem}
              selectedPallete={selectedPallete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PalleteSlideShow;
