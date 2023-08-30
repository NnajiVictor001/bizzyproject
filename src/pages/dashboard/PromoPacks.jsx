import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAlert } from 'hooks/alert';
import { getCustomWebsiteUrl } from 'helpers/custom-functions';

import PromoPackCard from 'components/Cards/PromoPackCard';
import PromoPackCard1 from 'components/PromoPackCards/PromoPackCard1';
import PromoPackCard2 from 'components/PromoPackCards/PromoPackCard2';
import PromoPackCard3 from 'components/PromoPackCards/PromoPackCard3';

import { apiCall } from 'helpers/api-config';
import log from '../../helpers/log';

import styles from './PromoPacks.module.scss';

function PromoPacks() {
  const { main, main__heading, main__content } = styles;

  const params = useParams();
  const { addAlert } = useAlert();
  const accessToken = localStorage.getItem('token');

  const { bookId } = params;
  const [isToggledEmails, setIsToggledEmails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRandomImageAd, setIsLoadingRandomImageAd] = useState(false);
  const [isLoadingRandomTextAd, setIsLoadingRandomTextAd] = useState(false);
  const [isLoadingRandomConData, setIsLoadingRandomConData] = useState(false);
  const [isLoadingSalesEmailData, setIsLoadingSalesEmailData] = useState(false);
  const [isLoadingEmailChanges, setIsloadingEmailChanges] = useState(false);

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [imageAd, setImageAd] = useState('');
  const [textAd, setTextAd] = useState('');
  const [imageCon, setImageCon] = useState('');
  const [textCon, setTextCon] = useState('');
  const [salesEmailDesc, setSalesEmailDesc] = useState('');
  const [salesEmailHeadline, setSalesEmailHeadline] = useState('');
  const [salesEmailPreview, setSalesEmailPreview] = useState('');
  const [deliveryEmailData, setDeliveryEmailData] = useState('');

  const [_bookMockups, setBookMockups] = useState('');
  const [salesPageId, setSalesPageId] = useState('');
  const [bookData, setBookData] = useState({});

  const fetchRandomImageAd = async () => {
    setIsLoadingRandomImageAd(true);
    const book_data = await apiCall('get', `/book-generator/books/${bookId}`, accessToken);
    const mockup_name = book_data.data.mockup.name;
    try {
      setIsLoadingRandomImageAd(true);
      if (mockup_name) {
        const res = await apiCall(
          'get',
          `/sales/book-promo-mockup/random_mockup/ad_wording/?mockup${mockup_name}`,
          accessToken
        );
        setImageAd(res.data);
      } else {
        const res = await apiCall(
          'get',
          '/sales/book-promo-mockup/random_mockup/ad_wording/',
          accessToken
        );
        setImageAd(res.data);
      }
      setIsLoadingRandomImageAd(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingRandomImageAd(false);
    }
  };

  const fetchRandomTextAd = async () => {
    try {
      setIsLoadingRandomTextAd(true);
      const res = await apiCall(
        'get',
        `/book-generator/books/${bookId}/render_random_promo/ad_wording/`,
        accessToken
      );
      setTextAd(res.data.text);
      setIsLoadingRandomTextAd(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingRandomTextAd(false);
    }
  };

  const fetchBookMockups = async () => {
    try {
      const res = await apiCall('get', '/book-generator/book-mockups/', accessToken);
      setBookMockups(res.data.results.flatMap((d) => d.file));
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
    }
  };

  const fetchRandomConData = async () => {
    try {
      setIsLoadingRandomConData(true);
      const res = await apiCall(
        'get',
        `/book-generator/books/${bookId}/render_random_promo/conversation/`,
        accessToken
      );
      setImageCon(res.data.image_preview);
      setTextCon(res.data.text);
      setIsLoadingRandomConData(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingRandomConData(false);
    }
  };

  const fetchSalesEmailData = async (value = 'all') => {
    try {
      setIsLoadingSalesEmailData(true);
      if (value === 'all' || value === 'desc') {
        const res = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email/sales/`,
          accessToken
        );
        setSalesEmailDesc(res.data.text);
      }

      if (value === 'all' || value === 'headline') {
        const res1 = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email_line/subject/`,
          accessToken
        );
        setSalesEmailHeadline(res1.data.text);
      }

      if (value === 'all' || value === 'preview') {
        const res2 = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email_line/preview/`,
          accessToken
        );
        setSalesEmailPreview(res2.data.text);
      }

      setIsLoadingSalesEmailData(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingSalesEmailData(false);
    }
  };

  const fetchDeliveryEmailData = async (value) => {
    setIsLoadingSalesEmailData(true);
    try {
      if (value === 'headline') {
        const res = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email_line/subject/`,
          accessToken
        );
        setDeliveryEmailData((prevState) => ({
          ...prevState,
          headline: res.data.text
        }));
      }

      if (value === 'preview') {
        const res = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email_line/preview/`,
          accessToken
        );
        setDeliveryEmailData((prevState) => ({
          ...prevState,
          preview_text: res.data.text
        }));
      }

      if (value === 'desc') {
        const res = await apiCall(
          'get',
          `/book-generator/books/${bookId}/render_random_email/sales/`,
          accessToken
        );
        setDeliveryEmailData((prevState) => ({
          ...prevState,
          body: res.data.text
        }));
      }

      setIsLoadingSalesEmailData(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert('Connectivity error. Please try again', 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoadingSalesEmailData(false);
    }
  };

  useEffect(() => {
    fetchRandomImageAd();
    fetchBookMockups();
    fetchRandomTextAd();
    fetchRandomConData();
    fetchSalesEmailData();
    const fetchWebsiteUrl = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall('get', `/book-generator/books/${bookId}`, accessToken);
        setBookData(res.data);
        setSalesPageId(res.data.sale_page);

        const res1 = await apiCall('get', `/sales/sales-page/${res.data.sale_page}/`, accessToken);
        setWebsiteUrl(getCustomWebsiteUrl(res1.data.sub_domain));

        const res2 = await apiCall(
          'get',
          `/sales/book-delivery-email/${res.data.sale_page}/`,
          accessToken
        );
        setDeliveryEmailData(res2.data);

        setIsLoading(false);
      } catch (error) {
        if (error.message === 'Network Error') {
          log.error(JSON.stringify(error));
          addAlert('Connectivity error. Please try again', 'error');
        } else if (error.response?.data?.errors[0]?.message) {
          addAlert(error.response?.data?.errors[0]?.message, 'error');
        } else {
          log.error(JSON.stringify(error));
          addAlert('Something went wrong. Please try again', 'error');
        }
        setIsLoading(false);
      }
    };

    fetchWebsiteUrl();
  }, []);

  const changeMockup = () => {
    fetchRandomImageAd();
  };

  const copyText = () => {
    navigator.clipboard.writeText(textCon);
    addAlert('Copied Value', 'info');
  };

  const copyTextBody = () => {
    navigator.clipboard.writeText(salesEmailDesc);
    addAlert('Copied Value', 'info');
  };

  const saveDeliveryEmailChanges = async () => {
    setIsloadingEmailChanges(true);
    try {
      await apiCall(
        'patch',
        `/sales/book-delivery-email/${salesPageId}/`,
        accessToken,
        deliveryEmailData
      );
      addAlert('Updated Data Successfully', 'success');
      setIsloadingEmailChanges(false);
    } catch (error) {
      setIsloadingEmailChanges(false);
    }
  };

  const downLoadSVG = async (url) => {
    const svgUrl = url;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), 'download.png');
      } else {
        const a = document.createElement('a');
        const my_evt = new MouseEvent('click');
        a.download = 'mockup.png';
        a.href = dataUrl;
        a.dispatchEvent(my_evt);
      }
    };
    image.src = svgUrl;
  };

  const promoPackData = [
    {
      title: 'Create Photo Posts',
      description: 'Copy this and share on social to tell others about your product!',
      content: (
        <PromoPackCard1
          isLoading={isLoading}
          isLoadingImage={isLoadingRandomImageAd}
          isLoadingText={isLoadingRandomTextAd}
          websiteUrl={websiteUrl}
          textAd={textAd}
          setTextAd={setTextAd}
          imageAd={imageAd}
          fetchRandomImageAd={changeMockup}
          fetchRandomTextAd={fetchRandomTextAd}
          bookData={bookData}
        />
      ),
      isActive: false,
      buttonAction: () => downLoadSVG(imageAd.mockup),
      buttonText: 'Download'
    },
    {
      title: 'Conversation Starters',
      description: 'Use these questions sell through comments and convos!',
      content: (
        <PromoPackCard2
          isLoading={isLoadingRandomConData}
          imageCon={imageCon}
          textCon={textCon}
          setTextCon={setTextCon}
          fetchRandomConData={fetchRandomConData}
        />
      ),
      isActive: true,
      buttonText: 'Copy',
      buttonAction: copyText
    },
    {
      title: 'Emails',
      description: 'Copy & Send!!  These are your Sales & Delivery Emails',
      content: (
        <PromoPackCard3
          isToggled={isToggledEmails}
          setIsToggled={setIsToggledEmails}
          isLoadingSalesEmailData={isLoadingSalesEmailData}
          salesEmailHeadline={salesEmailHeadline}
          setSalesEmailHeadline={setSalesEmailHeadline}
          salesEmailPreview={salesEmailPreview}
          setSalesEmailPreview={setSalesEmailPreview}
          salesEmailDesc={salesEmailDesc}
          setSalesEmailDesc={setSalesEmailDesc}
          fetchSalesEmailData={fetchSalesEmailData}
          deliveryEmailData={deliveryEmailData}
          setDeliveryEmailData={setDeliveryEmailData}
          fetchDeliveryEmailData={fetchDeliveryEmailData}
        />
      ),
      isActive: false,
      buttonText: isToggledEmails ? 'Save' : 'Copy',
      buttonAction: isToggledEmails ? saveDeliveryEmailChanges : copyTextBody,
      isLoading: isLoadingEmailChanges
    }
    // This Feature will be implemented after the MVP
    // {
    //   title: "Video",
    //   description:
    //     "Download your scripts in a snap, turn on your phone & start filming!",
    //   content: <PromoPackCard4 />,
    //   isActive: false,
    //   buttonText: "Download",
    // },
  ];

  return (
    <div className={main}>
      <h4 className={main__heading}>Pick a Promotion Asset and Share It</h4>
      <div className={main__content}>
        {promoPackData.map((item, index) => (
          <div key={index}>
            <PromoPackCard
              isActive={item.isActive}
              title={item?.title}
              details={item.description}
              buttonAction={item?.buttonAction}
              buttonText={item?.buttonText}
              isLoading={item?.isLoading}>
              {item.content}
            </PromoPackCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromoPacks;
