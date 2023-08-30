import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import WebsiteCreation from 'pages/dashboard/WebsiteCreation';

import { LinearProgress } from '@mui/material';
import { webCreationSliceActions } from 'store/web-creation';
import { productTypeSliceActions } from 'store/product-type';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import { useQuery } from 'react-query';
import ApiService from 'helpers/api';
import { useAlert } from 'hooks/alert';

function WebsiteCreationPre() {
  const params = useParams();
  const { bookId } = params;
  const { addAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(true);
  const [salesData, setSalesData] = useState('');
  const [hasSalesPage, setHasSalesPage] = useState(false);
  const [mockupData, setMockupData] = useState({});
  const [pageImages, setPageImages] = useState([]);
  const [websiteMainData, setWebsiteMainData] = useState({});
  const [deliveryMainData, setDeliveryMainData] = useState({});

  const dispatch = useDispatch();
  const { defaultWebsiteValues } = useWebsiteCreation();

  const onBooksSuccess = async (data) => {
    setMockupData({
      mockupId: data.mockup.id,
      mockupImage: data.mockup.file,
      coverImage: data.cover_image_preview
    });
    try {
      const webData = await defaultWebsiteValues(bookId, !!data.sales_page);
      if (!data.sale_page) {
        setWebsiteMainData(webData.website);
        setDeliveryMainData(webData.delivery);
      }
    } catch {
      addAlert('Something went wrong. Please try again', 'error');
    }
    setIsLoading(false);
    setPageImages(data.pages.map((x) => x.image_preview));
    if (data.sale_page) {
      dispatch(webCreationSliceActions.setHasSalesPageId(data.sale_page));
    } else {
      dispatch(webCreationSliceActions.setSubDomain('your-domain'));
    }
    if (data.book_file) {
      dispatch(webCreationSliceActions.setDownloadUrl(data.book_file.file));
    } else {
      addAlert('Please Publish your Book First...', 'warning');
    }
  };

  const onBooksMediaSuccess = (data) => {
    if (data.length > 0) {
      dispatch(productTypeSliceActions.setBookMediaImage(data[0].file));
    }
  };

  const onSalesPageSuccess = (data) => {
    setSalesData(data);
    setHasSalesPage(true);
    setWebsiteMainData(data.page_data);
    setDeliveryMainData(data.delivery_page_data);
    dispatch(webCreationSliceActions.setSalesType(data.type));
    dispatch(webCreationSliceActions.setSubDomain(data.sub_domain));
    dispatch(webCreationSliceActions.setHasSalesPage());
    dispatch(webCreationSliceActions.setHasSalesPageData(data));
  };

  const onSalesMediaSuccess = (data) => {
    if (data.length > 0) {
      dispatch(productTypeSliceActions.addAboutImage(data[0].file));
      dispatch(productTypeSliceActions.addNewAboutImage(data[0].file));
    }
  };

  const { isLoading: isBooksLoading, data: booksData } = useQuery(
    `books-${bookId}`,
    () => ApiService.get(`/book-generator/books/${bookId}/`),
    {
      onSuccess: (response) => onBooksSuccess(response.data),
      refetchOnWindowFocus: false
    }
  );
  const { isLoading: isSalesPageLoading } = useQuery(
    `sales-page-${bookId}`,
    () => ApiService.get(`/sales/sales-page/${booksData.data.sale_page}`),
    {
      enabled: !isBooksLoading && Boolean(booksData.data.sale_page),
      onSuccess: (response) => onSalesPageSuccess(response.data),
      refetchOnWindowFocus: false
    }
  );
  const { isLoading: isMediaLoading } = useQuery(
    `sales-media-${bookId}`,
    () => ApiService.get(`/sales/sales-page/${booksData.data.sale_page}/media`),
    {
      enabled: !isBooksLoading && Boolean(booksData.data.sale_page),
      onSuccess: (response) => onSalesMediaSuccess(response.data),
      refetchOnWindowFocus: false
    }
  );
  const { isLoading: isBooksMediaLoading } = useQuery(
    `booksMedia-${bookId}`,
    () => ApiService.get(`/book-generator/books/${bookId}/book_media/`),
    {
      onSuccess: (response) => onBooksMediaSuccess(response.data),
      refetchOnWindowFocus: false
    }
  );

  if (isBooksLoading || isSalesPageLoading || isMediaLoading || isBooksMediaLoading || isLoading) {
    return <LinearProgress color="inherit" />;
  }

  return (
    <WebsiteCreation
      websiteMainData={websiteMainData}
      setWebsiteMainData={setWebsiteMainData}
      deliveryMainData={deliveryMainData}
      setDeliveryMainData={setDeliveryMainData}
      mockupData={mockupData}
      pageImages={pageImages}
      hasSalesPage={hasSalesPage}
      salesData={salesData}
    />
  );
}

export default WebsiteCreationPre;
