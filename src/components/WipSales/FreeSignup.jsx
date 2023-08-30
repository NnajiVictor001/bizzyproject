import React, { useState } from 'react';
import { Link } from 'react-scroll';

import Button from 'components/Buttons/Button';
import InputCheckbox from 'components/InputFields/InputCheckbox';

import lines from 'img/decoration.png';
import styles from './FreeSignup.module.scss';

function FreeSignup() {
  const [checkBoxes, setCheckBoxes] = useState({
    noObligation: true,
    freeOnboarding: true,
    freeTrail14Day: true,
    fullFeatures: true
  });
  const checkBoxData = [
    {
      title: 'No obligation',
      checked: checkBoxes.noObligation,
      key: 'noObligation'
    },
    {
      title: 'Free onboarding ',
      checked: checkBoxes.freeOnboarding,
      key: 'freeOnboarding'
    },
    {
      title: '14 day free trial',
      checked: checkBoxes.freeTrail14Day,
      key: 'freeTrail14Day'
    },
    {
      title: 'Full features',
      checked: checkBoxes.fullFeatures,
      key: 'fullFeatures'
    }
  ];
  const onChange = (key) => {
    setCheckBoxes({
      ...checkBoxes,
      [key]: !checkBoxes?.[key]
    });
  };
  const {
    main,
    main__bg,
    main__left,
    main__heading,
    main__right,
    main__btn,
    main__container,
    main__checkBox,
    main__checkBoxRow,
    main__checkBoxCont,
    main__checkBoxText
  } = styles;
  return (
    <div className={main}>
      <img className={main__bg} src={lines} alt="Background lines" />
      <div className={main__container}>
        <div className={main__left}>
          <h1 className={main__heading}>
            Sign up for free, with the world’s <br /> best digital product tool
          </h1>
          <div className={main__checkBoxRow}>
            {checkBoxData.map((item, index) => (
              <div key={index} className={main__checkBoxCont}>
                <InputCheckbox
                  onChange={() => onChange(item.key)}
                  checked={item.checked}
                  className={main__checkBox}
                />
                <p className={main__checkBoxText}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={main__right}>
          <Button className={main__btn}>
            <Link to="pricing" spy smooth duration={500}>
              Sign up, it’s free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FreeSignup;
