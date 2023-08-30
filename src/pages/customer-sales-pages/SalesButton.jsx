import React from 'react';
import { Link } from 'react-scroll';

import styles from './SalesButton.module.scss';

function SalesButton(props) {
  const { btn, btn__txt, flex } = styles;
  const { webButton, webButtonColor } = props;

  return (
    <div className={flex}>
      <Link
        to="form"
        className={btn}
        spy
        smooth
        duration={500}
        style={{
          backgroundColor: webButtonColor
        }}>
        <p className={btn__txt}>{webButton}</p>
      </Link>
    </div>
  );
}

export default SalesButton;
