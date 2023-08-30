import React from 'react';
import CustomHeading from 'components/Typography/CustomHeading';
import toolkit from 'img/toolkitImage.png';
import feature from 'img/featureImage.png';
// import CheckSection from 'components/';
import CheckSection from 'pages/customer-sales-pages/LeadMagCheckSection';
import styles from './LeadMag.module.scss';

function LeadMag() {
  const {
    heading,
    heading__title,
    heading__button,
    heading__button_txt,
    main,
    main__sec_con,
    main__sec_right,
    main__sec_right__top,
    main__sec_right__middle,
    main__third_con
  } = styles;

  return (
    <div>
      <div className={heading}>
        <div className={heading__title}>Your Organized Life is Waiting!</div>
        <div className={heading__button}>
          <p className={heading__button_txt}>Get The Simply Tidy Toolkit - $9.99</p>
        </div>
      </div>
      <div className={main}>
        <CustomHeading
          subHeaderTxt={
            "You don't need a cleaner, you need a system to organize so there is less to clean!"
          }
          firstTxt="Our"
        />
        <div className={main__sec_con}>
          <img src={toolkit} alt="toolkit" />
          <div className={main__sec_right}>
            <p className={main__sec_right__top}>For everyone who’s wanted to...</p>
            <p className={main__sec_right__middle}>
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
            <p className={main__sec_right__top}>
              For a limited time, get access to our Simply Tidy Toolkit for just $7 and gain that
              clean home without all the stress!
            </p>
          </div>
        </div>
        <div className={main__third_con}>
          <h1>Finally, It&apos;s time for an organized life!</h1>
          <p>
            You aren’t a clutter bug. You just didn’t have a workable strategy that could fit into
            your life. You need the Simply Tidy Toolkit!
          </p>
        </div>
        <div className={main__sec_con}>
          <div className={main__sec_right}>
            <CheckSection
              title={"Spend less time cleaning - cause you'll have a strategy!"}
              content="We have checklists to help you stay on track, and get the house tidy in no time flat!"
            />
            <CheckSection
              title="Be MORE productive than you ever thought was possible."
              content="You aren’t looking for another “course” you want the shortcuts to REAL RESULTS. "
            />
            <CheckSection
              title="Clean up all the zones in your home!"
              content={
                'The kitchen... Your fridge... Laundry Systems... Those "storage" zones... Your whole house organized!!'
              }
            />
          </div>
          <img src={feature} alt="feature" />
        </div>
      </div>
    </div>
  );
}

export default LeadMag;
