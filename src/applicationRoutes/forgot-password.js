import React from 'react';
import ForgotPassword from 'pages/registration/ForgotPassword';
import ForgotPasswordChange from 'pages/registration/ForgotPasswordChange';
import ForgotPasswordConfirmed from 'pages/registration/ForgotPasswordConfirmed';
// import ForgotPasswordPasscode from 'pages/registration/ForgotPasswordPasscode';

const forgotPasswordRoutes = [
  {
    path: '/forgot-password',
    key: '/forgot-password',
    element: <ForgotPassword />
  },
  // {
  //   path: "/forgot-password-passcode",
  //   key: "/forgot-password-passcode",
  //   element: <ForgotPasswordPasscode />,
  // },
  {
    path: '/reset-password-confirm',
    key: '/reset-password-confirm',
    element: <ForgotPasswordChange />
  },
  {
    path: '/forgot-password-confirmed',
    key: '/forgot-password-confirmed',
    element: <ForgotPasswordConfirmed />
  }
];

export default forgotPasswordRoutes;
