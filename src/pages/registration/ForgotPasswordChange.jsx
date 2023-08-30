import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import NavButton from 'components/Buttons/NavButton';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';
import Input from 'components/InputFields/Input';

import LinearProgress from '@mui/material/LinearProgress';

import { apiCall } from 'helpers/api-config';

import showHide from 'img/Show.svg';
import { useAlert } from 'hooks/alert';
import styles from './ForgotPasswordChange.module.scss';
import log from '../../helpers/log';

function ForgotPasswordChange() {
  const { container, forget__pass, forget__pass__p, forget__pass__input, forget__pass__Btns } =
    styles;

  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const { search } = useLocation();
  const queryParams = search.split('?token=');

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [token, setToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getResetPasswordToken = () => {
    const queryToken = queryParams[1];
    setToken(queryToken);
  };

  useEffect(() => {
    getResetPasswordToken();
    // eslint-disable-next-line
  }, []);

  const submitForm = async (evt) => {
    evt.preventDefault();
    const data = {
      token,
      password
    };

    if (password.length < 7) {
      addAlert('Password should contain at least 8 characters', 'error');
      return;
    }

    if (password.search(/\d/) === -1) {
      addAlert('Password should contain at least one number', 'error');
    }

    if (password.search(/[a-zA-Z]/) === -1) {
      addAlert('Password should contain at least one letter', 'error');
      return;
    }

    if (password !== repeatPassword) {
      addAlert('Passwords are not the same', 'error');
      return;
    }

    if (token === undefined) {
      addAlert('Token is undefined', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiCall('post', '/users/reset-password-confirm/', null, data);

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      setIsLoading(false);
      setPassword('');
      setRepeatPassword('');

      navigate('/forgot-password-confirmed');
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.field_errors[0]?.message) {
        addAlert(error.response?.data?.field_errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoading(false);
    }
  };

  const previousPage = () => {
    navigate('/sign-in');
  };
  const passwordInputHandler = (evt) => {
    setPassword(evt.target.value);
  };
  const repeatPasswordInputHandler = (evt) => {
    setRepeatPassword(evt.target.value);
  };

  return (
    <div className={`${container} ${forget__pass}`}>
      <RegistrationHeading parContent="Welcome back, please enter your details." />
      <p className={forget__pass__p}>Please enter your new password</p>
      <form onSubmit={submitForm}>
        <div className={forget__pass__input}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={passwordInputHandler}
            placeholder="Password"
            toggleIcon={showHide}
          />
          <Input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={repeatPasswordInputHandler}
            placeholder="Repeat Password"
            toggleIcon={showHide}
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
    </div>
  );
}

export default ForgotPasswordChange;
