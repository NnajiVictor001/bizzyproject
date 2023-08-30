import React from 'react';
import styles from './YoutubeEmbed.module.scss';

function YoutubeEmbed({ url }) {
  const { video_responsive } = styles;
  const embedId = url?.split('v=')[1];

  return (
    <div className={video_responsive}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubeEmbed;
