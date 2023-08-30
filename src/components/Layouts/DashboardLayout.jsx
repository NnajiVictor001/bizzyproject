import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'hooks/alert';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import UpgradeLowerBanner from 'components/Banners/UpgradeLowerBanner';
import UpgradeTopBanner from 'components/Banners/UpgradeTopBanner';
import HelpButton from 'components/Buttons/HelpButton';
import ChatBox from 'components/ChatBox/ChatBox';
import DashboardHeader from 'components/Headers/DashboardHeader';
import Sidebar from 'components/SIdebar/Sidebar';
import UpgradePopup from 'components/Popups/UpgradePopup';
import UpgradeFormPopup from 'components/Popups/UpgradeFormPopup';
import DashboardFirstUse from 'components/Layouts/DashboardFirstUse';
import UpgradeFinalPopup from 'components/Popups/UpgradeFinalPopup';
import Footer from 'components/Footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import UpgradeBusinessPopup from 'components/Popups/UpgradeBusinessPopup';

import { pricingPlanActions } from 'store/pricing-plan';
import { footerLinksActions } from 'store/footer-links';
import { paymentSliceActions } from 'store/payment';
import { UserDataSliceActions } from 'store/user-data';

import { apiCall } from 'helpers/api-config';
import styles from './DashboardLayout.module.scss';

import log from '../../helpers/log';

function DashboardLayout(props) {
  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const { children } = props;
  const accessToken = localStorage.getItem('token');

  const [chatState, setChatState] = useState('close');
  const [upgradePopUp, setUpgradePopUp] = useState('close');

  const [selectedPlanName, setSelectedPlanName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState('');
  const [pIntent, setPIntent] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [cost, setCost] = useState();
  const [theInterval, setTheInterval] = useState();

  const dispatch = useDispatch();
  const publicKey = localStorage.getItem('pk');
  const stripePromise = loadStripe(`${publicKey}`);

  const plan = useSelector((state) => state.pricingPlan.plan);
  const routes = useSelector((state) => state.dashboardRoutes.routes);
  const footerLinks = useSelector((state) => state.footerLinks.links);
  const firstTime = useSelector((state) => state.dashboardFirstUse.firstTime);

  useEffect(() => {
    async function fetchSelectedPricingPlan() {
      try {
        setIsLoading(true);

        const res = await apiCall('get', '/subscriptions/current/', accessToken);
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        setIsLoading(false);
        const { plan_name } = res.data;
        setSelectedPlanName(plan_name);
        if (plan_name === 'bizzy_free') {
          setIsFree(true);
          dispatch(pricingPlanActions.select('Free'));
        } else if (plan_name === 'bizzy_starter') {
          dispatch(UserDataSliceActions.setStripeAccount());
          dispatch(pricingPlanActions.select('The Starter'));
        } else {
          setIsBusiness(true);
          dispatch(UserDataSliceActions.setStripeAccount());
          dispatch(pricingPlanActions.select('Business'));
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
    }
    fetchSelectedPricingPlan();
    dispatch(footerLinksActions.getLinks());
  }, [accessToken, dispatch]);

  const {
    layout,
    layout__childrenWrapper,
    layout__sidebar,
    layout__sidebarMt,
    layout__content,
    layout__header,
    layout__topBanner,
    flex_center
  } = styles;

  const showChat = () => {
    // setChatState("step1");
    navigate('/dashboard/bug-report');
  };

  const onClose = () => {
    setUpgradePopUp('close');
    if (upgradePopUp === 'final') {
      window.location.reload();
    }
  };

  const upgradeToBusinessCost = async ({ interval = 'month' }) => {
    try {
      setIsLoading(true);
      setTheInterval(interval);
      const dataApi = {
        plan_name: 'bizzy_business',
        interval
      };

      const res = await apiCall('post', '/subscriptions/preview_change/', accessToken, dataApi);
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { total } = res.data;
      setCost(total);
      setIsLoading(false);
      setUpgradePopUp('business_upgrade');
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

  const upgradePopUpClick = async ({ interval = 'month' }) => {
    try {
      setIsLoading(true);
      let updateTo = '';
      if (selectedPlanName === 'bizzy_free') {
        updateTo = 'bizzy_starter';
      } else if (selectedPlanName === 'bizzy_starter') {
        updateTo = 'bizzy_business';
      }

      const dataApi = {
        plan_name: updateTo,
        interval
      };

      let res = '';
      if (updateTo === 'bizzy_starter') {
        res = await apiCall('post', '/subscriptions/upgrade/', accessToken, dataApi);
      } else {
        upgradeToBusinessCost('month');
        return;
      }

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(paymentSliceActions.setPaymentIntent(res.data.payment_intent));
      dispatch(paymentSliceActions.setSecretKey(res.data.client_secret));
      setSecret(res.data.client_secret);
      setPIntent(res.data.payment_intent);
      setIsLoading(false);
      setUpgradePopUp('main');
    } catch (err) {
      console.log(err);
    }
  };

  const upgradeFormPopUpClick = () => {
    setUpgradePopUp('final');
  };

  const upgradeToBusinessAccount = async () => {
    try {
      setIsLoading(true);
      const dataApi = {
        plan_name: 'bizzy_business',
        interval: theInterval
      };
      await apiCall('post', '/subscriptions/change/', accessToken, dataApi);
      setIsLoading(false);
      setUpgradePopUp('final');
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

  const popup = () => {
    switch (upgradePopUp) {
      case 'open':
        return <UpgradePopup onClick={upgradePopUpClick} onClose={onClose} loading={isLoading} />;
      case 'business_upgrade':
        return (
          <UpgradeBusinessPopup
            onClick={upgradeToBusinessAccount}
            onClose={onClose}
            loading={isLoading}
            cost={cost}
            upgradeToBusinessCost={upgradeToBusinessCost}
          />
        );
      case 'main':
        return (
          <Elements stripe={stripePromise} options={{ clientSecret: secret }} key={pIntent}>
            <UpgradeFormPopup
              plan={plan}
              isFree={isFree}
              onClick={upgradeFormPopUpClick}
              changePayment={upgradePopUpClick}
              onClose={onClose}
            />
          </Elements>
        );
      case 'final':
        return <UpgradeFinalPopup onClose={onClose} />;
      case 'close':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={layout}>
      {firstTime && <DashboardFirstUse />}
      <div>{popup()}</div>
      <div className={layout__header}>
        <DashboardHeader showChat={showChat} />
      </div>
      {isFree && (
        <div className={layout__topBanner}>
          <UpgradeTopBanner onClick={() => setUpgradePopUp('open')} />
        </div>
      )}

      <div className={layout__content}>
        <HelpButton chatState={chatState} showChat={showChat} />
        <ChatBox chatState={chatState} setChatState={setChatState} />
        <div className={isFree ? layout__sidebarMt : layout__sidebar}>
          <Sidebar routes={routes} showChat={showChat} />
        </div>
        <div className={layout__childrenWrapper}>
          {isLoading && (
            <div className={flex_center}>
              <CircularProgress color="inherit" />
            </div>
          )}
          {children}
        </div>
      </div>
      <div>
        {!isBusiness && <UpgradeLowerBanner onClick={() => setUpgradePopUp('open')} />}
        <Footer links={footerLinks} />
      </div>
    </div>
  );
}

export default DashboardLayout;
