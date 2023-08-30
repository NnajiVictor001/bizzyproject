import React from 'react';
import { shade } from 'helpers/custom-functions';
import { useSelector } from 'react-redux';

import { useAlert } from 'hooks/alert';
import styles from './ThankyouBottomButton.module.scss';

function ThankyouBottomButton(props) {
  const { main, main__top_txt, main__button, main__button_txt } = styles;
  const { deliveryMainData, salesType, webBaseColor, websiteColor } = props;

  const { addAlert } = useAlert();

  const selectedWebsiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const thankYouType = useSelector((state) => state.webCreation.thankYouType);

  const LinktoCommunity = () => {
    const communityLink = deliveryMainData?.tx_button_2_link?.val;
    if (communityLink) {
      let result = communityLink;
      if (communityLink.includes('http://')) {
        result = communityLink.replace('http://', '');
      } else if (communityLink.includes('https://')) {
        result = communityLink.replace('https://', '');
      }
      window.open(`https://${result}`, '_blank');
    } else {
      addAlert('Oops.. You should enter the link for the community', 'error');
    }
  };

  return (
    <div
      className={main}
      style={{
        alignItems: salesType === 'sales' ? 'flex-start' : 'center',
        backgroundColor: websiteColor ? shade(websiteColor, 0.7) : shade(selectedWebsiteColor, 0.7)
      }}>
      {salesType === 'sales' ? (
        <>
          <h1 id="communityHeader" style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
            {deliveryMainData?.tx_cta_v3_heading_d?.val}
          </h1>
          <p
            className={main__top_txt}
            style={{
              color: `${webBaseColor || selectedBaseWebsiteColor}`
            }}
            id="communitySubheader">
            {thankYouType === 'basic'
              ? deliveryMainData?.tx_cta_v3_heading_c?.val
              : deliveryMainData?.tx_cta_v3_heading_e?.val}
          </p>
        </>
      ) : (
        <>
          <h1 id="communityHeader" style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
            {deliveryMainData?.tx_cta_v3_heading_d?.val}
          </h1>
          <p
            className={main__top_txt}
            style={{
              color: `${webBaseColor || selectedBaseWebsiteColor}`
            }}
            id="communitySubheader">
            {thankYouType === 'basic'
              ? deliveryMainData?.tx_cta_v3_heading_c?.val
              : deliveryMainData?.tx_cta_v3_heading_e?.val}
          </p>
        </>
      )}
      <div className={main__button}>
        <p className={main__button_txt} id="communityButton" onClick={LinktoCommunity}>
          {thankYouType === 'basic'
            ? deliveryMainData?.tx_button_2?.val
            : deliveryMainData?.tx_button?.val}
        </p>
      </div>
    </div>
  );
}

export default ThankyouBottomButton;
