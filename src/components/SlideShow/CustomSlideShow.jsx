import React, { useState, useRef, useEffect } from 'react';
import DndCard from 'components/Cards/DndCard';
import { useSelector, useDispatch } from 'react-redux';
import pasteIcon from 'img/copy_icon.svg';
import showIcon from 'img/eye_icon.svg';
import deleteIcon from 'img/trash_icon.svg';
import placeholder from 'img/batch_placeholder.png';
import { productBrandingSliceActions } from 'store/product-branding';
import { productBatchesSliceActions } from 'store/product-batches';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import { useRenderImage } from 'hooks/renderImage';
import { useBookCreation } from 'hooks/bookCreation';
import log from '../../helpers/log';
import styles from './CustomSlideShow.module.scss';

function CustomSlideShow() {
  const dispatch = useDispatch();
  const { renderImage } = useRenderImage();
  const { editBookMutation, deletePagePayload, duplicatePagePayload, orderPreviewPagesPaylaod } =
    useBookCreation();

  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);

  const selectedPage = useSelector((state) => state.productBranding.selectedPage);
  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const customPageId = useSelector((state) => state.productCustomPages.customPageId);
  const editBookId = useSelector((state) => state.createdBook.editBookId);
  const productCustomPages = useSelector((state) => state.productCustomPages);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [selectedItem, setSelectedItem] = useState(selectedTotalPages[0]);
  const [nextDisabledFlag, setNextDisabledFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragScrollEnabled, setIsDragScrollEnabled] = useState(true);
  const [hoverIndexId, setHoverIndexId] = useState(null);

  const {
    select_con,
    select_con__image,
    more_con,
    more_con__btn,
    more_con__btn__eye,
    main,
    container,
    carousel_con,
    arrow_left_btn,
    arrow_right_btn,
    arrow_img,
    hover_selected,
    body_con,
    body_con__dnd,
    body_con__last_dnd
  } = styles;

  async function reflectChanges(selectedPageData) {
    if (selectedPageData.page === customPageId) {
      const active = selectedTotalPages.find((x) => x.page === selectedPageData.page);
      setSelectedItem(active);
      dispatch(
        productBrandingSliceActions.selectPage({
          ...active,
          isUpdate: false
        })
      );
      return;
    }
    try {
      setIsLoading(true);

      const updatedIngredients = selectedPageData.ingredients.map((ingre_item) => {
        const tempColorArray =
          ingre_item?.variables && ingre_item?.variables.color ? ingre_item?.variables.color : [];
        let temp = ingre_item.ingredient_data;
        if (ingre_item.ingredient_data) {
          tempColorArray?.map((item) => {
            const colorkeyData = item.replace('color__', 'color_key__');

            if (!item.includes('color__backg_bar')) {
              // Prevent overwriting color__backg_bar colors because
              // They don't exist on defaultPallete
              temp = {
                ...temp,
                [item]: defaultPalette[ingre_item.ingredient_data[colorkeyData]]
              };
            }
            return null;
          });
        }

        let filtered = temp;
        if (temp && temp.hasOwnProperty('margin')) {
          const { _margin, ...filteredTemp } = temp;
          filtered = filteredTemp;
        }
        return {
          page_ingredient: ingre_item.id,
          ingredient_data: filtered
        };
      });

      const response = await renderImage(selectedPageData.page, updatedIngredients);
      if (response.status !== 200) throw new Error('Something went wrong.. Please try again');

      const newImage = response.data.image;

      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.id === selectedPageData.id) {
          return { ...page_item, src: `data:image/png;base64,${newImage}` };
        }
        return page_item;
      });
      const selectItem = updatedSelectedTotalPages.filter(
        (item) => item.id === selectedPageData.id
      )[0];
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      dispatch(
        productBrandingSliceActions.selectPage({
          ...selectItem,
          isUpdate: false
        })
      );

      setIsLoading(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        setErrorMessage('Connectivity error. Please try again');
      } else if (error.response?.data?.errors[0]?.message) {
        setErrorMessage(error.response?.data?.errors[0]?.message);
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

  useEffect(() => {
    if (
      selectedPallete?.isUpdate ||
      selectedBaseColor?.isUpdate ||
      selectedFont?.isUpdate ||
      selectedStyle?.isUpdate
    ) {
      reflectChanges(selectedPage);
    }
  }, [selectedPallete, selectedBaseColor, selectedFont, selectedStyle]);

  useEffect(() => {
    if (selectedPage?.isUpdate) {
      setSelectedItem(selectedPage);
      reflectChanges(selectedPage);
    } else {
      setSelectedItem(selectedPage);
    }
  }, [selectedPage]);

  useEffect(() => {
    dispatch(productBrandingSliceActions.selectPage(selectedItem));
  }, [selectedItem]);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
    setNextDisabledFlag(isDisabled('next'));
  }, [currentIndex, carousel.current]);

  const handleClickItem = (item) => {
    setSelectedItem(item);
    reflectChanges(item);
  };

  const handleOnDrop = async (dragIndex, hoverIndex) => {
    const pages = [...selectedTotalPages];
    const dragItem = pages[dragIndex];

    const prevItem = pages.splice(hoverIndex, 1, dragItem);
    pages.splice(dragIndex, 1, prevItem[0]);

    const orderedItems = pages.map((item, index) => ({
      ...item,
      order: index
    }));

    dispatch(productBatchesSliceActions.setSelectPages(orderedItems));

    const data = orderPreviewPagesPaylaod(orderedItems);
    await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
  };

  const handleOnHover = (_, hoverIndex) => {
    setHoverIndexId(hoverIndex);
  };

  const handleOnEnd = () => {
    setHoverIndexId(null);
  };

  const moveViaDrag = (scrollHandler) => {
    if (isDragScrollEnabled) {
      scrollHandler();
      setIsDragScrollEnabled(false);
      setTimeout(() => {
        setIsDragScrollEnabled(true);
      }, 550);
    }
  };

  const handleClickPaste = async () => {
    const data = duplicatePagePayload(selectedItem);
    const editBookResponse = await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
    const editBookData = editBookResponse.data;
    const itemToDuplicate = selectedTotalPages.find((item) => item.id === selectedItem.id);
    const indexOfItemToDuplicate = selectedTotalPages.findIndex(
      (item) => item.id === selectedItem.id
    );
    const duplicatedItem = structuredClone(itemToDuplicate);

    const duplicatedPages = [
      ...selectedTotalPages.slice(0, indexOfItemToDuplicate),
      duplicatedItem,
      ...selectedTotalPages.slice(indexOfItemToDuplicate)
    ];
    const updatedDuplicatedPages = duplicatedPages.map((item, index) => ({
      ...item,
      id: editBookData.pages[index].id,
      order: editBookData.pages[index].order
    }));

    dispatch(productBatchesSliceActions.setSelectPages(updatedDuplicatedPages));
  };

  const handleClickShow = () => {
    if (productCustomPages.pages.map((x) => x.page).includes(selectedPage.page)) {
      const active = selectedTotalPages.find((x) => x.page === customPageId);
      dispatch(
        productBrandingSliceActions.selectPage({
          ...active,
          isUpdate: false
        })
      );
      reflectChanges(active);
    } else {
      reflectChanges(selectedPage);
    }
  };

  const handleClickDelete = async () => {
    const data = deletePagePayload(selectedItem);
    await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
    const indexOfItem = selectedTotalPages.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (indexOfItem + 1) % selectedTotalPages.length;
    const nextItem = selectedTotalPages[nextIndex];
    const newItems = selectedTotalPages.filter((item) => item.id !== selectedItem.id);
    setSelectedItem(nextItem);

    dispatch(productBatchesSliceActions.setSelectPages(newItems));
  };

  return (
    <>
      <div className={select_con}>
        <p>{selectedItem.system_id}</p>
        <img
          src={selectedItem && selectedItem.src ? selectedItem.src : placeholder}
          alt="selected"
          className={select_con__image}
        />
        <div className={more_con}>
          <button className={more_con__btn} onClick={handleClickDelete}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button className={more_con__btn} onClick={handleClickShow}>
            <img src={showIcon} alt="show icon" className={more_con__btn__eye} />
          </button>
          <button className={more_con__btn} onClick={handleClickPaste}>
            <img src={pasteIcon} alt="paste icon" />
          </button>
        </div>
      </div>
      {isLoading && <LinearProgress color="inherit" />}
      <div className={main}>
        <button
          onClick={movePrev}
          onDragOver={() => moveViaDrag(movePrev)}
          className={arrow_left_btn}
          disabled={isDisabled('prev')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={arrow_img}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={moveNext}
          onDragOver={() => moveViaDrag(moveNext)}
          className={arrow_right_btn}
          disabled={nextDisabledFlag}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={arrow_img}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className={container}>
          <div className={carousel_con}>
            <div ref={carousel} className={body_con}>
              {selectedTotalPages.map((resource, index) => (
                <DndCard
                  key={resource.id}
                  index={index}
                  id={resource.id}
                  selectedId={selectedItem.id}
                  imageUrl={resource.src}
                  onDrop={handleOnDrop}
                  onHover={handleOnHover}
                  onHoverOutside={() => setHoverIndexId(null)}
                  onEnd={handleOnEnd}
                  onClick={() => handleClickItem(resource)}
                  className={`${
                    carousel.current &&
                    selectedTotalPages.length > 4 &&
                    carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
                      ? body_con__last_dnd
                      : body_con__dnd
                  } ${index === hoverIndexId && hover_selected}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={errorFlag} />
    </>
  );
}

export default CustomSlideShow;
