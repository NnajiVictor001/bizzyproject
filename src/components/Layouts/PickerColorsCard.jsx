import React from 'react';
import completeMark from 'img/complete.svg';
import { useDispatch } from 'react-redux';
import { brandingStateSliceActions } from 'store/branding-state';
import styles from './PickerColorsCard.module.scss';
import PaletteExample from './PaletteExample';

function PickerColorsCard(props) {
  const dispatch = useDispatch();

  const {
    picker_color,
    picker_color__title,
    picker_color__name_title,
    picker_color__inner_title,
    picker_color__bar_container,
    picker_color__circle_container,
    picker_color__circle,
    picker_color__circle_title,
    picker_color__rectangle_container,
    picker_color__rectangle,
    picker_color__bottom_container,
    picker_color__bottom_item,
    picker_color__example_container,
    complete_image
  } = styles;

  const { branding } = props;

  const handleCardClick = () => {
    dispatch(brandingStateSliceActions.select(branding));
  };

  return (
    <div
      className={picker_color}
      style={{ border: branding.selected ? '1px solid' : 'none' }}
      onClick={handleCardClick}>
      <h3 className={picker_color__title}>{branding.title}</h3>
      <h1 className={picker_color__name_title} style={{ color: branding.bars[0].value }}>
        {branding.name}
      </h1>
      <p className={picker_color__inner_title}>Colors for the Bars and/Or Text:</p>
      <div className={picker_color__bar_container}>
        {branding.bars.map((item, index) => (
          <div className={picker_color__circle_container} key={index}>
            <div className={picker_color__circle} style={{ backgroundColor: item.value }} />
            <p className={picker_color__circle_title}>{item.name}</p>
          </div>
        ))}
      </div>
      <div className={picker_color__example_container}>
        <PaletteExample colors={branding.bars} />
        <PaletteExample colors={branding.bars} />
      </div>
      <p className={picker_color__inner_title}>Colors for the backgrounds:</p>
      <div className={picker_color__bar_container}>
        {branding.backgrounds.map((item, index) => (
          <div className={picker_color__rectangle_container} key={index}>
            <div className={picker_color__rectangle} style={{ backgroundColor: item.value }} />
            <p className={picker_color__circle_title}>{item.name}</p>
          </div>
        ))}
      </div>
      <div className={picker_color__bottom_container}>
        {branding.bars.map((item, index) => (
          <div
            className={picker_color__bottom_item}
            style={{ backgroundColor: item.value }}
            key={index}
          />
        ))}
      </div>
      {branding.selected && (
        <div className={complete_image}>
          <img src={completeMark} alt="complete mark" />
        </div>
      )}
    </div>
  );
}

export default PickerColorsCard;
