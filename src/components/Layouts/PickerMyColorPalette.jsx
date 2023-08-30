import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChromePicker } from 'react-color';

import { brandingStateSliceActions } from 'store/branding-state';
import NavButton from 'components/Buttons/NavButton';
import completeMark from 'img/complete.svg';
import styles from './PickerMyColorPalette.module.scss';

function PickerMyColorPalette(props) {
  const dispatch = useDispatch();

  const {
    picker_container,
    picker_color_left,
    picker_color_left__under,
    picker_color,
    picker_color__title,
    picker_color_left__savebtn,
    picker_color__addbtn,
    picker_color__chrome_picker,
    picker_color_left__select_container,
    picker_color_left__select_container__item,
    picker_color_left__up_part,
    picker_color_left__name_title,
    complete_image
  } = styles;

  const { brandings } = props;
  const [selectedColor, setSelectedColor] = useState({ hex: '#000000' });
  const [addedColorsArray, setAddedColorsArray] = useState([
    {
      id: 0,
      value: '',
      name: ''
    },
    {
      id: 1,
      value: '',
      name: ''
    },
    {
      id: 2,
      value: '',
      name: ''
    },
    {
      id: 3,
      value: '',
      name: ''
    },
    {
      id: 4,
      value: '',
      name: ''
    }
  ]);
  const [addingNumber, setAddingNumber] = useState(0);
  const [saved, setSaved] = useState(false);

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
    setAddedColorsArray(temp);
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  const handleAddColorButton = () => {
    if (addingNumber < 5) {
      setAddingNumber(addingNumber + 1);
      handleUpdate(addingNumber, selectedColor.hex, `Color ${addingNumber + 1}`);
    }
  };

  const handleSelectItem = (el) => {
    console.log('handle select item=>', el);
  };

  const handleSaveButton = () => {
    if (addingNumber === 5) {
      dispatch(brandingStateSliceActions.add(addedColorsArray));
      setSaved(true);
    }
  };

  return (
    <>
      <h3 className={picker_color__title}>
        {!saved ? 'Add New Color Scheme' : 'Custom Color Schemes'}
      </h3>
      {!saved ? (
        <div className={picker_container}>
          <div className={picker_color_left}>
            <div className={picker_color_left__up_part} />
            <div className={picker_color_left__under}>
              <div className={picker_color_left__select_container}>
                {addedColorsArray.map((el, index) => (
                  <div
                    className={picker_color_left__select_container__item}
                    style={{ backgroundColor: el.value ? el.value : '#FFFFFF' }}
                    key={index}
                    onClick={() => handleSelectItem(el)}
                  />
                ))}
              </div>
              <NavButton
                className={picker_color_left__savebtn}
                type="button"
                txt="Save"
                bgColor="#000000"
                onClick={handleSaveButton}
              />
            </div>
          </div>
          <div className={picker_color}>
            <ChromePicker
              className={picker_color__chrome_picker}
              color={selectedColor}
              onChange={handleChangeColor}
            />
            <NavButton
              className={picker_color__addbtn}
              type="button"
              txt="Add&nbsp;Color"
              bgColor="#ffdf60"
              onClick={handleAddColorButton}
            />
          </div>
        </div>
      ) : (
        <div className={picker_container}>
          <div className={picker_color_left} style={{ border: '1px solid' }}>
            <div className={picker_color_left__under}>
              <h1 className={picker_color_left__name_title}>PALETTE -{brandings.length}</h1>
              <div className={complete_image}>
                <img src={completeMark} alt="complete mark" />
              </div>
              <div className={picker_color_left__select_container}>
                {addedColorsArray.map((el, index) => (
                  <div
                    className={picker_color_left__select_container__item}
                    style={{ backgroundColor: el.value ? el.value : '#FFFFFF' }}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PickerMyColorPalette;
