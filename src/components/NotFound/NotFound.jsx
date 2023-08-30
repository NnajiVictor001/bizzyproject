import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import NavButton from 'components/Buttons/NavButton';
import close from 'img/close-icon.png';
import { useNavigate } from 'react-router-dom';

import { COLOR_LIGHT_ORANGE } from 'constants/Colors';
import notfound1 from 'img/notfound/notfound1.png';
import notfound2 from 'img/notfound/notfound2.png';
import notfound3 from 'img/notfound/notfound3.png';
import notfound4 from 'img/notfound/notfound4.png';
import notfound5 from 'img/notfound/notfound5.png';
import notfound6 from 'img/notfound/notfound6.png';
import notfound7 from 'img/notfound/notfound7.png';
import notfound8 from 'img/notfound/notfound8.png';
import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();
  const { overlay, overlay__heading, overlay__par, overlay__img, overlay__close } = styles;

  const reportBug = () => {
    navigate('/dashboard/bug-report');
    // window.open("https://rachel568.typeform.com/to/g73ZLpDY", "_blank");
  };

  const imagesArray = [
    notfound1,
    notfound2,
    notfound3,
    notfound4,
    notfound5,
    notfound6,
    notfound7,
    notfound8
  ];

  const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div className={overlay}>
          <img onClick={onClose} src={close} alt="Close icon" className={overlay__close} />
          <h1 className={overlay__heading}>Sorry. That page is missing??</h1>
          <p className={overlay__par}>
            Please report this as a bug and tell us what you were looking for...
            <br /> OR... just smile at the bees
          </p>
          <NavButton
            type="button"
            txt="I want to report a bug"
            bgColor={COLOR_LIGHT_ORANGE}
            onClick={reportBug}
          />
          <div className={overlay__img}>
            <img src={randomImage} alt="bee" />
          </div>
        </div>
      </Backdrop>
    </div>
  );
}

export default NotFound;
