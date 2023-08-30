import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'hooks/alert';

import Input from 'components/InputFields/Input';
import NavButton from 'components/Buttons/NavButton';
import InputCheckbox from 'components/InputFields/InputCheckbox';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { LinearProgress } from '@mui/material';
import { webCreationSliceActions } from 'store/web-creation';

import styles from './SalesFirstPhaseForm.module.scss';
import stylesFull from './SalesFirstPhaseFormFull.module.scss';

function SalesFirstPhaseForm(props) {
  const { websiteMainData, callback, web, webButtonColor, buttonTxt, isLoading, webBaseColor } =
    props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const {
    form,
    form__layout,
    form__fullWidth,
    form__bottomCon,
    form__submitBtn,
    form__leadArrow,
    form__phoneInput,
    container
  } = stylesToUse;

  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [disabled, setDisabled] = useState(true);

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  const firstNameInputHandler = (evt) => {
    setFirstName(evt.target.value);
  };
  const lastNameInputHandler = (evt) => {
    setLastName(evt.target.value);
  };
  const emailInputHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    if (!web) return;
    const values = {
      email,
      first_name: firstName,
      last_name: lastName,
      ...(phoneNumber && { phone: phoneNumber }),
      subscribe: true
    };
    dispatch(webCreationSliceActions.setCustomerData(values));
    callback(values);
  };

  const handleOnClick = () => {
    if (disabled) {
      addAlert('Please Subscribe to our Newsletter to continue', 'error');
    }
  };

  return (
    <div className={container}>
      <div className={form} id="form">
        <h3 style={{ color: webBaseColor || selectedBaseWebsiteColor }}>We’ll send it your way!</h3>
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
              labelStyle={{ color: webBaseColor || selectedBaseWebsiteColor }}
              onChange={() => setDisabled(!disabled)}
              id="terms"
              name="terms"
              label="I would like to subscribe to the newsletter and recieve informational content, including but not limited to this Toolkit."
            />
          </div>
          <div className={form__bottomCon} id="getStartedButton">
            {isLoading ? (
              <LinearProgress color="inherit" />
            ) : (
              <NavButton
                className={form__submitBtn}
                type="submit"
                onClick={handleOnClick}
                bgColor={web ? webButtonColor : websiteMainData?.sp_button?.color}
                txt={web ? buttonTxt : websiteMainData?.sp_cart_button?.val}
              />
            )}
          </div>
        </form>
        <svg
          className={form__leadArrow}
          xmlns="http://www.w3.org/2000/svg"
          width="117"
          height="207"
          viewBox="0 0 117 207"
          fill="none">
          <path
            d="M109.76 3.45117C111.565 42.9143 119.764 90.3371 102.872 127.896C89.1263 158.456 56.4973 185.999 23.2049 192.34C13.5764 194.174 15.8925 182.621 17.0938 176.562C17.7221 173.393 21.7459 158.814 21.6493 160.118C20.3505 177.651 18.7756 188.309 4.20488 198.562C1.54058 200.437 22.9773 203.451 27.7604 203.451"
            stroke={selectedBaseWebsiteColor}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default SalesFirstPhaseForm;
