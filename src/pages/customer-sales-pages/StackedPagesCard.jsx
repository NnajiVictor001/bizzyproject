import React, { useMemo } from 'react';
import MockupCoverSection from './MockupCoverSection';
import styles from './StackedPagesSection.module.scss';

function StackedPagesSection(props) {
  const { pageImages, mockupData } = props;
  const { card } = styles;

  const pages = useMemo(() => {
    let filledPages = [];
    while (filledPages?.length < 7 && pageImages?.length > 0) {
      filledPages = filledPages.concat(pageImages);
    }
    return filledPages.slice(0, 7);
  }, [pageImages]);

  return (
    <div style={{ position: 'relative' }}>
      <div className={card}>
        {pages.map((x, index) => (
          <img key={index} width="180px" src={x} alt="page" />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          top: '25em',
          left: '3em'
        }}>
        <MockupCoverSection
          mockupId={mockupData?.mockupId}
          coverImage={mockupData?.coverImage}
          width="60%"
          mockupImage={mockupData?.mockupImage}
        />
      </div>
    </div>
  );
}

export default StackedPagesSection;
