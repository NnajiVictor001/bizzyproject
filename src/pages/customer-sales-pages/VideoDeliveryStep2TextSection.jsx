import React from 'react';
import styles from './VideoDeliveryStep2TextSection.module.scss';

function VideoDeliveryStep2TextSection(props) {
  const { main } = styles;
  const { title, content, noMarginTop } = props;

  return (
    <div className={main} style={{ marginTop: noMarginTop ? '0' : '' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default VideoDeliveryStep2TextSection;
