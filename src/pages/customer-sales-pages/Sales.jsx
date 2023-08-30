import React, { useRef } from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import { capitalizeFirstLetter } from 'helpers/custom-functions';
import { useSelector } from 'react-redux';
import LeadMagHeaderSection from './LeadMagHeaderSection';
import SalesHeadingWithButton from './SalesHeadingWithButton';
import SalesImagesWithText from './SalesImageWithText';
import LeadMagHeadingSubheading from './LeadMagHeadingSubheading';
import LeadMagImageWithCheckSection from './LeadMagImageWithCheckSection';
import LeadMagThreeColumnsSection from './LeadMagThreeColumnsSection';
import LeadMagImageWithBottomText from './LeadMagImageWithBottomText';
import LeadMagBottomSection from './LeadMagBottomSection';

import styles from './Sales.module.scss';
import SalesGetStartedSection from './SalesGetStartedSection';
import SalesHappinessGuarantee from './SalesHappinessGuarantee';
import SalesFaqSection from './SalesFaqSection';
import SalesSpendLessTimeSection from './SalesSpendLessTimeSection';
import LeadMagFooterSection from './LeadMagFooterSection';

function Sales(props) {
  const homeSectionRef = useRef(null);
  const { websiteMainData, mockupData, pageImages, userBookWording } = props;

  const { main } = styles;
  const { name } = userBookWording;

  const bookName = capitalizeFirstLetter(name);
  const salesType = useSelector((state) => state.webCreation.salesType);

  const isSalesPage = salesType === 'sales';

  return (
    <div ref={homeSectionRef}>
      <LeadMagHeaderSection websiteMainData={websiteMainData} />
      <CustomHeading websiteMainData={websiteMainData} />
      <div className={main}>
        {!websiteMainData?.ws_cta_v2_heading_a?.hidden && (
          <SalesImagesWithText
            websiteMainData={websiteMainData}
            mockupData={mockupData}
            reverse={false}
          />
        )}
        {!websiteMainData?.ws_objcrush_heading_a?.hidden && (
          <>
            <LeadMagHeadingSubheading websiteMainData={websiteMainData} />
            {isSalesPage ? (
              <LeadMagImageWithCheckSection
                websiteMainData={websiteMainData}
                imagePosition="left"
                mockupData={mockupData}
                pageImages={pageImages}
              />
            ) : (
              <LeadMagImageWithCheckSection
                websiteMainData={websiteMainData}
                imagePosition="right"
                mockupData={mockupData}
                pageImages={pageImages}
              />
            )}
          </>
        )}
        {isSalesPage && !websiteMainData?.sp_cta_v3_heading_a?.hidden ? (
          <SalesHeadingWithButton websiteMainData={websiteMainData} />
        ) : (
          ''
        )}
        {!websiteMainData?.sp_cta_v3_heading_a?.hidden && (
          <LeadMagThreeColumnsSection websiteMainData={websiteMainData} />
        )}
      </div>
      {!websiteMainData?.sp_cta_v3_heading_a?.hidden && (
        <div className={main}>
          <LeadMagImageWithBottomText websiteMainData={websiteMainData} />
        </div>
      )}
      <SalesGetStartedSection web={false} websiteMainData={websiteMainData} bookName={bookName} />
      {isSalesPage ? <SalesHappinessGuarantee /> : <LeadMagBottomSection />}
      {isSalesPage ? (
        <>
          <SalesFaqSection bookName={bookName} />
          <SalesSpendLessTimeSection websiteMainData={websiteMainData} />
        </>
      ) : null}
      <LeadMagFooterSection />
    </div>
  );
}

export default Sales;
