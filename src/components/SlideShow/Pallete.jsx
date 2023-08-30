import React from 'react';
import { RgbToHexColor } from 'helpers/custom-functions';

import styles from './Pallete.module.scss';

function Pallete(props) {
  const { pallete, pallete__item, color_chip, select_chip } = styles;
  const { handleClickItem, resource, selectedPallete, chooseOneColorFromPallete, selectColor } =
    props;

  const clickItem = () => {
    handleClickItem(resource);
  };

  const clickColor = (evt) => {
    const color = evt.target.style.background;
    selectColor(RgbToHexColor(color));
  };

  let itemClassName;
  if (chooseOneColorFromPallete) {
    itemClassName = pallete__item;
  } else {
    itemClassName = `${pallete__item} ${
      resource.id === selectedPallete.id && resource.name === selectedPallete.name && select_chip
    }`;
  }

  return (
    <div className={pallete} onClick={chooseOneColorFromPallete ? undefined : clickItem}>
      <div className={itemClassName}>
        {resource.mainColors.map((item, index) => (
          <div
            key={index}
            className={color_chip}
            style={{ background: item.value }}
            onClick={chooseOneColorFromPallete ? clickColor : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default Pallete;
