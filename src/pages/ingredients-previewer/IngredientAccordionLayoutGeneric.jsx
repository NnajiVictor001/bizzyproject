import React, { Fragment } from 'react';
import accordionCheckedMark from 'img/accordion_checked.svg';
import accordionUncheckedMark from 'img/accordion_unchecked.svg';
import upArrowBlackMark from 'img/up_arrow_black.png';
import downArrowBlackMark from 'img/down_arrow_black.png';
import yellowRadio from 'img/yellow-radio.png';
import styles from './IngredientAccordionLayoutGeneric.module.scss';

function IngredientAccordionLayoutGeneric(props) {
  const { data, handleClickItem, activeTitle, activeComponent } = props;

  const {
    container,
    settings_item,
    activeBackground,
    inactiveBackground,
    darkBackground,
    settings_item__con,
    settings_item__text,
    settings_item__textWhite
  } = styles;

  return (
    <div className={container}>
      {data.map((item, index) => (
        <Fragment key={index}>
          <div
            className={
              item.select
                ? `${settings_item} ${activeBackground}`
                : `${settings_item} ${item.isDark ? darkBackground : inactiveBackground}`
            }
            onClick={() => handleClickItem(item)}>
            <div className={settings_item__con}>
              {item.select ? (
                <>
                  <img src={accordionCheckedMark} alt="accordion check mark" />
                  <p
                    className={
                      item.isDark && !item.select ? settings_item__textWhite : settings_item__text
                    }>
                    {item.title}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={item.isDark ? yellowRadio : accordionUncheckedMark}
                    alt="accordion uncheck mark"
                  />
                  <p
                    className={
                      item.isDark && !item.select ? settings_item__textWhite : settings_item__text
                    }>
                    {item.title}
                  </p>
                </>
              )}
            </div>
            {item.select ? (
              <img src={upArrowBlackMark} alt="up mark" />
            ) : (
              <img src={downArrowBlackMark} alt="down mark" />
            )}
          </div>
          {item.select && item.title === activeTitle && activeComponent}
        </Fragment>
      ))}
    </div>
  );
}

export default IngredientAccordionLayoutGeneric;
