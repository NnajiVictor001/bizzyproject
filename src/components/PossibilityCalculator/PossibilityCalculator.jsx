import React, { useEffect, useState } from 'react';

import Select from 'components/DropDowns/Select';
import RangeSlider from 'components/Slider/RangeSlider';

import boxBg from 'img/honey_bg.png';
import Toggle from 'components/Layouts/Toggle';
import styles from './PossibilityCalculator.module.scss';

function PossibilityCalculator() {
  const [isToggle, setIsToggle] = useState(false);
  const [type, setType] = useState('daily');
  const [fieldsData, setFieldsData] = useState({
    products: 1,
    productPrice: 10,
    ofSales: 1
  });
  const [profit, setProfit] = useState(
    (fieldsData.products * fieldsData.productPrice * fieldsData.ofSales).toFixed()
  );
  const [sliderValue, setSliderValue] = useState(1);
  const [currency, setCurrency] = useState('usd');
  const {
    main,
    main__box,
    main__boxLeft,
    main__boxRight,
    main__boxLeftText,
    main__boxLeftInput,
    main__boxLeftRow,
    main__boxLeftBg,
    main__toggleCont,
    main__toggle,
    main__slider,
    main__ofSales,
    main__boxRightRow,
    main__boxRightRow2,
    main__boxRightLeft,
    main__boxRightHeadingCont,
    main__boxRightHeading,
    main__boxRightSelect,
    main__boxRightDetails,
    main__boxRightRight,
    main__boxRightValue,
    main__boxRightLabel
  } = styles;

  const onToggle = () => {
    setIsToggle(!isToggle);
    setType(isToggle ? 'daily' : 'monthly');
  };
  const options = [
    { label: 'USD', value: 'usd' },
    { label: 'CAD', value: 'cad' }
  ];
  const onChageHandler = (key, e) => {
    setFieldsData({
      ...fieldsData,
      [key]: e.target.value
    });
  };

  const rangeSliderValue = (val) => {
    setSliderValue(val);
  };

  const selectedCurrency = (evt) => {
    setCurrency(evt.target.value);
  };

  useEffect(() => {
    const { products, productPrice, ofSales } = fieldsData;
    const basicOp = (products * productPrice * ofSales * sliderValue).toFixed();
    const basicOpCad = (basicOp * 1.3).toFixed();
    if (type === 'daily') {
      if (currency === 'cad') {
        setProfit((basicOpCad * 30).toLocaleString());
      } else {
        setProfit((basicOp * 30).toLocaleString());
      }
    }
    if (type === 'monthly') {
      if (currency === 'cad') {
        setProfit((basicOpCad * 1).toLocaleString());
      } else {
        setProfit((basicOp * 1).toLocaleString());
      }
    }
  }, [fieldsData, type, sliderValue, currency]);

  return (
    <div className={main}>
      <div className={main__box}>
        <div className={main__boxLeft}>
          <img src={boxBg} alt="Box Background" className={main__boxLeftBg} />
          <div className={main__boxLeftRow}>
            <p className={main__boxLeftText}># Products</p>
            <input
              onChange={(e) => onChageHandler('products', e)}
              value={fieldsData.products}
              type="number"
              className={main__boxLeftInput}
            />
          </div>
          <div className={main__boxLeftRow}>
            <p className={main__boxLeftText}>Product Price</p>
            <input
              onChange={(e) => onChageHandler('productPrice', e)}
              value={fieldsData.productPrice}
              type="text"
              className={main__boxLeftInput}
            />
          </div>
          <div className={main__boxLeftRow}>
            <div className={main__boxLeftText}>
              <span className={main__ofSales}> # Of Sales</span> <br />
            </div>
            <input
              onChange={(e) => onChageHandler('ofSales', e)}
              value={fieldsData.ofSales}
              type="number"
              className={main__boxLeftInput}
            />
          </div>
          <div className={main__toggleCont}>
            <Toggle
              first="Daily"
              second="Monthly"
              isToggled={isToggle}
              onToggle={onToggle}
              className={main__toggle}
              sliderClass={main__slider}
            />
          </div>
        </div>
        <div className={main__boxRight}>
          <div className={main__boxRightRow}>
            <div className={main__boxRightLeft}>
              <div className={main__boxRightHeadingCont}>
                <p className={main__boxRightHeading}>Possibility Calculator</p>
                <div className={main__boxRightSelect}>
                  <Select onChange={selectedCurrency} options={options} />
                </div>
              </div>
              <p className={main__boxRightDetails}>
                Change your products & price to see your possible profit
              </p>
            </div>
            <div className={main__boxRightRight}>
              <div className={main__boxRightValue}>
                <p>{`$${profit}`}</p>
              </div>
              <p className={main__boxRightLabel}>Possible Profit</p>
            </div>
          </div>
          <div className={main__boxRightRow2}>
            <RangeSlider onChange={rangeSliderValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PossibilityCalculator;
