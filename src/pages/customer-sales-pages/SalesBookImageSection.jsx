import React from 'react';
import bookImage from 'img/bookImage.png';
import styles from './SalesBookImageSection.module.scss';
import SalesQuoteSection from './SalesQuoteSection';

function SalesBookImageSection() {
  const { main, main__img, main__quotes } = styles;

  return (
    <div className={main}>
      <div className={main__img}>
        <img src={bookImage} alt="book" />
      </div>
      <div className={main__quotes}>
        <SalesQuoteSection
          title="Room-by-Room Checklists"
          content="Know where to start and what to do!"
          position="top"
        />
        <SalesQuoteSection
          title="Organization Habit Trackers"
          content="Create lasting change in your life!"
          position="middle"
        />
        <SalesQuoteSection
          title="Speed-Cleaning Gameplans"
          content="Clean, really clean in just minutes!"
          position="bottom"
        />
      </div>
    </div>
  );
}

export default SalesBookImageSection;
