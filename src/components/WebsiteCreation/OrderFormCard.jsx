import React, { useEffect, useState } from 'react';

import Button from 'components/Buttons/Button';
import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import { looksGoodWebsiteCreationActions } from 'helpers/looksGoodWebsiteCreationActions';
import { apiCall } from 'helpers/api-config';
import { CircularProgress } from '@mui/material';
import { webCreationSliceActions } from 'store/web-creation';

import { COLOR_STRIPE } from 'constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'hooks/alert';
import styles from './OrderFormCard.module.scss';
import log from '../../helpers/log';

export default function OrderFormCard() {
  const dispatch = useDispatch();

  const {
    order,
    order__container,
    order__title,
    order__description,
    order__description2,
    order__button,
    order__buttonTitle,
    order__descriptionLinkText,
    order__CheckboxButton,
    order__btnCont,
    order__stripe
  } = styles;

  const { addAlert } = useAlert();

  const isStripeConnected = useSelector((state) => state.webCreation.isStripeConnected);
  const [connect, setConnect] = useState(isStripeConnected);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = localStorage.getItem('token');

  const stripeConnect = async () => {
    setIsLoading(true);
    try {
      const res = await apiCall('get', '/payments/stripe-oauth/get_link/', accessToken);
      const code = res.data.url;
      window.open(code, '_blank').focus();
      setIsLoading(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      console.log(error);
      setIsLoading(false);
    }
  };

  const looksGoodInputHandler = (_evt) => {
    const nextWebCreationItemId = { id: 2 };
    looksGoodWebsiteCreationActions(nextWebCreationItemId);
  };

  useEffect(() => {
    let stripeInterval;
    if (!connect) {
      stripeInterval = setInterval(() => {
        const checkStripeConnection = async () => {
          try {
            const res = await apiCall(
              'get',
              '/payments/stripe-oauth/connect_account/',
              accessToken
            );
            if (res.status === 200) {
              setConnect(true);
              dispatch(webCreationSliceActions.setIsStripeConnected(true));
              clearInterval(stripeInterval);
            }
          } catch (error) {
            console.log(error);
          }
        };
        checkStripeConnection();
      }, 1500);
    }
    return () => {
      clearInterval(stripeInterval);
    };
  }, []);

  return (
    <div className={order}>
      {connect ? (
        <div>
          <div className={order__container}>
            <p className={order__title}>CONGRATS! You have connected your Stripe account!</p>
            <p className={order__description2}>
              You can manage your Stripe account setting on your{' '}
              <span
                onClick={() => window.open('https://dashboard.stripe.com/', '_blank').focus()}
                className={order__descriptionLinkText}>
                Account Setting page.
              </span>
            </p>
          </div>
          <div className={order__CheckboxButton}>
            <InputCheckboxCustom
              id="looksGood"
              checked
              onChange={looksGoodInputHandler}
              label="Looks Good! NEXT"
            />
          </div>
        </div>
      ) : (
        <div className={order__container}>
          <p className={order__title}>
            Let your users easily make purchases using their credit card at checkout for Sales page.
            You can go back and select Lead Magnet if you don&apos;t want to have a pay offer.
          </p>
          <p className={order__description}>
            Stripe allows customers to check out effortlessly, improving their experience <br /> and
            helping you sell more.
          </p>
          <div className={order__btnCont}>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button onClick={stripeConnect} className={order__button} bgColor={COLOR_STRIPE}>
                <div>
                  <span className={order__buttonTitle}>Connect with </span>
                  <span className={order__stripe}>stripe</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
