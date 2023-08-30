import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import NavButton from 'components/Buttons/NavButton';
import ArrowButton from 'components/Buttons/ArrowButton';
import InputCopy from 'components/InputFields/InputCopy';

import { apiCall } from 'helpers/api-config';
import { CircularProgress } from '@mui/material';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';

import closeMark from 'img/close.svg';
import websiteImage from 'img/link_website.png';
import MockupCoverSection from 'pages/customer-sales-pages/MockupCoverSection';
import styles from './YourLinksModal.module.scss';
import { getCustomWebsiteUrl } from '../../helpers/custom-functions';

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
}

function YourLinksModal(props) {
  const { setIsOpen, image, downloadUrl, salesId, id, mockup } = props;
  const navigate = useNavigate();

  const {
    popup,
    popup__content,
    popup__content__header,
    popup__content__header__title,
    popup__content__header__closeBtn,
    popup__content__body,
    popup__content__body__top,
    popup__content__body__bottom,
    modal_button,
    modal_button_container,
    website_item
  } = styles;

  const [tooltipTitle, setTooltipTitle] = useState('Copy');
  const [tooltipTitle2, setTooltipTitle2] = useState('Copy');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall('get', `/sales/sales-page/${salesId}`, accessToken);
        setWebsiteUrl(getCustomWebsiteUrl(res.data.sub_domain));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
        console.log(error);
      }
    };

    if (salesId) {
      fetchBook();
    }
  }, []);

  const pdfCopyClickHandler = (data, callback) => {
    navigator.clipboard.writeText(data);
    callback('Copied!');
    setTimeout(() => {
      callback('Copy');
    }, 3000);
  };

  const pdfDownloadClickHandler = () => {
    window.open(downloadUrl, '_blank');
  };

  const pdfEditClickHandler = () => {
    console.log('pdf edit button click');
  };

  const websiteEditClickHandler = () => {
    navigate(`/dashboard/website-creation/${id}`);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <h5 className={popup__content__header__title}>Your Links</h5>
          <button className={popup__content__header__closeBtn} onClick={() => setIsOpen(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={popup__content__body}>
          <div className={popup__content__body__top}>
            <div>
              <MockupCoverSection
                height="200px"
                mockupId={mockup.id}
                coverImage={image}
                mockupImage={mockup.file}
              />
            </div>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <div>
                <InputCopy
                  type="text"
                  id="pdf"
                  value={downloadUrl}
                  onClick={() => pdfCopyClickHandler(downloadUrl, setTooltipTitle)}
                  placeholder="Product PDF Direct Link"
                  tooltipTitle={tooltipTitle}
                  onChange={() => console.log('')}
                />
                <div className={modal_button_container}>
                  <NavButton
                    className={modal_button}
                    type="button"
                    txt="Download the PDF"
                    bgColor="#fff8e3"
                    onClick={pdfDownloadClickHandler}
                  />
                </div>
                <div className={modal_button_container}>
                  <ArrowButton
                    className={modal_button}
                    type="button"
                    txt="Edit My Product PDF"
                    bgColor="#ffdf60"
                    onClick={pdfEditClickHandler}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={popup__content__body__bottom}>
            <img src={websiteImage} alt="link website" className={website_item} />
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <div>
                <InputCopy
                  type="text"
                  id="website"
                  value={websiteUrl}
                  onClick={() => pdfCopyClickHandler(websiteUrl, setTooltipTitle2)}
                  placeholder="My Website Link To Share"
                  tooltipTitle={tooltipTitle2}
                  onChange={() => console.log('')}
                />
                <div className={modal_button_container}>
                  <ArrowButton
                    className={modal_button}
                    type="button"
                    txt="Edit My Website"
                    bgColor="#ffdf60"
                    onClick={websiteEditClickHandler}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ErrorMessageSnackbar
        message="Something went wrong.. Please try again"
        open={open}
        severity="error"
      />
    </div>
  );
}

export default YourLinksModal;
