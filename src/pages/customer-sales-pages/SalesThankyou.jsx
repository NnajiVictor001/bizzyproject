import React from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import LeadMagFooterSection from './LeadMagFooterSection';
import styles from './SalesThankyou.module.scss';
import SalesThankyouBottomButton from './SalesThankyouBottomButton';
import SalesThankyouOrderReceipt from './SalesThankyouOrderReceipt';
import SalesThankyouTidyHomeSection from './SalesThankyouTidyHomeSection';
import ThankyouHeadingSubheading from './ThankyouHeadingSubheading';
import ThankyouImagesWithText from './ThankyouImagesWithText';

function SalesThankyou() {
  const { main } = styles;

  return (
    <div>
      <CustomHeading
        subHeaderTxt="It’s Here!!  Download it below and you will be on your way to life organization and a tidy home!"
        firstTxt="Your"
      />
      <div className={main}>
        <SalesThankyouOrderReceipt />
        <ThankyouImagesWithText imagePosition="right" />
      </div>
      <SalesThankyouTidyHomeSection />
      <ThankyouHeadingSubheading />
      <SalesThankyouBottomButton />
      <LeadMagFooterSection />
    </div>
  );
}

export default SalesThankyou;
