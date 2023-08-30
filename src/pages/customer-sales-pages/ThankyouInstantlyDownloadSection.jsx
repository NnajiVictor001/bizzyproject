import React from 'react';
import { useSelector } from 'react-redux';

import { shade } from 'helpers/custom-functions';
import { randomNichePhraseGenerator } from 'helpers/utils';

import ColoredSubText from 'components/Typography/ColoredSubText';
import styles from './ThankyouInstantlyDownloadSection.module.scss';

function ThankyouInstantlyDownloadSection(props) {
  const { main, main__header, main__subheader, main__button, main__button_txt } = styles;

  const { deliveryMainData, bookName, websiteColor } = props;

  const selectedWebsiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const downloadUrl = useSelector((state) => state.webCreation.downloadUrl);
  const batchWordings = useSelector((state) => state.webCreation.batchWordings);

  const niches = randomNichePhraseGenerator(batchWordings);
  const niche = niches?.find((x) => deliveryMainData?.tx_cta_v3_heading_a?.val?.includes(x));

  return (
    <div
      className={main}
      style={{
        backgroundColor: websiteColor ? shade(websiteColor, 0.7) : shade(selectedWebsiteColor, 0.7)
      }}>
      <div
        className={main__header}
        style={{ color: `${selectedBaseWebsiteColor}` }}
        id="thankYouDownloadHeader">
        <ColoredSubText
          id="thankYouDownloadHeader"
          className={main__header}
          baseColor={selectedBaseWebsiteColor}
          color={deliveryMainData?.tx_cta_v3_heading_a?.color}
          subText={niche}
          text={deliveryMainData?.tx_cta_v3_heading_a?.val}
        />
      </div>
      <p
        className={main__subheader}
        style={{ color: `${selectedBaseWebsiteColor}` }}
        id="thankYouDownloadSubheader">
        {deliveryMainData?.tx_cta_v3_heading_b?.val}
      </p>

      <div className={main__button}>
        <a href={downloadUrl} target="_blank" className={main__button_txt} rel="noreferrer">
          Get The {bookName}
        </a>
      </div>
    </div>
  );
}

export default ThankyouInstantlyDownloadSection;
