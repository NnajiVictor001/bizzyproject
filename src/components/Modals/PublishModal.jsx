import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import closeMark from 'img/close.svg';
import NavButton from 'components/Buttons/NavButton';
import styles from './PublishModal.module.scss';

// import previewImg from "img/preview_image2.png";

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

function PublishModal(props) {
  const { data, setIsOpenPublishModal, callback } = props;
  const navigate = useNavigate();

  const {
    popup,
    popup__content,
    popup__content__header,
    header_title,
    popup__content__header__closeBtn,
    body,
    body__image,
    body__title,
    body__title__txt,
    body__content,
    body__content__txt,
    download_link,
    bottom_con
  } = styles;

  const handleClickOutside = () => {
    setIsOpenPublishModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);
  const bookId = useSelector((state) => state.productLibrary.createdBookId);
  const plan = useSelector((state) => state.pricingPlan.plan);

  const handleResultButton = () => {
    const values = {};
    callback(values);
    setIsOpenPublishModal(false);
    if (plan.title === 'Free') {
      navigate('/dashboard/websites');
    } else {
      navigate(`/dashboard/website-creation/${bookId}`);
    }
  };

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <p className={header_title}>Publish</p>
          <button
            className={popup__content__header__closeBtn}
            onClick={() => setIsOpenPublishModal(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={body}>
          <div className={body__image}>
            <img src={data.cover} alt="preview " />
          </div>
          <div className={body__title}>
            <p className={body__title__txt}>
              Your
              {data.type}:
            </p>
            <p className={body__title__txt}>{data.title}</p>
          </div>
          <div className={body__content}>
            <p className={body__content__txt}>
              Here is Your Link to the Product.{' '}
              <a className={download_link} href={data.link} target="_blank" rel="noreferrer">
                Download Link.
              </a>
            </p>
          </div>
          <div className={bottom_con}>
            <NavButton
              type="button"
              txt="Create My Website to Promote My Product"
              bgColor="#FFC800"
              onClick={handleResultButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishModal;
