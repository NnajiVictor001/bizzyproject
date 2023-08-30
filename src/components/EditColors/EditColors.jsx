import React, { useState } from 'react';

import ColorStripe from 'components/ColorStripe/ColorStripe';
import PickMyColors from 'components/Products/PickMyColorPallet';

import eyeDrop from 'img/eyeDrop.png';
import styles from './EditColors.module.scss';

function EditColors(props) {
  const [showPicker, setShowPicker] = useState(false);
  const { main, main__colorStrip, main__row, main__container, main__box } = styles;
  const { colors } = props;

  return (
    <div className={main}>
      {showPicker && (
        <div className={main__box}>
          <PickMyColors
            onCheck={() => setShowPicker(!showPicker)}
            onBackClick={() => setShowPicker(!showPicker)}
          />
        </div>
      )}
      <div className={main__container}>
        <div className={main__row}>
          <p>Edit Your Colors</p>
          <img onClick={() => setShowPicker(!showPicker)} src={eyeDrop} alt="Eyedrop icon" />
        </div>
        <div className={main__colorStrip}>
          <ColorStripe colors={colors} />
        </div>
      </div>
    </div>
  );
}

export default EditColors;
