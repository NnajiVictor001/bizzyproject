import React, { useEffect, useState } from 'react';

import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import CircularProgress from '@mui/material/CircularProgress';

import { apiCall } from 'helpers/api-config';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';

import visa from 'img/visa.svg';
import styles from './PaymentMethodForm.module.scss';
import log from '../../helpers/log';

function PaymentMethodForm() {
  const accessToken = localStorage.getItem('token');
  const {
    form,
    form__layout,
    form__layout__checkbox,
    form__layout__checkbox__body,
    form__layout__fullwidth,
    form__layout__fullwidth_bottom,
    flex_center
  } = styles;

  const [creditNumber, setCreditNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [addressId, setAddressId] = useState(null);
  const [ownerEntity, setOwnerEntity] = useState(null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');

  // const [brand, setBrand] = useState("");
  // const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [severity, setSeverity] = useState('');

  const addressInputHandler = (evt) => {
    const fullAddress = evt.target.value;
    const address1 = fullAddress.split(',')[0];
    const address2 = fullAddress.split(',')[1];
    setAddressLine1(address1);
    setAddressLine2(address2);
    setAddress(fullAddress);
  };
  const cityInputHandler = (evt) => {
    setCity(evt.target.value);
  };
  const stateInputHandler = (evt) => {
    setState(evt.target.value);
  };
  const zipcodeInputHandler = (evt) => {
    setZipcode(evt.target.value);
  };
  const handleLooksGoodButton = async () => {
    try {
      setIsLoading(true);

      if (!ownerEntity) {
        const res = await apiCall('get', '/users/whoami/', accessToken);

        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const { id } = res.data.entity;

        const updatedAddress = {
          address_line1: addressLine1,
          address_line2: addressLine2,
          city,
          state,
          code: zipcode,
          owner_entity: id
        };

        const res1 = await apiCall('post', '/entity-addresses/', accessToken, updatedAddress);

        if (res1.status !== 201) throw new Error('Something went wrong.. Please try again');

        setIsLoading(false);
        setError(true);
        setErrorMessage('Data updated successfully');
        setSeverity('success');
        setTimeout(() => {
          setErrorMessage(null);
          setError(false);
        }, 3000);
        return;
      }

      const updatedAddress = {
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        state,
        code: zipcode,
        owner_entity: ownerEntity
      };
      const res = await apiCall(
        'put',
        `/entity-addresses/${addressId}/`,
        accessToken,
        updatedAddress
      );

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      setIsLoading(false);
      setError(true);
      setErrorMessage('Data updated successfully');
      setSeverity('success');
      setTimeout(() => {
        setErrorMessage(null);
        setError(false);
      }, 3000);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
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

  useEffect(() => {
    const fetchUserCardDetails = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall('get', '/payments/payment-info/payment_methods/', accessToken);

        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        if (!!res && res.data.length > 0) {
          // setBrand(res.data[0].brand);
          // setCountry(res.data[0].country);
          const lastFourDigits = res.data[0].last4;
          const creditVal = `**** **** **** ${lastFourDigits}`;
          setCreditNumber(creditVal);
          const expYear = res.data[0].exp_year;
          const expMonth = res.data[0].exp_month;
          const lastExpYear = `${expYear}`.slice(-2);
          const expirationDateVal = `${expMonth}/${lastExpYear}`;
          setExpirationDate(expirationDateVal);
        }

        const res1 = await apiCall('get', '/entity-addresses/', accessToken);

        if (res1.status !== 200) throw new Error('Something went wrong.. Please try again');

        if (!!res1 && res1.data.results.length > 0) {
          const addrData = res1.data.results[0];
          const {
            address_line1,
            address_line2,
            city: addrCity,
            code,
            state: addrState,
            id,
            owner_entity
          } = addrData;
          setAddressLine1(address_line1);
          setAddressLine2(address_line2);

          if (address_line2) {
            setAddress(`${address_line1},${address_line2}`);
          } else {
            setAddress(address_line1);
          }
          setCity(addrCity);
          setZipcode(code);
          setState(addrState);
          setAddressId(id);
          setOwnerEntity(owner_entity);
        }

        setIsLoading(false);
      } catch (err) {
        if (err.message === 'Network Error') {
          log.error(JSON.stringify(err));
          setErrorMessage('Connectivity error. Please try again');
        } else if (err.response?.data?.errors[0]?.message) {
          setErrorMessage(err.response?.data?.errors[0]?.message);
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
    fetchUserCardDetails();
  }, [accessToken]);

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
            id="credit"
            value={creditNumber}
            placeholder="Credit Card Number"
            toggleIcon={visa}
            readOnly
          />
          <Input
            type="text"
            id="expirationDate"
            value={expirationDate}
            placeholder="Expiration Date"
            readOnly
          />
          <div className={form__layout__fullwidth}>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={addressInputHandler}
              placeholder="Address"
            />
          </div>
          <div className={form__layout__fullwidth_bottom}>
            <Input
              type="text"
              id="city"
              value={city}
              onChange={cityInputHandler}
              placeholder="City"
            />
            <Input
              type="text"
              id="state"
              value={state}
              onChange={stateInputHandler}
              placeholder="State"
            />
            <Input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={zipcodeInputHandler}
              placeholder="Zip Code"
            />
          </div>
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

export default PaymentMethodForm;
