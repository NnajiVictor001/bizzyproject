import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';
import NavButton from 'components/Buttons/NavButton';
import leadArrow from 'img/lead_arrow.png';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styles from './LeadMagGetStartedForm.module.scss';

function LeadMagGetStartedForm() {
  const {
    form,
    form__layout,
    form__fullWidth,
    form__bottomCon,
    form__submitBtn,
    form__leadArrow,
    form__phoneInput
  } = styles;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const firstNameInputHandler = (evt) => {
    setFirstName(evt.target.value);
  };
  const lastNameInputHandler = (evt) => {
    setLastName(evt.target.value);
  };
  const emailInputHandler = (evt) => {
    setEmail(evt.target.value);
  };
  const agreeTermsInputHandler = (evt) => {
    setAgreeTerms(evt.target.checked);
  };

  const submitForm = (evt) => {
    evt.preventDefault();
  };

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={form}>
      <h3>We’ll send it your way!</h3>
      <form onSubmit={submitForm} className={form__layout}>
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
        <div className={form__fullWidth}>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={emailInputHandler}
            placeholder="Email Address"
          />
        </div>
        <div className={form__fullWidth}>
          <PhoneInput
            className={form__phoneInput}
            defaultCountry="US"
            placeholder="Phone Number (000)000-0000"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <div className={form__fullWidth}>
          <InputCheckbox
            id="terms"
            labelStyle={{ color: selectedBaseWebsiteColor }}
            checked={agreeTerms}
            onChange={agreeTermsInputHandler}
            label="I would like to subscribe to the newsletter and recieve informational content, including but not limited to this Toolkit."
          />
        </div>
        <div className={form__bottomCon}>
          <NavButton
            className={form__submitBtn}
            type="submit"
            bgColor="#FE6E06"
            txt="SEND THE SIMPLY TIDY TOOL KIT MY WAY!"
          />
        </div>
      </form>
      <img className={form__leadArrow} src={leadArrow} alt="lead arrow" />
    </div>
  );
}

export default LeadMagGetStartedForm;
