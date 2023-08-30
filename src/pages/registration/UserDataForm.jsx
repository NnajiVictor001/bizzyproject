import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddAlert } from '@mui/icons-material';
import axios from 'axios';

import RegistrationForm from 'components/Forms/RegistrationForm';
import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import { pricingPlanActions } from 'store/pricing-plan';

import { apiCall } from 'helpers/api-config';

import { authSliceActions } from 'store/auth';
import { paymentSliceActions } from 'store/payment';
import log from '../../helpers/log';

import styles from './UserDataForm.module.scss';

const initialFormData = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  phone_number: '',
  business_name: '',
  password: '',
  repeatPassword: ''
};

function UserDataForm() {
  const { container } = styles;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const plan = useSelector((state) => state.pricingPlan.plan);
  const planSwitchToYear = useSelector((state) => state.pricingPlan.switchToYear);
  const planInterval = planSwitchToYear ? 'year' : 'month';

  const [formValues, setFormValues] = useState(initialFormData);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const agreeTermsInputHandler = (evt) => {
    setAgreeTerms(evt.target.checked);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const registerFormHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup/`, data);

      if (response.status !== 201) throw new Error("Couldn't sign up.. Please try again");

      dispatch(pricingPlanActions.fillUserData());
      dispatch(authSliceActions.login(response.data.token));
      const accessToken = response.data.token.access;

      const resWhoAmI = await apiCall('get', '/users/whoami/', accessToken);

      if (resWhoAmI.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(authSliceActions.setEntity(resWhoAmI.data));

      if (plan.apiTitle === 'bizzy_free') {
        const res1 = await apiCall('get', '/payments/stripe-config', accessToken);

        if (res1.status !== 200) throw new Error('Something went wrong.. Please try again');

        dispatch(paymentSliceActions.setPublicKey(res1.data.public_key));

        setIsLoading(false);
        setFormValues(initialFormData);
        setAgreeTerms(false);
        navigate('/dashboard');
        return;
      }

      const dataApi = {
        plan_name: plan.apiTitle,
        interval: planInterval
      };

      const res = await apiCall('post', '/subscriptions/upgrade/', accessToken, dataApi);

      dispatch(paymentSliceActions.setPaymentIntent(res.data.payment_intent));
      dispatch(paymentSliceActions.setSecretKey(res.data.client_secret));

      const res1 = await apiCall('get', '/payments/stripe-config', accessToken);

      if (res1.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(paymentSliceActions.setPublicKey(res1.data.public_key));
      setFormValues(initialFormData);
      setAgreeTerms(false);
      setIsLoading(false);

      navigate('/register/user-payment', { replace: true });
    } catch (e) {
      setIsLoading(false);
      if (e.message === 'Network Error') {
        log.error(JSON.stringify(e));
        AddAlert('No internet connection', 'error');
        return;
      }
      if (e?.response?.data?.field_errors) {
        const err = e.response.data.field_errors[0];
        if (err.code === 'unique' || err.code === 'invalid') {
          AddAlert(err.message, 'error');
          return;
        }
        if (err.code === 'blank') {
          AddAlert(`Error at ${err.field}. ${err.message}`, 'error');
          return;
        }
        if (err.code === 'invalid') {
          AddAlert(err.message, 'error');
        }
      } else {
        log.error(JSON.stringify(e));
        AddAlert("Couldn't sign up.. Please try again", 'error');
      }
    }
  };

  return (
    <div className={container}>
      <RegistrationHeading parContent="We just need to know a little bit about you to get started!!" />
      <RegistrationForm
        registerFormHandler={registerFormHandler}
        formValues={formValues}
        handleInputChange={handleInputChange}
        agreeTerms={agreeTerms}
        agreeTermsInputHandler={agreeTermsInputHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UserDataForm;
