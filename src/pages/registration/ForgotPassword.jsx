import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import Input from 'components/InputFields/Input';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';
import NavButton from 'components/Buttons/NavButton';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import { apiCall } from 'helpers/api-config';
import log from '../../helpers/log';

import styles from './ForgotPassword.module.scss';

function ForgotPassword() {
  const { container, forget__pass, forget__pass__p, forget__pass__input, forget__pass__Btns } =
    styles;

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const navigate = useNavigate();

  const emailInputHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const previousPage = () => {
    navigate('/sign-in');
  };

  const submitForm = async (evt) => {
    evt.preventDefault();
    const data = { username: email };
    setIsLoading(true);
    try {
      const res = await apiCall('post', '/users/reset-password-request/', null, data);

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      setEmail('');
      setIsLoading(false);
      setError(true);
      setErrorMessage('Password Reset Email Successfully Sent');
      setSeverity('success');
      setTimeout(() => {
        setError(false);
      }, 3000);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setSeverity('error');
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={`${container} ${forget__pass}`}>
      <RegistrationHeading parContent="Welcome back, please enter your details." />
      <p className={forget__pass__p}>Type your Email and we will send you verification code.</p>
      <form onSubmit={submitForm}>
        <div className={forget__pass__input}>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={emailInputHandler}
            placeholder="Email"
          />
        </div>
        {isLoading ? (
          <LinearProgress color="inherit" />
        ) : (
          <div className={forget__pass__Btns}>
            <NavButton type="button" txt="< &nbsp;Back" bgColor="#ffffff" onClick={previousPage} />
            <NavButton type="submit" bgColor="#ffc800" txt="Next&nbsp; >" />
          </div>
        )}
      </form>
      <RegisterParagraph p="Don't have an account?" link="Sign Up" path="/register/user-data" />
      <ErrorMessageSnackbar message={errorMessage} severity={severity} open={error} />
    </div>
  );
}

export default ForgotPassword;
