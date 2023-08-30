import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import bgLine from 'img/bg_line.png';
import { COLOR_YELLOW_LIGHTER } from 'constants/Colors';
import styles from './StatDashboard.module.scss';

function StatDashboard(props) {
  const {
    main,
    stat,
    circle,
    persent,
    stat__progress,
    stat__left,
    stat__right,
    stat__valueBox,
    stat__box,
    stat__valueBoxCont,
    stat__label,
    stat__progressLabel,
    stat__goal,
    main__bg
  } = styles;
  const { goalTitle, goalPercentage, salesGenerated, productSold, customers } = props;

  return (
    <div className={stat}>
      <div className={main}>
        <img src={bgLine} alt="Background" className={main__bg} />
        <div className={stat__left}>
          <div className={stat__progress}>
            <p className={stat__goal}>Goal</p>
            <div className={circle}>
              <CircularProgressbar
                value={goalPercentage}
                circleRatio={0.5}
                strokeWidth={15}
                styles={{
                  root: {
                    transform: 'rotate(0.75turn)'
                  },
                  path: { stroke: COLOR_YELLOW_LIGHTER, strokeLinecap: 'butt' },
                  trail: {
                    stroke: 'rgba(188, 190, 192, 0.25)',
                    strokeLinecap: 'butt'
                  }
                }}
              />
              <p className={persent}>{`${goalPercentage}%`}</p>
            </div>
          </div>
        </div>
        <div className={stat__right}>
          <div className={stat__valueBoxCont}>
            <p className={stat__label}>Sales Generated</p>
            <div className={`${stat__box} ${stat__valueBox}`}>{`$${salesGenerated}`}</div>
          </div>
          <div className={stat__valueBoxCont}>
            <p className={stat__label}>Product Sold</p>
            <div className={`${stat__box} ${stat__valueBox}`}>{productSold}</div>
          </div>
          <div className={stat__valueBoxCont}>
            <p className={stat__label}>Customers</p>
            <div className={`${stat__box} ${stat__valueBox}`}>{customers}</div>
          </div>
        </div>
      </div>
      <p className={stat__progressLabel}>{goalTitle}</p>
    </div>
  );
}
export default StatDashboard;
