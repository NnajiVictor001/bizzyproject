import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'hooks/alert';

import DashboardRoutes from 'applicationRoutes/DashboardRoutes';
import WipSales from 'pages/sales/WipSales';
import TermsAndConditions from 'components/WipSales/TermsAndConditions';
import Thankyou from 'pages/customer-sales-pages/Thankyou';
// import VideoDelivery from 'pages/customer-sales-pages/VideoDelivery';
// import SalesThankyou from 'pages/customer-sales-pages/SalesThankyou';
import SalesVideoDelivery from 'pages/customer-sales-pages/SalesVideoDelivery';
import UserDataForm from 'pages/registration/UserDataForm';
import UserPayment from 'pages/registration/UserPayment';
import UserPricingPlan from 'pages/registration/UserPricingPlan';
import UserSignIn from 'pages/registration/UserSignIn';
import ForgotPassword from 'pages/registration/ForgotPassword';
import ForgotPasswordChange from 'pages/registration/ForgotPasswordChange';
import ForgotPasswordConfirmed from 'pages/registration/ForgotPasswordConfirmed';
// import ForgotPasswordPasscode from 'pages/registration/ForgotPasswordPasscode';
import SalesPageCreated from 'pages/customer-sales-pages/SalesPageCreated';
import AuthVerify from 'components/Common/auth-verify';
import IngredientsPreviewer from 'pages/ingredients-previewer/IngredientsPreviewer';
import axios from 'axios';
import { authSliceActions } from 'store/auth';
import StaffPagesPreviewer from 'pages/admin/StaffPagesPreviewer';
import MetadataGenerator from './pages/metadata-generator/MetadataGenerator';
import log from './helpers/log';

function AppRoutes() {
  const accessToken = localStorage.getItem('token');

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const isCustomDomain = window.location.host.includes(process.env.REACT_APP_CUSTOM_DOMAIN);

  const logOut = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/logout/`);
      if (response.status >= 200 && response.status < 299) {
        dispatch(authSliceActions.logout());
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
    }
  };

  if (isCustomDomain) {
    const subdomain = window.location.host.split('.')[0];
    return (
      <Routes>
        <Route path="/" element={<SalesPageCreated subdomain={subdomain} />} />
        <Route path="/page/:subDomain/thankyou" element={<Thankyou />} />
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path={`/:subDomain/${process.env.REACT_APP_CUSTOM_DOMAIN}`}
          element={<SalesPageCreated />}
        />

        <Route path="/" element={accessToken ? <Navigate to="/dashboard" /> : <UserSignIn />} />

        <Route path="/wip-sales" element={<WipSales />} />
        <Route path="/wip-sales/terms" element={<TermsAndConditions />} />
        {/* <Route path="/sales-page/lead-mag" element={<LeadMag />} /> */}
        <Route path="/page/:subDomain/thankyou" element={<Thankyou />} />
        {/* <Route path="/sales-page/video-delivery" element={<VideoDelivery />} /> */}
        {/* <Route path="/sales-page/sales" element={<Sales />} /> */}
        {/* <Route path="/sales-page/sales-thankyou" element={<SalesThankyou />} /> */}
        <Route path="/sales-page/sales-video-delivery" element={<SalesVideoDelivery />} />

        <Route
          path="/register/user-data"
          element={accessToken ? <Navigate to="/dashboard" /> : <UserDataForm />}
        />
        <Route path="/register/user-plan" element={<UserPricingPlan />} />
        <Route path="/register/user-payment" element={<UserPayment />} />
        <Route
          path="/sign-in"
          element={accessToken ? <Navigate to="/dashboard" /> : <UserSignIn />}
        />

        <Route
          path="/forgot-password"
          element={accessToken ? <Navigate to="/dashboard" /> : <ForgotPassword />}
        />
        {/* <Route
          path="/forgot-password-passcode"
          element={
            accessToken ? (
              <Navigate to="/dashboard" />
            ) : (
              <ForgotPasswordPasscode />
            )
          }
        /> */}
        <Route
          path="/reset-password-confirm"
          element={accessToken ? <Navigate to="/dashboard" /> : <ForgotPasswordChange />}
        />
        <Route
          path="/forgot-password-confirmed"
          element={accessToken ? <Navigate to="/dashboard" /> : <ForgotPasswordConfirmed />}
        />

        <Route
          path="/ingredients-previewer"
          element={accessToken ? <IngredientsPreviewer /> : <UserSignIn />}
        />
        <Route
          path="/ingredients-previewer/:ingredientId"
          element={accessToken ? <IngredientsPreviewer /> : <UserSignIn />}
        />

        <Route
          path="/staff/pages"
          element={accessToken ? <StaffPagesPreviewer /> : <UserSignIn />}
        />
        <Route
          path="/staff/pages/:pageId"
          element={accessToken ? <StaffPagesPreviewer /> : <UserSignIn />}
        />

        <Route path="/metadata-generator" element={<MetadataGenerator />} />

        {/* Below Routes will be the Private Routes */}
        <Route path="/*" element={accessToken ? <DashboardRoutes /> : <UserSignIn />} />
      </Routes>
      <AuthVerify logOut={logOut} />
    </div>
  );
}

export default AppRoutes;
