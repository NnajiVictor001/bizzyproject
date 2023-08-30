import React from 'react';
import { useSelector } from 'react-redux';

import styles from './VideoDeliveryHeadingSubheading.module.scss';

function VideoDeliveryHeadingSubheading(props) {
  const { main__third } = styles;
  const { deliveryMainData } = props;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main__third} style={{ color: selectedBaseWebsiteColor }}>
      <h3 style={{ color: selectedBaseWebsiteColor }} id="videoItsYoursHeading">
        {deliveryMainData?.tx_sidebar_subheading?.val}
      </h3>
      <p>
        {deliveryMainData?.tx_sidebar_textbox?.val}
        <br />
        <br />
        {deliveryMainData?.tx_sidebar_shortblurp?.val}
      </p>
    </div>
  );
}

export default VideoDeliveryHeadingSubheading;
