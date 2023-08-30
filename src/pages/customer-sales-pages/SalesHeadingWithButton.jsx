import React from 'react';
import { useSelector } from 'react-redux';

import { randomNichePhraseGenerator } from 'helpers/utils';

import ConditionalRender from 'components/WebsiteCreation/ConditionalRender';
import ColoredSubText from 'components/Typography/ColoredSubText';
import styles from './SalesHeadingWithButton.module.scss';

function SalesHeadingWithButton(props) {
  const { main, main__top_txt, main__button, main__button_txt } = styles;

  const { websiteMainData, className } = props;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const salesType = useSelector((state) => state.webCreation.salesType);
  const batchWordings = useSelector((state) => state.webCreation.batchWordings);

  const niches = randomNichePhraseGenerator(batchWordings);
  const niche = niches.find((x) => websiteMainData?.sp_cta_v3_heading_a?.val?.includes(x));

  return (
    <ConditionalRender hidden={salesType === 'lead_magnet'}>
      <ColoredSubText
        id="secondaryHeading"
        className={main__top_txt}
        color={websiteMainData?.sp_cta_v3_heading_a?.color}
        baseColor={selectedBaseWebsiteColor}
        subText={niche}
        text={websiteMainData?.sp_cta_v3_heading_a?.val}
      />
      <div className={`${main} ${className}`}>
        <h1 id="secondarySubheading" style={{ color: selectedBaseWebsiteColor }}>
          {websiteMainData?.sp_cta_v3_heading_b?.val}
        </h1>
        <div
          className={main__button}
          style={{ backgroundColor: websiteMainData?.sp_button?.color }}>
          <p className={main__button_txt}>{websiteMainData?.sp_button?.val}</p>
        </div>
      </div>
    </ConditionalRender>
  );
}

export default SalesHeadingWithButton;
