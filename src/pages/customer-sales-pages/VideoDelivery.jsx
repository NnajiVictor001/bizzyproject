import React from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import LeadMagFooterSection from './LeadMagFooterSection';
import ThankyouInstantlyDownloadSection from './ThankyouInstantlyDownloadSection';
import ThankyouStackedImagesSection from './ThankyouStackedImagesSection';

import styles from './VideoDelivery.module.scss';
import VideoDeliveryBottomSection from './VideoDeliveryBottomSection';
import VideoDeliveryHeadingSubheading from './VideoDeliveryHeadingSubheading';
import VideoDeliveryStep2Section from './VideoDeliveryStep2Section';

function VideoDelivery() {
  const { main } = styles;

  return (
    <div>
      <div className={main}>
        <CustomHeading
          subHeaderTxt="Download your Simply Tidy Toolkit, watch the videos and GET RESULTS!!"
          firstTxt="Your"
        />
        <VideoDeliveryHeadingSubheading />
        <ThankyouStackedImagesSection />
      </div>
      <ThankyouInstantlyDownloadSection starting="Step 1." />
      <VideoDeliveryStep2Section />
      <VideoDeliveryBottomSection />
      <LeadMagFooterSection />
    </div>
  );
}

export default VideoDelivery;
