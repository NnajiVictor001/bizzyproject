import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeMark from 'img/close.svg';
import NavButton from 'components/Buttons/NavButton';
import PreviewSlideShow from 'components/SlideShow/PreviewSlideShow';
import { StatDashboardSliceActions } from 'store/stat-dashboard-goals';
import { pricingPlanActions } from 'store/pricing-plan';
import { ProductLibrarySliceActions } from 'store/product-library';
import { productBatchesSliceActions } from 'store/product-batches';

import { apiCall } from 'helpers/api-config';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { useRenderImage } from 'hooks/renderImage';
import PageLoader from 'components/Common/PageLoader';
import { useBookCreation } from 'hooks/bookCreation';
import log from '../../helpers/log';
import styles from './PreviewModal.module.scss';

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
  }, [ref, callback]);

  return ref;
}

function PreviewModal(props) {
  const accessToken = localStorage.getItem('token');

  const { editBookMutation, editTitleAndCover } = useBookCreation();
  const { setIsOpenPreviewModal, callback } = props;
  const {
    popup,
    popup__content,
    popup__content__inner,
    popup__content__header,
    header_title,
    popup__content__header__closeBtn,
    bottom_con
  } = styles;
  const [_selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewsLoading, setPreviewsLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { renderImage } = useRenderImage();
  const dispatch = useDispatch();

  const selectedCover = useSelector((state) => state.productBranding.selectedCover);
  const productName = useSelector((state) => state.productBranding.productName);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);
  const editBookId = useSelector((state) => state.createdBook.editBookId);
  const selectedProductType = useSelector((state) => state.productType.selectedProductType);
  const activeProductKind = useSelector((state) => state.productBranding.activeProductKind);

  const handleClickOutside = () => {
    setIsOpenPreviewModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleSelectedImage = (data) => {
    setSelectedImages(data);
  };

  async function productCreation() {
    try {
      setIsLoading(true);

      const resPublish = await apiCall(
        'post',
        `/book-generator/books/${editBookId}/publish/`,
        accessToken
      );
      console.log('publish result=>', resPublish);
      dispatch(ProductLibrarySliceActions.setBookId({ id: editBookId }));
      if (resPublish.status !== 200) throw new Error('Something went wrong.. Please try again');

      const returnData = {
        cover: selectedCover.image_preview,
        title: productName,
        type: selectedProductType.name,
        link: resPublish.data.file
      };

      callback(returnData);
      setIsOpenPreviewModal(false);
      dispatch(StatDashboardSliceActions.selectNextGoal());
      dispatch(pricingPlanActions.addProductsCreated());
      dispatch(ProductLibrarySliceActions.createdProduct());

      setIsLoading(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        setErrorMessage('Connectivity error. Please try again');
      } else if (error.response?.data?.field_errors[0]?.message) {
        setErrorMessage(error.response?.data?.field_errors[0]?.message);
      } else {
        log.error(JSON.stringify(error));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setErrorFlag(true);
      setTimeout(() => {
        setErrorFlag(false);
      }, 3000);
    }
  }

  const handleResultButton = () => {
    productCreation();
  };

  useEffect(() => {
    const refreshPages = async () => {
      setPreviewsLoading(true);
      const selectedPagesData = selectedTotalPages.map((page) => {
        const payloadIngredients = page.ingredients.map((x) => ({
          page_ingredient: x.id,
          ingredient_data: x.ingredient_data
        }));
        return {
          page: page.page,
          ingredients: payloadIngredients
        };
      });
      try {
        const imagesResponse = await Promise.all(
          selectedPagesData.map((item) => renderImage(item.page, item.ingredients))
        );
        const images = imagesResponse.map((item) => item.data.image);
        const updatedTotalPages = selectedTotalPages.map((item, index) => ({
          ...item,
          src: `data:image/png;base64,${images[index]}`
        }));
        dispatch(productBatchesSliceActions.setSelectPages(updatedTotalPages));
        setPreviewsLoading(false);
      } catch {
        setErrorMessage('Some images failed to load');
        setErrorFlag(true);
        setPreviewsLoading(false);
      }
    };
    refreshPages();
  }, []);

  useEffect(() => {
    if (activeProductKind.id === 3) {
      const updateTitleAndCover = async () => {
        await editTitleAndCover();
      };
      updateTitleAndCover();
    }
  }, [activeProductKind]);

  return (
    <div className={popup}>
      {previewsLoading ? (
        <PageLoader text="Creating Preview..." />
      ) : (
        <div className={popup__content} ref={ref}>
          <div className={popup__content__inner}>
            <div className={popup__content__header}>
              <p className={header_title}>Preview</p>
              <button
                className={popup__content__header__closeBtn}
                onClick={() => setIsOpenPreviewModal(false)}>
                <img src={closeMark} alt="close mark" />
              </button>
            </div>
            <PreviewSlideShow data={selectedTotalPages} handleSelectedImage={handleSelectedImage} />
          </div>
          {isLoading || editBookMutation.isLoading ? (
            <div className={bottom_con}>
              <LinearProgress color="inherit" />
            </div>
          ) : (
            <div className={bottom_con}>
              <NavButton
                type="button"
                txt="Approved!! Publish it... and Get Me My Link to Share It!!"
                bgColor="#FFC800"
                onClick={handleResultButton}
              />
            </div>
          )}
        </div>
      )}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={errorFlag} />
    </div>
  );
}

export default PreviewModal;
