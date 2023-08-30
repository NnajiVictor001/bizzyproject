import React, { useMemo, forwardRef } from 'react';
import { useSelector } from 'react-redux';

import leadBg from 'img/lead_bg.jpg';
import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import styles from './LeadMagImageWithBottomText.module.scss';
import stylesFull from './LeadMagImageWithBottomTextFull.module.scss';

const LeadMagImageWithBottomText = forwardRef((props, _ref) => {
  const {
    websiteMainData,
    web,
    webImage,
    webHeading,
    webHeadingColor,
    webParagraph1,
    webParagraph2,
    webParagraph3,
    webParagraph4,
    webParagraph5,
    webParagraph6,
    webBaseColor
  } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main } = stylesToUse;

  const newAboutImage = useSelector((state) => state.productType.newAboutImage);
  const bookMediaImage = useSelector((state) => state.productType.bookMediaImage);
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main}>
      {web ? (
        <ConditionalRender hidden={websiteMainData?.sp_cta_v3_heading_a?.hidden}>
          <img src={webImage || newAboutImage || bookMediaImage || leadBg} alt="lead background" />
          {webHeading ? <h3 style={{ color: `${webHeadingColor}` }}>{webHeading}</h3> : ''}

          <p style={{ color: webBaseColor }}>
            {webParagraph1 ? (
              <>
                {webParagraph1} <br /> <br />
              </>
            ) : (
              ''
            )}
            {webParagraph2 ? (
              <>
                {webParagraph2} <br /> <br />
              </>
            ) : (
              ''
            )}
            {webParagraph3 ? (
              <>
                {webParagraph3} <br /> <br />
              </>
            ) : (
              ''
            )}
            {webParagraph4 ? (
              <>
                {webParagraph4} <br /> <br />
              </>
            ) : (
              ''
            )}
            {webParagraph5 ? (
              <>
                {webParagraph5} <br /> <br />
              </>
            ) : (
              ''
            )}
            {webParagraph6 ? (
              <>
                {webParagraph6} <br /> <br />
              </>
            ) : (
              ''
            )}
          </p>
        </ConditionalRender>
      ) : (
        <ConditionalRender hidden={websiteMainData?.ws_about_textbox_1a?.hidden}>
          <img src={newAboutImage || bookMediaImage || leadBg} alt="lead background" />
          <h3
            style={{
              color: `${selectedBaseWebsiteColor}`
            }}
            id="aboutMeHeading">
            {websiteMainData?.ws_about_heading_a?.val}
          </h3>
          <p id="aboutMeSection" style={{ color: selectedBaseWebsiteColor }}>
            {websiteMainData?.ws_about_textbox_1a?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_1a?.val} <br /> <br />
              </div>
            ) : undefined}
            {websiteMainData?.ws_about_textbox_1b?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_1b?.val} <br /> <br />
              </div>
            ) : undefined}
            {websiteMainData?.ws_about_textbox_1c?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_1c?.val} <br /> <br />
              </div>
            ) : undefined}
            {websiteMainData?.ws_about_textbox_2a?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_2a?.val} <br /> <br />
              </div>
            ) : undefined}
            {websiteMainData?.ws_about_textbox_2b?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_2b?.val} <br /> <br />
              </div>
            ) : undefined}
            {websiteMainData?.ws_about_textbox_2c?.val ? (
              <div>
                {websiteMainData?.ws_about_textbox_2c?.val} <br /> <br />
              </div>
            ) : undefined}
          </p>
        </ConditionalRender>
      )}
    </div>
  );
});

export default LeadMagImageWithBottomText;
