import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import InputRefresh from 'components/InputFields/InputRefresh';
import Input from 'components/InputFields/Input';
import ImageSlideShow from 'components/SlideShow/ImageSlideShow';
import { looksGoodProductKindActions } from 'helpers/looksGoodProductKindActions';
import { productBrandingSliceActions } from 'store/product-branding';
import { typeList } from 'constants/typeList';
import { useRenderImage } from 'hooks/renderImage';
import { useBookCreation } from 'hooks/bookCreation';
import PageLoader from 'components/Common/PageLoader';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { CircularProgress } from '@mui/material';
import { FlexBox } from 'components/Common/Block';
import { useAlert } from 'hooks/alert';
import styles from './ProductTitleCoverForm.module.scss';

function ProductTitleCoverForm() {
  const {
    form,
    form__bottom,
    form__first_con,
    form__first_con__title,
    form__first_con__type,
    form__first_con__plus,
    form__subtitle_con,
    form__carousel_upper,
    form__carousel_upper__cover,
    loading
  } = styles;
  const { renderImage } = useRenderImage();
  const { editBookMutation, editTitleAndCover } = useBookCreation();

  const [titlePhraseArray, setTitlePhraseArray] = useState([]);
  const [subTitleArray, setSubTitleArray] = useState([]);
  const [isCoversLoading, setIsCoversLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);

  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const productName = useSelector((state) => state.productBranding.productName);
  const coversData = useSelector((state) => state.productBranding.coversData);
  const selectedCover = useSelector((state) => state.productBranding.selectedCover);

  const selectedBatches = useSelector((state) => state.productBatches.selectedBatches);

  const selectedProductType = useSelector((state) => state.productType.selectedProductType);

  const activeProductKind = useSelector((state) => state.productBranding.activeProductKind);

  const titleGenerator = useSelector((state) => state.productBranding.titleGenerator);
  const typeValue = useSelector((state) => state.productBranding.typeValue);
  const productSubTitle = useSelector((state) => state.productBranding.productSubTitle);

  const selectedBookData = useSelector((state) => state.createdBook.bookData);

  const updateCoverPreviews = async () => {
    if (!productName) {
      addAlert('Please Fill Out Title Field');
      return;
    }
    if (!productSubTitle) {
      addAlert('Please Fill Out Sub Title Field');
      return;
    }
    setIsCoversLoading(true);
    try {
      const imagesResponse = await Promise.all(
        coversData.map((item) =>
          renderImage(item.id, [], true, {
            title: productName,
            subtitle: productSubTitle
          })
        )
      );
      const updatedCoversData = coversData.map((item, index) => ({
        ...item,
        image_preview: `data:image/png;base64,${imagesResponse[index].data.image}`
      }));
      dispatch(productBrandingSliceActions.setCoversData(updatedCoversData));
      setIsCoversLoading(false);
    } catch (error) {
      setIsCoversLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      updateCoverPreviews();
    }
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const makeRandom = (array) => array[Math.floor(Math.random() * array.length)];

  const titleGeneratorInputClickHandler = async () => {
    if (titlePhraseArray.length > 0) {
      const item = makeRandom(titlePhraseArray.filter((value) => value !== titleGenerator));
      dispatch(productBrandingSliceActions.setTitleGenerator(item));
      dispatch(productBrandingSliceActions.setProductName(`${item} ${typeValue}`));
      setTimeLeft(3);
    }
  };

  const typeInputClickHandler = async () => {
    if (selectedProductType?.name) {
      const item = makeRandom(
        typeList[selectedProductType?.name || 0].filter((value) => value !== typeValue)
      );
      dispatch(productBrandingSliceActions.setTypeValue(item));
      dispatch(productBrandingSliceActions.setProductName(`${titleGenerator} ${item}`));
      setTimeLeft(3);
    }
  };

  const generatedTitleInputChangeHandler = (evt) => {
    dispatch(productBrandingSliceActions.setProductName(evt.target.value));
  };

  const subTitleInputChangeHandler = (evt) => {
    dispatch(productBrandingSliceActions.setProductSubTitle(evt.target.value));
  };

  const subTitleInputClickHandler = async () => {
    if (subTitleArray.length > 0) {
      const item = makeRandom(subTitleArray.filter((value) => value !== productSubTitle));
      dispatch(productBrandingSliceActions.setProductSubTitle(item));
      setTimeLeft(3);
    }
  };

  const handleCoverBackground = () => {};

  const handleSelectedData = (data) => {
    dispatch(productBrandingSliceActions.selectCover(data));
  };

  const looksGoodInputHandler = async () => {
    if (!productName) {
      addAlert('Please Fill Out Title Field');
      return;
    }
    if (!productSubTitle) {
      addAlert('Please Fill Out Sub Title Field');
      return;
    }
    await editTitleAndCover();
    looksGoodProductKindActions({ id: 4 });
  };

  useEffect(() => {
    if (activeProductKind.id === 3) {
      let selectedPages = [];
      if (Object.keys(selectedBookData).length > 0) {
        const eachPage = selectedBookData?.pages?.map((item) => item.page);
        selectedPages = selectedPages.concat(eachPage);
      } else if (selectedBatches && selectedBatches.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const batch of selectedBatches) {
          const eachPage = batch.pages.map((item) => item.page);
          selectedPages = selectedPages.concat(eachPage);
        }
      }
      const titleArray = [];
      selectedPages.forEach((title) => {
        let textArray = [];
        if (title.name.length > 0) {
          textArray = title.name.split(' ');
        }

        if (textArray.length === 1) {
          titleArray.push(textArray[0]);
        } else if (textArray.length > 1) {
          titleArray.push(title.name.substring(0, title.name.lastIndexOf(' ')));
        }
      });
      const subTitleArr = selectedPages
        .filter((x) => !x.name.includes('CustomPage'))
        .map((subTitle) => subTitle.wording.promise)
        .filter((subTitle) => subTitle.length > 0);
      setTitlePhraseArray(titleArray);
      setSubTitleArray(subTitleArr);
    }
  }, [activeProductKind]);

  return (
    <div className={form}>
      {editBookMutation.isLoading ? (
        <div className={loading}>
          <PageLoader text="Applying Title and Cover..." />
        </div>
      ) : (
        <div>
          <div className={form__first_con}>
            <div className={form__first_con__title}>
              <InputRefresh
                type="text"
                id="titlegenerator"
                value={titleGenerator}
                pickerNo
                onClick={titleGeneratorInputClickHandler}
                placeholder="Title Generator"
              />
            </div>
            <p className={form__first_con__plus}>+</p>
            <div className={form__first_con__type}>
              <InputRefresh
                type="text"
                id="type"
                value={typeValue}
                pickerNo
                onClick={typeInputClickHandler}
                placeholder="Type"
              />
            </div>
          </div>
          <Input
            type="text"
            id="generatedTitle"
            onBlur={() => updateCoverPreviews()}
            value={productName}
            placeholder="Generated Title...OR Enter Your Own"
            onChange={generatedTitleInputChangeHandler}
          />
          <div className={form__subtitle_con}>
            <InputRefresh
              type="text"
              id="subTitle"
              value={productSubTitle}
              pickerNo
              onBlur={() => updateCoverPreviews()}
              onChange={subTitleInputChangeHandler}
              onClick={subTitleInputClickHandler}
              placeholder="Subtitle"
            />
          </div>
          <div className={form__carousel_upper}>
            <p className={form__carousel_upper__cover} onClick={handleCoverBackground}>
              Cover Background
            </p>
            {/* <p className={form__carousel_upper__more} onClick={handleSeeMore}>
          See More Like This
        </p> */}
          </div>
          {isCoversLoading ? (
            <FlexBox
              style={{
                justifyContent: 'center',
                minHeight: '164px',
                alignItems: 'center'
              }}>
              <CircularProgress />
            </FlexBox>
          ) : (
            <ImageSlideShow
              data={coversData}
              selectedData={selectedCover}
              handleSelectedData={handleSelectedData}
            />
          )}
          <div className={form__bottom}>
            <InputCheckboxCustom
              id="addtitlecoverpage"
              checked
              onChange={looksGoodInputHandler}
              label="Looks Good! NEXT"
            />
          </div>
        </div>
      )}
      <ErrorMessageSnackbar message="Something Went Wrong..." severity="error" open={isError} />
    </div>
  );
}

export default ProductTitleCoverForm;
