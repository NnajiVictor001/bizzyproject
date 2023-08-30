import React from 'react';
import styles from './SelectImages.module.scss';

function SelectImages(props) {
  const { aboutMePages, handleImageClick } = props;

  const {
    container,
    container__upper,
    container__bottom,
    container__bottom__txt,
    container__bottom__content,
    original_image,
    selected_image
  } = styles;

  return (
    <div className={container}>
      <div className={container__upper}>
        <img src={aboutMePages.image_preview} alt="top_select" />
      </div>
      <div className={container__bottom}>
        <p className={container__bottom__txt}>
          Change <br /> The Layout &#x203A;
        </p>
        <div className={container__bottom__content}>
          {aboutMePages.pages.map((x) => (
            <img
              key={x.page}
              src={x.image_preview}
              alt={`${x.page}_image`}
              className={`${original_image} ${x.page === aboutMePages.page && selected_image}`}
              onClick={() => handleImageClick(x)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectImages;
