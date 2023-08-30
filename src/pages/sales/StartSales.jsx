import React from 'react';
import { useNavigate } from 'react-router-dom';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import SaleCard from 'components/Layouts/SaleCard';

import checkMarkWhite from 'img/checkMark_white.svg';
import cardDefault from 'img/card_default.png';
import styles from './StartSales.module.scss';

function StartSales() {
  const navigate = useNavigate();
  const { container, cardsAppearance, bottomContainer, bottomBtnCon } = styles;

  const saleFormHandler = () => {
    // console.log("data===>", data)
  };

  const navigateToWebsiteCreation = () => {
    // here should navigate to website creation with the last created product data
    navigate('/dashboard/website-creation');
  };

  const submitForm = (evt) => {
    evt.preventDefault();
  };

  // cardDefault should be the last created product.

  return (
    <div className={container}>
      <QuaternaryHeading txt="Let’s Start Your Sales Page" />
      <form onSubmit={submitForm}>
        <div className={cardsAppearance}>
          <SaleCard
            type="1"
            title="Your Product"
            content="Are you creating the sales page for this product?"
            saleFormHandler={saleFormHandler}
            product={cardDefault}
          />
          <SaleCard
            type="2"
            title="Your Topic"
            content="Will this be the topic for your sales page? We will use these to generate your initial copy"
            saleFormHandler={saleFormHandler}
            productTitle="Home Cleaning Toolkit"
            productTopic="Organization, Goal Settings..."
          />
        </div>
        <div className={bottomContainer}>
          <button type="button" onClick={navigateToWebsiteCreation}>
            <div className={bottomBtnCon}>
              <img src={checkMarkWhite} alt="check mark" />
              <p>YES to ALL!</p>
            </div>
          </button>
          <p>You’ll be able to make edits on the next screen.</p>
        </div>
      </form>
    </div>
  );
}

export default StartSales;
