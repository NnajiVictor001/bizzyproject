import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/InputFields/Input';
import InputCheckbox from 'components/InputFields/InputCheckbox';

import styles from './SaleCard.module.scss';

function SaleCard(props) {
  const navigate = useNavigate();

  const {
    sale,
    sale__title,
    sale__contentType1,
    sale__contentType2,
    sale__back_img,
    sale__inner,
    sale__input,
    sale__bottom,
    sale__no
  } = styles;

  const { type, title, content, saleFormHandler, product, productTitle, productTopic } = props;
  // product is an image. In reality it should be the image of the last product.

  // const [cardTitle, setCardTitle] = useState("");
  // const [cardTopic, setCardTopic] = useState("");
  const [agree1, setAgree1] = useState(true);
  const [agree2, setAgree2] = useState(true);
  const [result, setResult] = useState({
    agree1: true,
    agree2: true,
    title: '',
    topic: ''
  });

  // const cardTitleInputHandler = (evt) => {
  //   setCardTitle(evt.target.value);
  //   let temp = { ...result, title: evt.target.value };
  //   setResult(temp);
  //   saleFormHandler(temp);
  // };

  // const cardTopicInputHandler = (evt) => {
  //   setCardTopic(evt.target.value);
  //   let temp = { ...result, topic: evt.target.value };
  //   setResult(temp);
  //   saleFormHandler(temp);
  // };

  const agree1InputCheckboxHandler = (evt) => {
    setAgree1(evt.target.checked);
    const temp = { ...result, agree1: evt.target.checked };
    setResult(temp);
    saleFormHandler(temp);
  };

  const agree2InputCheckboxHandler = (evt) => {
    setAgree2(evt.target.checked);
    const temp = { ...result, agree2: evt.target.checked };
    setResult(temp);
    saleFormHandler(temp);
  };

  const clickHandler = () => {
    navigate('/dashboard/products');
  };

  return (
    <div className={sale}>
      <h1 className={sale__title}>{title}</h1>
      <p className={`${type === '1' ? sale__contentType1 : sale__contentType2}`}>{content}</p>
      <div className={sale__inner}>
        {type === '1' && (
          <img src={product} alt="card default background" className={sale__back_img} />
        )}
        {type === '2' && (
          <>
            <div className={sale__input}>
              <Input
                type="text"
                id="title"
                defaultValue={productTitle}
                placeholder="Title"
                noPointerEvents
              />
            </div>
            <div className={sale__input}>
              <Input
                type="text"
                id="topic"
                defaultValue={productTopic}
                placeholder="Topic"
                noPointerEvents
              />
            </div>
          </>
        )}
      </div>

      <div className={sale__bottom}>
        {type === '1' ? (
          <InputCheckbox
            id={`agree-${type}`}
            checked={agree1}
            onChange={agree1InputCheckboxHandler}
            label="YES"
          />
        ) : (
          <InputCheckbox
            id={`agree-${type}`}
            checked={agree2}
            onChange={agree2InputCheckboxHandler}
            label="YES"
          />
        )}
        <button type="button" onClick={clickHandler}>
          <p className={sale__no}>No, I want to change it</p>
        </button>
      </div>
    </div>
  );
}

export default SaleCard;
