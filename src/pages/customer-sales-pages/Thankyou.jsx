import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import CustomHeading from 'components/Typography/CustomHeading';
import { CircularProgress } from '@mui/material';
import ApiService from 'helpers/api';
import { useQuery } from 'react-query';
import { useAlert } from 'hooks/alert';
import LeadMagFooterSection from './LeadMagFooterSection';
import ThankyouBottomButton from './ThankyouBottomButton';
import ThankyouHeadingSubheading from './ThankyouHeadingSubheading';
import ThankyouImagesWithText from './ThankyouImagesWithText';
import ThankyouInstantlyDownloadSection from './ThankyouInstantlyDownloadSection';
import ThankyouStackedImagesSection from './ThankyouStackedImagesSection';
import SalesThankyouOrderReceipt from './SalesThankyouOrderReceipt';
import VideoDeliveryHeadingSubheading from './VideoDeliveryHeadingSubheading';
import VideoDeliveryStep2Section from './VideoDeliveryStep2Section';
import VideoDeliveryBottomSection from './VideoDeliveryBottomSection';

import log from '../../helpers/log';

import styles from './Thankyou.module.scss';

function Thankyou() {
  const { main, main__order, main__images, flex } = styles;

  const params = useParams();
  const { addAlert } = useAlert();
  const { subDomain } = params;

  const [data, setData] = useState('');

  const onError = (error) => {
    if (error.message === 'Network Error') {
      log.error(JSON.stringify(error));
      addAlert('Connectivity error. Please try again', 'error');
    } else if (error.response?.data?.errors[0]?.message) {
      addAlert(error.response?.data?.errors[0]?.message, 'error');
    } else {
      log.error(JSON.stringify(error));
      addAlert('Something went wrong. Please try again', 'error');
    }
  };

  const { isLoading: isSubdomainLoading, data: subDomainData } = useQuery(
    `sales-subdomain-${subDomain}`,
    () => ApiService.get(`/sales/page/${subDomain}/home/`),
    {
      onSuccess: (res) => setData(res.data),
      onError: (error) => onError(error),
      refetchOnWindowFocus: false
    }
  );
  const { isLoading: isFontLoading, data: fontData } = useQuery(
    `thank-you-font-${subDomainData?.data?.font}`,
    () => ApiService.get(`/bizzy/fonts/${subDomainData.data.font}/`),
    {
      enabled: !isSubdomainLoading,
      onError: (error) => onError(error),
      refetchOnWindowFocus: false
    }
  );

  const deliveryData = useMemo(() => {
    if (subDomainData?.data?.delivery_page_data) {
      return subDomainData?.data?.delivery_page_data;
    }
    return {};
  }, [subDomainData]);

  const websiteColor = useMemo(() => {
    if (subDomainData?.data?.page_data?.website_color) {
      return subDomainData.data?.page_data?.website_color;
    }
    return '#000000';
  }, [subDomainData]);

  const websiteBaseColor = useMemo(() => {
    if (subDomainData?.data?.page_data?.base_color) {
      return subDomainData.data?.page_data?.base_color;
    }
    return {};
  }, [subDomainData]);

  if (isSubdomainLoading || isFontLoading) {
    return (
      <div className={flex}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div>
      <div className={main} style={{ fontFamily: fontData.data.name }}>
        <CustomHeading thankYou deliveryMainData={deliveryData} />
        {data.type === 'sales' ? (
          <div className={main__order}>
            <SalesThankyouOrderReceipt
              bookName={data.book_name}
              bookPrice={data.price}
              websiteColor={websiteColor}
              webBaseColor={websiteBaseColor}
            />
          </div>
        ) : null}
        {data.delivery_page === 'basic' ? (
          <div className={main__images}>
            <ThankyouImagesWithText
              deliveryMainData={deliveryData}
              mockupData={{
                mockupId: data.mockup.id,
                mockupImage: data.mockup.file,
                coverImage: data.cover_thumbnail
              }}
              imagePosition={data.type === 'sales' ? 'right' : 'left'}
              webBaseColor={websiteBaseColor}
            />
          </div>
        ) : (
          <VideoDeliveryHeadingSubheading
            deliveryMainData={data.delivery_page_data}
            webBaseColor={websiteBaseColor}
            customWithout={deliveryData?.tx_sidebar_subheading?.val}
            thankYouWithoutColor={deliveryData?.tx_sidebar_subheading?.color}
            customParagraph={deliveryData?.tx_sidebar_textbox?.val}
            customNiche4={deliveryData?.tx_sidebar_shortblurp?.val}
          />
        )}
        <ThankyouStackedImagesSection
          containerStyle={{ marginTop: '50px', marginLeft: '30px' }}
          pageImages={data.pages_thumbnails}
        />
      </div>
      <div style={{ fontFamily: fontData?.data?.name }}>
        <ThankyouInstantlyDownloadSection
          deliveryMainData={deliveryData}
          bookName={data.book_name}
          websiteColor={websiteColor}
        />
        {data.delivery_page === 'basic' ? (
          <ThankyouHeadingSubheading
            deliveryMainData={deliveryData}
            webBaseColor={websiteBaseColor}
          />
        ) : deliveryData?.videoYoutubeUrl1 ? (
          <VideoDeliveryStep2Section
            webBaseColor={websiteBaseColor}
            web
            deliveryMainData={deliveryData}
          />
        ) : null}
        {data.delivery_page === 'basic' ? (
          <ThankyouBottomButton
            deliveryMainData={deliveryData}
            salesType={data.type}
            webBaseColor={websiteBaseColor}
            websiteColor={websiteColor}
          />
        ) : (
          <VideoDeliveryBottomSection
            deliveryMainData={deliveryData}
            webBaseColor={websiteBaseColor}
            websiteColor={websiteColor}
          />
        )}
        <LeadMagFooterSection webBaseColor={websiteBaseColor} />
      </div>
    </div>
  );
}

export default Thankyou;
