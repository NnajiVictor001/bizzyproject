import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavButton from 'components/Buttons/NavButton';
import { pricingPlanActions } from 'store/pricing-plan';
import checkMark from 'img/checkMark.svg';
import {
  COLOR_BLACK,
  COLOR_LIGHT_ORANGE,
  COLOR_ORANGE,
  COLOR_WHITE,
  COLOR_YELLOW
} from 'constants/Colors';
import styles from './PlanCard.module.scss';

function PlanCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    plan,
    plan__title,
    plan__cost,
    plan__cost__price,
    plan__cost__time,
    plan__content,
    plan__features,
    plan__feature,
    plan__feature__title,
    plan__btn
  } = styles;
  const { title, cost, content, features, appearance, btnsColor, btnTextColor, yearly } = props;

  let titleColor;
  let backColor;
  let contentColor;
  let btnColor = btnsColor || COLOR_ORANGE;
  if (appearance) {
    backColor = COLOR_BLACK;
    titleColor = COLOR_YELLOW;
    contentColor = COLOR_WHITE;
    btnColor = COLOR_LIGHT_ORANGE;
  }
  const isUserDataFilled = useSelector((state) => state.pricingPlan.filledUserData);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem('token');

  const continueToPayment = () => {
    dispatch(pricingPlanActions.select(title));
    dispatch(pricingPlanActions.selectPlan());

    if (!isUserDataFilled) {
      navigate('/register/user-data');
    } else if (title !== 'Free') {
      navigate('/register/user-payment');
    } else if (isLoggedIn || token) {
      navigate('/dashboard');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className={plan} style={{ backgroundColor: backColor, color: contentColor }}>
      <h1 className={plan__title} style={{ color: titleColor }}>
        {title}
      </h1>
      <h2 className={plan__cost}>
        <span className={plan__cost__price} style={{ color: contentColor }}>
          {`$${cost}`}
        </span>
        <span className={plan__cost__time}>{yearly ? '/ye' : '/mo'}</span>
      </h2>
      <p className={plan__content}>{content}</p>
      <ul className={plan__features}>
        {features.map((feat, i) => (
          <div className={plan__feature} key={i}>
            <img src={checkMark} alt="check mark" />
            <li className={plan__feature__title}>{feat}</li>
          </div>
        ))}
      </ul>
      <NavButton
        color={btnTextColor}
        className={plan__btn}
        type="button"
        bgColor={btnColor}
        txt="Get Started"
        onClick={continueToPayment}
      />
    </div>
  );
}

export default PlanCard;
