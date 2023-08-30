import React from 'react';
import { useNavigate } from 'react-router-dom';

import GetStartedCard from 'components/Cards/GetStartedCard';

import pages from 'img/pages.png';
import colorFonts from 'img/color_fonts.png';
import promote from 'img/promote.png';
import bgImage1 from 'img/fullbg_lin1.png';
import bgImage2 from 'img/fullbg_line2.png';
import styles from './GetStartedSection.module.scss';

function GetStartedSection() {
  const navigate = useNavigate();

  const {
    getStart,
    getStart__card1Body,
    getStart__thumbnail,
    getStart__bgLine,
    getStart__bgFullImage,
    getStart__card3Body
  } = styles;

  const handleBuildItClick = () => {
    navigate('/dashboard/product-type');
  };

  const handlePromoteItClick = () => {
    navigate('/dashboard/start-sales');
  };

  return (
    <div className={getStart}>
      <GetStartedCard
        title="Build It"
        details="Pick Your Pages & Product"
        onClick={handleBuildItClick}>
        <div className={getStart__card1Body}>
          <img className={getStart__thumbnail} src={pages} alt="Pages" />
        </div>
      </GetStartedCard>
      <div className={getStart__bgLine}>
        <img src={bgImage1} alt="Line Background" className={getStart__bgFullImage} />
      </div>
      <GetStartedCard title="Brand It" details="Add Your Colors & Fonts">
        <div className={getStart__card1Body}>
          <img className={getStart__thumbnail} src={colorFonts} alt="Pages" />
        </div>
      </GetStartedCard>
      <div className={getStart__bgLine}>
        <img alt="Line Background" src={bgImage2} className={getStart__bgFullImage} />
      </div>
      <GetStartedCard
        title="Promote It"
        details="Create Your Sales Pages & Sell"
        onClick={handlePromoteItClick}>
        <div className={getStart__card3Body}>
          <img className={getStart__thumbnail} src={promote} alt="Pages" />
        </div>
      </GetStartedCard>
    </div>
  );
}

export default GetStartedSection;
