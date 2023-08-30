import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { COLOR_ORANGE } from 'constants/Colors';
import PopupLayout from 'components/Layouts/PopupLayout';
import NavButton from 'components/Buttons/NavButton';
import { pricingPlanActions } from 'store/pricing-plan';
import SelectedPlan from 'components/Layouts/SelectedPlan';
import Toggle from 'components/Layouts/Toggle';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';

import listIcon from 'img/list-tick.png';
import lock from 'img/lock.png';
import { CircularProgress } from '@mui/material';
import styles from './UpgradeFormPopup.module.scss';
import log from '../../helpers/log';

function UpgradeFormPopup(props) {
  const { isFree, plan: userPlan, onClose, onClick, changePayment } = props;
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!stripe || !elements) return;

    try {
      setIsLoading(true);
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/dashboard'
        },
        redirect: 'if_required'
      });

      if (response?.paymentIntent?.status === 'succeeded') {
        console.log('success');
      }

      if (response?.error) {
        throw new Error(response.error.message);
      }
      setIsLoading(false);
      let updateTo = '';
      if (userPlan.title === 'Free') {
        updateTo = 'The Starter';
      } else {
        updateTo = 'Business';
      }

      dispatch(pricingPlanActions.select(updateTo));
      onClick();
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.field_errors[0]?.message) {
        setErrorMessage(err.response?.data?.field_errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const plans = useSelector((state) => state.pricingPlan.plans);
  const offerPlan = isFree ? plans[1] : plans[2];
  const isToggle = useSelector((state) => state.pricingPlan.switchToYear);
  const [isPayingLoaded, setIsPayingLoaded] = useState(false);

  const onToggle = () => {
    dispatch(pricingPlanActions.changeSelectedPrice());
    setIsLoading(true);
    const interval = isToggle ? 'month' : 'year';
    changePayment({ interval });
  };
  const {
    upPopup,
    upPopup__heading,
    upPopup__details,
    upPopup__listItem,
    upPopup__liHeading,
    upPopup__liIcon,
    upPopup__liText,
    upPopup__list,
    upPopup__left,
    right,
    right__heading,
    right__text,
    right__selectPlan,
    right__selectPlanCont,
    right__toggleCont,
    right__slider,
    right__toggle,
    right__billHeading,
    right__btnCont,
    right__btn,
    right__lastLine,
    billing,
    plan
  } = styles;
  const businessList = [
    {
      title: 'UNLIMITED Products!',
      description: 'Some copy that will be changed later on'
    },
    {
      title: 'UNLIMITED Sales Pages',
      description: 'Some copy that will be changed later on'
    },
    {
      title: 'Priority Support',
      description: 'Some copy that will be changed later on'
    },
    {
      title: 'Create Fill-Able PDF Products',
      description: 'Some copy that will be changed later on'
    },
    {
      title: 'COMING SOON',
      description: 'Ability to printed versions - and we will even ship them for you!'
    }
  ];
  const starterList = [
    {
      title: 'FULL Commercial Re-Sell Rights',
      description: 'You have complete rights to sell!'
    },
    {
      title: 'Unlimited Pages & Products',
      description: 'Along with unlimited edit capability! '
    },
    {
      title: '5 Sales Pages Written FOR You',
      description: 'Or Lead Magnets!!  Your pick.  And we will even host them for you!!'
    },
    {
      title: 'Email and Social Post Examples',
      description: 'Begin instantl y promoting your products!'
    }
  ];
  let listData = [];
  if (isFree) {
    listData = starterList;
  } else {
    listData = businessList;
  }

  const enablePopUp = () => {
    setIsPayingLoaded(true);
  };

  return (
    <PopupLayout onClose={onClose}>
      <div className={upPopup}>
        <div className={upPopup__left}>
          <h3 className={upPopup__heading}>
            Why you should upgrade to Bizzy {isFree ? 'Starter' : 'Pro'}?
          </h3>
          <p className={upPopup__details}>
            When you upgrade you’ll get all the features from Bizzy Basic, plus:
          </p>
          <ul className={upPopup__list}>
            {listData.map((item, index) => (
              <li key={index} className={upPopup__listItem}>
                <p className={upPopup__liHeading}>
                  <img className={upPopup__liIcon} src={listIcon} alt="List Icon" />
                  <span> {item.title}</span>
                </p>
                <p className={upPopup__liText}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={right}>
          <div className={plan}>
            <h3 className={right__heading}>
              {isFree ? 'Get The Business Starter Pack' : 'Become a Business Pro Now'}
            </h3>
            <p className={right__text}>Build & Sell Your Products, in Minutes!</p>
            {isPayingLoaded && (
              <>
                <div className={right__selectPlan}>
                  <SelectedPlan
                    className={right__selectPlanCont}
                    title={offerPlan?.title}
                    cost={offerPlan?.selectedCost}
                    desc="Unlock all the features"
                  />
                </div>
                <div className={right__toggleCont}>
                  {!isLoading && (
                    <Toggle
                      first="Monthly"
                      second="Yearly"
                      isToggled={isToggle}
                      onToggle={onToggle}
                      className={right__toggle}
                      sliderClass={right__slider}
                      isMove
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div className={billing}>
            <div>
              <p className={right__billHeading}>Billing information</p>
              <PaymentElement onReady={enablePopUp} />
            </div>
            <div className={right__btnCont}>
              {!isPayingLoaded || isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <NavButton
                  className={right__btn}
                  type="button"
                  txt="Upgrade now"
                  onClick={onSubmit}
                  bgColor={COLOR_ORANGE}
                />
              )}

              <p className={right__lastLine}>
                <img src={lock} alt="Lock Icon" />
                &nbsp; Card information is stored on a secure server
              </p>
            </div>
          </div>
        </div>
      </div>
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </PopupLayout>
  );
}

export default UpgradeFormPopup;
