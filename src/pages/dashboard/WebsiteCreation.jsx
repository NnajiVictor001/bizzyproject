import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductAccordionLayoutGeneric from 'components/Layouts/ProductAccordionLayoutGeneric';
import WebsiteCard from 'components/WebsiteCreation/WebsiteCard';
import OrderFormCard from 'components/WebsiteCreation/OrderFormCard';
import DeliveryPageCard from 'components/WebsiteCreation/DeliveryPageCard';
import PublishAndPromote from 'components/WebsiteCreation/PublishAndPromote';
import Sales from 'pages/customer-sales-pages/Sales';
import ThankYouEdit from 'pages/customer-sales-pages/ThankYouEdit';
import VideoDeliveryEdit from 'pages/customer-sales-pages/VideoDeliveryEdit';
import { LinearProgress } from '@mui/material';

import { webCreationSliceActions } from 'store/web-creation';
import { UserDataSliceActions } from 'store/user-data';

import { useAlert } from 'hooks/alert';
import { useQuery } from 'react-query';
import ApiService from 'helpers/api';
import styles from './WebsiteCreation.module.scss';

function WebsiteCreation(props) {
  const { right__container, main, left, right } = styles;
  const {
    hasSalesPage,
    salesData,
    mockupData,
    pageImages,
    websiteMainData,
    setWebsiteMainData,
    deliveryMainData,
    setDeliveryMainData
  } = props;

  const params = useParams();
  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const { bookId } = params;

  const webCreationData = useSelector((state) => state.webCreation.webCreationData);
  const salesType = useSelector((state) => state.webCreation.salesType);
  const isStripeConnected = useSelector((state) => state.webCreation.isStripeConnected);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const bookType = useSelector((state) => state.productBranding.typeValue);
  const bookName = useSelector((state) => state.productBranding.productName);
  const userBookWording = useSelector((state) => state.productBranding.wordingData);

  const [hasStripeAccount, setHasStripeAccount] = useState(false);
  const [basicThankYou, setBasicThankYou] = useState(
    hasSalesPage ? salesData.delivery_page : 'basic'
  );

  const selectedTab = webCreationData.filter((item) => item.select)?.[0];

  const { isLoading: isStripeLoading } = useQuery(
    `stripe-oauth-${bookId}`,
    () => ApiService.get('/payments/stripe-oauth/connect_account/'),
    {
      onSuccess: () => {
        setHasStripeAccount(true);
        dispatch(UserDataSliceActions.setUserStripeAccount());
      },
      retry: false,
      refetchOnWindowFocus: false
    }
  );

  const handleClickItem = (item) => {
    if (item.id === 3 && salesType.includes('sales') && !isStripeConnected) {
      addAlert('Please connect your Stripe account first', 'error');
    } else {
      dispatch(webCreationSliceActions.toggleWebCreation(item));
      dispatch(webCreationSliceActions.selectActiveWebCreation(item));
    }
  };

  const onClick = (index) => {
    handleClickItem(webCreationData.filter((item) => item.id === index)?.[0]);
  };

  const currentCard = () => {
    switch (selectedTab?.id) {
      case 0:
        return (
          <WebsiteCard
            websiteMainData={websiteMainData}
            setWebsiteMainData={setWebsiteMainData}
            onClick={() => onClick(1)}
            bookType={bookType}
            userBookWording={userBookWording}
          />
        );
      case 1:
        return <OrderFormCard onClick={() => onClick(2)} />;
      case 2:
        return (
          <DeliveryPageCard
            deliveryMainData={deliveryMainData}
            setDeliveryMainData={setDeliveryMainData}
            onClick={() => onClick(3)}
            salesData={salesData}
            hasSalesPage={hasSalesPage}
            basicThankYou={basicThankYou}
            setBasicThankYou={setBasicThankYou}
          />
        );
      case 3:
        return (
          <PublishAndPromote
            websiteMainData={websiteMainData}
            deliveryMainData={deliveryMainData}
            onClick={() => onClick(null)}
          />
        );
      default:
        return (
          <WebsiteCard
            websiteMainData={websiteMainData}
            setWebsiteMainData={setWebsiteMainData}
            onClick={() => onClick(1)}
            bookType={bookType}
            userBookWording={userBookWording}
          />
        );
    }
  };

  let leftContent;
  if (selectedTab?.id === 2) {
    leftContent =
      basicThankYou === 'basic' ? (
        <ThankYouEdit
          deliveryMainData={deliveryMainData}
          setDeliveryMainData={setDeliveryMainData}
          mockupData={mockupData}
          pageImages={pageImages}
          bookName={bookName}
          basicThankYou={basicThankYou}
        />
      ) : (
        <VideoDeliveryEdit
          deliveryMainData={deliveryMainData}
          pageImages={pageImages}
          userBookWording={userBookWording}
        />
      );
  } else {
    leftContent = (
      <Sales
        websiteMainData={websiteMainData}
        setWebsiteMainData={setWebsiteMainData}
        mockupData={mockupData}
        pageImages={pageImages}
        userBookWording={userBookWording}
      />
    );
  }

  return (
    <div className={main}>
      {isStripeLoading ? (
        <LinearProgress color="inherit" />
      ) : (
        <>
          <div
            className={left}
            id="websiteScrollable"
            style={{ fontFamily: `'${selectedFont.name}'` }}>
            {leftContent}
          </div>
          <div className={right}>
            <div className={right__container}>
              <ProductAccordionLayoutGeneric
                data={
                  hasStripeAccount || salesType !== 'sales'
                    ? webCreationData.filter((item) => item.title !== 'Order Form')
                    : webCreationData
                }
                handleClickItem={handleClickItem}
                activeTitle={selectedTab?.title}
                activeComponent={currentCard()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WebsiteCreation;
