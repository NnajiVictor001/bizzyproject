import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import { productBrandingSliceActions } from 'store/product-branding';

import edit from 'img/edit.svg';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import { applyColorSaturationToHexColor } from 'helpers/utils';
import ApiService from 'helpers/api';
import { useAlert } from 'hooks/alert';
import { convertColorsToPallete } from 'helpers/pallete';
import styles from './PickMyColorPallet.module.scss';

function PickMyColors(props) {
  const entityId = localStorage.getItem('entityId');

  const { onBackClick, onCheck, setColors, originalColors } = props;
  const {
    title,
    title__back,
    picker_container,
    picker_color_left,
    picker_color_left__chrome_picker,
    picker_color_right,
    picker_color_right__upper_con,
    picker_color_right__upper_con__item,
    picker_color_right__upper_con__item__plus,
    picker_color_right__select_container,
    picker_color_right__select_container__item,
    add_color_btn,
    edit_btn,
    edit_btn__txt,
    check_con,
    check_con__input,
    flexBetween,
    selected_item,
    unselected_item
  } = styles;

  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const selectedPaletteArr = useSelector((state) => state.productBranding.selectedPaletteArr);
  const palleteData = useSelector((state) => state.productBranding.palleteData);
  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);

  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const [pickedColor, setPickedColor] = useState({ hex: '#000000' });
  const [addedColorsArray, setAddedColorsArray] = useState(selectedPallete.mainColors);
  const [colorName, setColorName] = useState('');
  const [selectedItem, setSelectedItem] = useState(selectedPallete.mainColors[0]);

  const handleChangeColor = (color) => {
    setPickedColor(color);
  };

  const handleSelectItem = (el) => {
    setSelectedItem(el);
  };

  const handleUpdate = (id, value, name) => {
    const temp = [
      ...addedColorsArray.slice(0, id),
      {
        ...addedColorsArray[id],
        value,
        name
      },
      ...addedColorsArray.slice(id + 1)
    ];
    setColors(Array.from(Object.values(temp), (obj) => obj.value));
    setAddedColorsArray(temp);
  };

  const handleAddColorButton = () => {
    handleUpdate(selectedItem.id, pickedColor.hex, `Color ${selectedItem.id}`);
  };

  const handleEditColorButton = (evt) => {
    setColorName(evt.target.value);
  };

  const handleCheck = async () => {
    if (!colorName) {
      addAlert('Please Add Color Name');
      return;
    }
    // Custom Palette background colors are calculated
    // by adding 5% saturation to the first three main colors
    const payload = {
      name: colorName,
      background_color1: applyColorSaturationToHexColor(addedColorsArray[0].value, 5),
      background_color2: applyColorSaturationToHexColor(addedColorsArray[2].value, 5),
      background_color3: applyColorSaturationToHexColor(addedColorsArray[4].value, 5),
      background_color4: '#ffffff',
      base_color1: baseColorsData[0].value,
      base_color2: baseColorsData[1].value,
      base_color3: baseColorsData[2].value,
      base_color4: baseColorsData[3].value,
      color1: addedColorsArray[0].value,
      color2: addedColorsArray[1].value,
      color3: addedColorsArray[2].value,
      color4: addedColorsArray[3].value,
      color5: addedColorsArray[4].value
    };

    const paletteResponse = await ApiService.post('/bizzy/user-color-palettes/', {
      ...payload,
      owner_entity: entityId
    });
    const colors = paletteResponse.data;
    delete colors.owner_entity;

    const palette = convertColorsToPallete(colors);
    dispatch(productBrandingSliceActions.setSelectedPaletteArr([colors, ...selectedPaletteArr]));
    dispatch(productBrandingSliceActions.setDefaultPalette(colors));
    dispatch(productBrandingSliceActions.selectColorPallete(palette));
    dispatch(productBrandingSliceActions.setPalleteData([palette, ...palleteData]));
    dispatch(productBrandingSliceActions.addColorsFlag(false));
    onCheck();
  };

  const handleAddCustomColors = () => {
    setColors(originalColors);
    dispatch(productBrandingSliceActions.addColorsFlag(false));
    onBackClick();
  };

  return (
    <div>
      <div className={flexBetween}>
        <p className={title}>Pick My Color Pallet</p>
        <span className={title__back} onClick={handleAddCustomColors}>
          &larr; Back
        </span>
      </div>
      <div className={picker_container}>
        <div className={picker_color_left}>
          <ColorPicker
            className={picker_color_left__chrome_picker}
            color={pickedColor}
            onChange={handleChangeColor}
          />
          <div className={add_color_btn} onClick={handleAddColorButton}>
            + Add Color
          </div>
        </div>
        <div className={picker_color_right}>
          <div className={picker_color_right__upper_con}>
            <div
              className={`${picker_color_right__upper_con__item} ${unselected_item}`}
              onClick={handleAddColorButton}>
              <p className={picker_color_right__upper_con__item__plus}>+</p>
            </div>
            {addedColorsArray.map((el, index) => (
              <div
                className={`${picker_color_right__upper_con__item} ${
                  el.id === selectedItem.id ? selected_item : unselected_item
                }`}
                style={{ backgroundColor: el.value ? el.value : '#FFFFFF' }}
                key={index}
                onClick={() => handleSelectItem(el)}
              />
            ))}
          </div>
          <div className={edit_btn}>
            <img src={edit} alt="edit svg" />
            <input
              className={edit_btn__txt}
              type="text"
              value={colorName}
              placeholder="Input Palette Name"
              onChange={handleEditColorButton}
            />
          </div>
          <div className={picker_color_right__select_container}>
            {addedColorsArray.map((el, index) => (
              <div
                className={picker_color_right__select_container__item}
                style={{ backgroundColor: el.value ? el.value : '#FFFFFF' }}
                key={index}
              />
            ))}
          </div>
          <div className={check_con}>
            <InputCheckboxCustom
              className={check_con__input}
              id="looksGood"
              checked
              onChange={handleCheck}
              label="Looks Good! NEXT"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickMyColors;
