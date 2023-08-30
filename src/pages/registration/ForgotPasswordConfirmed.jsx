import React, { useNavigate } from 'react-router-dom';

import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import NavButton from 'components/Buttons/NavButton';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';

import styles from './ForgotPasswordConfirmed.module.scss';

function ForgotPasswordConfirmed() {
  const { container, forget__pass, forget__pass__p, forget__pass__Btns } = styles;

  const navigate = useNavigate();

  const previousPage = () => {
    navigate('/sign-in');
  };

  return (
    <div className={`${container} ${forget__pass}`}>
      <RegistrationHeading parContent="Welcome back, please enter your details." />
      <p className={forget__pass__p}>Your password has successfully changed.</p>
      <div className={forget__pass__Btns}>
        <NavButton type="button" txt="< &nbsp;Back" bgColor="#ffffff" onClick={previousPage} />
        <NavButton type="button" bgColor="#ffc800" txt="Next&nbsp; >" onClick={previousPage} />
      </div>
      <RegisterParagraph p="Don't have an account?" link="Sign Up" path="/register/user-data" />
    </div>
  );
}

export default ForgotPasswordConfirmed;
