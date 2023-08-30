import React, { useRef } from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import LeadMagHeaderSection from './LeadMagHeaderSection';
import SalesImagesWithText from './SalesImageWithText';
import LeadMagHeadingSubheading from './LeadMagHeadingSubheading';
import LeadMagImageWithCheckSection from './LeadMagImageWithCheckSection';
import SalesButton from './SalesButton';
import LeadMagThreeColumnsSection from './LeadMagThreeColumnsSection';
import LeadMagImageWithBottomText from './LeadMagImageWithBottomText';
import SalesGetStartedSection from './SalesGetStartedSection';
import SalesHappinessGuarantee from './SalesHappinessGuarantee';
import SalesFaqSection from './SalesFaqSection';
import SalesSpendLessTimeSection from './SalesSpendLessTimeSection';
import LeadMagFooterSection from './LeadMagFooterSection';

import styles from './leadMagContent.module.scss';

function SalesPageContent(props) {
  const homeSectionRef = useRef(null);
  const aboutUsSectionRef = useRef(null);
  const { margin, margin__faq } = styles;
  const { data } = props;

  return (
    <div ref={homeSectionRef}>
      <LeadMagHeaderSection
        webHeading={data?.page_data?.sp_stickybar_heading_b?.val}
        webButton={data?.page_data?.sp_button?.val}
        webButtonColor={data?.page_data?.sp_button?.color}
        web
        color={data?.page_data?.website_color}
      />
      <div className={margin}>
        {!data?.page_data?.ws_cta_v2_heading_a?.hidden ? (
          <>
            <CustomHeading web websiteMainData={data.page_data} />
            <SalesImagesWithText
              web
              mockupData={{
                mockupId: data.mockup.id,
                mockupImage: data.mockup.file,
                coverImage: data.cover_thumbnail
              }}
              webParagraph1={data?.page_data?.ws_sidebar_textbox_a?.val}
              webParagraph2={data?.page_data?.ws_sidebar_textbox_b?.val}
              webParagraph3={data?.page_data?.ws_sidebar_textbox_c?.val}
              webParagraph4={data?.page_data?.sp_sidebar_shortblurp?.val}
              webBaseColor={data?.page_data?.base_color}
            />
          </>
        ) : undefined}
        {!data?.page_data?.ws_objcrush_heading_a?.hidden ? (
          <>
            <LeadMagHeadingSubheading web websiteMainData={data.page_data} />
            {data?.page_data?.ws_objcrush_shortblurp_2?.val ? (
              <LeadMagImageWithCheckSection
                imagePosition="left"
                web
                pageImages={data.pages_thumbnails}
                mockupData={{
                  mockupId: data.mockup.id,
                  mockupImage: data.mockup.file,
                  coverImage: data.cover_thumbnail
                }}
                webProbSol1={data?.page_data?.ws_objcrush_shortblurp_2?.val}
                webProbSol2={data?.page_data?.ws_objcrush_shortblurp_3?.val}
                webProbSol3={data?.page_data?.ws_objcrush_shortblurp_4?.val}
                webBaseColor={data?.page_data?.base_color}
              />
            ) : (
              ''
            )}
          </>
        ) : undefined}
        {!data?.page_data?.sp_cta_v3_heading_a?.hidden ? (
          <>
            {' '}
            <CustomHeading web websiteMainData={data.page_data} />
            <SalesButton
              web
              webButton={data?.page_data?.sp_button?.val}
              webButtonColor={data?.page_data?.sp_button?.color}
            />
          </>
        ) : undefined}
        {data?.page_data?.ws_this_heading_a?.val ? (
          <LeadMagThreeColumnsSection
            web
            websiteMainData={data.page_data}
            webHeading={data?.page_data?.ws_this_heading_a?.val}
            webHeadingColor={data?.page_data?.ws_this_heading_a?.color}
            webParagraph1={data?.page_data?.ws_this_shortBlurp1?.val}
            webParagraph2={data?.page_data?.ws_this_shortBlurp2?.val}
            webParagraph3={data?.page_data?.ws_this_shortBlurp3?.val}
            webBaseColor={data?.page_data?.base_color}
          />
        ) : (
          ''
        )}
        <LeadMagImageWithBottomText
          ref={aboutUsSectionRef}
          web
          websiteMainData={data.page_data}
          webImage={data?.page_data?.image_about_photo}
          webHeading={data?.page_data?.ws_about_heading_a?.val}
          webHeadingColor={data?.page_data?.ws_about_heading_a?.color}
          webParagraph1={data?.page_data?.ws_about_textbox_1a?.val}
          webParagraph2={data?.page_data?.ws_about_textbox_1b?.val}
          webParagraph3={data?.page_data?.ws_about_textbox_1c?.val}
          webParagraph4={data?.page_data?.ws_about_textbox_2a?.val}
          webParagraph5={data?.page_data?.ws_about_textbox_2b?.val}
          webParagraph6={data?.page_data?.ws_about_textbox_2c?.val}
          webBaseColor={data?.page_data?.base_color}
        />
      </div>
      <SalesGetStartedSection
        web
        webHeading={data?.page_data?.sp_cart_heading_a?.val}
        webHeadingColor={data?.page_data?.sp_cart_heading_a?.color}
        webSubHeading={data?.page_data?.sp_cart_shortblurp_1?.val}
        webButton={data?.page_data?.sp_cart_button?.val}
        webButtonColor={data?.page_data?.sp_button?.color}
        bookName={data.book_name}
        color={data?.page_data?.website_color}
        webBaseColor={data?.page_data?.base_color}
      />
      <SalesHappinessGuarantee
        web
        color={data?.page_data?.website_color}
        webBaseColor={data?.page_data?.base_color}
      />
      <div className={margin__faq}>
        <SalesFaqSection web webBaseColor={data?.page_data?.base_color} bookName={data.book_name} />
      </div>
      <SalesSpendLessTimeSection
        web
        webHeading={data?.page_data?.sp_cta_v4_heading_a?.val}
        webBullet1={data?.page_data?.sp_cta_v4_bullets_1?.val}
        webBullet2={data?.page_data?.sp_cta_v4_bullets_2?.val}
        webBullet3={data?.page_data?.sp_cta_v4_bullets_3?.val}
        webButton={data?.page_data?.sp_button?.val}
        webButtonColor={data?.page_data?.sp_button?.color}
        color={data?.page_data?.website_color}
        webBaseColor={data?.page_data?.base_color}
      />
      <LeadMagFooterSection
        homeSectionRef={homeSectionRef}
        aboutUsSectionRef={aboutUsSectionRef}
        webBaseColor={data?.page_data?.base_color}
        web
      />
    </div>
  );
}

export default SalesPageContent;
