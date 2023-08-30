import React from 'react';
import { useSelector } from 'react-redux';

import { shade } from 'helpers/custom-functions';
import ThankyouBottomButton from './ThankyouBottomButton';

import styles from './VideoDeliveryBottomSection.module.scss';

function VideoDeliveryBottomSection(props) {
  const { main } = styles;

  const { deliveryMainData, websiteColor, webBaseColor } = props;

  const salesType = useSelector((state) => state.webCreation.salesType);
  const selectedWebsiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  return (
    <div
      className={main}
      style={{
        backgroundColor: websiteColor ? shade(websiteColor, 0.7) : shade(selectedWebsiteColor, 0.7)
      }}>
      <ThankyouBottomButton
        deliveryMainData={deliveryMainData}
        salesType={salesType}
        webBaseColor={webBaseColor}
      />
    </div>
  );
}

export default VideoDeliveryBottomSection;
