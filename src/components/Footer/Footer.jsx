import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBox from 'components/ChatBox/ChatBox';

import logo from 'img/bizzy.png';
import listIcon from 'img/black_tick.png';
import styles from './Footer.module.scss';

function Footer(props) {
  const { links } = props;
  const navigate = useNavigate();
  const {
    footer,
    footer__logo,
    footer__main,
    footer__btmContainer,
    footer__left,
    footer__right,
    footer__heading,
    footer__list,
    footer__icon,
    footer__listItem,
    footer__rightLinks,
    footer__rightLink
  } = styles;

  const [chatState, setChatState] = useState('close');
  // let scrollTop = false;
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (window.pageYOffset > 340) {
  //       scrollTop = true;
  //     } else {
  //       scrollTop = false;
  //     }
  //   });
  // }, []);

  const BugReport = () => {
    // setChatState("step1");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate('/dashboard/bug-report');
  };

  const Referral = () => {
    // setChatState("step1");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate('/dashboard/referral');
  };

  return (
    <footer className={footer}>
      <div className={footer__main}>
        <div className={footer__left}>
          <h3 className={footer__heading}>WE’RE BIZZY... SO YOU DON’T HAVE TO BE!</h3>
          <ul className={footer__list}>
            {links?.listLinks?.map((link, index) => (
              <li className={footer__listItem} key={index}>
                <img className={footer__icon} src={listIcon} alt="List Icon" />
                {link.linkText === 'Request a Feature or Report a Bug' ? (
                  <span onClick={BugReport}>{link?.linkText}</span>
                ) : link.linkText === 'Become a Referral Partner' ? (
                  <span onClick={Referral}>{link?.linkText}</span>
                ) : (
                  // <a
                  //   href={link?.path}
                  //   target="_blank"
                  //   rel="noreferrer"
                  // >
                  //   {link?.linkText}
                  // </a>
                  <Link to={link?.path}>{link?.linkText}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={footer__right}>
          <ul className={footer__rightLinks}>
            {links?.links?.map((link, index) => (
              <li key={index} className={footer__rightLink}>
                {link.linkText === 'Contact Us' ? (
                  <a
                    // onClick={() => (window.location.href = `mailto:hello@bizzy.ai`)}
                    href="mailto:hello@bizzy.ai">
                    {link.linkText}
                  </a>
                ) : (
                  <Link to={link?.path}>{link?.linkText}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={footer__btmContainer}>
        <img className={footer__logo} src={logo} alt="Bizzy Logo" />
      </div>
      <ChatBox chatState={chatState} setChatState={setChatState} />
    </footer>
  );
}

export default Footer;
