import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'hooks/alert';

import axios from 'axios';

import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import Input from 'components/InputFields/Input';
import NavButton from 'components/Buttons/NavButton';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';
import LinearProgress from '@mui/material/LinearProgress';

import { authSliceActions } from 'store/auth';
import { paymentSliceActions } from 'store/payment';

import { apiCall } from 'helpers/api-config';

import showHide from 'img/Show.svg';
import styles from './UserSignIn.module.scss';
import log from '../../helpers/log';

function UserSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const location = useLocation();
  const { container, form, form__forget, form__btn } = styles;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const UserNameInputHandler = (evt) => {
    setUserName(evt.target.value);
  };
  const passwordInputHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const submitForm = async (evt) => {
    setIsLoading(true);
    try {
      evt.preventDefault();
      const data = { username: username.toLowerCase(), password };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login/`, data);

      if (response.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(authSliceActions.setEntity(response.data));
      const token = await axios.post(`${process.env.REACT_APP_API_URL}/token/`, data);

      if (token.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(authSliceActions.login(token.data));

      const res = await apiCall('get', '/payments/stripe-config/', token.data.access);

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(paymentSliceActions.setPublicKey(res.data.public_key));
      setIsLoading(false);
      setUserName('');
      setPassword('');
      // navigate("/dashboard", { replace: true });
      navigate(location.pathname, { replace: true });
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (err.response?.data?.errors[0]?.message) {
        addAlert(err.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(err));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={container}>
      <RegistrationHeading parContent="Welcome back, please enter your details." />
      <form onSubmit={submitForm}>
        <div className={form}>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={UserNameInputHandler}
            placeholder="Username*"
          />
          <Input
            type="password"
            id="password"
            value={password}
            onChange={passwordInputHandler}
            placeholder="Password*"
            toggleIcon={showHide}
          />
          <NavLink to="/forgot-password" className={form__forget}>
            Forget your password?
          </NavLink>
          {isLoading ? (
            <LinearProgress color="inherit" />
          ) : (
            <NavButton className={form__btn} type="submit" bgColor="#ffc800" txt="Sign In" />
          )}
        </div>
      </form>
      <RegisterParagraph p="Don't have an account?" link="Sign Up" path="/register/user-data" />
    </div>
  );
}

export default UserSignIn;
