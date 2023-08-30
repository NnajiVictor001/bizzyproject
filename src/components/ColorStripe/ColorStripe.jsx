import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import PickMyColors from 'components/Products/PickMyColorPallet';

import styles from './ColorStripe.module.scss';

function ColorStripe({ colors, onItemClick }) {
  const [showPicker, setShowPicker] = useState(false);

  const data = colors || ['#9ACC3A', '#FFA924', '#5CE1E6', '#FDC600', '#1CAEB2'];
  const { main, main__box, main__selected } = styles;

  const selectedWebsiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

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
      {data?.map((item, index) => (
        <div
          className={selectedWebsiteColor === item ? `${main__selected}` : ''}
          onClick={() => onItemClick(item, index)}
          key={index}
          style={{ backgroundColor: item }}
        />
      ))}
    </div>
  );
}

export default ColorStripe;
