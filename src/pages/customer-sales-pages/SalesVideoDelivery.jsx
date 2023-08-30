import React from 'react';
import SalesThankyouOrderReceipt from './SalesThankyouOrderReceipt';
import styles from './SalesVideoDelivery.module.scss';
import SalesVideoDeliveryHeading from './SalesVideoDeliveryHeading';

import VideoDeliveryHeadingSubheading from './VideoDeliveryHeadingSubheading';
import ThankyouStackedImagesSection from './ThankyouStackedImagesSection';
import ThankyouInstantlyDownloadSection from './ThankyouInstantlyDownloadSection';
import VideoDeliveryStep2Section from './VideoDeliveryStep2Section';
import VideoDeliveryBottomSection from './VideoDeliveryBottomSection';
import LeadMagFooterSection from './LeadMagFooterSection';

function SalesVideoDelivery() {
  const { main } = styles;

  return (
    <div>
      <SalesVideoDeliveryHeading />
      <div className={main}>
        <SalesThankyouOrderReceipt />
        <VideoDeliveryHeadingSubheading />
        <ThankyouStackedImagesSection />
      </div>
      <ThankyouInstantlyDownloadSection starting="Step 1." />
      <VideoDeliveryStep2Section />
      <VideoDeliveryBottomSection />
      <LeadMagFooterSection />
    </div>
  );
}

export default SalesVideoDelivery;
