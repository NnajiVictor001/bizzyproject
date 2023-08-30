import React, { useState } from 'react';

import Toggle from 'components/Layouts/Toggle';
import Input from 'components/InputFields/Input';
import PromoPackCardEmailPlaceholder from './PromoPackCardEmailPlaceholder';

import styles from './PromoPackCard3.module.scss';

function PromoPackCard3(props) {
  const {
    isToggled,
    setIsToggled,
    isLoadingSalesEmailData,
    salesEmailHeadline,
    setSalesEmailHeadline,
    salesEmailPreview,
    setSalesEmailPreview,
    salesEmailDesc,
    setSalesEmailDesc,
    fetchSalesEmailData,
    deliveryEmailData,
    fetchDeliveryEmailData,
    setDeliveryEmailData
  } = props;

  const [fieldState, setFieldState] = useState('');

  const onToggle = () => {
    setIsToggled(!isToggled);
  };

  const {
    card,
    card__main,
    left,
    right,
    right__toggleCont,
    right__toggle,
    right__slider,
    right__inputCont,
    right__input,
    right__inputPlaceholder,
    bottom,
    bottom__inputPlaceholder,
    bottom__inputCont,
    bottom__input
  } = styles;

  const headlineChange = (evt) => {
    if (isToggled)
      setDeliveryEmailData((prevState) => ({
        ...prevState,
        headline: evt.target.value
      }));
    else setSalesEmailHeadline(evt.target.value);
  };

  const previewChange = (evt) => {
    if (isToggled)
      setDeliveryEmailData((prevState) => ({
        ...prevState,
        preview_text: evt.target.value
      }));
    else setSalesEmailPreview(evt.target.value);
  };

  const descChange = (evt) => {
    if (isToggled)
      setDeliveryEmailData((prevState) => ({
        ...prevState,
        body: evt.target.value
      }));
    else setSalesEmailDesc(evt.target.value);
  };

  const fetchData = (value) => {
    if (value === 'headline') {
      setFieldState('headline');
      if (isToggled) fetchDeliveryEmailData('headline');
      else fetchSalesEmailData('headline');
    } else if (value === 'preview') {
      setFieldState('preview');
      if (isToggled) fetchDeliveryEmailData('preview');
      else fetchSalesEmailData('preview');
    } else {
      setFieldState('desc');
      if (isToggled) fetchDeliveryEmailData('desc');
      else fetchSalesEmailData('desc');
    }
  };

  return (
    <div className={card}>
      {/* {isLoadingSalesEmailData ? ( */}
      {/* <div className={flex}>
            <Skeleton
              variant="rectangular"
              style={{ width: "40%" }}
              height={150}
            />
            <Skeleton variant="rounded" style={{ width: "55%" }} height={80} />
          </div>
          <Skeleton variant="rounded" style={{ width: "100%" }} height={200} /> */}

      <div className={card__main}>
        <div className={left}>
          <PromoPackCardEmailPlaceholder />
        </div>
        <div className={right}>
          <div className={right__toggleCont}>
            <Toggle
              first="Sales  Email"
              second="Delivery Email"
              isToggled={isToggled}
              onToggle={onToggle}
              className={right__toggle}
              sliderClass={right__slider}
            />
          </div>
          <div className={right__inputCont}>
            <Input
              loader
              value={isToggled ? deliveryEmailData.headline : salesEmailHeadline}
              placeholderClass={right__inputPlaceholder}
              className={right__input}
              placeholder="Email Headline"
              onChange={headlineChange}
              isLoadingSalesEmailData={fieldState === 'headline' && isLoadingSalesEmailData}
              disabled={fieldState === 'headline' && isLoadingSalesEmailData}
              clickHandler={() => fetchData('headline')}
            />
          </div>
          <div className={right__inputCont}>
            <Input
              loader
              value={isToggled ? deliveryEmailData.preview_text : salesEmailPreview}
              placeholderClass={right__inputPlaceholder}
              className={right__input}
              placeholder="Preview Text"
              onChange={previewChange}
              isLoadingSalesEmailData={fieldState === 'preview' && isLoadingSalesEmailData}
              disabled={fieldState === 'preview' && isLoadingSalesEmailData}
              clickHandler={() => fetchData('preview')}
            />
          </div>
        </div>
      </div>
      <div className={bottom}>
        <Input
          loader
          loaderStyle={{
            marginRight: '10px',
            marginBottom: '5px'
          }}
          loaderPosition="bottom"
          placeholderClass={bottom__inputPlaceholder}
          textArea
          parentClass={bottom__inputCont}
          className={bottom__input}
          value={isToggled ? deliveryEmailData.body : salesEmailDesc}
          onChange={descChange}
          placeholder="Description"
          isLoadingSalesEmailData={fieldState === 'desc' && isLoadingSalesEmailData}
          disabled={fieldState === 'desc' && isLoadingSalesEmailData}
          clickHandler={() => fetchData('desc')}
        />
      </div>
    </div>
  );
}

export default PromoPackCard3;
