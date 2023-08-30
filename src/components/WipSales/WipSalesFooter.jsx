import React from 'react';

import InputCheckbox from 'components/InputFields/InputCheckbox';
import { Link as LinkScrollTo } from 'react-scroll';

import logo from 'img/bizzy.png';
import styles from './WipSalesFooter.module.scss';

function WipSalesFooter() {
  const leftData = [
    {
      title: 'All features',
      checked: true
    },
    {
      title: 'Unlimited projects',
      checked: true
    },
    {
      title: 'Free onboarding',
      checked: true
    },
    {
      title: 'No payment needed',
      checked: true
    }
  ];
  const rightList = [
    {
      heading: 'Our Company',
      subList: [
        {
          title: 'Terms and Conditions',
          link: '/wip-sales/terms'
        },
        {
          title: 'Privacy and Data Use Policy',
          link: '/wip-sales/terms'
        },
        {
          title: 'Contact Us',
          link: 'theonecrazyhouse@gmail.com'
        }
      ]
    },
    {
      heading: 'Our Product',
      subList: [
        {
          title: 'FAQS',
          link: '#'
        },
        {
          title: 'Report a bug',
          link: 'https://rachel568.typeform.com/to/g73ZLpDY'
        },
        {
          title: 'Partner with us',
          link: 'https://rachel568.typeform.com/to/QAlv1reA'
        }
      ]
    }
  ];
  const {
    main,
    footer,
    footer__btmContainer,
    footer__logo,
    main__left,
    main__right,
    main__heading,
    main__leftList,
    main__listItem,
    main__checkBox,
    main__formCont,
    main__rightList,
    main__rightListHeading,
    main__rightListItem,
    main__navbtn
  } = styles;

  return (
    <footer className={footer}>
      <div className={main}>
        <div className={main__left}>
          <h3 className={main__heading}>Start now for free </h3>
          <ul className={main__leftList}>
            {leftData.map((item, index) => (
              <li className={main__listItem} key={index}>
                <div>
                  <InputCheckbox checked readOnly className={main__checkBox} />
                </div>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
          <div className={main__formCont}>
            <LinkScrollTo className={main__navbtn} to="pricing" spy smooth duration={500}>
              Start Your Trial
            </LinkScrollTo>
          </div>
        </div>
        <div className={main__right}>
          {rightList.map((list, index) => (
            <ul key={index} className={main__rightList}>
              <li className={main__rightListHeading}>{list.heading}</li>
              {list.subList.map((item, i) => (
                <li className={main__rightListItem} key={i}>
                  {item.title === 'Contact Us' ? (
                    <span
                      onClick={() => {
                        window.location = `mailto:${item.link}`;
                      }}>
                      {item.title}
                    </span>
                  ) : (
                    <a target="_blank" href={item.link} rel="noreferrer">
                      {item.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className={footer__btmContainer}>
        <img className={footer__logo} src={logo} alt="Bizzy Logo" />
      </div>
    </footer>
  );
}

export default WipSalesFooter;
