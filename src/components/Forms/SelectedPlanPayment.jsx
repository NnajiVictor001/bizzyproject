import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import Input from 'components/InputFields/Input';
import NavButton from 'components/Buttons/NavButton';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import LinearProgress from '@mui/material/LinearProgress';

import { apiCall } from 'helpers/api-config';

import styles from './SelectedPlanPayment.module.scss';

function SelectedPlanPayment() {
  const { form, form__fullWidth, form__btn, stripeInput, form__input } = styles;

  const accessToken = localStorage.getItem('token');

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [theState, setTheState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [error, setError] = useState(false);
  const [severity, setSeverity] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entityId, setEntityId] = useState('');

  const addressInputHandler = (evt) => {
    setAddress(evt.target.value);
  };
  const cityInputHandler = (evt) => {
    setCity(evt.target.value);
  };
  const theStateInputHandler = (evt) => {
    setTheState(evt.target.value);
  };
  const zipCodeInputHandler = (evt) => {
    setZipCode(evt.target.value);
  };

  const handlePaymentResponse = (message, sev) => {
    setIsLoading(false);
    setErrorMessage(message);
    setSeverity(sev);
    setError(true);
    setTimeout(() => {
      setError(false);
      if (sev === 'success') navigate('/dashboard');
    }, 3000);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiCall('get', '/users/whoami/', accessToken);

        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const { id } = res.data.entity;
        setEntityId(id);
      } catch (err) {
        handlePaymentResponse('Something went wrong, please try again', 'error');
      }
    }
    fetchUser();
  }, []);

  const submitForm = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    try {
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/dashboard'
        },
        redirect: 'if_required'
      });

      if (response?.paymentIntent?.status === 'succeeded') {
        handlePaymentResponse('Your payment has been confirmed. Redirecting you..', 'success');
      }

      if (response?.error) {
        handlePaymentResponse(response.error.message, 'error');
        return;
      }

      const addressData = {
        address_line1: address,
        city,
        state: theState,
        code: zipCode,
        owner_entity: entityId
      };

      const res2 = await apiCall('post', '/entity-addresses/', accessToken, addressData);

      if (res2.status !== 201) throw new Error('Something went wrong.. Please try again');
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.field_errors[0]?.message) {
        handlePaymentResponse(err.response.data.field_errors[0].message, 'error');
        return;
      }
      handlePaymentResponse('Something went wrong. Please try again', 'error');
    }

    setAddress('');
    setCity('');
    setTheState('');
    setZipCode('');
  };

  const previousPage = () => {
    navigate(-1);
  };

  return (
    <form className={form} onSubmit={submitForm} noValidate>
      <div className={`${form__fullWidth} ${stripeInput}`}>
        <PaymentElement />
      </div>

      <div className={form__fullWidth}>
        <Input
          type="string"
          id="address"
          value={address}
          onChange={addressInputHandler}
          placeholder="Address"
        />
      </div>
      <div className={form__input}>
        <Input
          type="string"
          id="city"
          value={city}
          onChange={cityInputHandler}
          placeholder="City"
        />
      </div>
      <div className={form__input}>
        <Input
          type="string"
          id="state"
          value={theState}
          onChange={theStateInputHandler}
          placeholder="State"
        />
      </div>
      <div className={form__input}>
        <Input
          type="number"
          id="zipCode"
          value={zipCode}
          onChange={zipCodeInputHandler}
          placeholder="Zip Code"
        />
      </div>

      {isLoading ? (
        <LinearProgress color="inherit" className={form__fullWidth} />
      ) : (
        <>
          <NavButton
            className={form__btn}
            type="button"
            txt="< &nbsp;Back"
            bgColor="#ffffff"
            onClick={previousPage}
          />
          <NavButton className={form__btn} type="submit" bgColor="#ffc800" txt="Submit" />
        </>
      )}

      <ErrorMessageSnackbar message={errorMessage} severity={severity} open={error} />
    </form>
  );
}

export default SelectedPlanPayment;
