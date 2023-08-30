import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from 'components/Layouts/Toggle';
import LooksGoodButton from 'components/Buttons/LooksGoodButton';

import { looksGoodWebsiteCreationActions } from 'helpers/looksGoodWebsiteCreationActions';
import { webCreationSliceActions } from 'store/web-creation';
import { productTypeSliceActions } from 'store/product-type';

import { useStripeHook } from 'hooks/stripe';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import styles from './WebsiteCard.module.scss';
import WebsiteNotToggledContent from './WebsiteNotToggledContent';

function WebsiteCard(props) {
  const {
    card,
    card__toggle,
    card__slider,
    card__nextContainer,
    card__nextTxtContainer,
    card__content,
    card__toggleCont
  } = styles;

  const { websiteMainData, setWebsiteMainData, bookType } = props;

  const dispatch = useDispatch();
  const { updateSpButtonPrice } = useWebsiteCreation();
  const { checkStripeConnection } = useStripeHook();

  const salesType = useSelector((state) => state.webCreation.salesType);
  const hasStripeAccount = useSelector((state) => state.userData.userHasStripeAccount);

  const [isToggled, setIsToggled] = useState(salesType !== 'sales');

  useEffect(() => {
    const stripeConn = async () => {
      const response = await checkStripeConnection();

      if (response.status === 200) {
        dispatch(webCreationSliceActions.setIsStripeConnected(true));
      }
    };
    stripeConn();
  }, []);

  const onToggle = () => {
    let updatedSpButton = '';

    setIsToggled(!isToggled);
    if (!isToggled) {
      dispatch(productTypeSliceActions.changeProductPrice(''));
      dispatch(webCreationSliceActions.setSalesType('lead_magnet'));
      updatedSpButton = updateSpButtonPrice(websiteMainData?.sp_button?.val, '', 'lead_magnet');
    } else {
      dispatch(productTypeSliceActions.changeProductPrice(7.99));
      dispatch(webCreationSliceActions.setSalesType('sales'));
      updatedSpButton = updateSpButtonPrice(websiteMainData?.sp_button?.val, 7.99, 'sales');
    }

    setWebsiteMainData((prev) => ({
      ...prev,
      sp_button: {
        ...prev.sp_button,
        val: updatedSpButton
      }
    }));
  };

  const handleCheck = () => {
    const nextWebCreationItemId = {
      id: hasStripeAccount || salesType !== 'sales' ? 2 : 1
    };
    looksGoodWebsiteCreationActions(nextWebCreationItemId);
  };

  return (
    <div className={card}>
      <div className={card__content}>
        <div className={card__toggleCont}>
          <Toggle
            first="Sales Page"
            second="Lead Magnet Page"
            isToggled={isToggled}
            onToggle={onToggle}
            className={card__toggle}
            sliderClass={card__slider}
          />
        </div>
        <WebsiteNotToggledContent
          websiteMainData={websiteMainData}
          setWebsiteMainData={setWebsiteMainData}
          lead={isToggled}
          bookType={bookType}
        />
      </div>
      <div className={card__nextContainer}>
        <div className={card__nextTxtContainer}>
          <LooksGoodButton handleCheck={handleCheck} />
        </div>
      </div>
    </div>
  );
}

export default WebsiteCard;
