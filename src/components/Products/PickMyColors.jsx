import React from 'react';
import { useDispatch } from 'react-redux';
import PalleteSlideShow from 'components/SlideShow/PalleteSlideShow';
import { productBrandingSliceActions } from 'store/product-branding';
import picker from 'img/picker.svg';
import add from 'img/add.svg';
import styles from './PickMyColors.module.scss';

function PickMyColors() {
  const { container, title, title_con, right_con, add_colors } = styles;
  const dispatch = useDispatch();

  const handleAddCustomColors = () => {
    dispatch(productBrandingSliceActions.addColorsFlag(true));
  };

  return (
    <div className={container}>
      <div className={title_con}>
        <p className={title}>Pick My Colors</p>
        <div className={right_con}>
          <img src={picker} alt="picker svg" />
          <p className={add_colors} onClick={handleAddCustomColors}>
            <img src={add} alt="add svg" />
            Add Custom Colors
          </p>
        </div>
      </div>
      <PalleteSlideShow />
    </div>
  );
}

export default PickMyColors;
