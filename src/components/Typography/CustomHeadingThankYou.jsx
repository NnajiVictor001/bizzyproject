import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './CustomHeading.module.scss';
import stylesFull from './CustomHeadingFull.module.scss';
import ColoredSubText from './ColoredSubText';

export default function CustomHeadingThankYou({
  web,
  webHeading,
  webHeadingColor,
  webSubHeading,
  webSubHeadingColor,
  deliveryMainData
}) {
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { heading, heading__sub_header, heading__body } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const productName = useSelector((state) => state.productBranding.productName);

  return (
    <div className={heading} id="thankYouHeading">
      {web ? (
        <>
          {webSubHeading ? (
            <div className={heading__body} style={{ color: `${webSubHeadingColor}` }}>
              {webSubHeading}
            </div>
          ) : (
            ''
          )}
          {webHeading ? (
            <div className={heading__sub_header} style={{ color: `${webHeadingColor}` }}>
              {webHeading}
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <ColoredSubText
            id="thankYouSubheading"
            className={heading__body}
            text={deliveryMainData?.tx_cta_v2_heading_a?.val}
            color={deliveryMainData?.tx_cta_v2_heading_a?.color}
            subText={productName}
            baseColor={selectedBaseWebsiteColor}
          />
          <div
            className={heading__sub_header}
            style={{ color: `${selectedBaseWebsiteColor}` }}
            id="thankYouSubheading">
            {deliveryMainData?.tx_cta_v2_heading_b?.val}
          </div>
        </>
      )}
    </div>
  );
}
