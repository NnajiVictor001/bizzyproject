import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DomainSection from 'components/PublishAndPromote/DomainSection';
import PublishSection from 'components/PublishAndPromote/PublishSection';

import { CircularProgress } from '@mui/material';
import ApiService from 'helpers/api';

import funnel1 from 'img/funnel1.png';
import funnel2 from 'img/funnel2.png';
import funnel3 from 'img/funnel3.png';
import leadBg from 'img/lead_bg.jpg';
import slugify from 'slugify';
import { useAlert } from 'hooks/alert';
import { webCreationSliceActions } from 'store/web-creation';
import styles from './PublishAndPromote.module.scss';
import log from '../../helpers/log';

function PublishAndPromote({ websiteMainData, deliveryMainData }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const { bookId } = params;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );
  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);
  const hasSalesPage = useSelector((state) => state.webCreation.hasSalesPage);

  const hasSalesPageId = useSelector((state) => state.webCreation.hasSalesPageId);
  const thankYouType = useSelector((state) => state.webCreation.thankYouType);
  const salesType = useSelector((state) => state.webCreation.salesType);
  const aboutImage = useSelector((state) => state.productType.aboutImage);
  const newAboutImage = useSelector((state) => state.productType.newAboutImage);
  const newAboutImageFile = useSelector((state) => state.productType.newAboutImageFile);
  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const bookPrice = useSelector((state) => state.productType.productPrice);
  const subDomain = useSelector((state) => state.webCreation.subDomain);

  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onFirstClick = async () => {
    if (salesType === 'sales') {
      try {
        setIsLoading(true);
        await ApiService.get('/payments/stripe-oauth/connect_account/');
      } catch (error) {
        setIsLoading(false);
        addAlert('You should create your stripe account first', 'warning');
        return;
      }
    }

    try {
      setIsLoading(true);
      const payload = {
        type: salesType,
        price: salesType === 'sales' ? Number(bookPrice) || 0 : 0,
        color_palette: defaultPalette,
        delivery_page: thankYouType,
        page_data: {
          ...websiteMainData,
          base_color: selectedBaseWebsiteColor,
          website_color: websiteColor
        },
        delivery_page_data: {
          ...deliveryMainData,
          image_about_photo: leadBg,
          base_color: selectedBaseWebsiteColor,
          website_color: websiteColor
        },
        sub_domain: slugify(subDomain, { lower: true }),
        book: +bookId
      };

      if (hasSalesPage) {
        await ApiService.put(`/sales/sales-page/${hasSalesPageId}/`, payload);
        if (newAboutImageFile && aboutImage !== newAboutImage) {
          const formData = new FormData();
          formData.append('type', 'about_me_1');
          formData.append('file', newAboutImageFile);
          await ApiService.post(`/sales/sales-page/${hasSalesPageId}/media/`, formData);
        }
      } else {
        const response = await ApiService.post('/sales/sales-page/', payload);
        dispatch(webCreationSliceActions.setHasSalesPage());
        dispatch(webCreationSliceActions.setHasSalesPageId(response.data.id));
        if (newAboutImageFile && aboutImage !== newAboutImage) {
          const formData = new FormData();
          formData.append('type', 'about_me_1');
          formData.append('file', newAboutImageFile);
          await ApiService.post(`/sales/sales-page/${response.data.id}/media/`, formData);
        }
      }

      setStatus(false);
      setIsLoading(false);
    } catch (error) {
      setStatus(true);
      setIsLoading(false);
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else {
        const fieldErrors = error.response?.data?.field_errors;
        if (fieldErrors.length > 1) {
          const fieldsUnique = fieldErrors
            .filter((d) => d.code === 'unique')
            .map((d) => d.field)
            .join(', ');
          const fieldsRequired = fieldErrors
            .filter((d) => d.code === 'required')
            .map((d) => d.field)
            .join(', ');
          if (fieldsUnique.length > 0) {
            addAlert(`Field(s) ${fieldsUnique} should be unique`, 'error');
          }
          if (fieldsRequired.length > 0) {
            addAlert(`Field(s) ${fieldsRequired} are required`, 'error');
          }
        }
        if (fieldErrors.length === 1) {
          const { message } = fieldErrors[0];
          const { field } = fieldErrors[0];
          addAlert(`${message} (${field})`, 'error');
        }
      }
    }
  };
  const funnels = [
    {
      img: funnel1,
      onClick: '',
      alt: 'Click funnels'
    },
    {
      img: funnel2,
      onClick: '',
      alt: 'Small Cart'
    },
    {
      img: funnel3,
      onClick: '',
      alt: 'Lead Pages'
    }
  ];
  const { main } = styles;

  const publishSection = isLoading ? (
    <CircularProgress color="inherit" />
  ) : (
    <PublishSection subDomain={subDomain} />
  );

  return (
    <div className={main}>
      {status ? (
        <DomainSection onFirstClick={onFirstClick} funnels={funnels} isLoading={isLoading} />
      ) : (
        publishSection
      )}
    </div>
  );
}

export default PublishAndPromote;
