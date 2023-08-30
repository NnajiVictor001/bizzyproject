import React from 'react';

import SecondaryHeading from 'components/Typography/SecondaryHeading';
import { COLOR_RED_2 } from 'constants/Colors';

import ideat from 'img/ideat.png';
import launch from 'img/launch.png';
import emails from 'img/emails.png';
import optimize from 'img/optimize.png';
import line1 from 'img/first-line.png';
import line2 from 'img/second-line.png';
import line3 from 'img/third-line.png';
import styles from './WonTraffic.module.scss';

function WonTraffic() {
  const {
    main,
    main__heading,
    main__container,
    main__card,
    main__cards,
    main__row,
    main__row2,
    main__line,
    main__cardHeading,
    main__cardDetails,
    main__bottom,
    main__btmText,
    main__btmHeading
  } = styles;

  const processData = [
    {
      title: 'Ideate & Design',
      description: 'Turn your idea from concept to ready to go reality',
      icon: ideat,
      line: line1
    },
    {
      title: 'Launch & Sell ',
      description:
        'Monetize in minutes with high-converting sales pages, built-in checkouts, and secure online payments powered by Stripe.',
      icon: launch,
      line: line2
    },
    {
      title: '??? Emails / And promo packs',
      description:
        'Copy and paste powerful email marketing automations that make sales while you sleep.',
      icon: emails,
      line: line3
    },
    {
      title: 'Optimize & Grow',
      description:
        'Confidently optimize every aspect of your performance with the help of an easy-to-read dashboard and expert conversion tips. ',
      icon: optimize,
      line: null
    }
  ];

  return (
    <div className={main}>
      <div className={main__heading}>
        <div className={main__container}>
          <SecondaryHeading txt="Turn Your Hard-Won Traffic Into More Profit" />
          <div className={main__cards}>
            {processData?.map((item, index) => (
              <div className={main__card} key={index}>
                <div className={index === 1 ? main__row2 : main__row}>
                  <img src={item.icon} alt="Icon" />
                  {item?.line && (
                    <img
                      className={index === 1 ? main__line : main__line}
                      src={item.line}
                      alt="Icon"
                    />
                  )}
                </div>
                <p
                  style={{
                    color: index === 2 && COLOR_RED_2
                  }}
                  className={main__cardHeading}>
                  {item.title}
                </p>
                <p
                  style={{
                    color: index === 3 && COLOR_RED_2
                  }}
                  className={main__cardDetails}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={main__bottom} id="product">
        <p className={main__btmText}>Digital products how it should really be done</p>
        <h1 className={main__btmHeading}>
          More than just a tool, <br /> we’re the <span>whole toolkit.</span>
        </h1>
      </div>
    </div>
  );
}

export default WonTraffic;
