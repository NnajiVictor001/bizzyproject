import React from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import LeadMagImagesWithText from 'pages/customer-sales-pages/LeadMagImagesWithText';
import LeadMagHeadingSubheading from 'pages/customer-sales-pages/LeadMagHeadingSubheading';

import styles from './LeadMag.module.scss';
import LeadMagThreeColumnsSection from './LeadMagThreeColumnsSection';
import LeadMagImageWithBottomText from './LeadMagImageWithBottomText';
import LeadMagGetStartedSection from './LeadMagGetStartedSection';
import LeadMagBottomSection from './LeadMagBottomSection';
import LeadMagFooterSection from './LeadMagFooterSection';
import LeadMagHeaderSection from './LeadMagHeaderSection';
import LeadMagImageWithCheckSection from './LeadMagImageWithCheckSection';

function LeadMag() {
  const { main } = styles;

  return (
    <div>
      <LeadMagHeaderSection />
      <div className={main}>
        <CustomHeading
          subHeaderTxt={
            "You don't need a cleaner, you need a system to organize so there is less to clean!"
          }
          firstTxt="Our"
        />
        <LeadMagImagesWithText />
        <LeadMagHeadingSubheading />
        <LeadMagImageWithCheckSection imagePosition="right" />
        <LeadMagThreeColumnsSection />
        <LeadMagImageWithBottomText />
      </div>
      <LeadMagGetStartedSection />
      <LeadMagBottomSection />
      <LeadMagFooterSection />
    </div>
  );
}

export default LeadMag;
