import React from 'react';
import { saleNichesTopicsSliceActions } from 'store/sale-niche-topic';
import { useDispatch, useSelector } from 'react-redux';

import accordionCheckedMark from 'img/accordion_checked.svg';
import accordionUncheckedMark from 'img/accordion_unchecked.svg';

import InputCheckbox from 'components/InputFields/InputCheckbox';
import styles from './SaleAccordion.module.scss';

function SaleAccordion(props) {
  const {
    accordion,
    accordion__title,
    accordion__content,
    inactiveBackground,
    activeBackground,
    accordion__checkbox
  } = styles;

  const { niche } = props;
  const numberOfSelectedSubNiches = useSelector(
    (state) => state.saleNichesTopics.numberOfSelectedSubNiches
  );
  const dispatch = useDispatch();

  const nicheHandler = () => {
    dispatch(saleNichesTopicsSliceActions.changeNiches(niche));
  };

  const topicToggleHandler = (subNiche) => {
    dispatch(saleNichesTopicsSliceActions.toggleSubNiches({ niche, subNiche }));
  };

  return (
    <div
      className={
        niche.active ? `${accordion} ${activeBackground}` : `${accordion} ${inactiveBackground}`
      }>
      <div className={accordion__title} onClick={nicheHandler}>
        {niche.active ? (
          <img src={accordionCheckedMark} alt="accordion check mark" />
        ) : (
          <img src={accordionUncheckedMark} alt="accordion uncheck mark" />
        )}
        <p>{niche.title}</p>
      </div>
      {niche.active && (
        <div className={accordion__content}>
          {niche.subNiches.map((item, index) => (
            <div className={accordion__checkbox} key={index}>
              <InputCheckbox
                id={`${item.title}${item.id}`}
                checked={item.selected}
                onChange={() => topicToggleHandler(item)}
                label={item.title}
                disabled={numberOfSelectedSubNiches === 3 && !item.selected}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SaleAccordion;
