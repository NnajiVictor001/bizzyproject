import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productBrandingSliceActions } from 'store/product-branding';
import styles from './PickMyBaseTextColor.module.scss';

function PickMyBaseTextColor(props) {
  const { noText, className, baseColors } = props;
  let baseColorsProps;
  if (baseColors) {
    const { base_color1, base_color2, base_color3, base_color4 } = baseColors;
    baseColorsProps = [
      {
        id: 1,
        value: base_color1
      },
      {
        id: 2,
        value: base_color2
      },
      {
        id: 3,
        value: base_color3
      },
      {
        id: 4,
        value: base_color4
      }
    ];
  }

  const dispatch = useDispatch();

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);

  const base = baseColorsData.length
    ? structuredClone(baseColorsData)
    : structuredClone(baseColorsProps);

  const { container, title, body, body__item, select_item } = styles;

  const handleClick = (item) => {
    dispatch(productBrandingSliceActions.setSelectedBaseWebsiteColor(item.value));
    dispatch(productBrandingSliceActions.selectBaseColor(item));
  };

  return (
    <div className={container}>
      {!noText && <p className={title}>Pick My Base Text Color</p>}
      <div className={`${body} ${className}`}>
        {base.map((item, index) => (
          <div
            key={index}
            className={`${body__item} ${
              (selectedBaseColor?.value
                ? selectedBaseColor?.value === item.value
                : selectedBaseWebsiteColor === item.value) && select_item
            }`}
            style={{ backgroundColor: item.value }}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default PickMyBaseTextColor;
