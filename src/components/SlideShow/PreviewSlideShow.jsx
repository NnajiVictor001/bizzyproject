import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DndCard from 'components/Cards/DndCard';
import HTMLFlipBook from 'react-pageflip';

import placeholder from 'img/batch_placeholder.png';
import dragIcon from 'img/dragIcon.png';
import { useBookCreation } from 'hooks/bookCreation';
import { productBatchesSliceActions } from 'store/product-batches';
import styles from './PreviewSlideShow.module.scss';

const PageCover = React.forwardRef((props, ref) => {
  const { page, page__cover, page__content } = styles;
  return (
    <div className={`${page} ${page__cover}`} ref={ref}>
      <div className={page__content}>{props.children}</div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  const { page, page__content } = styles;
  return (
    <div className={page} ref={ref}>
      <div className={page__content}>
        <img
          src={props.imageUrl ? props.imageUrl : placeholder}
          alt={`preview-select${props.index}`}
        />
      </div>
    </div>
  );
});

function PreviewSlideShow(props) {
  const dispatch = useDispatch();
  const { editBookMutation, orderPreviewPagesPaylaod } = useBookCreation();
  const { handleSelectedImage } = props;

  const cover = useSelector((state) => state.productBranding.selectedCover);
  const editBookId = useSelector((state) => state.createdBook.editBookId);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);

  const flipBook = useRef();
  const carousel = useRef(null);
  const maxScrollWidth = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});

  const [selectItems, setSelectItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const totalPage = data.length + 2;
  const [flipBookHeight, setFlipBookHeight] = useState();
  const [flipBookWidth, setFlipBookWidth] = useState();
  const [isDragScrollEnabled, setIsDragScrollEnabled] = useState(true);
  const [hoverIndexId, setHoverIndexId] = useState(null);

  const {
    select_con,
    main,
    container,
    carousel_con,
    arrow_left_btn,
    arrow_right_btn,
    arrow_img,
    body_con,
    item_body,
    item_body__number,
    item_body__dndPlaceholder,
    item_body__dnd,
    hover_selected,
    preview_image,
    select_preview
  } = styles;

  const nextButtonClick = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current.pageFlip().flipPrev();
  };

  const onPage = (e) => {
    setCurrentPage(e.data);
  };

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 0.5);
    }
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

  const handleOnDrop = async (dragIndex, hoverIndex) => {
    const pages = [...selectedTotalPages];
    const dragItem = pages[dragIndex - 1];

    const prevItem = pages.splice(hoverIndex - 1, 1, dragItem);
    pages.splice(dragIndex - 1, 1, prevItem[0]);

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
    setHoverIndexId(hoverIndex - 1);
  };

  const handleOnEnd = () => {
    setHoverIndexId(null);
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 0.5);
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

    const screenWidth = window.innerWidth;
    if (screenWidth >= 1800) {
      setFlipBookHeight(453);
      setFlipBookWidth(350);
    } else if (screenWidth >= 1760) {
      setFlipBookHeight(388);
      setFlipBookWidth(300);
    } else if (screenWidth >= 1360) {
      setFlipBookHeight(259);
      setFlipBookWidth(200);
    } else if (screenWidth >= 1200) {
      setFlipBookHeight(259);
      setFlipBookWidth(200);
    } else if (screenWidth >= 600) {
      setFlipBookHeight(207);
      setFlipBookWidth(160);
    } else {
      setFlipBookHeight(129);
      setFlipBookWidth(100);
    }
  }, []);

  function itemExists(array, item) {
    return array.some((el) => el === item);
  }

  const handleClickItem = (item, index) => {
    setSelectedItem(item);

    const flipIndex = index === 0 ? 1 : index;
    const flipNumber = Math.ceil(Math.abs(flipIndex - currentPage) / 2);

    for (let i = 0; i < flipNumber; i++) {
      if (flipIndex + 1 > currentPage) {
        flipBook.current.pageFlip().flipNext();
      }
      if (flipIndex + 1 < currentPage) {
        flipBook.current.pageFlip().flipPrev();
      }
    }

    if (!itemExists(selectItems, item)) {
      const temp = [...selectItems];
      temp.push(item);
      setSelectItems(temp);
      handleSelectedImage(temp);
    }
  };

  return (
    <>
      <div className={select_con}>
        <button onClick={prevButtonClick} className={arrow_left_btn} disabled={currentPage === 0}>
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
        <HTMLFlipBook
          width={flipBookWidth}
          height={flipBookHeight}
          maxShadowOpacity={0.5}
          showCover
          mobileScrollSupport
          onFlip={onPage}
          ref={flipBook}>
          <PageCover>
            <img src={cover.image_preview} alt="cover" />
          </PageCover>
          {selectedTotalPages.map((item, index) => (
            <Page imageUrl={item.src} index={index} key={index} />
          ))}
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
        <button
          onClick={nextButtonClick}
          className={arrow_right_btn}
          disabled={
            currentPage === selectedTotalPages.length ||
            currentPage === selectedTotalPages.length + 1
          }>
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
      </div>
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
          disabled={isDisabled('next')}>
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
              <div className={item_body}>
                <div className={item_body__dndPlaceholder}>
                  <img src={dragIcon} alt="drag" />
                </div>
              </div>
              <div className={item_body} key={cover.id}>
                <img
                  src={cover.image_preview}
                  alt="cover"
                  className={`${preview_image} ${
                    Object.keys(selectedItem).length === 0 && select_preview
                  }`}
                />
                <p className={item_body__number}>1</p>
              </div>
              {selectedTotalPages.map((resource, index) => (
                <div className={item_body} key={index}>
                  <DndCard
                    index={index + 1}
                    id={resource.id}
                    selectedId={selectedItem.id}
                    imageUrl={resource.src}
                    onDrop={handleOnDrop}
                    onHover={handleOnHover}
                    onHoverOutside={() => setHoverIndexId(null)}
                    onEnd={handleOnEnd}
                    onClick={() => handleClickItem(resource, index)}
                    className={`${item_body__dnd} ${index === hoverIndexId && hover_selected}`}
                  />
                  <p className={item_body__number}>{index + 2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewSlideShow;
