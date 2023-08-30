import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';
import InputRefresh from 'components/InputFields/InputRefresh';
import Pallete from 'components/SlideShow/Pallete';

import DialogChangeColor from 'helpers/DialogChangeColor';

import { convertColorsToPallete } from 'helpers/pallete';
import styles from './VideoDeliveryPage.module.scss';

function VideoDeliveryPage(props) {
  const {
    deliveryMainData,
    setDeliveryMainData,
    handleWebsiteDataUpdate,
    handleWebsiteDataRefresh
  } = props;

  const salesType = useSelector((state) => state.webCreation.salesType);

  const {
    main,
    main__colorInputS,
    main__divider,
    main__dividerLine,
    main__dividerText,
    main__simpleInputPlaceholder,
    main__simpleInput,
    main__checkbox,
    main__checkbox__label,
    warning
  } = styles;

  const [idHeadingChanged, setIdHeadingChanged] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const colorPalette = convertColorsToPallete(defaultPalette);
  const refreshPhrasesCountByInput = useSelector(
    (state) => state.webCreation.refreshPhrasesCountByInput
  );

  const changeColorHandler = (id) => {
    setIdHeadingChanged(id);
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
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

  const handleWebsiteVideoUpdate = (key) => {
    let videoKeys = [];

    if (key === 'video1') {
      videoKeys = ['tx_video_subheading_1', 'tx_video_paragraph_1', 'videoYoutubeUrl1'];
    }
    if (key === 'video2') {
      videoKeys = ['tx_video_subheading_2', 'tx_video_paragraph_2', 'videoYoutubeUrl2'];
    }
    if (key === 'video3') {
      videoKeys = ['tx_video_subheading_3', 'tx_video_paragraph_3', 'videoYoutubeUrl3'];
    }

    setDeliveryMainData((prev) => ({
      ...prev,
      [videoKeys[0]]: {
        ...prev[videoKeys[0]],
        hidden: !prev[videoKeys[0]].hidden
      },
      [videoKeys[1]]: {
        ...prev[videoKeys[1]],
        hidden: !prev[videoKeys[1]].hidden
      },
      [videoKeys[2]]: {
        ...prev[videoKeys[2]],
        hidden: !prev[videoKeys[2]].hidden
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
    <div className={main}>
      <div
        className={`${main__colorInputS} ${
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
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_cta_v2_heading_b?.val ? warning : ''
        }`}>
        <Link to="thankYouSubheading" spy smooth containerId="websiteScrollable">
          <Input
            id="tx_cta_v2_heading_b"
            name="tx_cta_v2_heading_b"
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="SubHeading"
            value={deliveryMainData?.tx_cta_v2_heading_b?.val}
            onChange={handleWebsiteDataUpdate}
          />
        </Link>
      </div>
      {salesType === 'sales' ? (
        <div className={main__divider}>
          <div className={main__dividerLine} />
          <p className={main__dividerText}>Receipt Section</p>
          <div className={main__dividerLine} />
        </div>
      ) : (
        ''
      )}
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_sidebar_subheading?.val ? warning : ''
        }`}>
        <Link to="videoItsYoursHeading" spy smooth containerId="websiteScrollable">
          <Input
            id="tx_sidebar_subheading"
            name="tx_sidebar_subheading"
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Heading"
            value={deliveryMainData?.tx_sidebar_subheading?.val}
            onChange={handleWebsiteDataUpdate}
          />
        </Link>
      </div>
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_sidebar_textbox?.val ? warning : ''
        }`}>
        <Link to="videoItsYoursHeading" spy smooth containerId="websiteScrollable" offset={50}>
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
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
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_sidebar_shortblurp?.val ? warning : ''
        }`}>
        <Link to="videoItsYoursHeading" spy smooth containerId="websiteScrollable" offset={100}>
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            loader={refreshPhrasesCountByInput.tx_sidebar_shortblurp > 1}
            placeholder="Short Blurp"
            name="tx_sidebar_shortblurp"
            value={deliveryMainData?.tx_sidebar_shortblurp?.val}
            onChange={handleWebsiteDataUpdate}
            clickHandler={() => handleWebsiteDataRefresh('tx_sidebar_shortblurp')}
            textArea
            rows={3}
          />
        </Link>
      </div>
      <div
        className={`${main__colorInputS} ${
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
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_cta_v3_heading_b?.val ? warning : ''
        }`}>
        <Link to="thankYouDownloadSubheader" spy smooth containerId="websiteScrollable">
          <Input
            id="tx_cta_v3_heading_b"
            name="tx_cta_v3_heading_b"
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Subheading"
            value={deliveryMainData?.tx_cta_v3_heading_b?.val}
            onChange={handleWebsiteDataUpdate}
          />
        </Link>
      </div>
      <div className={main__checkbox}>
        <InputCheckbox
          id="video1"
          checked={!deliveryMainData?.tx_video_subheading_1?.hidden}
          label="Add a video"
          onChange={() => handleWebsiteVideoUpdate('video1')}
          className={main__checkbox__label}
        />
      </div>
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_video_subheading_1?.val ? warning : ''
        }`}>
        <Link to="videoSection" spy smooth containerId="websiteScrollable">
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            loader
            placeholder="Heading"
            name="tx_video_subheading_1"
            value={deliveryMainData?.tx_video_subheading_1?.val}
            onChange={handleWebsiteDataUpdate}
            clickHandler={() => handleWebsiteDataRefresh('tx_video_subheading_1')}
            disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
          />
        </Link>
      </div>
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_video_paragraph_1?.val ? warning : ''
        }`}>
        <Link to="videoSection" spy smooth containerId="websiteScrollable">
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            loader
            placeholder="Paragraph"
            name="tx_video_paragraph_1"
            value={deliveryMainData?.tx_video_paragraph_1?.val}
            onChange={handleWebsiteDataUpdate}
            textArea
            rows={3}
            clickHandler={() => handleWebsiteDataRefresh('tx_video_paragraph_1')}
            disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
          />
        </Link>
      </div>
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.videoYoutubeUrl1?.val ? warning : ''
        }`}>
        <Link to="videoSection" spy smooth containerId="websiteScrollable">
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Video Youtube URL"
            name="videoYoutubeUrl1"
            value={deliveryMainData?.videoYoutubeUrl1?.val}
            onChange={handleWebsiteDataUpdate}
            disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
          />
        </Link>
      </div>
      {!deliveryMainData?.tx_video_subheading_1?.hidden ? (
        <>
          <div className={main__checkbox}>
            <InputCheckbox
              id="video2"
              checked={!deliveryMainData?.tx_video_subheading_2?.hidden}
              label="Add another video"
              onChange={() => handleWebsiteVideoUpdate('video2')}
              className={main__checkbox__label}
            />
          </div>
          <div
            className={`${main__colorInputS} ${
              !deliveryMainData?.tx_video_subheading_2?.val ? warning : ''
            }`}>
            <Link to="videoSection" spy smooth containerId="websiteScrollable">
              <Input
                placeholderClass={main__simpleInputPlaceholder}
                className={main__simpleInput}
                loader
                placeholder="Heading"
                name="tx_video_subheading_2"
                value={deliveryMainData?.tx_video_subheading_2?.val}
                onChange={handleWebsiteDataUpdate}
                clickHandler={() => handleWebsiteDataRefresh('tx_video_subheading_2')}
                disabled={deliveryMainData?.tx_video_subheading_2?.hidden}
              />
            </Link>
          </div>
          <div
            className={`${main__colorInputS} ${
              !deliveryMainData?.tx_video_paragraph_2?.val ? warning : ''
            }`}>
            <Link to="videoSection" spy smooth containerId="websiteScrollable">
              <Input
                placeholderClass={main__simpleInputPlaceholder}
                className={main__simpleInput}
                loader
                placeholder="Paragraph"
                name="tx_video_paragraph_2"
                value={deliveryMainData?.tx_video_paragraph_2?.val}
                onChange={handleWebsiteDataUpdate}
                textArea
                rows={3}
                clickHandler={() => handleWebsiteDataRefresh('tx_video_paragraph_2')}
                disabled={deliveryMainData?.tx_video_subheading_2?.hidden}
              />
            </Link>
          </div>
          <div
            className={`${main__colorInputS} ${
              !deliveryMainData?.videoYoutubeUrl2?.val ? warning : ''
            }`}>
            <Link to="videoSection" spy smooth containerId="websiteScrollable">
              <Input
                placeholderClass={main__simpleInputPlaceholder}
                className={main__simpleInput}
                placeholder="Video Youtube URL"
                name="videoYoutubeUrl2"
                value={deliveryMainData?.videoYoutubeUrl2?.val}
                onChange={handleWebsiteDataUpdate}
                disabled={deliveryMainData?.tx_video_subheading_2?.hidden}
              />
            </Link>
          </div>

          {!deliveryMainData?.tx_video_subheading_2?.hidden ? (
            <>
              <div className={main__checkbox}>
                <InputCheckbox
                  id="video3"
                  checked={!deliveryMainData?.tx_video_subheading_3?.hidden}
                  label="Add another video"
                  onChange={() => handleWebsiteVideoUpdate('video3')}
                  className={main__checkbox__label}
                />
              </div>
              <div
                className={`${main__colorInputS} ${
                  !deliveryMainData?.tx_video_subheading_3?.val ? warning : ''
                }`}>
                <Link to="videoSection" spy smooth containerId="websiteScrollable">
                  <Input
                    placeholderClass={main__simpleInputPlaceholder}
                    className={main__simpleInput}
                    loader
                    placeholder="Heading"
                    name="tx_video_subheading_3"
                    value={deliveryMainData?.tx_video_subheading_3?.val}
                    onChange={handleWebsiteDataUpdate}
                    clickHandler={() => handleWebsiteDataRefresh('tx_video_subheading_3')}
                    disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
                  />
                </Link>
              </div>
              <div
                className={`${main__colorInputS} ${
                  !deliveryMainData?.tx_video_paragraph_3?.val ? warning : ''
                }`}>
                <Link to="videoSection" spy smooth containerId="websiteScrollable">
                  <Input
                    placeholderClass={main__simpleInputPlaceholder}
                    className={main__simpleInput}
                    loader
                    placeholder="Paragraph"
                    name="tx_video_paragraph_3"
                    value={deliveryMainData?.tx_video_paragraph_3?.val}
                    onChange={handleWebsiteDataUpdate}
                    textArea
                    rows={3}
                    clickHandler={() => handleWebsiteDataRefresh('tx_video_paragraph_3')}
                    disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
                  />
                </Link>
              </div>
              <div
                className={`${main__colorInputS} ${
                  !deliveryMainData?.videoYoutubeUrl3?.val ? warning : ''
                }`}>
                <Link to="videoSection" spy smooth containerId="websiteScrollable">
                  <Input
                    placeholderClass={main__simpleInputPlaceholder}
                    className={main__simpleInput}
                    placeholder="Video Youtube URL"
                    name="videoYoutubeUrl3"
                    value={deliveryMainData?.videoYoutubeUrl3?.val}
                    onChange={handleWebsiteDataUpdate}
                    disabled={deliveryMainData?.tx_video_subheading_1?.hidden}
                  />
                </Link>
              </div>
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_cta_v3_heading_d?.val ? warning : ''
        }`}>
        <Link to="communitySubheader" spy smooth containerId="websiteScrollable">
          <InputRefresh
            type="text"
            id="tx_cta_v3_heading_d"
            name="tx_cta_v3_heading_d"
            value={deliveryMainData?.tx_cta_v3_heading_d?.val}
            pickerBgColor={deliveryMainData?.tx_cta_v3_heading_d?.color}
            onChange={handleWebsiteDataUpdate}
            placeholder="Heading"
            changeColorHandler={changeColorHandler}
            refresh={false}
          />
        </Link>
      </div>
      <div
        className={`${main__colorInputS} ${
          !deliveryMainData?.tx_cta_v3_heading_e?.val ? warning : ''
        }`}>
        <Link to="communityHeader" spy smooth containerId="websiteScrollable">
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="SubHeading"
            name="tx_cta_v3_heading_e"
            value={deliveryMainData?.tx_cta_v3_heading_e?.val}
            onChange={handleWebsiteDataUpdate}
          />
        </Link>
      </div>
      <div className={`${main__colorInputS} ${!deliveryMainData?.tx_button?.val ? warning : ''}`}>
        <Link to="communityButton" spy smooth containerId="websiteScrollable">
          <Input
            placeholderClass={main__simpleInputPlaceholder}
            className={main__simpleInput}
            placeholder="Button"
            name="tx_button"
            value={deliveryMainData?.tx_button?.val}
            onChange={handleWebsiteDataUpdate}
          />
        </Link>
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

export default VideoDeliveryPage;
