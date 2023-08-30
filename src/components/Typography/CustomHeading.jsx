import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import styles from './CustomHeading.module.scss';
import stylesFull from './CustomHeadingFull.module.scss';
import ColoredSubText from './ColoredSubText';

export default function CustomHeading({ web, thankYou, websiteMainData, deliveryMainData }) {
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
    <div className={heading} id="customHeading">
      {thankYou ? (
        <ConditionalRender hidden={deliveryMainData?.tx_cta_v2_heading_a?.hidden}>
          <ColoredSubText
            className={heading__body}
            text={deliveryMainData?.tx_cta_v2_heading_a?.val}
            baseColor={selectedBaseWebsiteColor}
            subText={productName}
            color={deliveryMainData?.tx_cta_v2_heading_a?.color}
          />
          <div
            className={heading__sub_header}
            style={{
              color: `${selectedBaseWebsiteColor}`
            }}>
            {deliveryMainData?.tx_cta_v2_heading_b?.val}
          </div>
        </ConditionalRender>
      ) : (
        <ConditionalRender hidden={websiteMainData?.ws_cta_v2_heading_a?.hidden}>
          <ColoredSubText
            className={heading__body}
            text={websiteMainData?.ws_cta_v2_heading_a?.val}
            baseColor={selectedBaseWebsiteColor}
            subText={productName}
            color={websiteMainData?.ws_cta_v2_heading_a?.color}
          />
          <div
            className={heading__sub_header}
            style={{
              color: `${selectedBaseWebsiteColor}`
            }}>
            {websiteMainData?.ws_cta_v2_heading_b?.val}
          </div>
        </ConditionalRender>
      )}
    </div>
  );
}
