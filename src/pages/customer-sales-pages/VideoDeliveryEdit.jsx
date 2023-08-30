import React from 'react';
import { useSelector } from 'react-redux';

import CustomHeadingThankYou from 'components/Typography/CustomHeadingThankYou';
import LeadMagFooterSection from './LeadMagFooterSection';
import ThankyouInstantlyDownloadSection from './ThankyouInstantlyDownloadSection';
import ThankyouStackedImagesSection from './ThankyouStackedImagesSection';
import VideoDeliveryBottomSection from './VideoDeliveryBottomSection';
import VideoDeliveryHeadingSubheading from './VideoDeliveryHeadingSubheading';
import VideoDeliveryStep2Section from './VideoDeliveryStep2Section';
import SalesThankyouOrderReceipt from './SalesThankyouOrderReceipt';

import styles from './VideoDelivery.module.scss';

function VideoDeliveryEdit(props) {
  const { main } = styles;
  const { deliveryMainData, pageImages, userBookWording } = props;
  const { name } = userBookWording;
  const salesType = useSelector((state) => state.webCreation.salesType);
  const bookPrice = useSelector((state) => state.productType.productPrice);

  return (
    <div>
      <div className={main}>
        <CustomHeadingThankYou deliveryMainData={deliveryMainData} />
        {salesType === 'sales' ? (
          <SalesThankyouOrderReceipt bookName={name} bookPrice={bookPrice} />
        ) : (
          ''
        )}
        <VideoDeliveryHeadingSubheading deliveryMainData={deliveryMainData} />
        <ThankyouStackedImagesSection
          containerStyle={{ marginTop: '50px' }}
          pageImages={pageImages}
        />
      </div>
      <ThankyouInstantlyDownloadSection
        deliveryMainData={deliveryMainData}
        starting="Step 1."
        bookName={name}
      />
      <VideoDeliveryStep2Section deliveryMainData={deliveryMainData} />
      <VideoDeliveryBottomSection deliveryMainData={deliveryMainData} />
      <LeadMagFooterSection />
    </div>
  );
}

export default VideoDeliveryEdit;
