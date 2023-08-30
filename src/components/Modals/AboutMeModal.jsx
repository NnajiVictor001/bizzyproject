import React, { useState, useEffect, useRef, useCallback } from 'react';

import closeMark from 'img/close.svg';
import InputRefresh from 'components/InputFields/InputRefresh';
import DropZone from 'components/Dropzone/DropZone';
import NavButton from 'components/Buttons/NavButton';
import SelectImages from 'components/Layouts/SelectImages';
import DialogChangeColor from 'helpers/DialogChangeColor';
import Pallete from 'components/SlideShow/Pallete';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { productCustomPagesSliceActions } from 'store/product-custom-pages';
import { CircularProgress } from '@mui/material';
import InputRichText from 'components/InputFields/InputRichText';
import { convertFileToBase64 } from 'helpers/image';
import ApiService from 'helpers/api';
import { FlexBox } from 'components/Common/Block';
import { useQuery } from 'react-query';
import { useRenderImage } from 'hooks/renderImage';
import styles from './AboutMeModal.module.scss';

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

function AboutMeModal(props) {
  const {
    popup,
    popup__content,
    popup__content__header,
    popup__content__header__closeBtn,
    popup__content__body,
    popup__content__body__right_con,
    upper_body,
    title,
    full_width,
    custom_textarea,
    bottom_con
  } = styles;
  const { setIsOpenAboutMeModal, callback } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [idHeadingChanged, setIdHeadingChanged] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const { renderImage } = useRenderImage();

  const productCustomPages = useSelector((state) => state.productCustomPages);
  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);

  const updateImagePreviews = async (data) => {
    setIsUploading(true);
    try {
      const iterateData = data || { ...productCustomPages };
      const renderImagesPayload = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const page of iterateData.pages) {
        let ingredientData = {
          ...iterateData
        };

        if (iterateData.media__photo) {
          let base64Image = iterateData.media__photo;
          if (iterateData.media__photo instanceof File) {
            // eslint-disable-next-line no-await-in-loop
            base64Image = await convertFileToBase64(iterateData.media__photo);
          }

          ingredientData = {
            ...ingredientData,
            media__photo: base64Image
          };
        } else {
          delete ingredientData.media__photo;
        }

        const aboutMeIngredients = [
          {
            page_ingredient: page.ingredients[0].id,
            ingredient_data: ingredientData
          }
        ];
        renderImagesPayload.push({
          id: page.page,
          ingredients: aboutMeIngredients
        });
      }

      const imagesResponse = await Promise.all(
        renderImagesPayload.map((item) => renderImage(item.id, item.ingredients))
      );
      const updatedPages = iterateData.pages.map((x, index) => ({
        ...x,
        image_preview: `data:image/png;base64,${imagesResponse[index].data.image}`
      }));
      const activePreview = updatedPages.find((x) => x.page === iterateData.page)?.image_preview;

      dispatch(
        productCustomPagesSliceActions.setCustomPagesData({
          image_preview: activePreview,
          pages: updatedPages
        })
      );
      setIsUploading(false);
    } catch {
      setIsUploading(false);
    }
  };

  const debounced = useDebouncedCallback((data) => {
    updateImagePreviews(data);
  }, 1500);

  const onAboutMeSuccess = (data) => {
    const pagesData = data.results.map((x) => ({
      page: x.id,
      image_preview: x.image_preview,
      ingredients: x.ingredients
    }));
    const firstPage = data.results[0];
    const aboutMeDefaultData = {
      page: firstPage.id,
      ingredients: firstPage.ingredients,
      variables: firstPage.variables,
      image_preview: firstPage.image_preview,
      text__blurp_nolimit_a2:
        firstPage.ingredients[0].ingredient_metadata.text__blurp_nolimit_a2.default,
      text__headline_a1: firstPage.ingredients[0].ingredient_metadata.text__headline_a1.default,
      text__headline_a3: firstPage.ingredients[0].ingredient_metadata.text__headline_a3.default,
      active: true,
      color__headline_a1: selectedBaseColor?.value || '#000000',
      color__headline_a3: selectedBaseColor?.value || '#000000',
      addPhoto: false,
      addLogo: false,
      media__photo: null,
      media__logo: null,
      pages: pagesData,
      initialLoad: true
    };
    dispatch(productCustomPagesSliceActions.setCustomPagesData(aboutMeDefaultData));
  };

  const { isLoading: isAboutMePagesLoading } = useQuery(
    'about-me-pages',
    () => ApiService.get('/book-generator/pages/?type=about_me'),
    {
      onSuccess: (response) => onAboutMeSuccess(response.data),
      enabled: !productCustomPages.initialLoad,
      refetchOnWindowFocus: false
    }
  );

  const handleClickOutside = () => {
    if (!showPopup) setIsOpenAboutMeModal(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handleImageClick = (page) => {
    setIsUploading(true);
    const data = [...productCustomPages.pages].map((x) => ({
      ...x,
      active: x.page === page.page
    }));
    const { ingredients } = [...productCustomPages.pages].find((x) => x.page === page.page);

    dispatch(
      productCustomPagesSliceActions.setCustomPagesData({
        pages: data,
        page: page.page,
        image_preview: page.image_preview,
        ingredients
      })
    );
    setIsUploading(false);
  };
  const handleInputsUpdate = useCallback((key, value) => {
    setIsUploading(true);
    const addMedia = key === 'media__photo' && value ? { addPhoto: true } : { addPhoto: false };

    const data = {
      ...productCustomPages,
      [key]: value,
      ...(addMedia && addMedia)
    };
    dispatch(productCustomPagesSliceActions.setCustomPagesData(data));
    debounced(data);
    setIsUploading(false);
  });

  const heading1InputClickHandler = () => {
    console.log('Refresh -> Heading 1');
  };

  const heading2InputClickHandler = (_evt) => {
    console.log('Refresh -> Heading 3');
  };

  const handleResultButton = () => {
    setIsLoading(true);
    callback(productCustomPages);
    dispatch(
      productCustomPagesSliceActions.setCustomPageId({
        customPageId: productCustomPages.page
      })
    );
    setIsOpenAboutMeModal(false);
    setIsLoading(false);
  };

  const changeColorHandler = (id) => {
    setIdHeadingChanged(id);
    setShowPopup(true);
  };

  const selectColor = async (color) => {
    if (idHeadingChanged === 'heading1') {
      handleInputsUpdate('color__headline_a1', color);
    } else if (idHeadingChanged === 'heading2') {
      handleInputsUpdate('color__headline_a3', color);
    }
  };

  const productPallete = (
    <Pallete resource={selectedPallete} chooseOneColorFromPallete selectColor={selectColor} />
  );

  if (isLoading || isAboutMePagesLoading) {
    return (
      <div className={popup}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className={popup}>
      <div className={popup__content} ref={ref}>
        <div className={popup__content__header}>
          <button
            className={popup__content__header__closeBtn}
            onClick={() => setIsOpenAboutMeModal(false)}>
            <img src={closeMark} alt="close mark" />
          </button>
        </div>
        <div className={popup__content__body}>
          {isUploading ? (
            <FlexBox style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </FlexBox>
          ) : (
            <SelectImages
              aboutMePages={productCustomPages}
              productCustomPages={productCustomPages}
              handleImageClick={handleImageClick}
            />
          )}

          <div className={popup__content__body__right_con}>
            <div className={upper_body}>
              <p className={title}>Tell Us About Yourself. Create an “About Me” Page.</p>
              <InputRefresh
                type="text"
                id="heading1"
                value={productCustomPages?.text__headline_a1}
                pickerBgColor={productCustomPages?.color__headline_a1}
                onChange={(e) => handleInputsUpdate('text__headline_a1', e.target.value)}
                onClick={heading1InputClickHandler}
                placeholder="Heading"
                refresh={false}
                changeColorHandler={changeColorHandler}
              />
              <InputRefresh
                type="text"
                id="heading2"
                refresh={false}
                value={productCustomPages?.text__headline_a3}
                pickerBgColor={productCustomPages?.color__headline_a3}
                onChange={(e) => handleInputsUpdate('text__headline_a3', e.target.value)}
                onClick={heading2InputClickHandler}
                placeholder="Heading"
                changeColorHandler={changeColorHandler}
              />
              <div className={full_width}>
                <InputRichText
                  type="text"
                  textArea
                  pickerNo
                  id="tellus"
                  value={productCustomPages?.text__blurp_nolimit_a2}
                  onChange={(value) => handleInputsUpdate('text__blurp_nolimit_a2', value)}
                  placeholder="Tell Us About You"
                  className={custom_textarea}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                {/* <InputCheckbox
                  id="addphoto"
                  checked={productCustomPages?.addPhoto}
                  onChange={(e) => {
                    handleInputsUpdate("addPhoto", e.target.checked);
                  }}
                  label="Add Your Photo"
                /> */}
                {/* <div className={logo_con}>
                <InputCheckbox
                  id="addlogo"
                  checked={productCustomPages?.addLogo}
                  onChange={(e) =>
                    handleInputsUpdate("addLogo", e.target.checked)
                  }
                  label="Add Logo"
                />
              </div> */}
                <DropZone
                  id="about_me_dropzone"
                  onUpload={(file) => handleInputsUpdate('media__photo', file)}
                  onDelete={() => handleInputsUpdate('media__photo', null)}
                />

                {/* <MyDropzone
                id="second_dropzone"
                disabled={!productCustomPages?.addLogo}
                callback={(file) => handleInputsUpdate("media__logo", file[0])}
              /> */}
              </div>
              <div className={bottom_con}>
                <NavButton
                  type="button"
                  txt="Awesome!! Add To My Product"
                  bgColor="#FFC800"
                  onClick={handleResultButton}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogChangeColor
          onClose={() => {
            setShowPopup(false);
          }}
          open={showPopup}
          handleItem={changeColorHandler}
          pallete={productPallete}
        />
      </div>
    </div>
  );
}

export default AboutMeModal;
