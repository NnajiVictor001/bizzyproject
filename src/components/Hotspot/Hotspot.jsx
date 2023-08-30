import React, { useState, useEffect, useRef } from 'react';

import hotspotImg from 'img/hotspot-down.png';
import styles from './Hotspot.module.scss';

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

function Hotspot(props) {
  const {
    container,
    hotspot,
    hotspot__img,
    hotspot__product,
    hotspot__product__span,
    hotspot__list,
    hotspot__list__span,
    hotspot__profile,
    hotspot__profile__span,
    hotspot__help,
    hotspot__help__span,
    hotspot__video,
    hotspot__video__span,
    hotspot__stat,
    hotspot__stat__span,
    hotspot__started,
    hotspot__started__span,
    rotate__top,
    rotate__left,
    rotate__right,
    rotate__bottom,
    popup,
    popup__title,
    popup__subTitle,
    popup__content
  } = styles;

  const { rotateDirection, title, subTitle, content, position } = props;

  const [rotate, setRotate] = useState(false);

  const handleClickOutside = () => {
    setRotate(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const clickHandler = () => {
    setRotate(!rotate);
  };

  let rotateClass = '';
  if (rotateDirection === 'left') rotateClass = rotate__left;
  else if (rotateDirection === 'right') rotateClass = rotate__right;
  else if (rotateDirection === 'top') rotateClass = rotate__top;
  else rotateClass = rotate__bottom;

  let containerClass = '';
  let hotspotClass = '';
  switch (position) {
    case 'Products':
      containerClass = hotspot__product;
      hotspotClass = hotspot__product__span;
      break;
    case 'List':
      containerClass = hotspot__list;
      hotspotClass = hotspot__list__span;
      break;
    case 'Profile':
      containerClass = hotspot__profile;
      hotspotClass = hotspot__profile__span;
      break;
    case 'Help':
      containerClass = hotspot__help;
      hotspotClass = hotspot__help__span;
      break;
    case 'Video':
      containerClass = hotspot__video;
      hotspotClass = hotspot__video__span;
      break;
    case 'StatDashboard':
      containerClass = hotspot__stat;
      hotspotClass = hotspot__stat__span;
      break;
    case 'GetStarted':
      containerClass = hotspot__started;
      hotspotClass = hotspot__started__span;
      break;
    default:
      containerClass = '';
      hotspotClass = '';
  }

  const popupMessage = (
    <div className={popup} onClick={clickHandler}>
      <h3 className={popup__title}>{title}</h3>
      <h4 className={popup__subTitle}>{subTitle}</h4>
      <p className={popup__content}>{content}</p>
    </div>
  );

  return (
    <div className={`${container} ${containerClass}`} ref={ref}>
      <span
        className={`${hotspot} ${rotate && rotateClass} ${hotspotClass}`}
        onClick={clickHandler}>
        <img src={hotspotImg} className={hotspot__img} alt="hotspot" />
      </span>
      {popupMessage}
    </div>
  );
}

export default Hotspot;
