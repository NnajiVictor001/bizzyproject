import React, { useMemo, useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';

import NavButton from 'components/Buttons/NavButton';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import leadArrow from 'img/lead_arrow.png';
import log from '../../helpers/log';

import styles from './SalesSecondPhaseForm.module.scss';
import stylesFull from './SalesSecondPhaseFormFull.module.scss';

function SalesSecondPhaseForm(props) {
  const { callback, web, webButtonColor, isLoadingSecond } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { form, form__layout, form__submitBtn, form__leadArrow, container } = stylesToUse;

  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const submitForm = async (evt) => {
    evt.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/dashboard'
        },
        redirect: 'if_required'
      });

      if (response.error) {
        const { message: responseMessage } = response.error;
        throw new Error(responseMessage);
      }

      setIsLoading(false);
      callback();
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        setMessage('Connectivity error. Please try again');
      } else if (error.response?.data?.errors[0]?.message) {
        setMessage(error.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(error));
        setMessage(error.message);
      }
      setIsLoading(false);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className={container}>
      <div className={form}>
        <h3>It’s almost yours!</h3>
        <form onSubmit={submitForm} className={form__layout}>
          <AddressElement options={{ mode: 'billing' }} />
          <PaymentElement />
          {isLoading || isLoadingSecond ? (
            <LinearProgress color="inherit" />
          ) : (
            <NavButton
              className={form__submitBtn}
              type="submit"
              bgColor={webButtonColor || '#FE6E06'}
              txt="COMPLETE PAYMENT &rsaquo;&rsaquo;"
            />
          )}
        </form>
        <img className={form__leadArrow} src={leadArrow} alt="lead arrow" />
      </div>
      <ErrorMessageSnackbar message={message} severity="error" open={showError} />
    </div>
  );
}

export default SalesSecondPhaseForm;
