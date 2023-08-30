import React from 'react';
import QuaternaryHeading from 'components/Typography/QuaternaryHeading';

import bizzyLogo from 'img/bizzy_logo.png';
import styles from './RegistrationHeading.module.scss';

function RegistrationHeading(props) {
  const { parContent } = props;
  const { txtCenter, txtParagraph } = styles;

  return (
    <div className={txtCenter}>
      <img src={bizzyLogo} alt="Bizzy Logo" />
      <QuaternaryHeading txt="Welcome To Bizzy" />
      <p className={txtParagraph}>{parContent}</p>
    </div>
  );
}

export default RegistrationHeading;
