import React from 'react';

import WipSaleHeader from 'components/Headers/WipSaleHeader';
import StartSelling from 'components/WipSales/StartSelling';
import YourDigitalSol from 'components/WipSales/YourDigitalSol';
import WonTraffic from 'components/WipSales/WonTraffic';
import HowItWorks from 'components/WipSales/HowItWorks';
import QuoteSection from 'components/WipSales/QuoteSection';
import LoveToBuy from 'components/WipSales/LoveToBuy';
import DigitalProducts from 'components/WipSales/DigitalProducts';
import ConvertingSalesPage from 'components/WipSales/ConvertingSalesPage';
import ActualSales from 'components/WipSales/ActualSales';
import UnlimitedPublishing from 'components/WipSales/UnlimitedPublishing';
import EmailsMarketing from 'components/WipSales/EmailsMarketing';
import Insights from 'components/WipSales/Insights';
import FreeSignup from 'components/WipSales/FreeSignup';
import WhatYouNeed from 'components/WipSales/WhatYouNeed';
import EasyIntegrations from 'components/WipSales/EasyIntegrations';
import PricingPlanSection from 'components/WipSales/PricingPlanSection';
// import UserPricingPlan from "pages/registration/UserPricingPlan";
// import { COLOR_BLACK, COLOR_GRAY_6, COLOR_WHITE } from "constants/Colors";
import SuccessStories from 'components/WipSales/SuccessStories';
import Faq from 'components/WipSales/Faq';
import TrafficIntoSales from 'components/WipSales/TrafficIntoSales';

import WipSalesFooter from 'components/WipSales/WipSalesFooter';
import ChooseYourPlanYearly from 'components/WipSales/ChooseYourPlanYearly';
import styles from './WipSales.module.scss';

function WipSales() {
  const { wipeSales, wipeSales__header } = styles;
  return (
    <div className={wipeSales}>
      <div className={wipeSales__header}>
        <WipSaleHeader />
      </div>
      <YourDigitalSol />
      <StartSelling />
      <WonTraffic />
      <HowItWorks />
      <QuoteSection />
      <LoveToBuy />
      <DigitalProducts />
      <ConvertingSalesPage />
      <ActualSales />
      <UnlimitedPublishing />
      <EmailsMarketing />
      <Insights />
      <FreeSignup />
      <WhatYouNeed />
      <QuoteSection />
      <EasyIntegrations />
      <PricingPlanSection />
      {/* <UserPricingPlan
        btnTextColor={COLOR_WHITE}
        btnsColor={COLOR_BLACK}
        bgColor={COLOR_GRAY_6}
      /> */}
      <ChooseYourPlanYearly
        title1="Founder"
        title2="introductory price"
        subTitle="Get locked in at the lowest founder pricing rates. Cancel your subscription  anytime."
        cost="$243"
        content="This is our top-level commercial account, intended for the big businesses with enterprise-level  needs. This is our founding member rate.  Only 300 companies will be accepted as founders."
        btnTitle="Get Started"
        pay
      />
      {/* <ChooseYourPlanYearly
        title1="Get onto"
        title2="our waitlist"
        subTitle="We will open our doors to the whole world soon!  Get on our waitlist and we will let you know when doors open"
        cost="COMING SOON"
        content="We send out invites to businesses to join us regularly!  Get onto our list and then stay peeled to your inbox for your invitation to be one of our founding members!"
        btnTitle="Add me to the waitlist, please."
        pay={false}
      /> */}
      <SuccessStories />
      <Faq />
      <TrafficIntoSales />
      <WipSalesFooter />
    </div>
  );
}

export default WipSales;
