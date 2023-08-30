import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import { randomNichePhraseGenerator } from 'helpers/utils';

import ColoredSubText from 'components/Typography/ColoredSubText';
import styles from './LeadMagHeadingSubheading.module.scss';
import stylesFull from './LeadMagHeadingSubheadingFull.module.scss';

function LeadMagHeadingSubheading(props) {
  const { web, websiteMainData } = props;
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main__third } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const batchWordings = useSelector((state) => state.webCreation.batchWordings);
  const niches = randomNichePhraseGenerator(batchWordings);
  const niche = niches?.find((x) => websiteMainData?.ws_objcrush_heading_a?.val?.includes(x));

  return (
    <div className={main__third}>
      <ColoredSubText
        id="mainHeading"
        color={websiteMainData?.ws_objcrush_heading_a?.color}
        baseColor={selectedBaseWebsiteColor}
        subText={niche}
        text={websiteMainData?.ws_objcrush_heading_a?.val}
      />
      <p id="mainSubheading" style={{ color: selectedBaseWebsiteColor }}>
        {websiteMainData?.ws_objcrush_shortblurp_1?.val}
      </p>
    </div>
  );
}

export default LeadMagHeadingSubheading;
