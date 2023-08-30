import React from 'react';

import SecondaryHeading from 'components/Typography/SecondaryHeading';

import logos from 'img/logos.png';
import styles from './EasyIntegrations.module.scss';

function EasyIntegrations() {
  const { main, main__txt, main__right, main__left, main__img } = styles;
  return (
    <div className={main}>
      <div className={main__left}>
        <SecondaryHeading txt="Easy Integrations " />
        <p className={main__txt}>
          Connect Bizzy with your favourite tools that you use daily and keep things on track.
        </p>
      </div>
      <div className={main__img}>
        <img src={logos} className={main__right} alt="Logos" />
      </div>
    </div>
  );
}

export default EasyIntegrations;
