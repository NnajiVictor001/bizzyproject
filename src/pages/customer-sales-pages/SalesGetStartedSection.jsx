import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiCall } from 'helpers/api-config';
import { webCreationSliceActions } from 'store/web-creation';
import { useAlert } from 'hooks/alert';
import LeadMagGetStartedCard from './LeadMagGetStartedCard';
import LeadMagGetStartedText from './LeadMagGetStartedText';
import SalesSecondPhaseForm from './SalesSecondPhaseForm';
import SalesFirstPhaseForm from './SalesFirstPhaseForm';
import log from '../../helpers/log';

import styles from './SalesGetStartedSection.module.scss';
import stylesFull from './SalesGetStartedSectionFull.module.scss';

function SalesGetStartedSection(props) {
  const {
    web,
    websiteMainData,
    color,
    webHeading,
    webSubHeading,
    webButton,
    webButtonColor,
    bookName,
    webBaseColor
  } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__header, main__header__right_con } = stylesToUse;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const [firstPhase, setFirstPhase] = useState(false);
  const [secondPhase, _setSecondPhase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSecond, setIsLoadingSecond] = useState(false);
  const [options, setOptions] = useState('');
  const [uuid, setUuid] = useState('');

  const accessToken = localStorage.getItem('token');
  const subDomain = useSelector((state) => state.webCreation.subDomain);
  const pk = useSelector((state) => state.payment.salesPagePublicKey);
  const account = useSelector((state) => state.payment.salesPageStripeAccount);
  const salesType = useSelector((state) => state.webCreation.salesType);

  const stripePromise =
    web && salesType === 'sales' ? loadStripe(pk, { stripeAccount: account }) : null;

  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  const customerData = useSelector((state) => state.webCreation.customerData);

  const handleFirstPhase = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);

      const res = await apiCall('post', `/sales/page/${subDomain}/order/`, accessToken, data);
      const sk = res.data.client_secret;
      setOptions({ clientSecret: sk });
      const id = String(res.data.book_order.uuid);
      setUuid(id);

      if (salesType === 'lead_magnet' && res.data.book_order.status === 'delivered') {
        const response = await apiCall(
          'get',
          `/sales/page/${subDomain}/delivery/${id}/`,
          accessToken
        );

        dispatch(webCreationSliceActions.setDownloadUrl(response.data.file_url));
        setIsLoadingSecond(false);
        navigate(`/page/${subDomain}/thankyou`);
        setFirstPhase(false);
      }

      setIsLoading(false);
      setFirstPhase(true);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.field_errors?.[0]?.message) {
        addAlert(error.response?.data?.field_errors?.[0]?.message, 'error');
      } else if (error.response?.data?.errors?.[0]?.message) {
        addAlert(error.response?.data?.errors?.[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoading(false);
    }
  };

  const handleSecondPhase = async () => {
    try {
      setIsLoadingSecond(true);

      const checkDeliveryStatus = setInterval(async () => {
        const status = await apiCall('get', `/sales/page/${subDomain}/status/`, accessToken, null, {
          email: customerData.email,
          uuid,
          sub_domain: subDomain
        });
        if (status.data.status === 'delivered') {
          clearInterval(checkDeliveryStatus);
          const response = await apiCall(
            'get',
            `/sales/page/${subDomain}/delivery/${uuid}/`,
            accessToken
          );

          dispatch(webCreationSliceActions.setDownloadUrl(response.data.file_url));
          setIsLoadingSecond(false);
          navigate(`/page/${subDomain}/thankyou`);
          setFirstPhase(false);
        }
      }, 2000);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else if (error.response?.data?.field_errors?.[0]?.message) {
        addAlert(error.response?.data?.field_errors?.[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingSecond(false);
    }
  };

  const salesHeader = 'Easy Payment';
  const leadHeader = '10 Second Sign Up';
  const salesContent = 'Online, fast, safe and secure payments';
  const leadContent = 'Your files will be sent your way in seconds!';

  const header = salesType === 'sales' ? salesHeader : leadHeader;
  const content = salesType === 'sales' ? salesContent : leadContent;

  return (
    <div className={main} style={{ backgroundColor: web ? color : websiteColor }}>
      <div className={main__header}>
        <LeadMagGetStartedText
          websiteMainData={websiteMainData}
          web={web}
          webHeading={webHeading}
          webSubHeading={webSubHeading}
          webBaseColor={webBaseColor}
        />
        <div className={main__header__right_con}>
          <LeadMagGetStartedCard
            web={web}
            webBaseColor={webBaseColor}
            icon="iconspace_Bill"
            title={header}
            content={content}
          />
          <LeadMagGetStartedCard
            web={web}
            webBaseColor={webBaseColor}
            icon="iconspace_Select"
            title="Instant Download"
            content="Get your files in a snap. Simply download."
          />
          <LeadMagGetStartedCard
            web={web}
            webBaseColor={webBaseColor}
            icon="iconspace_Board"
            title="Get Started"
            content="Say goodbye to feeling frantic and stressed!"
          />
        </div>
      </div>
      {!firstPhase && (
        <SalesFirstPhaseForm
          websiteMainData={websiteMainData}
          callback={handleFirstPhase}
          web={web}
          bookName={bookName}
          buttonTxt={webButton}
          webButtonColor={webButtonColor}
          isLoading={isLoading}
          webBaseColor={webBaseColor}
        />
      )}
      {firstPhase && !secondPhase && stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <SalesSecondPhaseForm
            callback={handleSecondPhase}
            web={web}
            webButtonColor={webButtonColor}
            isLoadingSecond={isLoadingSecond}
          />
        </Elements>
      ) : (
        ''
      )}
    </div>
  );
}

export default SalesGetStartedSection;
