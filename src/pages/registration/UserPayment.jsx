import React, { useSelector } from 'react-redux';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import RegistrationHeading from 'components/Layouts/RegistrationHeading';
import SelectedPlan from 'components/Layouts/SelectedPlan';
import SelectedPlanPayment from 'components/Forms/SelectedPlanPayment';

import styles from './UserPayment.module.scss';

function UserPayment() {
  const { container, insideContainer } = styles;

  const plan = useSelector((state) => state.pricingPlan.plan);

  const publicKey = useSelector((state) => state.payment.publicKey);
  const secretKey = useSelector((state) => state.payment.secretKey);
  const stripePromise = loadStripe(`${publicKey}`);
  const options = {
    clientSecret: secretKey
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className={container}>
        <div className={insideContainer}>
          <RegistrationHeading parContent="We can't wait to create your product AND promotion assets for you!!" />
          <SelectedPlan
            introductory
            title={plan.title}
            cost={plan.selectedCost}
            desc={plan.content}
          />
          <SelectedPlanPayment />
        </div>
      </div>
    </Elements>
  );
}

export default UserPayment;
