import React, { useSelector, useDispatch } from 'react-redux';

import TertiaryHeading from 'components/Typography/TertiaryHeading';
import PlanCard from 'components/Layouts/PlanCard';
import Toggle from 'components/Layouts/Toggle';
import { pricingPlanActions } from 'store/pricing-plan';

import dashedLine from 'img/Annotation doodle.svg';
import { COLOR_BLACK, COLOR_LIGHT_ORANGE } from 'constants/Colors';
import styles from './UserPricingPlan.module.scss';

function UserPricingPlan({ bgColor, btnsColor, btnTextColor }) {
  const {
    container,
    cardsAppearance,
    containerYellow,
    toggler__par,
    toggler,
    toggler__info,
    toggler__img
  } = styles;

  const plans = useSelector((state) => state.pricingPlan.plans);
  const isToggled = useSelector((state) => state.pricingPlan.switchToYear);
  const dispatch = useDispatch();
  const onToggle = () => {
    dispatch(pricingPlanActions.changeSelectedPrice());
  };

  return (
    <section
      style={{
        backgroundColor: bgColor || COLOR_LIGHT_ORANGE
      }}
      className={containerYellow}
      id="pricing">
      <section className={container}>
        <TertiaryHeading
          txt="Pricing plans for every"
          difColor={{ txt: 'size', color: '#F8B417' }}
        />
        <div className={toggler}>
          <p className={toggler__par}>
            Choose the option that&apos;s right for you. Cancel your subscription anytime.
          </p>
          <Toggle first="Monthly" second="Yearly" isToggled={isToggled} onToggle={onToggle} />
          <img src={dashedLine} className={toggler__img} alt="dashed line" />
          <p className={toggler__info}>(Save 20%)</p>
        </div>
        <div className={cardsAppearance}>
          {plans.map((p, i) => (
            <PlanCard
              yearly={isToggled}
              btnTextColor={(i < 2 && btnTextColor) || COLOR_BLACK}
              btnsColor={btnsColor}
              key={p.title}
              title={p.title}
              cost={p.selectedCost}
              content={p.content}
              features={p.features}
              appearance={p.appearance}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default UserPricingPlan;
