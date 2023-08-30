import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ColorStripe from 'components/ColorStripe/ColorStripe';
import PickMyColors from 'components/Products/PickMyColorPallet';

import { productBrandingSliceActions } from 'store/product-branding';

import styles from './EditUserColors.module.scss';

function EditUserColors({ left, right, userColors, heading }) {
  const dispatch = useDispatch();
  const { title, main } = styles;
  const [showPicker, setShowPicker] = useState(false);
  const { color1, color2, color3, color4, color5 } = userColors;
  const [colors, setColors] = useState([color1, color2, color3, color4, color5]);
  const originalColors = [color1, color2, color3, color4, color5];
  const storePaletteColors = useSelector((state) =>
    state.productBranding.selectedPallete.mainColors.map((item) => item.value)
  );
  if (JSON.stringify(storePaletteColors) !== JSON.stringify(colors)) setColors(storePaletteColors);

  const titleHeading = heading || 'Edit Your Colors';

  const selectWebsiteColor = (item, _index) => {
    dispatch(productBrandingSliceActions.setSelectedWebsiteColor(item));
  };

  useEffect(() => {
    dispatch(productBrandingSliceActions.setUserPalletData(userColors));
  }, [userColors, dispatch]);

  return (
    <>
      {showPicker && (
        <div
          style={{
            right,
            left
          }}
          className={`${main}`}>
          <PickMyColors
            originalColors={originalColors}
            setColors={setColors}
            onCheck={() => setShowPicker(!showPicker)}
            onBackClick={() => setShowPicker(!showPicker)}
          />
        </div>
      )}
      <h3 className={title}>{titleHeading}</h3>
      <ColorStripe onItemClick={selectWebsiteColor} colors={colors} />
    </>
  );
}

export default EditUserColors;
