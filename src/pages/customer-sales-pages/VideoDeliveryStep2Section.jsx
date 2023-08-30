import React, { useMemo } from 'react';
import YoutubeEmbed from 'components/YoutubeEmbed/YoutubeEmbed';
import videoPlaceholder from 'img/video_placeholder.png';
import { useSelector } from 'react-redux';
import VideoDeliveryStep2TextSection from './VideoDeliveryStep2TextSection';

import styles from './VideoDeliveryStep2Section.module.scss';
import stylesFull from './VideoDeliveryStep2SectionFull.module.scss';

function VideoDeliveryStep2Section(props) {
  const { deliveryMainData, webBaseColor, web } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, placeholder } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div
      className={main}
      id="videoSection"
      style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
      <VideoDeliveryStep2TextSection
        title={deliveryMainData?.tx_video_subheading_1?.val}
        content={deliveryMainData?.tx_video_paragraph_1?.val}
      />
      {deliveryMainData?.videoYoutubeUrl1?.val === null ||
      deliveryMainData?.tx_video_paragraph_1?.hidden ? (
        <div className={placeholder}>
          <img src={videoPlaceholder} alt="placeholder" />
        </div>
      ) : (
        <YoutubeEmbed url={deliveryMainData?.videoYoutubeUrl1?.val} />
      )}
      {!deliveryMainData?.tx_video_paragraph_2?.hidden &&
      deliveryMainData?.tx_video_paragraph_3?.hidden ? (
        <>
          <VideoDeliveryStep2TextSection
            title={deliveryMainData?.tx_video_subheading_2?.val}
            content={deliveryMainData?.tx_video_paragraph_2?.val}
            noMarginTop
          />

          <div>
            {deliveryMainData?.videoYoutubeUrl2?.val === null ? (
              <div className={placeholder}>
                <img src={videoPlaceholder} alt="placeholder" />
              </div>
            ) : (
              <YoutubeEmbed url={deliveryMainData?.videoYoutubeUrl2?.val} />
            )}
          </div>
        </>
      ) : !deliveryMainData?.tx_video_paragraph_2?.hidden ? (
        <div>
          {deliveryMainData?.videoYoutubeUrl2?.val === null ? (
            <div className={placeholder}>
              <img src={videoPlaceholder} alt="placeholder" />
            </div>
          ) : (
            <YoutubeEmbed url={deliveryMainData?.videoYoutubeUrl2?.val} />
          )}
          <VideoDeliveryStep2TextSection
            title={deliveryMainData?.tx_video_subheading_2?.val}
            content={deliveryMainData?.tx_video_paragraph_2?.val}
            noMarginTop={deliveryMainData?.tx_video_paragraph_3?.hidden}
          />
        </div>
      ) : (
        ''
      )}
      {!deliveryMainData?.tx_video_paragraph_3?.hidden ? (
        <div>
          {deliveryMainData?.videoYoutubeUrl3?.val === null ? (
            <div className={placeholder}>
              <img src={videoPlaceholder} alt="placeholder" />
            </div>
          ) : (
            <YoutubeEmbed url={deliveryMainData?.videoYoutubeUrl3?.val} />
          )}

          <VideoDeliveryStep2TextSection
            title={deliveryMainData?.tx_video_subheading_3?.val}
            content={deliveryMainData?.tx_video_paragraph_3?.val}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default VideoDeliveryStep2Section;
