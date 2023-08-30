import React from 'react';
import { useSelector } from 'react-redux';

import { shade } from 'helpers/custom-functions';

import styles from './SalesThankyouOrderReceipt.module.scss';

function SalesThankyouOrderReceipt(props) {
  const {
    main,
    main__order_txt,
    main__happier,
    main__happier__txt,
    main__total,
    main__total__txt,
    main__total__price_con,
    main__total__price_con__unit,
    main__total__price_con__value
  } = styles;

  const { bookName, bookPrice, websiteColor, webBaseColor } = props;
  const selectedWebsiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div
      className={main}
      style={{
        backgroundColor: websiteColor ? shade(websiteColor, 0.7) : shade(selectedWebsiteColor, 0.7),
        color: webBaseColor || selectedBaseWebsiteColor
      }}>
      <p className={main__order_txt}>Order Receipt</p>
      <div className={main__happier}>
        <p className={main__happier__txt}>{bookName}</p>
        <p className={main__happier__txt}>${bookPrice}</p>
      </div>
      <div className={main__total}>
        <p className={main__total__txt}>Total</p>
        <div className={main__total__price_con}>
          <p className={main__total__price_con__unit}>USD</p>
          <p className={main__total__price_con__value}>${bookPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default SalesThankyouOrderReceipt;
