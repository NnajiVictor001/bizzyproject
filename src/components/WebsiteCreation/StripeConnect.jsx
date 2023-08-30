import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { useLocation } from 'react-router-dom';
import ApiService from 'helpers/api';

import styles from './StripeConnect.module.scss';

function StripeConnect() {
  const location = useLocation();

  const [isConnected, setIsConnected] = useState(false);

  const { popup, popup__content, body, body__title, body__title__txt, body__title__txt_small } =
    styles;

  const { isLoading: isStripeAuthLoading } = useQuery(
    `stripe-authorize-${location.search}`,
    () => ApiService.get(`/payments/stripe-oauth/authorize/${location.search}`),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: () => setIsConnected(true),
      onError: () => window.close()
    }
  );

  return (
    <div>
      <div className={popup}>
        <div className={popup__content}>
          <div className={body}>
            {isStripeAuthLoading && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            )}
            {!isStripeAuthLoading && isConnected && (
              <div className={body__title}>
                <p className={body__title__txt}>You Successfully connected to stripe!</p>
                <p className={body__title__txt_small}>You can close this window now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StripeConnect;
