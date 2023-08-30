import React, { useMemo } from 'react';
import styles from './ThankyouStackedImagesSection.module.scss';

function ThankyouStackedImagesSection(props) {
  const { main } = styles;
  const { pageImages, containerStyle } = props;

  const pages = useMemo(() => {
    let filledPages = [];

    if (pageImages?.length !== 0) {
      while (filledPages.length < 7 && pageImages.length > 0) {
        filledPages = filledPages.concat(pageImages);
      }
    }
    return filledPages.slice(0, 7);
  }, [pageImages]);

  return (
    <div style={{ display: 'flex', ...containerStyle }}>
      <div className={main}>
        {pages.map((x, index) => (
          <img style={{ minWidth: '100px', maxWidth: '250px' }} key={index} src={x} alt="page" />
        ))}
      </div>
    </div>
  );
}

export default ThankyouStackedImagesSection;
