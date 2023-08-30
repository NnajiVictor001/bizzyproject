import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLetter from 'components/InputFields/InputLetter';
import InputColorBar from 'components/InputFields/InputColorBar';
import InputBoolNumbers from 'components/InputFields/InputBoolNumbers';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import DialogChangeColor from 'helpers/DialogChangeColor';
import Pallete from 'components/SlideShow/Pallete';
import { ingredientPreviewSliceActions } from 'store/ingredient-preview';
import InputRichText from 'components/InputFields/InputRichText';
import { backgBar } from 'constants/Colors';
import log from '../../helpers/log';
import styles from './IngredientForm.module.scss';

function IngredientForm() {
  const {
    form,
    form__container,
    form__bottom,
    form__bottom__refresh_btn,
    form__row,
    form__row__headline8,
    form__row__headline4,
    form__row__headline3,
    form__row__headline2,
    form__row__headline1,
    form__row__blurp100,
    form__row__blurp200,
    form__row__blurp525,
    form__row__blurp_no_limit,
    customColorBackg,
    form__row__paragraphShort,
    form__row__paragraphMiddle,
    form__row__paragraphBig
  } = styles;

  const selectedIngredient = useSelector((state) => state.ingredientPreview.selectedIngredient);
  const selPallete = useSelector((state) => state.productBranding.selectedPallete);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);

  const dispatch = useDispatch();

  const defaultColor = '#51CC59';

  const selectedPallete = selPallete || {
    mainColors: [
      { id: 0, value: '#5CE1E6', name: 'Color 1' },
      { id: 1, value: '#1CAEB2', name: 'Color 2' },
      { id: 2, value: '#FFA924', name: 'Color 3' },
      { id: 3, value: '#FDC600', name: 'Color 4' },
      { id: 4, value: '#9ACC3A', name: 'Color 5' }
    ]
  };

  const colorsBar = [
    { id: 0, value: '#5CE1E6', name: 'Color 1' },
    { id: 1, value: '#1CAEB2', name: 'Color 2' },
    { id: 2, value: '#FFA924', name: 'Color 3' },
    { id: 3, value: '#FDC600', name: 'Color 4' },
    { id: 4, value: '#9ACC3A', name: 'Color 5' },
    {
      id: 5,
      value: selectedBaseColor ? selectedBaseColor.value : '#757575',
      name: 'Color 6'
    }
  ];

  const colorsBackgBar = [
    { id: 0, value: '#5CE1E6', name: 'Color 1' },
    { id: 1, value: '#1CAEB2', name: 'Color 2' },
    { id: 2, value: '#FFA924', name: 'Color 3' },
    { id: 3, value: '#FDC600', name: 'Color 4' },
    { id: 4, value: '#9ACC3A', name: 'Color 5' },
    { id: 5, value: '#DEF9FA', name: 'Color 6' },
    { id: 6, value: '#FFEED3', name: 'Color 7' },
    { id: 7, value: '#EBF5D8', name: 'Color 8' },
    {
      id: 8,
      value: selectedBaseColor ? selectedBaseColor.value : '#757575',
      name: 'Color 9'
    }
  ];

  const [colorArray, setColorArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [variableObj, setVariableObj] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColorTagName, setSelectedColorTagName] = useState('');
  const [allOptions, setAllOptions] = useState([]);

  const getLetterValue = (option, val) => {
    if (option === 'numbers') {
      switch (val) {
        case 'a':
          return '1';
        case 'b':
          return '2';
        case 'c':
          return '3';
        case 'd':
          return '4';
        case 'e':
          return '5';
        case 'f':
          return '6';
        case 'g':
          return '7';
        case 'h':
          return '8';
        default:
          return '';
      }
    } else if (option === 'letters') {
      switch (val) {
        case 'a':
          return 'A';
        case 'b':
          return 'B';
        case 'c':
          return 'C';
        case 'd':
          return 'D';
        case 'e':
          return 'E';
        case 'f':
          return 'F';
        case 'g':
          return 'G';
        case 'h':
          return 'H';
        default:
          return '';
      }
    } else {
      switch (val) {
        case 'a':
          return 'M';
        case 'b':
          return 'T';
        case 'c':
          return 'W';
        case 'd':
          return 'T';
        case 'e':
          return 'F';
        case 'f':
          return 'S';
        case 'g':
          return 'S';
        case 'h':
          return 'S';
        default:
          return '';
      }
    }
  };

  const updateMatrix = (matrix) => {
    let updateData;
    if (matrix && matrix.length > 0) {
      const alphabets = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ];
      const matrixMaxArrayLength = matrix[0].length;
      const updatedMatrix = matrix.map((item, index) => {
        if (item.length < matrixMaxArrayLength && item[0]?.property?.column !== 'a') {
          const existingAlphabet = alphabets.indexOf(item[item.length - 1]?.property?.column);
          const colorItem = item.find(
            (itemColor) =>
              itemColor.title.includes('__backg_bar') ||
              itemColor.title.includes('__color_bar') ||
              itemColor.title.includes('__color_backg_bar')
          );
          if (existingAlphabet > 0 && !colorItem) {
            // eslint-disable-next-line no-unreachable-loop
            for (let i = 0; i < existingAlphabet; i++) {
              return [
                {
                  color: item[0].color,
                  title: 'text__headline',
                  value: '',
                  property: {
                    column: alphabets[existingAlphabet - 1],
                    row: index + 1,
                    length: matrix[0][existingAlphabet - 1].property.length
                  }
                },
                ...item
              ];
            }
          } else {
            return [...item];
          }
        }
        return item;
      });
      updateData = updatedMatrix;
    } else {
      updateData = matrix;
    }
    return updateData;
  };

  const checkIsSelectedBaseColor = (titleTxt, color) => {
    const selectedColorsBar = titleTxt.includes('__color_backg_bar')
      ? colorsBackgBar
      : titleTxt.includes('__color_bar')
      ? colorsBar
      : [];

    if (color.toLowerCase() === defaultColor.toLowerCase() || !selectedBaseColor) return false;

    if (selectedColorsBar.length === 0) return false;

    if (selectedColorsBar.findIndex((item) => item.value.toLowerCase() === color.toLowerCase()) < 0)
      return true;

    return (
      selectedColorsBar[selectedColorsBar.length - 1].value.toLowerCase() === color.toLowerCase()
    );
  };

  useEffect(() => {
    const tempTextArray =
      selectedIngredient.variables && selectedIngredient.variables.text
        ? selectedIngredient.variables.text
        : [];
    const tempColorArray =
      selectedIngredient.variables && selectedIngredient.variables.color
        ? selectedIngredient.variables.color
        : [];
    setColorArray(tempColorArray);
    // colors array without headerline colors
    const specialColorArray = tempColorArray.filter(
      (item) => item.includes('_bar') || item.includes('_backg')
    );

    const textObjArray = tempTextArray.map((item) => {
      const tempTxt = item.split('__')[1];
      let placeholderTxt = '';
      const lastTxt = tempTxt.split('_')[1];
      if (tempTxt.includes('letter')) {
        const firstLetter = lastTxt.charAt(0);
        placeholderTxt = getLetterValue('numbers', firstLetter);
      }
      return {
        [item]:
          selectedIngredient.ingredient_data && selectedIngredient.ingredient_data[item]
            ? selectedIngredient.ingredient_data[item]
            : placeholderTxt
      };
    });

    const colorObjArray = tempColorArray.map((item) => ({
      [item]:
        selectedIngredient.ingredient_data && selectedIngredient.ingredient_data[item]
          ? selectedIngredient.ingredient_data[item]
          : defaultColor
    }));
    const variableObjArray = textObjArray.concat(colorObjArray);
    const finalVariableObj = {};
    variableObjArray.map((item) => {
      Object.assign(finalVariableObj, item);
      return null;
    });
    setVariableObj(finalVariableObj);

    const metaData = selectedIngredient.metadata;
    const textMetaArray = tempTextArray.map((item) => {
      const tempTxt = item.split('__')[1];
      const colorTagName = `color__${item.split('__')[1]}`;
      let placeholderTxt = '';
      const lastTxt = tempTxt.split('_')[1];
      if (tempTxt.includes('letter')) {
        const firstLetter = lastTxt.charAt(0);
        placeholderTxt = getLetterValue('numbers', firstLetter);
      }
      const eachMeta = {
        title: item,
        value:
          selectedIngredient.ingredient_data && selectedIngredient.ingredient_data[item]
            ? selectedIngredient.ingredient_data[item]
            : placeholderTxt,
        color:
          selectedIngredient.ingredient_data && selectedIngredient.ingredient_data[colorTagName]
            ? selectedIngredient.ingredient_data[colorTagName]
            : defaultColor,
        property: metaData && metaData[item] ? metaData[item] : null
      };
      return eachMeta;
    });
    const specialColorMetaArray = specialColorArray.map((item) => {
      const eachColMeta = {
        title: item,
        value:
          selectedIngredient.ingredient_data && selectedIngredient.ingredient_data[item]
            ? selectedIngredient.ingredient_data[item]
            : defaultColor,
        property: metaData && metaData[item] ? metaData[item] : null
      };
      return eachColMeta;
    });
    const metaArray = textMetaArray.concat(specialColorMetaArray);
    const cleanMetaArray = metaArray.filter((item) => item.property && item.property.row);
    const mpRow = new Map(
      cleanMetaArray.map((item) => [item.property.row, { row: item.property.row }])
    );
    const numberOfRow = Array.from(mpRow.values()).length;
    const rowsCount =
      numberOfRow === 0 ? metaArray.length : metaArray.length - cleanMetaArray.length + numberOfRow;

    const rightMetaArray = metaArray.filter((item) => !!item.property && !!item.property.row);
    const nullMetaArray = metaArray.filter((item) => !rightMetaArray.includes(item));

    const sortRightMetaArray = rightMetaArray.sort((a, b) => {
      if (a.property.row < b.property.row) return -1;
      if (a.property.row > b.property.row) return 1;

      if (a.property.column < b.property.column) return -1;
      if (a.property.column > b.property.column) return 1;
      return 0;
    });
    const sortMetaArray = sortRightMetaArray.concat(nullMetaArray);

    const matrix = [];
    let i;
    let k;
    for (i = 1, k = -1; i <= rowsCount; i++) {
      k++;
      matrix[k] = [];
      matrix[k] = sortMetaArray.filter((item, index) =>
        item.property && item.property.row
          ? item.property.row === i
          : numberOfRow === 0
          ? index + 1 === i
          : index - sortRightMetaArray.length + numberOfRow + 1 === i
      );
    }
    const updateData = updateMatrix(matrix);
    const newMatrix = [...updateData];
    setDisplayArray(newMatrix);
    const optionsArray = [];
    newMatrix.map((item) => {
      const letterItems = item.filter((el) => el.title.includes('letter'));
      if (letterItems.length > 0) {
        const letterTitle = letterItems[0].title;
        if (letterItems[0].value === '1') {
          const temp = {
            id: letterTitle,
            option: 'numbers'
          };
          optionsArray.push(temp);
        } else if (letterItems[0].value === 'A') {
          const temp = {
            id: letterTitle,
            option: 'letters'
          };
          optionsArray.push(temp);
        } else {
          const temp = {
            id: letterTitle,
            option: 'week'
          };
          optionsArray.push(temp);
        }
      }
      return null;
    });

    setAllOptions(optionsArray);
  }, [selectedIngredient]);

  const onClickRefresh = async () => {
    try {
      setIsLoading(true);

      const newVariableObj = { ...variableObj };
      // eslint-disable-next-line no-restricted-syntax
      for (const key in variableObj) {
        if (
          key.includes('__backg_bar') ||
          key.includes('__color_bar') ||
          key.includes('__color_backg_bar')
        ) {
          if (checkIsSelectedBaseColor(key, variableObj[key])) {
            newVariableObj[key] = selectedBaseColor.value;
          }
        }
      }

      setVariableObj(newVariableObj);

      const extraVariableObj = {
        color_palette: {
          background_color1: selPallete.backgroundColors[0].value,
          background_color2: selPallete.backgroundColors[1].value,
          background_color3: selPallete.backgroundColors[2].value,
          background_color4: selPallete.backgroundColors[3].value,
          base_color1: baseColorsData[0].value,
          base_color2: baseColorsData[1].value,
          base_color3: baseColorsData[2].value,
          base_color4: baseColorsData[3].value,
          color1: selPallete.mainColors[0].value,
          color2: selPallete.mainColors[1].value,
          color3: selPallete.mainColors[2].value,
          color4: selPallete.mainColors[3].value,
          color5: selPallete.mainColors[4].value
        },
        base_color: selectedBaseColor.value,
        headline_style: selectedStyle.name,
        font: selectedFont.system_name,
        font_2: selectedFont.secondary_system_name
      };
      const payload = { ...newVariableObj, ...extraVariableObj };
      const data = { ingredient_data: payload };

      const res = await apiCall(
        'post',
        `/book-generator/ingredients/${selectedIngredient.id}/render-image/`,
        null,
        data
      );

      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const newImage = res.data.image;

      const updatedSelIngredient = {
        ...selectedIngredient,
        ingredient_data: variableObj,
        image_preview: `data:image/png;base64,${newImage}`
      };
      dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));

      const html_res = await apiCall(
        'post',
        `/book-generator/ingredients/${selectedIngredient.id}/render-html/`,
        null,
        data
      );
      if (html_res.status !== 200) throw new Error('Something went wrong.. Please try again');

      dispatch(ingredientPreviewSliceActions.setIngredientHtml(html_res.data));

      setIsLoading(false);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const headingInputChangeHandler = (evt, target) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt.target.value };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedIngredient,
      ingredient_data: tempVariableObj
    };
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));
  };

  const inputRichChangeHandler = (evt, target) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedIngredient,
      ingredient_data: tempVariableObj
    };
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));
  };

  const headingInputClickHandler = (item, colorTagName) => {
    setSelectedColorTagName(colorTagName);
    setShowPopup(true);
  };

  const selectColor = (color) => {
    const tempVariableObj = { ...variableObj, [selectedColorTagName]: color };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedIngredient,
      ingredient_data: tempVariableObj
    };
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));
  };

  const handleColorClickItem = (color, target) => {
    const tempVariableObj = { ...variableObj, [target.title]: color };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedIngredient,
      ingredient_data: tempVariableObj
    };
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const productPallete = (
    <Pallete resource={selectedPallete} chooseOneColorFromPallete selectColor={selectColor} />
  );

  const selectChangedHeadBlurpCss = (headlineLength) => {
    if (headlineLength && headlineLength < 7) return form__row__headline8;
    if (headlineLength >= 7 && headlineLength < 12) return form__row__headline4;
    if (headlineLength >= 12 && headlineLength < 24) return form__row__headline3;
    if (headlineLength >= 24 && headlineLength < 44) return form__row__headline2;
    if (headlineLength >= 44 && headlineLength < 100) return form__row__headline1;
    if (headlineLength >= 100 && headlineLength < 200) return form__row__blurp100;
    if (headlineLength >= 200 && headlineLength < 525) return form__row__blurp200;
    if (headlineLength === 525) return form__row__blurp525;
    return form__row__blurp_no_limit;
  };

  const selectChangedParagraphCss = (headlineLength) => {
    if (headlineLength === 40) return form__row__paragraphShort;
    if (headlineLength === 245 && headlineLength === 150) return form__row__paragraphMiddle;
    return form__row__paragraphBig;
  };

  const handleOptionClick = (option, returnItems) => {
    const letterItems = returnItems.filter((el) => el.title.includes('letter'));
    const updatedAllOptions = allOptions.map((el) => {
      if (letterItems[0].title === el.id) return { ...el, option };
      return { ...el };
    });
    setAllOptions(updatedAllOptions);
    let updatedVariableObj = variableObj;
    letterItems.map((el) => {
      const tempTxt = el.title.split('__')[1];
      const lastTxt = tempTxt.split('_')[1];
      const firstLetter = lastTxt.charAt(0);
      const tempVariableObj = {
        ...updatedVariableObj,
        [el.title]: getLetterValue(option, firstLetter)
      };
      updatedVariableObj = tempVariableObj;
      return null;
    });
    setVariableObj(updatedVariableObj);
    const updatedSelIngredient = {
      ...selectedIngredient,
      ingredient_data: updatedVariableObj
    };
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(updatedSelIngredient));
  };

  return (
    <div className={form}>
      <div className={form__container}>
        {displayArray.map((rowItems, i) => {
          const letterItems = rowItems.filter((el) => el.title.includes('letter'));
          let idTitle = '';
          let currentOption = '';
          if (letterItems.length > 0) {
            idTitle = letterItems[0].title;
            currentOption = allOptions.filter((item) => item.id === idTitle)[0].option;
          }
          return (
            <div key={i}>
              <div className={form__row}>
                {rowItems.map((item, index) => {
                  const titleTxt = item.title;

                  const headlineLength =
                    item.property && item.property.length && item.property.length;

                  const defaultTxt = titleTxt.split('__')[1].split('_')[0];
                  let placeholderTxt = '';
                  if (rowItems.length > 4 || (headlineLength && headlineLength < 7)) {
                    placeholderTxt = '';
                  } else {
                    placeholderTxt = defaultTxt[0].toUpperCase() + defaultTxt.slice(1);
                  }
                  const colorTagName = `color__${titleTxt.split('__')[1]}`;
                  const pickerNoValue = !(
                    colorArray &&
                    colorArray.length > 0 &&
                    colorArray.includes(colorTagName)
                  );
                  return (() => {
                    if (titleTxt.includes('letter') && titleTxt.includes('text')) {
                      return (
                        <InputLetter
                          key={index}
                          type="text"
                          id={`${item}${index}`}
                          value={item.value}
                          pickerBgColor={item.color}
                          onChange={(evt) => headingInputChangeHandler(evt, item)}
                          onClick={() => headingInputClickHandler(item, colorTagName)}
                          pickerNo={pickerNoValue}
                        />
                      );
                    }
                    if (
                      titleTxt.includes('__headline') ||
                      titleTxt.includes('__blurp') ||
                      titleTxt.includes('__paragraph')
                    ) {
                      return (
                        <>
                          {/* {item.value ? ( */}
                          <InputRichText
                            key={index}
                            id={`${item.value}${index}`}
                            value={item.value}
                            pickerBgColor={item.color}
                            onChange={(evt) => inputRichChangeHandler(evt, item)}
                            onClick={() => headingInputClickHandler(item, colorTagName)}
                            pickerNo={pickerNoValue}
                            placeholder={placeholderTxt}
                            className={
                              titleTxt.includes('__paragraph')
                                ? selectChangedParagraphCss(headlineLength)
                                : selectChangedHeadBlurpCss(headlineLength)
                            }
                          />
                          {/* ) : (
                          <div
                          className={
                          titleTxt.includes("__paragraph")
                          ? selectChangedParagraphCss(headlineLength)
                          : selectChangedHeadBlurpCss(headlineLength)
                          }
                          ></div>
                          )} */}
                        </>
                      );
                    }
                    if (
                      titleTxt.includes('__backg_bar') ||
                      titleTxt.includes('__color_bar') ||
                      titleTxt.includes('__color_backg_bar')
                    ) {
                      return (
                        <InputColorBar
                          colorsBar={
                            titleTxt.includes('__backg_bar')
                              ? backgBar
                              : titleTxt.includes('__color_bar')
                              ? colorsBar
                              : colorsBackgBar
                          }
                          isSelectedBaseColor={checkIsSelectedBaseColor(titleTxt, item.value)}
                          key={index}
                          value={item.value}
                          handleClickItem={(color) => handleColorClickItem(color, item)}
                          className={titleTxt.includes('__color_backg_bar') && customColorBackg}
                        />
                      );
                    }
                    return (
                      <InputRichText
                        key={index}
                        value={item.value}
                        pickerBgColor={item.color}
                        onChange={(evt) => inputRichChangeHandler(evt, item)}
                        onClick={() => headingInputClickHandler(item, colorTagName)}
                        pickerNo={pickerNoValue}
                        placeholder={placeholderTxt}
                        className={selectChangedHeadBlurpCss(headlineLength)}
                      />
                    );
                  })();
                })}
              </div>
              {rowItems.some((item) => item.title.includes('letter')) && (
                <div className={form__row}>
                  <InputBoolNumbers
                    key={i}
                    value={currentOption}
                    onClick={(option) => handleOptionClick(option, rowItems)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={form__bottom}>
        <button onClick={onClickRefresh} className={form__bottom__refresh_btn}>
          Refresh
        </button>
      </div>
      {isLoading && <LinearProgress color="inherit" />}
      <DialogChangeColor onClose={onClose} open={showPopup} pallete={productPallete} />
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default IngredientForm;
