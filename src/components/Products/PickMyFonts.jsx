import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productBrandingSliceActions } from 'store/product-branding';
import styles from './PickMyFonts.module.scss';

function PickMyFonts() {
  const fontsData = useSelector((state) => state.productBranding.fontsData);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const stylesData = useSelector((state) => state.productBranding.stylesData);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const dispatch = useDispatch();
  const {
    container,
    title,
    fonts_con,
    item_con,
    item_con__title,
    item_con__content,
    item_con__lofty_title,
    select_item_con
  } = styles;

  const handleFontClick = (item) => {
    dispatch(productBrandingSliceActions.selectFont({ ...item, isUpdate: true }));
  };

  const handleStyleClick = (item) => {
    dispatch(productBrandingSliceActions.selectStyle({ ...item, isUpdate: true }));
  };

  return (
    <div className={container}>
      <p className={title}>Pick My Fonts & Style</p>
      <div className={fonts_con}>
        {fontsData.map((item, index) => (
          <div
            key={index}
            className={`${item_con} ${item.id === selectedFont.id && select_item_con}`}
            onClick={() => handleFontClick(item)}>
            <p
              className={item.name === 'Lofty Goals' ? item_con__lofty_title : item_con__title}
              style={{
                fontFamily: item.name === 'Lofty Goals' ? 'Montserrat' : item.name
              }}>
              {item.name === 'Lofty Goals' ? 'Montserrat' : item.name}
            </p>
            <p
              className={item_con__content}
              style={{
                fontFamily: `${item.name}`,
                fontWeight: '500',
                textTransform: item.name === 'Lofty Goals' ? 'lowercase' : 'uppercase'
              }}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className={fonts_con}>
        {stylesData.map((item, index) => (
          <div
            key={index}
            className={`${item_con} ${item.id === selectedStyle.id && select_item_con}`}
            onClick={() => handleStyleClick(item)}>
            <p
              className={item_con__title}
              style={{ fontWeight: item.name === 'lower' ? 400 : 700 }}>
              {item.title}
            </p>
            <p
              className={item_con__content}
              style={{
                fontWeight: item.name === 'bold' ? 500 : 400,
                textTransform: item.content === 'Blended Styles' ? 'initial' : ''
              }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickMyFonts;
