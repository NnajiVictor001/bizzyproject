import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import Toggle from 'components/Layouts/Toggle';
import Input from 'components/InputFields/Input';
import InputRefresh from 'components/InputFields/InputRefresh';
import Pallete from 'components/SlideShow/Pallete';
import DialogChangeColor from 'helpers/DialogChangeColor';

import { webCreationSliceActions } from 'store/web-creation';
import { looksGoodWebsiteCreationActions } from 'helpers/looksGoodWebsiteCreationActions';

import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import leftImg1 from 'img/web-left.png';
import leftImg2 from 'img/side-img2.png';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import { useAlert } from 'hooks/alert';
import { convertColorsToPallete } from 'helpers/pallete';
import styles from './DeliveryPageCard.module.scss';
import VideoDeliveryPage from './VideoDeliveryPage';

function DeliveryPage(props) {
  const {
    deliveryMainData,
    setDeliveryMainData,
    salesData,
    hasSalesPage,
    basicThankYou,
    setBasicThankYou
  } = props;

  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const { refreshActions } = useWebsiteCreation();

  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const colorPalette = convertColorsToPallete(defaultPalette);

  const salesType = useSelector((state) => state.webCreation.salesType);
  const thankYouType = useSelector((state) => state.webCreation.thankYouType);
  const isStripeConnected = useSelector((state) => state.webCreation.isStripeConnected);
  const refreshPhrasesCountByInput = useSelector(
    (state) => state.webCreation.refreshPhrasesCountByInput
  );

  const [isToggled, setIsToggled] = useState(
    hasSalesPage ? salesData.delivery_page === 'video' : thankYouType !== 'basic'
  );

  const handleInputChangeLink = (e) => {
    const { value } = e.target;
    setDeliveryMainData((prev) => ({
      ...prev,
      tx_button_2_link: {
        ...prev.tx_button_2_link,
        val: value
      }
    }));
  };

  const onToggle = () => {
    dispatch(webCreationSliceActions.setSideImg(isToggled ? leftImg1 : leftImg2));
    dispatch(webCreationSliceActions.setThankYouType(!isToggled ? 'video' : 'basic'));
    setIsToggled(!isToggled);
    setBasicThankYou(basicThankYou === 'basic' ? 'video' : 'basic');
  };

  const looksGoodInputHandler = () => {
    if (salesType.includes('sales') && !isStripeConnected) {
      addAlert('Please connect your Stripe account first', 'error');
      return;
    }

    const nextWebCreationItemId = { id: 3 };
    looksGoodWebsiteCreationActions(nextWebCreationItemId);
  };

  const {
    delivery,
    delivery__toggle,
    delivery__slider,
    delivery__halfInput,
    delivery__textAreaPlaceholder,
    delivery__textAreaInput,
    delivery__divider,
    delivery__dividerLine,
    delivery__dividerText,
    delivery__thanksPage,
    delivery__nextContainer,
    delivery__nextTxtContainer,
    delivery__content,
    warning
  } = styles;

  const [idHeadingChanged, setIdHeadingChanged] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const changeColorHandler = (id) => {
    setIdHeadingChanged(id);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const handleWebsiteDataUpdate = (event) => {
    const { name, value } = event.target;
    setDeliveryMainData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        val: value
      }
    }));
  };

  const handleWebsiteColorsUpdate = (color) => {
    setDeliveryMainData((prev) => ({
      ...prev,
      [idHeadingChanged]: {
        ...prev[idHeadingChanged],
        color
      }
    }));
  };

  const handleWebsiteDataRefresh = (key) => {
    let value;
    if (key === 'tx_cta_v2_heading_a') {
      value = refreshActions.refresh_tx_cta_v2_heading_a(
        deliveryMainData?.tx_cta_v2_heading_a?.val
      );
    }
    if (key === 'tx_sidebar_textbox') {
      value = refreshActions.refresh_tx_sidebar_textbox(deliveryMainData?.tx_sidebar_textbox?.val);
    }
    if (key === 'tx_sidebar_shortblurp') {
      value = refreshActions.refresh_tx_sidebar_shortblurp(
        deliveryMainData?.tx_sidebar_shortblurp?.val
      );
    }
    if (key === 'tx_cta_v3_heading_a') {
      value = refreshActions.refresh_tx_cta_v3_heading_a(
        deliveryMainData?.tx_cta_v3_heading_a?.val
      );
    }
    if (key === 'tx_blurp_textbox') {
      value = refreshActions.refresh_tx_blurp_textbox(deliveryMainData?.tx_blurp_textbox?.val);
    }
    if (key === 'tx_blurp_longtextbox') {
      value = refreshActions.refresh_tx_blurp_longtextbox(
        deliveryMainData?.tx_blurp_longtextbox?.val
      );
    }
    if (key === 'tx_video_subheading_1') {
      value = refreshActions.refresh_tx_video_subheading_1(
        deliveryMainData?.tx_video_subheading_1?.val
      );
    }
    if (key === 'tx_video_paragraph_1') {
      value = refreshActions.refresh_tx_video_paragraph_1(
        deliveryMainData?.tx_video_paragraph_1?.val
      );
    }
    if (key === 'tx_video_subheading_2') {
      value = refreshActions.refresh_tx_video_subheading_2(
        deliveryMainData?.tx_video_subheading_2?.val
      );
    }
    if (key === 'tx_video_paragraph_2') {
      value = refreshActions.refresh_tx_video_paragraph_2(
        deliveryMainData?.tx_video_paragraph_2?.val
      );
    }
    if (key === 'tx_video_subheading_3') {
      value = refreshActions.refresh_tx_video_subheading_3(
        deliveryMainData?.tx_video_subheading_3?.val
      );
    }
    if (key === 'tx_video_paragraph_3') {
      value = refreshActions.refresh_tx_video_paragraph_3(
        deliveryMainData?.tx_video_paragraph_3?.val
      );
    }

    setDeliveryMainData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        val: value
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

  return (
    <div className={delivery}>
      <div className={delivery__content}>
        <div>
          <Toggle
            first="Basic Thank You Page"
            second="Video delivery Page"
            isToggled={isToggled}
            onToggle={onToggle}
            className={delivery__toggle}
            sliderClass={delivery__slider}
          />
        </div>
        {!isToggled ? (
          <div className={delivery__thanksPage}>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v2_heading_a?.val ? warning : ''
              }`}>
              <Link to="thankYouHeading" spy smooth containerId="websiteScrollable">
                <InputRefresh
                  type="text"
                  id="tx_cta_v2_heading_a"
                  name="tx_cta_v2_heading_a"
                  value={deliveryMainData?.tx_cta_v2_heading_a?.val}
                  pickerBgColor={deliveryMainData?.tx_cta_v2_heading_a?.color}
                  onChange={handleWebsiteDataUpdate}
                  placeholder="Heading"
                  changeColorHandler={changeColorHandler}
                  clickR={() => handleWebsiteDataRefresh('tx_cta_v2_heading_a')}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v2_heading_b?.val ? warning : ''
              }`}>
              <Link to="thankYouSubheading" spy smooth containerId="websiteScrollable">
                <Input
                  id="tx_cta_v2_heading_b"
                  name="tx_cta_v2_heading_b"
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  value={deliveryMainData?.tx_cta_v2_heading_b?.val}
                  onChange={handleWebsiteDataUpdate}
                  placeholder="SubHeading"
                />
              </Link>
            </div>
            {salesType === 'sales' ? (
              <div className={delivery__divider}>
                <div className={delivery__dividerLine} />
                <p className={delivery__dividerText}>Receipt Section</p>
                <div className={delivery__dividerLine} />
              </div>
            ) : (
              ''
            )}
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_sidebar_subheading?.val ? warning : ''
              }`}>
              <Link to="itsYoursHeading" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  name="tx_sidebar_subheading"
                  value={deliveryMainData?.tx_sidebar_subheading?.val}
                  onChange={handleWebsiteDataUpdate}
                  placeholder="Heading"
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_sidebar_textbox?.val ? warning : ''
              }`}>
              <Link to="itsYoursHeading" spy smooth containerId="websiteScrollable" offset={50}>
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  loader
                  placeholder="Paragraph"
                  name="tx_sidebar_textbox"
                  value={deliveryMainData?.tx_sidebar_textbox?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('tx_sidebar_textbox')}
                  textArea
                  rows={3}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_sidebar_shortblurp?.val ? warning : ''
              }`}>
              <Link to="itsYoursHeading" spy smooth containerId="websiteScrollable" offset={230}>
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  loader={refreshPhrasesCountByInput.tx_sidebar_shortblurp > 1}
                  placeholder="Short Blurp"
                  name="tx_sidebar_shortblurp"
                  value={deliveryMainData?.tx_sidebar_shortblurp?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('tx_sidebar_shortblurp')}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v3_heading_a?.val ? warning : ''
              }`}>
              <Link to="thankYouDownloadHeader" spy smooth containerId="websiteScrollable">
                <InputRefresh
                  type="text"
                  id="tx_cta_v3_heading_a"
                  name="tx_cta_v3_heading_a"
                  value={deliveryMainData?.tx_cta_v3_heading_a?.val}
                  pickerBgColor={deliveryMainData?.tx_cta_v3_heading_a?.color}
                  onChange={handleWebsiteDataUpdate}
                  placeholder="Heading"
                  changeColorHandler={changeColorHandler}
                  clickR={() => handleWebsiteDataRefresh('tx_cta_v3_heading_a')}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v3_heading_b?.val ? warning : ''
              }`}>
              <Link to="thankYouDownloadSubheader" spy smooth containerId="websiteScrollable">
                <Input
                  id="tx_cta_v3_heading_b"
                  name="tx_cta_v3_heading_b"
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Subheading"
                  value={deliveryMainData?.tx_cta_v3_heading_b?.val}
                  onChange={handleWebsiteDataUpdate}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_blurp_textbox?.val ? warning : ''
              }`}>
              <Link to="justImagineHeader" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  loader={refreshPhrasesCountByInput.tx_blurp_textbox > 1}
                  placeholder="Heading"
                  name="tx_blurp_textbox"
                  value={deliveryMainData?.tx_blurp_textbox?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('tx_blurp_textbox')}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_blurp_longtextbox?.val ? warning : ''
              }`}>
              <Link to="justImagineP" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  loader
                  placeholder="Paragraph"
                  name="tx_blurp_longtextbox"
                  value={deliveryMainData?.tx_blurp_longtextbox?.val}
                  onChange={handleWebsiteDataUpdate}
                  clickHandler={() => handleWebsiteDataRefresh('tx_blurp_longtextbox')}
                />
              </Link>
            </div>
            <div className={delivery__divider} />
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v3_heading_d?.val ? warning : ''
              }`}>
              <Link to="communityHeader" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Heading"
                  name="tx_cta_v3_heading_d"
                  value={deliveryMainData?.tx_cta_v3_heading_d?.val}
                  onChange={handleWebsiteDataUpdate}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_cta_v3_heading_c?.val ? warning : ''
              }`}>
              <Link to="communitySubheader" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Subheading"
                  name="tx_cta_v3_heading_c"
                  value={deliveryMainData?.tx_cta_v3_heading_c?.val}
                  onChange={handleWebsiteDataUpdate}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_button_2?.val ? warning : ''
              }`}>
              <Link to="communityButton" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Button"
                  name="tx_button_2"
                  value={deliveryMainData?.tx_button_2?.val}
                  onChange={handleWebsiteDataUpdate}
                />
              </Link>
            </div>
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_button_2?.val ? warning : ''
              }`}>
              <Link to="communityButton" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Button URL"
                  name="tx_button_2_link"
                  value={deliveryMainData?.tx_button_2_link?.val}
                  onChange={handleInputChangeLink}
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <VideoDeliveryPage
              deliveryMainData={deliveryMainData}
              setDeliveryMainData={setDeliveryMainData}
              handleWebsiteDataUpdate={handleWebsiteDataUpdate}
              handleWebsiteDataRefresh={handleWebsiteDataRefresh}
            />
            <div
              className={`${delivery__halfInput} ${
                !deliveryMainData?.tx_button_2?.val ? warning : ''
              }`}>
              <Link to="communityButton" spy smooth containerId="websiteScrollable">
                <Input
                  placeholderClass={delivery__textAreaPlaceholder}
                  className={delivery__textAreaInput}
                  placeholder="Button URL"
                  name="tx_button_2_link"
                  value={deliveryMainData?.tx_button_2_link?.val}
                  onChange={handleInputChangeLink}
                />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className={delivery__nextContainer}>
        <div className={delivery__nextTxtContainer}>
          <InputCheckboxCustom
            id="looksGood"
            checked
            onChange={looksGoodInputHandler}
            label="Looks Good! NEXT"
          />
        </div>
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

export default DeliveryPage;
