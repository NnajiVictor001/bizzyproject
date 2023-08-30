import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import SalesSpendCheckSection from './SalesSpendCheckSection';

import styles from './SalesSpendLessTimeSection.module.scss';
import stylesFull from './SalesSpendLessTimeSectionFull.module.scss';

function SalesSpendLessTimeSection(props) {
  const {
    websiteMainData,
    color,
    webBaseColor,
    web,
    webHeading,
    webBullet1,
    webBullet2,
    webBullet3,
    webButton,
    webButtonColor
  } = props;

  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const {
    main,
    main__top_container,
    main__top_txt,
    main__button,
    main__button_txt,
    main__bottom_container
  } = stylesToUse;
  const salesType = useSelector((state) => state.webCreation.salesType);

  return (
    <ConditionalRender hidden={salesType === 'lead_magnet'}>
      <div
        className={main}
        style={{
          backgroundColor: web ? color : websiteColor,
          color: webBaseColor || selectedBaseWebsiteColor
        }}>
        <div className={main__top_container} id="salesSpendLessHeader">
          {web ? (
            <p className={main__top_txt}>{webHeading}</p>
          ) : (
            <p className={main__top_txt}>{websiteMainData?.sp_cta_v4_heading_a?.val}</p>
          )}
          <div
            className={main__button}
            style={{
              backgroundColor: web ? webButtonColor : websiteMainData?.sp_button?.color
            }}>
            {web ? (
              <Link to="form" className={main__button_txt} spy smooth duration={500}>
                {webButton}
              </Link>
            ) : (
              <p className={main__button_txt}>{websiteMainData?.sp_button?.val}</p>
            )}
          </div>
        </div>
        <div className={main__bottom_container} id="salesSpendLessP">
          {web ? (
            <>
              <SalesSpendCheckSection webBaseColor={webBaseColor} title={webBullet1} />
              <SalesSpendCheckSection webBaseColor={webBaseColor} title={webBullet2} />
              <SalesSpendCheckSection webBaseColor={webBaseColor} title={webBullet3} />
            </>
          ) : (
            <>
              <SalesSpendCheckSection
                webBaseColor={webBaseColor}
                title={websiteMainData?.sp_cta_v4_bullets_1?.val}
              />
              <SalesSpendCheckSection
                webBaseColor={webBaseColor}
                title={websiteMainData?.sp_cta_v4_bullets_2?.val}
              />
              <SalesSpendCheckSection
                webBaseColor={webBaseColor}
                title={websiteMainData?.sp_cta_v4_bullets_3?.val}
              />
            </>
          )}
        </div>
      </div>
    </ConditionalRender>
  );
}

export default SalesSpendLessTimeSection;
