import React from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

import Button from 'components/Buttons/Button';

import logo from 'img/black-text-logo.png';
import styles from './WipSaleHeader.module.scss';

function WipSaleHeader() {
  const navLinks = [
    {
      text: 'Features',
      path: 'features'
    },
    {
      text: 'Product',
      path: 'product'
    },
    {
      text: 'Pricing',
      path: 'pricing'
    }
  ];

  const {
    header,
    header__logo,
    header__middle,
    headerRight,
    header__navLink,
    header__btnText,
    header__navLink1
  } = styles;

  return (
    <header className={header}>
      <img className={header__logo} src={logo} alt="Bizzy Logo" />

      <div className={header__middle}>
        {navLinks.map((link, index) => (
          <Link className={header__navLink} key={index} to={link.path} spy smooth duration={500}>
            {link.text}
          </Link>
        ))}
      </div>
      <div className={headerRight}>
        <NavLink className={header__navLink1} to="/sign-in">
          Sign in
        </NavLink>
        <Button>
          <Link className={header__btnText} to="pricing" spy smooth duration={500}>
            Start Now
          </Link>
        </Button>
      </div>
    </header>
  );
}

export default WipSaleHeader;
