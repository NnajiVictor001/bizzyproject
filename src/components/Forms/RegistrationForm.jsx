import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';
import NavButton from 'components/Buttons/NavButton';
import RegisterParagraph from 'components/Layouts/RegisterParagraph';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import LinearProgress from '@mui/material/LinearProgress';

import showHide from 'img/Show.svg';
import styles from './RegistrationForm.module.scss';

function RegistrationForm(props) {
  const { form, form__layout, form__leftBtn, form__rightBtn, mBottom, form__loading } = styles;

  const {
    registerFormHandler,
    formValues,
    handleInputChange,
    agreeTerms,
    agreeTermsInputHandler,
    isLoading
  } = props;

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const goBack = () => {
    navigate(-1);
  };

  const showError = (message) => {
    setError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    const { password, repeatPassword } = formValues;

    if (password.length < 7) {
      showError('Password should contain at least 8 characters');
      return;
    }

    if (password.search(/\d/) === -1) {
      showError('Password should contain at least one number');
      return;
    }

    if (password.search(/[a-z]/) === -1) {
      showError('Password should contain at least one letter');
      return;
    }

    if (password !== repeatPassword) {
      showError('Passwords are not the same');
      return;
    }

    registerFormHandler(formValues);
  };

  const btnDisabled =
    formValues.email === '' ||
    formValues.username === '' ||
    formValues.password === '' ||
    formValues.phone_number === '' ||
    formValues.repeatPassword === '' ||
    agreeTerms === false;

  return (
    <div className={form}>
      <form onSubmit={submitForm} className={form__layout} noValidate>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formValues.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formValues.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <Input
          type="text"
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          placeholder="Username*"
        />
        <Input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Email*"
        />
        <Input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formValues.phone_number}
          onChange={handleInputChange}
          placeholder="Phone Number*"
        />
        <Input
          type="text"
          id="business_name"
          name="business_name"
          value={formValues.business_name}
          onChange={handleInputChange}
          placeholder="Business Name"
        />
        <Input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Password*"
          toggleIcon={showHide}
        />
        <Input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={formValues.repeatPassword}
          onChange={handleInputChange}
          placeholder="Repeat Password*"
          toggleIcon={showHide}
        />
        <div className={mBottom}>
          <InputCheckbox
            id="terms"
            name="terms"
            checked={agreeTerms}
            onChange={agreeTermsInputHandler}
            label="I agree to terms of use."
          />
        </div>

        {isLoading ? (
          <LinearProgress color="inherit" className={form__loading} />
        ) : (
          <>
            <NavButton
              className={form__leftBtn}
              type="button"
              txt="< &nbsp;Back"
              bgColor="#ffffff"
              onClick={goBack}
            />
            <NavButton
              className={form__rightBtn}
              type="submit"
              bgColor="#ffc800"
              txt="Next&nbsp; >"
              disabled={btnDisabled}
            />
          </>
        )}
      </form>
      <RegisterParagraph p="Have an account?" link="Sign In" path="/sign-in" />
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default RegistrationForm;
