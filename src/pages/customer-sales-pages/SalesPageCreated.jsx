import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { paymentSliceActions } from 'store/payment';
import { webCreationSliceActions } from 'store/web-creation';
import { productBrandingSliceActions } from 'store/product-branding';
import { useQuery } from 'react-query';
import ApiService from 'helpers/api';
import NotFound from 'components/NotFound/NotFound';
import styles from './SalesPageCreated.module.scss';
import LeadMagContent from './LeadMagContent';
import SalesPageContent from './SalesPageContent';

function SalesPageCreated(props) {
  const { subdomain } = props;
  const { flex } = styles;

  const params = useParams();
  const dispatch = useDispatch();

  const subDomain = subdomain || params.subDomain;
  dispatch(webCreationSliceActions.setSubDomain(subDomain));

  const onSalesSuccess = (data) => {
    dispatch(productBrandingSliceActions.setSelectedBaseWebsiteColor(data?.page_data?.base_color));
    dispatch(productBrandingSliceActions.setSelectedWebsiteColor(data?.page_data?.website_color));
    dispatch(productBrandingSliceActions.setProductName(data.book_name));
    dispatch(webCreationSliceActions.setSalesType(data.type));
  };

  const onStripeSuccess = (data) => {
    dispatch(paymentSliceActions.setSalesPagePublicKey(data.public_key));
    dispatch(paymentSliceActions.setSalesPageStripeAccount(data.account));
  };

  const onWordingSuccess = (data) => {
    dispatch(webCreationSliceActions.setBatchWordings(data.batches_wording));
  };

  const {
    isLoading: isSalesLoading,
    data: salesData,
    isError: isSalesError
  } = useQuery('web-sales', () => ApiService.get(`/sales/page/${subDomain}/home/`), {
    onSuccess: (response) => onSalesSuccess(response.data),
    refetchOnWindowFocus: false,
    retry: false
  });
  const { isLoading: isFontLoading, data: fontData } = useQuery(
    'web-font',
    () => ApiService.get(`/bizzy/fonts/${salesData.data.font}/`),
    { enabled: !isSalesLoading && !isSalesError, refetchOnWindowFocus: false }
  );
  const { isLoading: isStripeLoading } = useQuery(
    'stripe-config',
    () => ApiService.get(`/sales/page/${subDomain}/stripe-config/`),
    {
      onSuccess: (response) => onStripeSuccess(response.data),
      enabled: !isSalesLoading && !isSalesError && salesData?.data?.type === 'sales',
      refetchOnWindowFocus: false
    }
  );
  const { isLoading: isWordingLoading } = useQuery(
    'book-wordings',
    () => ApiService.get(`/sales/page/${subDomain}/wording/`),
    {
      enabled: !isSalesLoading && !isSalesError,
      refetchOnWindowFocus: false,
      onSuccess: (response) => onWordingSuccess(response.data)
    }
  );

  if (isSalesLoading || isFontLoading || isStripeLoading || isWordingLoading) {
    return (
      <div className={flex}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (isSalesError) {
    return <NotFound />;
  }

  return (
    <div
      style={{
        fontFamily: fontData?.data?.name
      }}>
      {salesData.data.type === 'sales' ? (
        <SalesPageContent data={salesData.data} />
      ) : (
        <LeadMagContent data={salesData.data} />
      )}
    </div>
  );
}

export default SalesPageCreated;
