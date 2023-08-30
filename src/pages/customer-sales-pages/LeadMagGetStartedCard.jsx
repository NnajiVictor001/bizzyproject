import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import iconspace_Bill from 'img/iconspace_Bill.png';
import iconspace_Select from 'img/iconspace_Select.png';
import iconspace_Board from 'img/iconspace_Board.png';

import styles from './LeadMagGetStartedCard.module.scss';
import stylesFull from './LeadMagGetStartedCardFull.module.scss';

function LeadMagGetStartedCard({ icon, title, content, web, webBaseColor }) {
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__icon, main__title, main__content } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main}>
      <div className={main__icon}>
        <img
          src={
            icon === 'iconspace_Bill'
              ? iconspace_Bill
              : icon === 'iconspace_Select'
              ? iconspace_Select
              : iconspace_Board
          }
          alt={icon}
        />
      </div>
      <p
        className={main__title}
        style={{
          color: webBaseColor || selectedBaseWebsiteColor
        }}>
        {title}
      </p>
      <p
        className={main__content}
        style={{
          color: webBaseColor || selectedBaseWebsiteColor
        }}>
        {content}
      </p>
    </div>
  );
}

export default LeadMagGetStartedCard;
