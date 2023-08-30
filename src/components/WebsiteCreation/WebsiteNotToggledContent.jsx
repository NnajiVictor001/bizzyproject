import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import PickMyBaseTextColor from 'components/Products/PickMyBaseTextColor';
import Input from 'components/InputFields/Input';
import Pallete from 'components/SlideShow/Pallete';
import DialogChangeColor from 'helpers/DialogChangeColor';
import InputWithVisibility from 'components/InputFields/InputWithVisibility';
import TextAreaRefresh from 'components/InputFields/TextAreaRefresh';
import ApiService from 'helpers/api';

import { productTypeSliceActions } from 'store/product-type';
import { CircularProgress } from '@mui/material';
import DropZone from 'components/Dropzone/DropZone';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import { convertColorsToPallete } from 'helpers/pallete';
import { useAlert } from 'hooks/alert';
import styles from './WebsiteNotToggledContent.module.scss';
import EditUserColors from './EditUserColors';
import ConditionalRender from './ConditionalRender';

function WebsiteNotToggledContent(props) {
  const {
    card__topRow,
    card__left,
    card__valueBoxes__valueBox,
    card__valueBoxes__valueBox__input,
    card__right,
    card__left__title,
    card__valueBoxes,
    card__divider,
    card__inputsContainer,
    card__input,
    card__inputPlaceholder,
    card__chooseFileContainer,
    card__colorBoxes,
    card__colorBoxesCont,
    card__header,
    selectedItem,
    flex,
    flex__editCol,
    marBottom,
    warning,
    warning_col,
    warning_cont,
    card__dropZone
  } = styles;

  const { websiteMainData, setWebsiteMainData, lead, bookType } = props;

  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const { refreshActions, updateSpButtonPrice, updateSpSidebarShortBlurp } = useWebsiteCreation();

  const price = useSelector((state) => state.productType.productPrice);
  const hasSalesPageId = useSelector((state) => state.webCreation.hasSalesPageId);
  const newAboutImage = useSelector((state) => state.productType.newAboutImage);
  const problemWordings = useSelector((state) => state.webCreation.problemWordings);
  const problemWordingsLength = useSelector((state) => state.webCreation.problemWordingsLength);
  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const aboutImage = useSelector((state) => state.productType.aboutImage);
  const refreshPhrasesCountByInput = useSelector(
    (state) => state.webCreation.refreshPhrasesCountByInput
  );

  const colorPalette = convertColorsToPallete(defaultPalette);
  const [customPriceSelected, setCustomPriceSelected] = useState(false);
  const [idHeadingChanged, setIdHeadingChanged] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [inputPrice, setInputPrice] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const selectPrice = (evt) => {
    const value = evt.target.innerText;
    if (['$7.99', '$13.99'].includes(value)) {
      setCustomPriceSelected(false);
      const cleaned = value.replace('$', '');
      dispatch(productTypeSliceActions.changeProductPrice(+cleaned));

      const updatedSpButton = updateSpButtonPrice(websiteMainData?.sp_button?.val, value, 'sales');
      const updateSpSideBarShortBlurp = updateSpSidebarShortBlurp(
        websiteMainData?.sp_sidebar_shortblurp?.val,
        value
      );

      setWebsiteMainData((prev) => ({
        ...prev,
        sp_button: {
          ...prev.sp_button,
          val: updatedSpButton
        },
        sp_sidebar_shortblurp: {
          ...prev.sp_sidebar_shortblurp,
          val: updateSpSideBarShortBlurp
        }
      }));
    } else {
      setCustomPriceSelected(true);
    }
  };

  const inputPriceHandler = (evt) => {
    const { value } = evt.target;

    setInputPrice(value);
    const updatedSpButton = updateSpButtonPrice(
      websiteMainData?.sp_button?.val,
      `$${value}`,
      'sales'
    );

    const updateSpSideBarShortBlurp = updateSpSidebarShortBlurp(
      websiteMainData?.sp_sidebar_shortblurp?.val,
      `$${value}`
    );

    setWebsiteMainData((prev) => ({
      ...prev,
      sp_button: {
        ...prev.sp_button,
        val: updatedSpButton
      },
      sp_sidebar_shortblurp: {
        ...prev.sp_sidebar_shortblurp,
        val: updateSpSideBarShortBlurp
      }
    }));

    dispatch(productTypeSliceActions.changeProductPrice(evt.target.value));
  };

  const changeColorHandler = (id) => {
    setIdHeadingChanged(id);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const hideElements = (keys) => {
    const copiedData = { ...websiteMainData };
    keys.forEach((key) => {
      copiedData[key] = {
        ...copiedData[key],
        hidden: true
      };
    });
    setWebsiteMainData(copiedData);
  };

  const unHideElements = (keys) => {
    const copiedData = { ...websiteMainData };
    keys.forEach((key) => {
      copiedData[key] = {
        ...copiedData[key],
        hidden: false
      };
    });
    setWebsiteMainData(copiedData);
  };

  useEffect(() => {
    const lessProblemKeys = [
      'ws_objcrush_shortblurp_2',
      'ws_objcrush_shortblurp_3',
      'ws_objcrush_shortblurp_4'
    ];
    const moreProblemKeys = [
      'ws_this_heading_a',
      'ws_this_shortBlurp1',
      'ws_this_shortBlurp2',
      'ws_this_shortBlurp3'
    ];

    if (problemWordingsLength < 3) {
      hideElements(lessProblemKeys);
      unHideElements(moreProblemKeys);
    } else {
      unHideElements(lessProblemKeys);
      hideElements(moreProblemKeys);
    }

    const notLeadKeys = ['sp_cta_v3_heading_b', 'sp_cta_v3_heading_a'];
    if (lead) {
      hideElements(notLeadKeys);
    }
  }, []);

  const handleWebsiteColorsUpdate = (color) => {
    setWebsiteMainData((prev) => ({
      ...prev,
      [idHeadingChanged]: {
        ...prev[idHeadingChanged],
        color
      }
    }));
  };

  const productPallete = (
    <Pallete
      resource={colorPalette}
      chooseOneColorFromPallete
      selectColor={(color) => handleWebsiteColorsUpdate(color)}
    />
  );

  const fileUpload = async (files) => {
    setIsUploading(true);
    const imageUrl = URL.createObjectURL(files);
    dispatch(productTypeSliceActions.addNewAboutImage(imageUrl));
    dispatch(productTypeSliceActions.addNewAboutImageFile(files));
    const element = document.getElementById('aboutMeHeading');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    addAlert('Image has been successfully uploaded', 'success');
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const removeUploadedImage = async () => {
    setIsUploading(true);
    if (newAboutImage) {
      dispatch(productTypeSliceActions.addNewAboutImage(null));
      if (hasSalesPageId && aboutImage) {
        const apiData = {
          type: 'about_me_1'
        };
        const response = await ApiService.delete(`/sales/sales-page/${hasSalesPageId}/media/`, {
          data: apiData
        });
        if (response.status === 204) {
          dispatch(productTypeSliceActions.addNewAboutImage(null));
          addAlert('Image has been successfully removed', 'success');
          setIsUploading(false);
        } else {
          addAlert('Something went wrong, Please try again', 'error');
          setIsUploading(false);
        }
      } else {
        dispatch(productTypeSliceActions.addNewAboutImage(null));
        addAlert('Image has been successfully removed', 'success');
        setIsUploading(false);
      }
    } else {
      addAlert('There is no image uploaded', 'error');
      setIsUploading(false);
    }
  };

  const handleHideElements = (name) => {
    setWebsiteMainData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        hidden: !prev[name].hidden
      }
    }));
  };

  const handleTextAreaRefreshUpdates = (name, value) => {
    setWebsiteMainData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        val: value
      }
    }));
  };

  const handleWebsiteDataUpdate = (event) => {
    const { name, value } = event.target;
    setWebsiteMainData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        val: value
      }
    }));
  };

  const handleWebsiteDataRefresh = (key) => {
    let value;
    if (key === 'sp_stickybar_heading_b') {
      value = refreshActions.refresh_sp_stickybar_heading_b(
        websiteMainData?.sp_stickybar_heading_b?.val
      );
    }
    if (key === 'sp_button') {
      value = refreshActions.refresh_sp_button(websiteMainData?.sp_button?.val);
    }
    if (key === 'ws_cta_v2_heading_b') {
      value = refreshActions.refresh_ws_cta_v2_heading_b(websiteMainData?.ws_cta_v2_heading_b?.val);
    }
    if (key === 'ws_cta_v2_heading_a') {
      value = refreshActions.refresh_ws_cta_v2_heading_a(
        websiteMainData?.ws_cta_v2_heading_a?.val,
        bookType
      );
    }
    if (key === 'ws_sidebar_textbox_a') {
      value = refreshActions.refresh_ws_sidebar_textbox_a(
        websiteMainData?.ws_sidebar_textbox_a?.val
      );
    }

    if (key === 'ws_sidebar_textbox_b') {
      value = refreshActions.refresh_ws_sidebar_textbox_b(
        websiteMainData?.ws_sidebar_textbox_b?.val
      );
    }
    if (key === 'ws_sidebar_textbox_c') {
      value = refreshActions.refresh_ws_sidebar_textbox_c(
        websiteMainData?.ws_sidebar_textbox_c?.val
      );
    }
    if (key === 'sp_sidebar_shortblurp') {
      value = refreshActions.refresh_sp_sidebar_shortblurp(
        websiteMainData?.sp_sidebar_shortblurp?.val
      );
    }
    if (key === 'ws_objcrush_heading_a') {
      value = refreshActions.refresh_ws_objcrush_heading_a(
        websiteMainData?.ws_objcrush_heading_a?.val
      );
    }
    if (key === 'ws_objcrush_shortblurp_1') {
      value = refreshActions.refresh_ws_objcrush_shortblurp_1(
        websiteMainData?.ws_objcrush_shortblurp_1?.val
      );
    }
    if (key === 'ws_objcrush_shortblurp_2') {
      value = refreshActions.refresh_ws_objcrush_shortblurp_2(
        websiteMainData?.ws_objcrush_shortblurp_2?.val
      );
    }
    if (key === 'ws_objcrush_shortblurp_3') {
      value = refreshActions.refresh_ws_objcrush_shortblurp_3(
        websiteMainData?.ws_objcrush_shortblurp_3?.val
      );
    }
    if (key === 'ws_objcrush_shortblurp_4') {
      value = refreshActions.refresh_ws_objcrush_shortblurp_4(
        websiteMainData?.ws_objcrush_shortblurp_4?.val
      );
    }
    if (key === 'sp_cta_v3_heading_b') {
      value = refreshActions.refresh_sp_cta_v3_heading_b(websiteMainData?.sp_cta_v3_heading_b?.val);
    }
    if (key === 'sp_cta_v3_heading_a') {
      value = refreshActions.refresh_sp_cta_v3_heading_a(websiteMainData?.sp_cta_v3_heading_a?.val);
    }
    if (key === 'ws_this_shortBlurp1') {
      value = refreshActions.refresh_ws_this_shortBlurp1(websiteMainData?.ws_this_shortBlurp1?.val);
    }
    if (key === 'ws_this_shortBlurp2') {
      value = refreshActions.refresh_ws_this_shortBlurp2(websiteMainData?.ws_this_shortBlurp2?.val);
    }
    if (key === 'ws_this_shortBlurp1') {
      value = refreshActions.refresh_ws_this_shortBlurp1(websiteMainData?.ws_this_shortBlurp1?.val);
    }
    if (key === 'ws_this_shortBlurp2') {
      value = refreshActions.refresh_ws_this_shortBlurp2(websiteMainData?.ws_this_shortBlurp2?.val);
    }
    if (key === 'ws_this_shortBlurp3') {
      value = refreshActions.refresh_ws_this_shortBlurp3(websiteMainData?.ws_this_shortBlurp3?.val);
    }
    if (key === 'sp_cart_shortblurp_1') {
      value = refreshActions.refresh_sp_cart_shortblurp_1(
        websiteMainData?.sp_cart_shortblurp_1?.val
      );
    }
    if (key === 'sp_cta_v4_heading_a') {
      value = refreshActions.refresh_sp_cta_v4_heading_a(websiteMainData?.sp_cta_v4_heading_a?.val);
    }

    setWebsiteMainData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        val: value
      }
    }));
  };

  return (
    <div>
      {lead ? (
        <div className={flex}>
          <div className={flex__editCol}>
            <EditUserColors userColors={defaultPalette} heading="Select Color" />
          </div>
          <div className={card__colorBoxes}>
            <h3 className={card__header}>Pick a Base Text Color</h3>
            <PickMyBaseTextColor
              baseColors={defaultPalette}
              className={card__colorBoxesCont}
              noText
            />
          </div>
        </div>
      ) : (
        <div className={card__topRow}>
          <div className={card__left}>
            <div className={card__left__title}>
              <p>Pick Your Price</p>
              <p>Or Set Your Price</p>
            </div>
            <div className={card__valueBoxes}>
              <span
                className={`${card__valueBoxes__valueBox} ${
                  price === 7.99 && !customPriceSelected && selectedItem
                } `}
                onClick={selectPrice}>
                $7.99
              </span>
              <span
                className={`${card__valueBoxes__valueBox} ${
                  price === 13.99 && !customPriceSelected && selectedItem
                } `}
                onClick={selectPrice}>
                $13.99
              </span>
              <span onClick={selectPrice}>
                <input
                  className={card__valueBoxes__valueBox__input}
                  placeholder="$_ _ _ _"
                  type="number"
                  min={0}
                  value={inputPrice}
                  onChange={inputPriceHandler}
                />
              </span>
            </div>
          </div>
          <div className={card__right}>
            <EditUserColors userColors={defaultPalette} heading="Select Color" />
            <div className={card__colorBoxes}>
              <PickMyBaseTextColor
                baseColors={defaultPalette}
                className={card__colorBoxesCont}
                noText
              />
            </div>
          </div>
        </div>
      )}

      <div className={card__inputsContainer}>
        <div className={card__divider} />
        <div className={!websiteMainData?.sp_stickybar_heading_b?.val ? warning : ''}>
          <Link to="header" spy smooth duration={500} containerId="websiteScrollable">
            <Input
              placeholderClass={card__inputPlaceholder}
              className={card__input}
              loader
              placeholder="Heading"
              name="sp_stickybar_heading_b"
              value={websiteMainData?.sp_stickybar_heading_b?.val}
              onChange={handleWebsiteDataUpdate}
              clickHandler={() => handleWebsiteDataRefresh('sp_stickybar_heading_b')}
            />
          </Link>
        </div>
        <div className={!websiteMainData?.sp_button?.val ? warning_col : ''}>
          <Link to="header" spy smooth duration={500} containerId="websiteScrollable">
            <InputWithVisibility
              type="text"
              id="sp_button"
              placeholder="Button"
              name="sp_button"
              visibilityFunctionality={false}
              value={websiteMainData?.sp_button?.val}
              pickerBgColor={websiteMainData?.sp_button?.color}
              onChange={handleWebsiteDataUpdate}
              changeColorHandler={changeColorHandler}
              clickHandler={() => handleWebsiteDataRefresh('sp_button')}
            />
          </Link>
        </div>
        <div
          className={`${
            !websiteMainData?.ws_cta_v2_heading_a?.hidden &&
            !websiteMainData?.ws_cta_v2_heading_a?.val
              ? warning_col
              : ''
          } ${card__input}`}
          style={{ marginBottom: '1rem', marginTop: '3rem' }}>
          <Link
            to="customHeading"
            spy
            smooth
            duration={500}
            containerId="websiteScrollable"
            offset={20}>
            <InputWithVisibility
              type="text"
              id="ws_cta_v2_heading_a"
              name="ws_cta_v2_heading_a"
              showInput={!websiteMainData?.ws_cta_v2_heading_a?.hidden}
              toggleInputVisibility={() => handleHideElements('ws_cta_v2_heading_a')}
              value={websiteMainData?.ws_cta_v2_heading_a?.val}
              pickerBgColor={websiteMainData?.ws_cta_v2_heading_a?.color}
              onChange={handleWebsiteDataUpdate}
              placeholder="Heading"
              changeColorHandler={changeColorHandler}
              clickHandler={() => handleWebsiteDataRefresh('ws_cta_v2_heading_a')}
            />
          </Link>
        </div>
        <ConditionalRender hidden={websiteMainData?.ws_cta_v2_heading_a?.hidden}>
          <div
            className={`${
              !websiteMainData?.ws_cta_v2_heading_b?.val ? warning : ''
            } ${card__input}`}
            style={{ marginBottom: '0.5rem' }}>
            <Link to="customHeading" spy smooth duration={500} containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader={refreshPhrasesCountByInput.ws_cta_v2_heading_b > 1}
                textArea
                rows={2}
                placeholder="Subheading"
                name="ws_cta_v2_heading_b"
                value={websiteMainData?.ws_cta_v2_heading_b?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('ws_cta_v2_heading_b')}
              />
            </Link>
          </div>
          <div
            className={`${!websiteMainData?.ws_sidebar_textbox_a?.val ? warning : ''}`}
            style={{ marginBottom: '0.5rem' }}>
            <Link
              to="forEveryoneMiddlePar"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader={refreshPhrasesCountByInput.ws_sidebar_textbox_a > 1}
                textArea
                rows={4}
                placeholder="Short Blurp"
                name="ws_sidebar_textbox_a"
                value={websiteMainData?.ws_sidebar_textbox_a?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('ws_sidebar_textbox_a')}
              />
            </Link>
          </div>
          <div
            className={`${!websiteMainData?.ws_sidebar_textbox_b?.val ? warning : ''}`}
            style={{ marginBottom: '0.5rem' }}>
            <Link
              to="forEveryoneMiddlePar"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={70}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader={refreshPhrasesCountByInput.ws_sidebar_textbox_b > 1}
                placeholder="Short Blurp"
                name="ws_sidebar_textbox_b"
                value={websiteMainData?.ws_sidebar_textbox_b?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('ws_sidebar_textbox_b')}
              />
            </Link>
          </div>
          <div
            className={`${!websiteMainData?.ws_sidebar_textbox_c?.val ? warning : ''}`}
            style={{ marginBottom: '0.5rem' }}>
            <Link
              to="forEveryoneMiddlePar"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={110}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader={refreshPhrasesCountByInput.ws_sidebar_textbox_c > 1}
                placeholder="Short Blurp"
                name="ws_sidebar_textbox_c"
                value={websiteMainData?.ws_sidebar_textbox_c?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('ws_sidebar_textbox_c')}
                textArea
                rows={3}
              />
            </Link>
          </div>
          <div
            className={`${!websiteMainData?.sp_sidebar_shortblurp?.val ? warning : ''}`}
            style={{ marginBottom: '0.5rem' }}>
            <Link to="forEveryoneLastPar" spy smooth duration={500} containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader
                textArea
                rows={4}
                placeholder="Short Blurp"
                name="sp_sidebar_shortblurp"
                value={websiteMainData?.sp_sidebar_shortblurp?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('sp_sidebar_shortblurp')}
              />
            </Link>
          </div>
        </ConditionalRender>
        <div className={card__divider} />
        <div
          className={`${
            !websiteMainData?.ws_objcrush_heading_a?.hidden &&
            !websiteMainData?.ws_objcrush_heading_a?.val
              ? warning_col
              : ''
          } ${card__input}`}>
          <Link to="mainHeading" spy smooth duration={500} containerId="websiteScrollable">
            <InputWithVisibility
              type="text"
              id="ws_objcrush_heading_a"
              name="ws_objcrush_heading_a"
              showInput={!websiteMainData?.ws_objcrush_heading_a?.hidden}
              toggleInputVisibility={() => handleHideElements('ws_objcrush_heading_a')}
              value={websiteMainData?.ws_objcrush_heading_a?.val}
              pickerBgColor={websiteMainData?.ws_objcrush_heading_a?.color}
              onChange={handleWebsiteDataUpdate}
              placeholder="Heading"
              changeColorHandler={changeColorHandler}
              clickHandler={() => handleWebsiteDataRefresh('ws_objcrush_heading_a')}
            />
          </Link>
        </div>
        <ConditionalRender hidden={websiteMainData?.ws_objcrush_heading_a?.hidden}>
          <div className={!websiteMainData?.ws_objcrush_shortblurp_1?.val ? warning : ''}>
            <Link to="mainSubheading" spy smooth duration={500} containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                loader={refreshPhrasesCountByInput.ws_objcrush_shortblurp_1 > 1}
                placeholder="Short Blurp"
                name="ws_objcrush_shortblurp_1"
                value={websiteMainData?.ws_objcrush_shortblurp_1?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('ws_objcrush_shortblurp_1')}
                textArea
                rows={3}
              />
            </Link>
          </div>
          <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_2?.hidden}>
            <div className={!websiteMainData?.ws_objcrush_shortblurp_2?.val ? warning_cont : ''}>
              <Link to="checkTop" spy smooth duration={500} containerId="websiteScrollable">
                <TextAreaRefresh
                  text={websiteMainData?.ws_objcrush_shortblurp_2?.val}
                  label="Short Blurp"
                  name="shortBlurp2"
                  onInput={(value) =>
                    handleTextAreaRefreshUpdates(
                      'ws_objcrush_shortblurp_2',
                      `${value.topText}{}${value.bottomText}`
                    )
                  }
                  refreshClick={() => handleWebsiteDataRefresh('ws_objcrush_shortblurp_2')}
                  className={marBottom}
                  refresh={problemWordings.length > 3}
                />
              </Link>
            </div>
          </ConditionalRender>
          <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_3?.hidden}>
            <div className={!websiteMainData?.ws_objcrush_shortblurp_3?.val ? warning_cont : ''}>
              <Link to="checkMiddle" spy smooth duration={500} containerId="websiteScrollable">
                <TextAreaRefresh
                  text={websiteMainData?.ws_objcrush_shortblurp_3?.val}
                  label="Short Blurp"
                  name="ws_objcrush_shortblurp_3"
                  onInput={(value) =>
                    handleTextAreaRefreshUpdates(
                      'ws_objcrush_shortblurp_3',
                      `${value.topText}{}${value.bottomText}`
                    )
                  }
                  refreshClick={() => handleWebsiteDataRefresh('ws_objcrush_shortblurp_3')}
                  className={marBottom}
                  refresh={problemWordings.length > 3}
                />
              </Link>
            </div>
          </ConditionalRender>
          <ConditionalRender hidden={websiteMainData?.ws_objcrush_shortblurp_3?.hidden}>
            <div className={!websiteMainData?.ws_objcrush_shortblurp_4?.val ? warning_cont : ''}>
              <Link to="checkBottom" spy smooth duration={500} containerId="websiteScrollable">
                <TextAreaRefresh
                  text={websiteMainData?.ws_objcrush_shortblurp_4?.val}
                  label="Short Blurp"
                  name="ws_objcrush_shortblurp_4"
                  onInput={(value) =>
                    handleTextAreaRefreshUpdates(
                      'ws_objcrush_shortblurp_4',
                      `${value.topText}{}${value.bottomText}`
                    )
                  }
                  refreshClick={() => handleWebsiteDataRefresh('ws_objcrush_shortblurp_4')}
                  className={marBottom}
                  refresh={problemWordings.length > 3}
                />
              </Link>
            </div>
          </ConditionalRender>
        </ConditionalRender>
        <div className={card__divider} />
        <ConditionalRender hidden={lead}>
          <div
            className={`${
              !websiteMainData?.sp_cta_v3_heading_a?.hidden &&
              !websiteMainData?.sp_cta_v3_heading_a?.val
                ? warning_col
                : ''
            } ${card__input}`}>
            <Link to="secondaryHeading" spy smooth duration={500} containerId="websiteScrollable">
              <InputWithVisibility
                type="text"
                id="sp_cta_v3_heading_a"
                name="sp_cta_v3_heading_a"
                showInput={!websiteMainData?.sp_cta_v3_heading_a?.hidden}
                toggleInputVisibility={() => handleHideElements('sp_cta_v3_heading_a')}
                value={websiteMainData?.sp_cta_v3_heading_a?.val}
                pickerBgColor={websiteMainData?.sp_cta_v3_heading_a?.color}
                onChange={handleWebsiteDataUpdate}
                placeholder="Heading"
                changeColorHandler={changeColorHandler}
                clickHandler={() => handleWebsiteDataRefresh('sp_cta_v3_heading_a')}
              />
            </Link>
          </div>
          <ConditionalRender hidden={websiteMainData?.sp_cta_v3_heading_a?.hidden}>
            <div className={!websiteMainData?.sp_cta_v3_heading_b?.val ? warning : ''}>
              <Link
                to="secondarySubheading"
                spy
                smooth
                duration={500}
                containerId="websiteScrollable">
                <Input
                  placeholderClass={card__inputPlaceholder}
                  className={card__input}
                  loader={refreshPhrasesCountByInput.sp_cta_v3_heading_b > 1}
                  placeholder="Heading"
                  name="sp_cta_v3_heading_b"
                  value={websiteMainData?.sp_cta_v3_heading_b?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('sp_cta_v3_heading_b')}
                />
              </Link>
            </div>
          </ConditionalRender>
          <div className={card__divider} />
        </ConditionalRender>
        <ConditionalRender hidden={websiteMainData?.ws_this_heading_a?.hidden}>
          <div
            className={`${
              !websiteMainData?.ws_this_heading_a?.val ? warning_col : ''
            } ${card__input}`}>
            <Link to="forYouHeading" spy smooth duration={500} containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Heading"
                id="ws_this_heading_a"
                name="ws_this_heading_a"
                value={websiteMainData?.ws_this_heading_a?.val}
                onChange={handleWebsiteDataUpdate}
              />
            </Link>
          </div>
        </ConditionalRender>
        <ConditionalRender hidden={websiteMainData?.ws_this_shortBlurp1?.hidden}>
          <div className={!websiteMainData?.ws_this_shortBlurp1?.val ? warning_cont : ''}>
            <Link to="threeColumns" spy smooth duration={500} containerId="websiteScrollable">
              <TextAreaRefresh
                text={websiteMainData?.ws_this_shortBlurp1?.val}
                label="Short Blurp"
                name="ws_this_shortBlurp1"
                onInput={(value) =>
                  handleTextAreaRefreshUpdates(
                    'ws_this_shortBlurp1',
                    `${value.topText}{}${value.bottomText}`
                  )
                }
                refreshClick={() => handleWebsiteDataRefresh('ws_this_shortBlurp1')}
                className={marBottom}
                refresh={problemWordings.length > 6}
              />
            </Link>
          </div>
        </ConditionalRender>
        <ConditionalRender hidden={websiteMainData?.ws_this_shortBlurp2?.hidden}>
          <div className={!websiteMainData?.ws_this_shortBlurp2?.val ? warning_cont : ''}>
            <Link to="threeColumns" spy smooth duration={500} containerId="websiteScrollable">
              <TextAreaRefresh
                text={websiteMainData?.ws_this_shortBlurp2?.val}
                label="Short Blurp"
                name="ws_this_shortBlurp2"
                onInput={(value) =>
                  handleTextAreaRefreshUpdates(
                    'ws_this_shortBlurp2',
                    `${value.topText}{}${value.bottomText}`
                  )
                }
                refreshClick={() => handleWebsiteDataRefresh('ws_this_shortBlurp2')}
                className={marBottom}
                refresh={problemWordings.length > 6}
              />
            </Link>
          </div>
        </ConditionalRender>
        <ConditionalRender hidden={websiteMainData?.ws_this_shortBlurp3?.hidden}>
          <div className={!websiteMainData?.ws_this_shortBlurp3?.val ? warning_cont : ''}>
            <Link to="threeColumns" spy smooth duration={500} containerId="websiteScrollable">
              <TextAreaRefresh
                text={websiteMainData?.ws_this_shortBlurp3?.val}
                label="Short Blurp"
                name="ws_this_shortBlurp3"
                onInput={(value) =>
                  handleTextAreaRefreshUpdates(
                    'ws_this_shortBlurp3',
                    `${value.topText}{}${value.bottomText}`
                  )
                }
                refreshClick={() => handleWebsiteDataRefresh('ws_this_shortBlurp3')}
                className={marBottom}
                refresh={problemWordings.length > 6}
              />
            </Link>
          </div>
          <div className={card__divider} />
        </ConditionalRender>
        <ConditionalRender hidden={websiteMainData?.sp_cta_v3_heading_a?.hidden}>
          <div className={card__input}>
            <div className={card__chooseFileContainer}>
              {/* <Link
                to="aboutMeHeading"
                spy
                smooth
                duration={500}
                containerId="websiteScrollable"
                offset={-400}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChecked(!isChecked);
                }}>
                <InputCheckbox
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                  label="Change Your Photo"
                />
              </Link> */}
              <Link
                to="aboutMeHeading"
                spy
                smooth
                duration={500}
                containerId="websiteScrollable"
                offset={-400}>
                <div className={card__dropZone}>
                  <DropZone
                    id="file_upload_dropzone"
                    onUpload={(file) => fileUpload(file)}
                    onDelete={() => removeUploadedImage()}
                  />
                  {isUploading && <CircularProgress color="inherit" />}
                </div>
              </Link>
            </div>
            <div className={!websiteMainData?.ws_about_heading_a?.val ? warning : ''}>
              <Link to="aboutMeHeading" spy smooth duration={500} containerId="websiteScrollable">
                <Input
                  id="ws_about_heading_a"
                  name="ws_about_heading_a"
                  placeholderClass={card__inputPlaceholder}
                  className={card__input}
                  placeholder="Heading"
                  value={websiteMainData?.ws_about_heading_a?.val}
                  onChange={handleWebsiteDataUpdate}
                />
              </Link>
            </div>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_1a?.val ? warning : ''}>
            <Link to="aboutMeSection" spy smooth duration={500} containerId="websiteScrollable">
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_1a"
                value={websiteMainData?.ws_about_textbox_1a?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={3}
              />
            </Link>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_1b?.val ? warning : ''}>
            <Link
              to="aboutMeSection"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={80}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_1b"
                value={websiteMainData?.ws_about_textbox_1b?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={3}
              />
            </Link>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_1c?.val ? warning : ''}>
            <Link
              to="aboutMeSection"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={180}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_1c"
                value={websiteMainData?.ws_about_textbox_1c?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={3}
              />
            </Link>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_2a?.val ? warning : ''}>
            <Link
              to="aboutMeSection"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={230}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_2a"
                value={websiteMainData?.ws_about_textbox_2a?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={4}
              />
            </Link>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_2b?.val ? warning : ''}>
            <Link
              to="aboutMeSection"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={350}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_2b"
                value={websiteMainData?.ws_about_textbox_2b?.val}
                onChange={handleWebsiteDataUpdate}
              />
            </Link>
          </div>
          <div className={!websiteMainData?.ws_about_textbox_2c?.val ? warning : ''}>
            <Link
              to="aboutMeSection"
              spy
              smooth
              duration={500}
              containerId="websiteScrollable"
              offset={420}>
              <Input
                placeholderClass={card__inputPlaceholder}
                className={card__input}
                placeholder="Short Blurp"
                name="ws_about_textbox_2c"
                value={websiteMainData?.ws_about_textbox_2c?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={4}
              />
            </Link>
          </div>
          <div className={card__divider} />
        </ConditionalRender>
        <div
          className={`${
            !websiteMainData?.sp_cart_heading_a?.val ? warning_col : ''
          } ${card__input}`}>
          <Link
            to="getStarted"
            spy
            smooth
            duration={500}
            containerId="websiteScrollable"
            offset={-20}>
            <Input
              id="sp_cart_heading_a"
              name="sp_cart_heading_a"
              placeholderClass={card__inputPlaceholder}
              className={card__input}
              placeholder="Heading"
              value={websiteMainData?.sp_cart_heading_a?.val}
              onChange={handleWebsiteDataUpdate}
            />
          </Link>
        </div>
        <div className={!websiteMainData?.sp_cart_shortblurp_1?.val ? warning : ''}>
          <Link to="getStartedP" spy smooth duration={500} containerId="websiteScrollable">
            <Input
              placeholderClass={card__inputPlaceholder}
              className={card__input}
              loader
              textArea
              rows={4}
              placeholder="Short Blurp New"
              name="sp_cart_shortblurp_1"
              value={websiteMainData?.sp_cart_shortblurp_1?.val}
              onChange={handleWebsiteDataUpdate}
              clickHandler={() => handleWebsiteDataRefresh('sp_cart_shortblurp_1')}
            />
          </Link>
        </div>
        <div
          className={`${!websiteMainData?.sp_cart_button?.val ? warning : ''}`}
          style={{ marginBottom: '0.5rem' }}>
          <Link to="getStartedButton" spy smooth duration={500} containerId="websiteScrollable">
            <Input
              placeholderClass={card__inputPlaceholder}
              className={card__input}
              placeholder="Button"
              name="sp_cart_button"
              value={websiteMainData?.sp_cart_button?.val}
              onChange={handleWebsiteDataUpdate}
            />
          </Link>
        </div>
        {lead ? (
          ''
        ) : (
          <>
            <div className={card__divider} />

            <div className={!websiteMainData?.sp_cta_v4_heading_a?.val ? warning : ''}>
              <Link
                to="salesSpendLessHeader"
                spy
                smooth
                duration={500}
                containerId="websiteScrollable">
                <Input
                  placeholderClass={card__inputPlaceholder}
                  className={card__input}
                  loader
                  placeholder="Heading"
                  name="sp_cta_v4_heading_a"
                  value={websiteMainData?.sp_cta_v4_heading_a?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('sp_cta_v4_heading_a')}
                />
              </Link>
            </div>

            {websiteMainData?.sp_cta_v4_bullets_1?.val &&
            websiteMainData?.sp_cta_v4_bullets_2?.val &&
            websiteMainData?.sp_cta_v4_bullets_3?.val ? (
              <>
                <div className={!websiteMainData?.sp_cta_v4_bullets_1?.val ? warning : ''}>
                  <Link
                    to="salesSpendLessP"
                    spy
                    smooth
                    duration={500}
                    containerId="websiteScrollable">
                    <Input
                      placeholderClass={card__inputPlaceholder}
                      className={card__input}
                      placeholder="Short Blurp"
                      name="sp_cta_v4_bullets_1"
                      value={websiteMainData?.sp_cta_v4_bullets_1?.val}
                      onChange={handleWebsiteDataUpdate}
                    />
                  </Link>
                </div>
                <div className={!websiteMainData?.sp_cta_v4_bullets_2?.val ? warning : ''}>
                  <Link
                    to="salesSpendLessP"
                    spy
                    smooth
                    duration={500}
                    containerId="websiteScrollable">
                    <Input
                      placeholderClass={card__inputPlaceholder}
                      className={card__input}
                      placeholder="Short Blurp"
                      name="sp_cta_v4_bullets_2"
                      value={websiteMainData?.sp_cta_v4_bullets_2?.val}
                      onChange={handleWebsiteDataUpdate}
                    />
                  </Link>
                </div>
                <div className={!websiteMainData?.sp_cta_v4_bullets_3?.val ? warning : ''}>
                  <Link
                    to="salesSpendLessP"
                    spy
                    smooth
                    duration={500}
                    containerId="websiteScrollable">
                    <Input
                      placeholderClass={card__inputPlaceholder}
                      className={card__input}
                      placeholder="Short Blurp"
                      name="sp_cta_v4_bullets_3"
                      value={websiteMainData?.sp_cta_v4_bullets_3?.val}
                      onChange={handleWebsiteDataUpdate}
                    />
                  </Link>
                </div>
              </>
            ) : (
              ''
            )}
          </>
        )}
      </div>
      <DialogChangeColor
        onClose={onClose}
        open={showPopup}
        handleItem={changeColorHandler}
        pallete={productPallete}
      />
    </div>
  );
}

export default WebsiteNotToggledContent;
