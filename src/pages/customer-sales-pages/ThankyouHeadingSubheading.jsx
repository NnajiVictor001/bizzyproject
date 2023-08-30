import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ThankyouHeadingSubheading.module.scss';

function ThankyouHeadingSubheading(props) {
  const { main__third } = styles;

  const { deliveryMainData, webBaseColor } = props;
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main__third} style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
      <h3 id="justImagineHeader">{deliveryMainData?.tx_blurp_textbox?.val}</h3>
      <p id="justImagineP">
        {deliveryMainData?.tx_blurp_longtextbox?.val}
        <br />
        <br />
        Everything is easier when you have support.
      </p>
    </div>
  );
}

export default ThankyouHeadingSubheading;
