import React from 'react';
import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import InputPasscode from 'components/InputFields/InputPasscode';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';

import styles from './ForgotPasswordPasscode.module.scss';

function ForgotPasswordPasscode() {
  const { container, forget__pass, forget__pass__p } = styles;

  return (
    <div className={`${container} ${forget__pass}`}>
      <RegistrationHeading parContent="Welcome back, please enter your details." />
      <p className={forget__pass__p}>Please enter verification code.</p>
      <InputPasscode />
      <RegisterParagraph p="Don't have an account?" link="Sign Up" path="/register/user-data" />
    </div>
  );
}

export default ForgotPasswordPasscode;
