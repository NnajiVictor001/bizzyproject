import React from 'react';
import UserDataForm from 'pages/registration/UserDataForm';
import UserPayment from 'pages/registration/UserPayment';
import UserPricingPlan from 'pages/registration/UserPricingPlan';
import UserSignIn from 'pages/registration/UserSignIn';

const registrationRoutes = [
  {
    path: '/register/user-data',
    key: '/register/user-data',
    element: <UserDataForm />
  },
  {
    path: '/register/user-plan',
    key: '/register/user-plan',
    element: <UserPricingPlan />
  },
  {
    path: '/register/user-payment',
    key: '/register/user-payment',
    element: <UserPayment />
  },
  {
    path: '/sign-in',
    key: '/sign-in',
    element: <UserSignIn />
  }
];

export default registrationRoutes;
