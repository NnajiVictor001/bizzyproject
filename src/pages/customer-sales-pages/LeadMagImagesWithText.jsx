import React from 'react';
import toolkit from 'img/toolkitImage.png';
import styles from './LeadMagImagesWithText.module.scss';

function LeadMagImagesWithText() {
  const { main__con, main__con__img, main__right, main__right__middle, main__right__top } = styles;

  return (
    <div className={main__con}>
      <div className={main__con__img}>
        <img src={toolkit} alt="toolkit " />
      </div>
      <div className={main__right}>
        <p className={main__right__top}>For everyone who’s wanted to...</p>
        <p className={main__right__middle}>
          Keep your home spotless with minutes a day or to Work less because you are working
          smarter, and creating organization habits that you can use over and over again! In all
          areas of your life!
          <br />
          <br />
          Even if you&apos;re a clutter bug... we hear you!
          <br />
          <br />
          We&apos;ve been there too!
          <br />
          <br />
          This Simply Tidy Toolkit will help you create your cleaning plan
        </p>
        <p className={main__right__top}>
          For a limited time, get access to our Simply Tidy Toolkit for just $7 and gain that clean
          home without all the stress!
        </p>
      </div>
    </div>
  );
}

export default LeadMagImagesWithText;
