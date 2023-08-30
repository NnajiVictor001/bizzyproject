import React, { useEffect, useState } from 'react';
import { RgbToHexColor } from 'helpers/custom-functions';
import eye from 'img/eye.svg';
import eye_slash from 'img/eye-slash.svg';
import selectedColorMark from 'img/selected-color-mark.png';
import styles from './InputColorBar.module.scss';

function InputColorBar(props) {
  const { pallete, pallete__item, color_chip, checked, icon_eye } = styles;
  const {
    id,
    handleClickItem,
    colorsBar,
    className,
    value,
    isSelectedBaseColor,
    isEyeIcon,
    metadata,
    onHandleClickEye = () => {}
  } = props;

  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (metadata && metadata[id] && metadata[id].hide) {
      setIsShow(false);
    }
  }, []);

  const clickItem = (evt) => {
    const color = evt.target.style.background;
    if (color) {
      handleClickItem(RgbToHexColor(color));
    }
  };

  const handleClick = () => {
    setIsShow(!isShow);
    if (onHandleClickEye) onHandleClickEye(id, isShow);
  };

  return (
    <>
      {isEyeIcon &&
        (isShow ? (
          <img src={eye} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ) : (
          <img src={eye_slash} className={icon_eye} alt="eye" onClick={() => handleClick()} />
        ))}
      <div className={pallete}>
        <div className={pallete__item}>
          {colorsBar.map((item, index) => (
            <div
              key={index}
              className={`${color_chip} ${className}`}
              style={{ background: item.value }}
              onClick={clickItem}>
              {(item.value?.toLowerCase() === value?.toLowerCase() ||
                (isSelectedBaseColor && index === colorsBar.length - 1)) &&
                checked && (
                  <img className={checked} src={selectedColorMark} alt="Selected Color Mark" />
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InputColorBar;
