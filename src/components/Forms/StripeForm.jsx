import React, { useState } from 'react';
import ApiService from 'helpers/api';
import { useQuery } from 'react-query';
import { useAlert } from 'hooks/alert';

import styled from 'styled-components';
import Input from 'components/InputFields/Input';
import { COLOR_STRIPE } from 'constants/Colors';
import Button from 'components/Buttons/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './StripeForm.module.scss';

const StripeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.4rem;
  width: 100%;

  div {
    width: 100%;
  }
`;

function StripeForm() {
  const { form, flex_center, order__button, order__buttonTitle, order__stripe } = styles;

  const { addAlert } = useAlert();

  const [enableStripeLink, setEnableStripeLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountConnected, setIsAccountConnected] = useState(false);

  const {
    isLoading: isStripeConnectLoading,
    data: stripeConnectData,
    refetch: refetchStripeConnect
  } = useQuery(
    `stripe-connect-account`,
    () => ApiService.get('/payments/stripe-oauth/connect_account/'),
    {
      retry: false,
      onSuccess: () => setIsAccountConnected(true),
      onError: () => setIsAccountConnected(false)
    }
  );

  console.log('DATA_IS', stripeConnectData);

  const onStripeLinkSuccess = (data) => {
    const code = data.url;
    window.open(code, '_blank').focus();
    refetchStripeConnect();
    setEnableStripeLink(false);
  };

  const { isLoading: isStripeConfigLoading } = useQuery(
    'stripe-oauth-link',
    () => ApiService.get('/payments/stripe-oauth/get_link/'),
    {
      refetchOnWindowFocus: false,
      enabled: enableStripeLink,
      onSuccess: (response) => onStripeLinkSuccess(response.data)
    }
  );

  const handleDisconectStripe = async () => {
    setIsLoading(true);
    try {
      await ApiService.post('/payments/stripe-oauth/deauthorize/');
      addAlert('Stripe account disconnected successfully', 'success');
      await refetchStripeConnect();
    } catch {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  if (isStripeConnectLoading || isStripeConfigLoading || isLoading)
    return (
      <div className={form}>
        <div className={flex_center}>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );

  return (
    <div className={form}>
      {isAccountConnected ? (
        <StripeContainer>
          <Input
            id="account"
            defaultValue={stripeConnectData?.data?.account}
            placeholder="Account"
          />
          <Button onClick={handleDisconectStripe} className={order__button} bgColor={COLOR_STRIPE}>
            <div>
              <span className={order__buttonTitle}>Disconnect from </span>
              <span className={order__stripe}>stripe</span>
            </div>
          </Button>
        </StripeContainer>
      ) : null}
      {!isAccountConnected ? (
        <Button
          onClick={() => setEnableStripeLink(true)}
          className={order__button}
          bgColor={COLOR_STRIPE}>
          <div>
            <span className={order__buttonTitle}>Connect with </span>
            <span className={order__stripe}>stripe</span>
          </div>
        </Button>
      ) : null}
    </div>
  );
}

export default StripeForm;
