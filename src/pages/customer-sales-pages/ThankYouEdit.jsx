import React from 'react';
import { useSelector } from 'react-redux';

import CustomHeadingThankYou from 'components/Typography/CustomHeadingThankYou';
import LeadMagFooterSection from './LeadMagFooterSection';
import ThankyouBottomButton from './ThankyouBottomButton';
import ThankyouHeadingSubheading from './ThankyouHeadingSubheading';
import ThankyouImagesWithText from './ThankyouImagesWithText';
import ThankyouInstantlyDownloadSection from './ThankyouInstantlyDownloadSection';
import ThankyouStackedImagesSection from './ThankyouStackedImagesSection';
import SalesThankyouOrderReceipt from './SalesThankyouOrderReceipt';

import styles from './Thankyou.module.scss';

function ThankYouEdit(props) {
  const { main, main__order, main__images } = styles;
  const { deliveryMainData, mockupData, pageImages, bookName } = props;

  let salesType = useSelector((state) => state.webCreation.salesType);
  if (salesType === '') salesType = 'sales';

  const bookPrice = useSelector((state) => state.productType.productPrice);

  return (
    <div>
      <div className={main}>
        <CustomHeadingThankYou deliveryMainData={deliveryMainData} />
        {salesType === 'sales' ? (
          <div className={main__order}>
            <SalesThankyouOrderReceipt bookName={bookName} bookPrice={bookPrice} />
          </div>
        ) : (
          ''
        )}
        <div className={main__images}>
          <ThankyouImagesWithText
            deliveryMainData={deliveryMainData}
            mockupData={mockupData}
            imagePosition={salesType === 'sales' ? 'right' : 'left'}
          />
        </div>
        <ThankyouStackedImagesSection pageImages={pageImages} />
      </div>
      <ThankyouInstantlyDownloadSection
        starting="1."
        deliveryMainData={deliveryMainData}
        bookName={bookName}
      />
      <ThankyouHeadingSubheading deliveryMainData={deliveryMainData} />
      <ThankyouBottomButton deliveryMainData={deliveryMainData} salesType={salesType} />
      <LeadMagFooterSection />
    </div>
  );
}

export default ThankYouEdit;
