import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import LeadMagColumnSection from './LeadMagColumnSection';

import styles from './LeadMagThreeColumnsSection.module.scss';
import stylesFull from './LeadMagThreeColumnsSectionFull.module.scss';

function LeadMagThreeColumnsSection(props) {
  const {
    websiteMainData,
    web,
    webHeading,
    webParagraph1,
    webParagraph2,
    webParagraph3,
    webBaseColor
  } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__columns_con } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  // prettier-ignore
  let h1;
  let p1;
  let h2;
  let p2;
  let h3;
  let p3 = '';
  if (web) {
    [h1, p1] = webParagraph1.split('{}');
    [h2, p2] = webParagraph2.split('{}');
    [h3, p3] = webParagraph3.split('{}');
  }

  return (
    <div className={main}>
      {web ? (
        <ConditionalRender hidden={websiteMainData?.ws_this_heading_a?.hidden}>
          {webHeading ? <h3 style={{ color: `${webBaseColor}` }}>{webHeading}</h3> : ''}
          <div className={main__columns_con}>
            <LeadMagColumnSection number="1" title={h1} content={p1} web={web} />
            <LeadMagColumnSection number="2" title={h2} content={p2} web={web} />
            <LeadMagColumnSection number="3" title={h3} content={p3} web={web} />
          </div>
        </ConditionalRender>
      ) : (
        <ConditionalRender hidden={websiteMainData?.ws_this_heading_a?.hidden}>
          <h3
            style={{
              color: `${selectedBaseWebsiteColor}`
            }}
            id="forYouHeading">
            {websiteMainData?.ws_this_heading_a?.val}
          </h3>

          <div className={main__columns_con} id="threeColumns">
            <LeadMagColumnSection
              number="1"
              title={websiteMainData?.ws_this_shortBlurp1?.val?.split('{}')[0]}
              content={websiteMainData?.ws_this_shortBlurp1?.val?.split('{}')[1]}
              web={web}
            />
            <LeadMagColumnSection
              number="2"
              title={websiteMainData?.ws_this_shortBlurp2?.val?.split('{}')[0]}
              content={websiteMainData?.ws_this_shortBlurp2?.val?.split('{}')[1]}
              web={web}
            />
            <LeadMagColumnSection
              number="3"
              title={websiteMainData?.ws_this_shortBlurp3?.val?.split('{}')[0]}
              content={websiteMainData?.ws_this_shortBlurp3?.val?.split('{}')[1]}
              web={web}
            />
          </div>
        </ConditionalRender>
      )}
    </div>
  );
}

export default LeadMagThreeColumnsSection;
