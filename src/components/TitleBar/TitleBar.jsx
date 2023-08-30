import React, { useState, useEffect } from 'react';
import arrowUp from 'img/arrowUp.svg';
import arrowDown from 'img/arrowDown.svg';
import styles from './TitleBar.module.scss';

function TitleBar(props) {
  const { item, title, name, onChange, onClickUp, onClickDown } = props;

  const {
    titleBackg,
    input_margin,
    margin_arrow,
    margin_title,
    arrow__up,
    arrow__down,
    arrowIcons
  } = styles;
  // const selectedStaff = useSelector(
  //     (state) => state.staffPage.selectedStaffPage
  // );
  const [defaultMargin, setDefaultMargin] = useState((item && item.margin && item.margin) || 50);

  useEffect(() => {
    if (item && item.margin) {
      setDefaultMargin(item.margin);
    }
  }, [item]);

  return (
    <div className={titleBackg}>
      <label>{title}</label>
      <div className={margin_arrow}>
        <div>
          <label className={margin_title}>MARGIN: </label>
          <input
            className={input_margin}
            type="number"
            value={defaultMargin}
            onChange={onChange}
            name={name}
            required
          />
        </div>
        <div className={arrowIcons}>
          <img src={arrowUp} className={arrow__up} alt="arrowUp" onClick={onClickUp} />
          <img src={arrowDown} className={arrow__down} alt="arrowDown" onClick={onClickDown} />
        </div>
      </div>
    </div>
  );
}

export default TitleBar;
