import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './LeadMagGetStartedText.module.scss';
import stylesFull from './LeadMagGetStartedTextFull.module.scss';

function LeadMagGetStartedText(props) {
  const { websiteMainData, web, webHeading, webSubHeading, webBaseColor } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main} id="getStarted">
      {web ? (
        <>
          {webHeading ? <h3 style={{ color: `${webBaseColor}` }}>{webHeading}</h3> : ''}
          <p style={{ color: webBaseColor }}>{webSubHeading}</p>
        </>
      ) : (
        <>
          <h3
            style={{
              color: `${selectedBaseWebsiteColor}`
            }}>
            {websiteMainData?.sp_cart_heading_a?.val}
          </h3>
          <p id="getStartedP" style={{ color: selectedBaseWebsiteColor }}>
            {websiteMainData?.sp_cart_shortblurp_1?.val}
          </p>
        </>
      )}
    </div>
  );
}

export default LeadMagGetStartedText;
