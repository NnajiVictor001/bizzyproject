import React, { useEffect, useState } from 'react';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';
import showHide from 'img/Show.svg';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { apiCall } from 'helpers/api-config';
import log from '../../helpers/log';

import styles from './PersonalInformationForm.module.scss';

function PersonalInformationForm() {
  const accessToken = localStorage.getItem('token');

  const {
    form,
    form__layout,
    form__layout__checkbox,
    form__layout__checkbox__body,
    error_border,
    flex_center
  } = styles;

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    async function fetchLoggedInUserData() {
      try {
        setIsLoading(true);
        const res = await apiCall('get', '/users/whoami/', accessToken);

        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const { user_id } = res.data;
        setUserId(user_id);

        const res1 = await apiCall('get', `/users/${user_id}`, accessToken);

        if (res1.status !== 200) throw new Error('Something went wrong.. Please try again');

        const {
          first_name,
          last_name,
          email: resEmail,
          business_name,
          username: resUsername
        } = res1.data;
        setUsername(resUsername);
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(resEmail);
        setBusinessName(business_name);
        setIsLoading(false);
      } catch (err) {
        log.error(err);
        setErrorMessage(
          err.message === 'Network Error'
            ? 'Connectivity error. Please try again'
            : err.response.data?.errors[0]?.message
        );
        setIsLoading(false);
        setError(true);
        setSeverity('error');
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
    fetchLoggedInUserData();
  }, [accessToken]);

  const firstNameInputHandler = (evt) => {
    setFirstName(evt.target.value);
  };
  const lastNameInputHandler = (evt) => {
    setLastName(evt.target.value);
  };
  const emailInputHandler = (evt) => {
    setEmail(evt.target.value);
  };
  const businessNameInputHandler = (evt) => {
    setBusinessName(evt.target.value);
  };
  const confirmPasswordInputHandler = (evt) => {
    setConfirmPassword(evt.target.value);
  };
  const changePasswordInputHandler = (evt) => {
    setChangePassword(evt.target.value);
  };
  const showError = (message) => {
    setError(true);
    setSeverity('error');
    setErrorMessage(message);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const handleLooksGoodButton = async () => {
    if (changePassword.length < 7) {
      showError('Password should contain at least 8 characters');
      return;
    }

    if (changePassword.search(/\d/) === -1) {
      showError('Password should contain at least one number');
      return;
    }

    if (changePassword.search(/[a-zA-Z]/) === -1) {
      showError('Password should contain at least one letter');
      return;
    }

    if (changePassword !== confirmPassword) {
      showError('Passwords are not the same');
      return;
    }

    const updatedUser = {
      username,
      password: changePassword,
      email,
      first_name: firstName,
      last_name: lastName,
      business_name: businessName
    };
    setIsLoading(true);
    try {
      const res2 = await apiCall('put', `/users/${userId}/`, accessToken, updatedUser);

      if (res2.status !== 200) throw new Error('Something went wrong.. Please try again');

      setIsLoading(false);
      setError(true);
      setErrorMessage('Data updated successfully');
      setSeverity('success');
      setChangePassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setErrorMessage(null);
        setError(false);
      }, 3000);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.field_errors[0]?.message) {
        setErrorMessage(err.response?.data?.field_errors[0]?.message);
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
    <div className={form}>
      {isLoading ? (
        <div className={flex_center}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <form className={form__layout}>
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={firstNameInputHandler}
            placeholder="First Name"
          />
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={lastNameInputHandler}
            placeholder="Last Name"
          />
          <Input
            type="email"
            id="email"
            value={email}
            onChange={emailInputHandler}
            placeholder="Email"
          />
          <Input
            type="text"
            id="businessName"
            value={businessName}
            onChange={businessNameInputHandler}
            placeholder="Business Name"
          />
          <div>
            <Input
              className={errorMessage && error_border}
              type="password"
              id="changePassword"
              value={changePassword}
              onChange={changePasswordInputHandler}
              placeholder="Change Password"
              toggleIcon={showHide}
            />
          </div>
          <Input
            className={errorMessage && error_border}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={confirmPasswordInputHandler}
            placeholder="Confirm Password"
            toggleIcon={showHide}
          />
          {isLoading && (
            <div className={form__layout__checkbox}>
              <LinearProgress color="inherit" />
            </div>
          )}
          <div className={form__layout__checkbox}>
            <span className={form__layout__checkbox__body} onClick={handleLooksGoodButton}>
              <InputCheckbox id="looksGood" checked label="Looks Good!" changed readOnly />
            </span>
          </div>
        </form>
      )}

      <ErrorMessageSnackbar message={errorMessage} severity={severity} open={error} />
    </div>
  );
}

export default PersonalInformationForm;
