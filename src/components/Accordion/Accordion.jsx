import React, { useState } from 'react';

import rightArrow from 'img/gray-right-icon.png';
import styles from './Accordion.module.scss';

function Accordion(props) {
  const { title, children } = props;
  const [accodionState, setAccodionState] = useState(false);
  const onChange = () => {
    setAccodionState(!accodionState);
  };
  const {
    main,
    main__title,
    main__content,
    main__contentVisible,
    main__container,
    main__rightIconRotate,
    main__rightIcon
  } = styles;
  return (
    <div onClick={onChange} className={main}>
      <div className={main__container}>
        <p className={main__title}>{title || 'Title'}</p>
        <img
          className={accodionState ? main__rightIconRotate : main__rightIcon}
          src={rightArrow}
          alt="Right Arrow"
        />
      </div>
      <div className={accodionState ? main__contentVisible : main__content}>
        {children || 'Content here!'}
      </div>
    </div>
  );
}

export default Accordion;
