import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './SalesImageWithText.module.scss';
import stylesFull from './SalesImageWithTextFull.module.scss';
import MockupCoverSection from './MockupCoverSection';

function SalesImagesWithText(props) {
  const {
    websiteMainData,
    mockupData,
    web,
    reverse,
    webParagraph1,
    webParagraph2,
    webParagraph3,
    webParagraph4,
    webBaseColor
  } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main__con, main__left, main__left__middle, main__left__top } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main__con}>
      <div className={main__left} style={{ gridColumn: reverse ? 2 : '' }}>
        <p className={main__left__top} style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
          For everyone who’s wanted to...
        </p>
        <div className={main__left__middle} id="forEveryoneMiddlePar">
          {web ? (
            <p style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
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
            </p>
          ) : (
            <p style={{ color: selectedBaseWebsiteColor }}>
              {websiteMainData?.ws_sidebar_textbox_a?.val ? (
                <>
                  {websiteMainData?.ws_sidebar_textbox_a?.val} <br /> <br />
                </>
              ) : null}

              {websiteMainData?.ws_sidebar_textbox_b?.val ? (
                <>
                  {websiteMainData?.ws_sidebar_textbox_b?.val} <br /> <br />
                </>
              ) : null}

              {websiteMainData?.ws_sidebar_textbox_c?.val ? (
                <>
                  {websiteMainData?.ws_sidebar_textbox_c?.val} <br /> <br />
                </>
              ) : null}
            </p>
          )}
        </div>
        <p
          className={main__left__top}
          style={{ color: webBaseColor || selectedBaseWebsiteColor }}
          id="forEveryoneLastPar">
          {web ? webParagraph4 : <p>{websiteMainData?.sp_sidebar_shortblurp?.val}</p>}
        </p>
      </div>
      <div style={{ width: '100%', marginTop: '1em' }}>
        <MockupCoverSection
          mockupId={mockupData?.mockupId}
          coverImage={mockupData?.coverImage}
          width="80%"
          mockupImage={mockupData?.mockupImage}
        />
      </div>
    </div>
  );
}

export default SalesImagesWithText;
