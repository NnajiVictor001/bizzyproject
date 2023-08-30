import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ThankyouImagesWithText.module.scss';
import MockupCoverSection from './MockupCoverSection';

function ThankyouImagesWithText(props) {
  const { deliveryMainData, mockupData, imagePosition, webBaseColor } = props;

  const { main__con, main__con__img, main__right, main__right__middle, main__right__top } = styles;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main__con}>
      <div className={main__con__img} style={{ display: 'flex', justifyContent: 'center' }}>
        <MockupCoverSection
          containerStyle={{ margin: '0 20px' }}
          mockupId={mockupData?.mockupId}
          coverImage={mockupData?.coverImage}
          mockupImage={mockupData?.mockupImage}
        />
      </div>
      <div
        className={main__right}
        style={{
          order: imagePosition === 'right' ? -1 : 0,
          color: webBaseColor || selectedBaseWebsiteColor
        }}>
        <p className={main__right__top} id="itsYoursHeading">
          {deliveryMainData?.tx_sidebar_subheading?.val}
        </p>
        <p className={main__right__middle}>
          {deliveryMainData?.tx_sidebar_textbox?.val}
          <br />
          <br />
          Click on the image or the link below to the download.
          <br />
          <br />
          {deliveryMainData?.tx_sidebar_shortblurp?.val}
        </p>
        <p className={main__right__top}>
          And then!! Join us!!
          <br />
          <br />
          Our community wants to help you IMPLEMENT!!!
        </p>
      </div>
    </div>
  );
}

export default ThankyouImagesWithText;
