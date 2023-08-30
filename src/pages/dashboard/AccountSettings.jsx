import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'hooks/alert';

import axios from 'axios';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import upArrowBlackMark from 'img/up_arrow_black.svg';
import downArrowBlackMark from 'img/down_arrow_black.svg';
import PersonalInformationForm from 'components/Forms/PersonalInformationForm';
import PaymentMethodForm from 'components/Forms/PaymentMethodForm';
import StripeForm from 'components/Forms/StripeForm';
import NavButton from 'components/Buttons/NavButton';
import LinearProgress from '@mui/material/LinearProgress';

import { authSliceActions } from 'store/auth';
import log from '../../helpers/log';
import styles from './AccountSettings.module.scss';

function AccountSettings() {
  const {
    container,
    settings_item,
    activeBackground,
    inactiveBackground,
    settings_item__text,
    logout_button
  } = styles;

  const { addAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.pricingPlan.plan);
  const [personalFlag, setPersonalFlag] = useState(true);
  const [paymentFlag, setPaymentFlag] = useState(false);
  const [stripeFlag, setStripeFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    navigate(0);
  };

  const handlePersonalInformation = () => {
    setPersonalFlag(!personalFlag);
    setPaymentFlag(false);
    setStripeFlag(false);
  };

  const handlePaymentMethod = () => {
    setPaymentFlag(!paymentFlag);
    setPersonalFlag(false);
    setStripeFlag(false);
  };

  const handleStripe = () => {
    setStripeFlag(!stripeFlag);
    setPersonalFlag(false);
    setPaymentFlag(false);
  };

  // const personalInformationFormHandler = (data) => {
  //   console.log('personal information data=>', data);
  // };

  // const paymentMethodFormHandler = (data) => {
  //   console.log('payment method form data=>', data);
  // };

  const stripeFormHandler = (data) => {
    console.log('stripe form data=>', data);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/logout/`);
      if (response.status >= 200 && response.status < 299) {
        dispatch(authSliceActions.logout());
        setIsLoading(false);
        navigate('/sign-in', { replace: true });
        refreshPage();
      }
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
    <div
      className={container}
      style={{ marginTop: plan.apiTitle === 'bizzy_free' ? '7.2rem' : '0' }}>
      <QuaternaryHeading txt="Account Settings" />
      <div>
        <div
          className={
            personalFlag
              ? `${settings_item} ${activeBackground}`
              : `${settings_item} ${inactiveBackground}`
          }
          onClick={handlePersonalInformation}>
          <p className={settings_item__text}>Personal Information</p>
          {personalFlag ? (
            <img src={upArrowBlackMark} alt="up mark" />
          ) : (
            <img src={downArrowBlackMark} alt="down mark" />
          )}
        </div>
        {personalFlag && <PersonalInformationForm />}
        {plan.title !== 'Free' && (
          <div
            className={
              paymentFlag
                ? `${settings_item} ${activeBackground}`
                : `${settings_item} ${inactiveBackground}`
            }
            onClick={handlePaymentMethod}>
            <p className={settings_item__text}>Payment Method</p>
            {paymentFlag ? (
              <img src={upArrowBlackMark} alt="up mark" />
            ) : (
              <img src={downArrowBlackMark} alt="down mark" />
            )}
          </div>
        )}
        {paymentFlag && <PaymentMethodForm />}
        <div
          className={
            stripeFlag
              ? `${settings_item} ${activeBackground}`
              : `${settings_item} ${inactiveBackground}`
          }
          onClick={handleStripe}>
          <p className={settings_item__text}>Stripe</p>
          {stripeFlag ? (
            <img src={upArrowBlackMark} alt="up mark" />
          ) : (
            <img src={downArrowBlackMark} alt="down mark" />
          )}
        </div>

        {stripeFlag && <StripeForm stripeFormHandler={stripeFormHandler} />}
        {isLoading ? (
          <LinearProgress color="inherit" />
        ) : (
          <NavButton
            onClick={handleLogout}
            className={logout_button}
            type="button"
            bgColor="#ffc800"
            txt="Logout"
          />
        )}
      </div>
    </div>
  );
}

export default AccountSettings;
