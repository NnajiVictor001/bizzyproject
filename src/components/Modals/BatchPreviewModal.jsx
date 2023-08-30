import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import NavButton from 'components/Buttons/NavButton';
import { productBatchesSliceActions } from 'store/product-batches';
import Carousel from 'helpers/Carousel';

import closeMark from 'img/close.svg';
import styles from './BatchPreviewModal.module.scss';

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

function BatchPreviewModal(props) {
  const dispatch = useDispatch();
  const { setIsOpen, clickedBatch } = props;
  const { pages } = clickedBatch;

  const {
    popup,
    popup__content,
    popup__content__header,
    popup__content__header__title,
    popup__content__header__closeBtn,
    popup__content__body,
    modal_button_container,
    preview_con
  } = styles;

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const images = pages.map((item) => ({
      id: item.id,
      order: item.order,
      src: item.page.image_preview
    }));
    setPreviewImages(images);
  }, []);

  const AddClickHandler = () => {
    dispatch(productBatchesSliceActions.toggleBatches(clickedBatch));
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <h5 className={popup__content__header__title}>{clickedBatch.name} : Preview</h5>
          <button className={popup__content__header__closeBtn} onClick={() => setIsOpen(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={popup__content__body}>
          <div className={preview_con}>
            <Carousel images={previewImages} />
          </div>
          <div className={modal_button_container}>
            <NavButton
              type="button"
              txt="YES, Add this! "
              bgColor="#FFC800"
              onClick={AddClickHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchPreviewModal;
