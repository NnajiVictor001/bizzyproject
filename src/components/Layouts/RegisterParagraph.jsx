import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './RegisterParagraph.module.scss';

function RegisterParagraph(props) {
  const { p, link, path } = props;
  const { register, register__link } = styles;

  return (
    <p className={register}>
      {p}{' '}
      <NavLink to={path} className={register__link}>
        {link}
      </NavLink>
    </p>
  );
}

export default RegisterParagraph;
