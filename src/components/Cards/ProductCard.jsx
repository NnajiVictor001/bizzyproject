import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dots from 'img/dots.png';
import YourLinksModal from 'components/Modals/YourLinksModal';
import ProductCardFooterLinks from 'helpers/ProductCardFooterLinks';
import pasteIcon from 'img/copy_icon.svg';
import showIcon from 'img/eye_icon.svg';
import deleteIcon from 'img/trash_icon.svg';
import { apiCall } from 'helpers/api-config';
import { CircularProgress } from '@mui/material';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { useBookCreation } from 'hooks/bookCreation';
import PageLoader from 'components/Common/PageLoader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UpgradePopup from 'components/Popups/UpgradePopup';
import UpgradeFormPopup from 'components/Popups/UpgradeFormPopup';
import UpgradeFinalPopup from 'components/Popups/UpgradeFinalPopup';
import UpgradeBusinessPopup from 'components/Popups/UpgradeBusinessPopup';

import { pricingPlanActions } from 'store/pricing-plan';
import { footerLinksActions } from 'store/footer-links';
import { paymentSliceActions } from 'store/payment';
import { UserDataSliceActions } from 'store/user-data';
import log from '../../helpers/log';
import MockupCoverSection from '../../pages/customer-sales-pages/MockupCoverSection';
import styles from './ProductCard.module.scss';

function useOutsideClick(callback) {
  const ref = useRef();
  const buttonsRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (buttonsRef.current && buttonsRef.current.contains(event.target)) return;
      if (ref.current.contains(event.target)) callback();
    };

    ref.current?.addEventListener('click', handleClick, true);

    return () => {
      ref.current?.removeEventListener('click', handleClick, true);
    };
  }, [ref, buttonsRef, callback]);

  return [ref, buttonsRef];
}

function ProductCard(props) {
  const accessToken = localStorage.getItem('token');

  const navigate = useNavigate();
  const { loadBook, isLoading: isBookLoading } = useBookCreation();
  const { item, website, onlyPromoteProducts } = props;
  const { id, name, cover_image_preview, mockup, sale_page, book_file } = item;
  const { callback } = props;

  // const coversData = useSelector((state) => state.productBranding.coversData);

  const {
    productCard,
    card,
    productCard__header,
    productCard__heading,
    productCard__dots,
    card__con,
    card__con__loading,
    card__btnCont,
    barPopup,
    barPopup__btn,
    barPopup__btn__eye
  } = styles;

  const plan = useSelector((state) => state.pricingPlan.plan);

  const [isOpenYourLinks, setIsOpenYourLinks] = useState(false);
  const [renameFlag, setRenameFlag] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [upgradePopUp, setUpgradePopUp] = useState('close');

  const [selectedPlanName, setSelectedPlanName] = useState('');

  const [secret, setSecret] = useState('');
  const [pIntent, setPIntent] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [_isBusiness, setIsBusiness] = useState(false);
  const [cost, setCost] = useState();
  const [theInterval, setTheInterval] = useState();

  const dispatch = useDispatch();
  const publicKey = localStorage.getItem('pk');
  const stripePromise = loadStripe(`${publicKey}`);

  useEffect(() => {
    async function fetchSelectedPricingPlan() {
      try {
        setIsLoading(true);

        const res = await apiCall('get', '/subscriptions/current/', accessToken);
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        setIsLoading(false);
        const { plan_name } = res.data;
        setSelectedPlanName(plan_name);
        if (plan_name === 'bizzy_free') {
          setIsFree(true);
          dispatch(pricingPlanActions.select('Free'));
        } else if (plan_name === 'bizzy_starter') {
          dispatch(UserDataSliceActions.setStripeAccount());
          dispatch(pricingPlanActions.select('The Starter'));
        } else {
          setIsBusiness(true);
          dispatch(UserDataSliceActions.setStripeAccount());
          dispatch(pricingPlanActions.select('Business'));
        }
      } catch (err) {
        if (err.message === 'Network Error') {
          log.error(JSON.stringify(err));
          setErrorMessage('Connectivity error. Please try again');
        } else if (err.response?.data?.errors[0]?.message) {
          setErrorMessage(err.response?.data?.errors[0]?.message);
        } else {
          log.error(JSON.stringify(err));
          setErrorMessage('Something went wrong. Please try again');
        }
        setIsLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
    fetchSelectedPricingPlan();
    dispatch(footerLinksActions.getLinks());
  }, [accessToken, dispatch]);

  const onClose = () => {
    setUpgradePopUp('close');
    if (upgradePopUp === 'final') {
      window.location.reload();
    }
  };

  const upgradeToBusinessCost = async ({ interval = 'month' }) => {
    try {
      setIsLoading(true);
      setTheInterval(interval);
      const dataApi = {
        plan_name: 'bizzy_business',
        interval
      };

      const res = await apiCall('post', '/subscriptions/preview_change/', accessToken, dataApi);
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { total } = res.data;
      setCost(total);
      setIsLoading(false);
      setUpgradePopUp('business_upgrade');
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const upgradePopUpClick = async ({ interval = 'month' }) => {
    try {
      setIsLoading(true);
      let updateTo = '';
      if (selectedPlanName === 'bizzy_free') {
        updateTo = 'bizzy_starter';
      } else if (selectedPlanName === 'bizzy_starter') {
        updateTo = 'bizzy_business';
      }

      const dataApi = {
        plan_name: updateTo,
        interval
      };

      let res = '';
      if (updateTo === 'bizzy_starter') {
        res = await apiCall('post', '/subscriptions/upgrade/', accessToken, dataApi);
      } else {
        upgradeToBusinessCost('month');
        return;
      }

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(paymentSliceActions.setPaymentIntent(res.data.payment_intent));
      dispatch(paymentSliceActions.setSecretKey(res.data.client_secret));
      setSecret(res.data.client_secret);
      setPIntent(res.data.payment_intent);
      setIsLoading(false);
      setUpgradePopUp('main');
    } catch (err) {
      console.log(err);
    }
  };

  const upgradeFormPopUpClick = () => {
    setUpgradePopUp('final');
  };

  const upgradeToBusinessAccount = async () => {
    try {
      setIsLoading(true);
      const dataApi = {
        plan_name: 'bizzy_business',
        interval: theInterval
      };
      await apiCall('post', '/subscriptions/change/', accessToken, dataApi);
      setIsLoading(false);
      setUpgradePopUp('final');
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  // useEffect(() => {
  //   if (coversData.length > 0) {
  //     // let coverImg = null;
  //     // const coverImgFilter = coversData.filter((i) => i.id === cover);
  //     // if (coverImgFilter.length > 0) {
  //     //   coverImg = coverImgFilter[0].image_preview;
  //     // } else {
  //     //   coverImg = null;
  //     // }
  //   }
  // }, [coversData]);

  const handleClickOutside = () => {
    const handleRename = async () => {
      try {
        setIsLoading(true);
        const data = { name: renameValue };
        const res = await apiCall('patch', `/book-generator/books/${id}/`, accessToken, data);
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        callback(true);
        setIsLoading(false);
      } catch (err) {
        if (err.message === 'Network Error') {
          log.error(JSON.stringify(err));
          setErrorMessage('Connectivity error. Please try again');
        } else if (err.response?.data?.errors[0]?.message) {
          setErrorMessage(err.response?.data?.errors[0]?.message);
        } else {
          log.error(JSON.stringify(err));
          setErrorMessage('Something went wrong. Please try again');
        }
        setIsLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    };
    if (website) {
      navigate(`/dashboard/website-creation/${id}`);
      return;
    }

    if (onlyPromoteProducts) {
      navigate(`/dashboard/promo-packs/${id}`);
      return;
    }

    if (renameFlag && renameValue !== name) {
      handleRename();
    }
    setRenameFlag(false);
    setShowPopup(false);
  };

  const [ref, buttonsRef] = useOutsideClick(handleClickOutside);

  const handleThreeDots = () => {
    setShowPopup(!showPopup);
  };

  const handleFooterIconClick = (link) => {
    if (link.title === 'Add a website') {
      if (plan.title === 'Free') {
        setUpgradePopUp('open');
        return;
      }
      navigate(`/dashboard/website-creation/${id}`);
    }
    if (link.title === 'Your Links') {
      setIsOpenYourLinks(true);
      return;
    }

    if (link.title === 'Email') {
      navigate('/dashboard/promo-packs');
      return;
    }

    if (link.title === 'Promote') {
      navigate(`/dashboard/promo-packs/${id}`);
      return;
    }

    if (link.title === 'Website') {
      navigate(`/dashboard/website-creation/${id}`);
    }
  };

  const handleChangeRename = (evt) => {
    setRenameValue(evt.target.value);
    setShowPopup(false);
  };

  const handleClickDelete = async () => {
    try {
      setIsLoading(true);
      await apiCall('delete', `/book-generator/books/${id}/`, accessToken);

      callback(true);
      setIsLoading(false);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    setShowPopup(false);
  };

  const handleClickPaste = async () => {
    try {
      setIsLoading(true);
      const res = await apiCall('post', `/book-generator/books/${id}/copy/`, accessToken);
      if (res.status !== 201) throw new Error('Something went wrong.. Please try again');

      callback(true);
      setIsLoading(false);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    setShowPopup(false);
  };

  const handleClickRename = async () => {
    if (website) {
      navigate(`/dashboard/website-creation/${id}`);
      return;
    }
    if (onlyPromoteProducts) {
      navigate(`/dashboard/promo-packs/${id}`);
      return;
    }
    await loadBook(item?.id);
    navigate(`/dashboard/product-part2/${item?.id}`);
  };

  const popup = () => {
    switch (upgradePopUp) {
      case 'open':
        return <UpgradePopup onClick={upgradePopUpClick} onClose={onClose} loading={isLoading} />;
      case 'business_upgrade':
        return (
          <UpgradeBusinessPopup
            onClick={upgradeToBusinessAccount}
            onClose={onClose}
            loading={isLoading}
            cost={cost}
            upgradeToBusinessCost={upgradeToBusinessCost}
          />
        );
      case 'main':
        return (
          <Elements stripe={stripePromise} options={{ clientSecret: secret }} key={pIntent}>
            <UpgradeFormPopup
              plan={plan}
              isFree={isFree}
              onClick={upgradeFormPopUpClick}
              changePayment={upgradePopUpClick}
              onClose={onClose}
            />
          </Elements>
        );
      case 'final':
        return <UpgradeFinalPopup onClose={onClose} />;
      case 'close':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={productCard}>
      <div>{popup()}</div>
      <div className={productCard__header}>
        {renameFlag ? (
          <input
            className={productCard__heading}
            type="text"
            id={id}
            value={renameValue}
            onChange={handleChangeRename}
          />
        ) : (
          <p className={productCard__heading}>{name}</p>
        )}
        <img className={productCard__dots} src={dots} alt="Dots" onClick={handleThreeDots} />
      </div>
      <div className={card} ref={ref}>
        <div className={card__con}>
          {isLoading ? (
            <div className={card__con__loading}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <div onClick={handleClickRename}>
              <MockupCoverSection
                width={mockup.id === 3 ? '8.5em' : '10em'}
                height="170px"
                containerStyle={mockup.id === 3 && { marginLeft: '15px' }}
                mockupId={mockup.id}
                coverImage={cover_image_preview}
                mockupImage={mockup.file}
              />
            </div>
          )}
        </div>
        <div className={card__btnCont} ref={buttonsRef}>
          <ProductCardFooterLinks
            handleFooterIconClick={handleFooterIconClick}
            bookFile={book_file}
            id={sale_page}
          />
        </div>
      </div>
      {showPopup && (
        <div className={barPopup}>
          <button className={barPopup__btn} onClick={handleClickDelete}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button className={barPopup__btn} onClick={handleClickRename}>
            <img src={showIcon} alt="show icon" className={barPopup__btn__eye} />
          </button>
          <button className={barPopup__btn} onClick={handleClickPaste}>
            <img src={pasteIcon} alt="paste icon" />
          </button>
        </div>
      )}
      {isOpenYourLinks && (
        <YourLinksModal
          setIsOpen={setIsOpenYourLinks}
          image={cover_image_preview}
          downloadUrl={book_file.file}
          salesId={sale_page}
          mockup={mockup}
          id={id}
        />
      )}
      {isBookLoading ? <PageLoader text="Loading Book..." /> : null}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default ProductCard;
