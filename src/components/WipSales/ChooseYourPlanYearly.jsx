import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TertiaryHeading from 'components/Typography/TertiaryHeading';
import dashedLine from 'img/Annotation doodle.svg';
// import Toggle from "components/Layouts/Toggle";
import { pricingPlanActions } from 'store/pricing-plan';
import NavButton from 'components/Buttons/NavButton';
import checkMark from 'img/checkMark.svg';
import styles from './ChooseYourPlanYearly.module.scss';

const features = [
  'Design Your Project',
  'Access to over 100 PDF Batches',
  'Fully Editable Templates',
  'All Products Branded to YOU!!',
  'Unlimited Commercial Resell Rights',
  'Hosting of Your Product Website',
  'Full Library with 100+ Pages',
  '5 Sales Pages Written For You',
  'Brand Kit for Social Promotion'
];

function ChooseYourPlanYearly(props) {
  const {
    main,
    container,
    toggler__par,
    toggler,
    toggler__info,
    toggler__img,
    plan,
    plan__title,
    plan__cost,
    plan__cost__price,
    plan__cost__time,
    plan__content,
    plan__features,
    plan__feature,
    plan__feature__title,
    plan__btn_container,
    plan__btn
  } = styles;

  const { title1, title2, subTitle, cost, content, btnTitle, pay } = props;

  const navigate = useNavigate();
  // const isToggled = useSelector((state) => state.pricingPlan.switchToYear);
  const dispatch = useDispatch();
  // const onToggle = () => {
  //   dispatch(pricingPlanActions.changeSelectedPrice());
  // };

  const continueToPayment = () => {
    if (pay) {
      dispatch(pricingPlanActions.changeSelectedPrice());
      dispatch(pricingPlanActions.select('Business'));
      dispatch(pricingPlanActions.selectPlan());

      navigate('/register/user-data');
    } else {
      console.log(1);
      // go to infusion form here
    }
  };

  return (
    <section className={main} id="pricing">
      <section className={container}>
        <TertiaryHeading txt={title1} difColor={{ txt: title2, color: '#F8B417' }} />
        <div className={toggler}>
          <p className={toggler__par}>{subTitle}</p>
          {/* <Toggle
            first="Monthly"
            second="Yearly"
            isToggled={isToggled}
            onToggle={onToggle}
          /> */}
          <img src={dashedLine} className={toggler__img} alt="dashed line" />
          <p className={toggler__info}>As a Founder Save 57%</p>
        </div>
        <div className={plan}>
          <h1 className={plan__title}>Enterprise Business Account</h1>
          <h2 className={plan__cost}>
            <span className={plan__cost__price}>{`${cost}`}</span>
            <span className={plan__cost__time}>/year</span>
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
          <div className={plan__btn_container}>
            <NavButton
              className={plan__btn}
              type="button"
              bgColor="#FFC800"
              txt={btnTitle}
              onClick={continueToPayment}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default ChooseYourPlanYearly;
