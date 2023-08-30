import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productBatchesSliceActions } from 'store/product-batches';
import NavButton from 'components/Buttons/NavButton';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import placeholder from 'img/batch_placeholder.png';
import { useBookCreation } from 'hooks/bookCreation';
import PageLoader from 'components/Common/PageLoader';
import styles from './MySelectedBatches.module.scss';

function MySelectedBatches(props) {
  const {
    main,
    main__title,
    main__body,
    main__item,
    main__item__out__img,
    main__item__out__imgShow,
    main__btm_txt,
    main__btm_button,
    main__item__out
  } = styles;
  const { selectedBatches } = props;
  const [errorSelectedBatches, setErrorSelectedBatches] = useState({
    isError: false,
    message: ''
  });
  const [loader, setLoader] = useState({
    isLoading: false,
    text: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createBook } = useBookCreation();

  const handleLoader = (isLoading, text = '') => {
    const load = {
      isLoading,
      text: isLoading ? text : ''
    };
    setLoader(load);
  };

  const handleError = (isError, message = '') => {
    const error = {
      isError,
      message: isError ? message : ''
    };
    setErrorSelectedBatches(error);
  };

  const handleEditButton = async () => {
    if (selectedBatches.length < 1 || selectedBatches.length > 6) {
      handleError(true, 'Select 1 to 6 Batches');
      setTimeout(() => {
        handleError(false);
      }, 3000);
      return;
    }
    let selectedPages = [];
    selectedBatches.map((batch) => {
      const eachPage = batch.pages.map((item) => ({
        id: item.id,
        order: item.order,
        page: item.page.id,
        system_id: item.page.system_id,
        src: item.page.image_preview,
        ingredients: item.page.ingredients
      }));
      selectedPages = selectedPages.concat(eachPage);
      return null;
    });
    handleLoader(true, 'Creating Book...');
    try {
      const createdBook = await createBook();
      const updatedSelectedPages = selectedPages.map((page) => {
        const currentPage = createdBook.pages.find((createdPage) => createdPage.page === page.page);
        return {
          ...page,
          id: currentPage.id
        };
      });
      handleLoader(false);
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedPages));
      navigate(`/dashboard/product-part2/${createdBook.id}`);
      handleLoader(false);
    } catch (error) {
      handleLoader(false);
      handleError(true, error.message);
      setTimeout(() => {
        handleError(false);
      }, 3000);
    }
  };

  return (
    <div className={main}>
      {loader.isLoading ? <PageLoader text={loader.text} /> : null}
      <p className={main__title}>My Selected Batches</p>

      <div className={main__body}>
        {selectedBatches.map((item, index) => {
          const { pages } = item;
          const images = pages.map((i) => ({
            id: i.id,
            order: i.order,
            src: i.page.image_preview
          }));
          return (
            <div key={index} className={main__item}>
              <div className={main__item__out}>
                <img src={placeholder} alt="placeholder" className={main__item__out__img} />
                <img
                  src={images[0].src}
                  alt={`${images[0].alt} batch`}
                  className={`${main__item__out__img} ${main__item__out__imgShow}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className={main__btm_txt}>You’ll be able to make edits in the next step.</p>
      <div className={main__btm_button}>
        <NavButton
          onClick={handleEditButton}
          type="button"
          txt="I am ready to edit it >"
          bgColor="#FFC800"
        />
      </div>
      <ErrorMessageSnackbar
        message={errorSelectedBatches.message}
        severity="error"
        open={errorSelectedBatches.isError}
      />
    </div>
  );
}

export default MySelectedBatches;
