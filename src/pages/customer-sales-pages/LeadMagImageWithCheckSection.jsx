import React, { useMemo } from 'react';
import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import styles from './LeadMagImageWithCheckSection.module.scss';
import stylesFull from './LeadMagImageWithCheckSectionFull.module.scss';
import LeadMagCheckSection from './LeadMagCheckSection';
import StackedPagesSection from './StackedPagesCard';

function LeadMagImageWithCheckSection(props) {
  const {
    websiteMainData,
    imagePosition,
    web,
    webProbSol1,
    webProbSol2,
    webProbSol3,
    webBaseColor,
    pageImages,
    mockupData
  } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { flex, flex__grow } = stylesToUse;

  // prettier-ignore
  let prob1;
  let sol1;
  let prob2;
  let sol2;
  let prob3;
  let sol3 = '';
  if (web) {
    [prob1, sol1] = webProbSol1.split('{}');
    [prob2, sol2] = webProbSol2.split('{}');
    [prob3, sol3] = webProbSol3.split('{}');
  }

  return (
    <div
      className={flex}
      style={{
        flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row'
      }}>
      <div className={flex__grow}>
        {web ? (
          <>
            <LeadMagCheckSection title={prob1} content={sol1} web={web} color={webBaseColor} />
            <LeadMagCheckSection title={prob2} content={sol2} web={web} color={webBaseColor} />
            <LeadMagCheckSection title={prob3} content={sol3} web={web} color={webBaseColor} />
          </>
        ) : (
          <>
            <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_2?.hidden}>
              <LeadMagCheckSection
                title={websiteMainData?.ws_objcrush_shortblurp_2?.val?.split('{}')[0]}
                content={websiteMainData?.ws_objcrush_shortblurp_2?.val?.split('{}')[1]}
                web={web}
                id="checkTop"
              />
            </ConditionalRender>
            <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_3?.hidden}>
              <LeadMagCheckSection
                title={websiteMainData?.ws_objcrush_shortblurp_3?.val?.split('{}')[0]}
                content={websiteMainData?.ws_objcrush_shortblurp_3?.val?.split('{}')[1]}
                web={web}
                id="checkMiddle"
              />
            </ConditionalRender>
            <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_4?.hidden}>
              <LeadMagCheckSection
                title={websiteMainData?.ws_objcrush_shortblurp_4?.val?.split('{}')[0]}
                content={websiteMainData?.ws_objcrush_shortblurp_4?.val?.split('{}')[1]}
                web={web}
                id="checkBottom"
              />
            </ConditionalRender>
          </>
        )}
      </div>
      <div>
        <StackedPagesSection mockupData={mockupData} pageImages={pageImages} />
      </div>
    </div>
  );
}

export default LeadMagImageWithCheckSection;
