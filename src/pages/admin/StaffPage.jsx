import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLetter from 'components/InputFields/InputLetter';
import TitleBar from 'components/TitleBar/TitleBar';
import InputColorBar from 'components/InputFields/InputColorBar';
import InputBoolNumbers from 'components/InputFields/InputBoolNumbers';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { apiCall } from 'helpers/api-config';
import DialogChangeColor from 'helpers/DialogChangeColor';
import Pallete from 'components/SlideShow/Pallete';
import { staffPageSliceActions } from 'store/staff-preview';
import InputRichText from 'components/InputFields/InputRichText';
import { convertColorsToPallete } from 'helpers/pallete';
import styles from './StaffPageForm.module.scss';

function StaffPage(props) {
  const { selectedData } = props;
  const { variables, ingredient_data, ingredient_metadata, id, ingredient, metadata } =
    selectedData;
  const {
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
  const selectedStaff = useSelector((state) => state.staffPage.selectedStaffPage);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);
  const defaultGlobalVars = useSelector((state) => state.staffPage.defaultGlobalVars);
  const defaultGlobalVarsPalette = convertColorsToPallete(defaultGlobalVars.color_palette);

  const backgBar = defaultGlobalVarsPalette.backgroundColors;
  const dispatch = useDispatch();

  const defaultColor = '#9A9A9A';
  const baseColorKey = 'base_color';

  const selectedPallete = defaultGlobalVarsPalette;

  const colorsBar = [
    ...defaultGlobalVarsPalette.mainColors,
    defaultGlobalVarsPalette.baseColors[3]
  ];

  const colorsBackgBar = [
    ...defaultGlobalVarsPalette.mainColors,
    ...defaultGlobalVarsPalette.backgroundColors,
    defaultGlobalVarsPalette.baseColors[3]
  ];

  const [colorArray, setColorArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [variableObj, setVariableObj] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColorTagName, setSelectedColorTagName] = useState('');
  const [allOptions, setAllOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [error] = useState(false);
  const [errorMessage] = useState('');

  const keyToColorMapping = (key) => {
    if (!key) return defaultColor;
    key = key.replace('brackground', 'background');
    return defaultGlobalVars.color_palette[key.toLowerCase()];
  };

  const colorToKeyMapping = (key) => {
    const mapping = Object.fromEntries(
      Object.entries(defaultGlobalVars.color_palette).map((a) => a.reverse())
    );
    const loweredMapping = Object.keys(mapping).reduce((obj, k) => {
      obj[k.toLowerCase()] = mapping[k];
      return obj;
    }, {});
    return loweredMapping[key.toLowerCase()];
  };

  const fetchIngredientId = async (value) => {
    try {
      let searchRes;

      if (!Number.isNaN(value)) {
        const resId = await apiCall('get', `/book-generator/ingredients/?id=${value}`);
        if (resId.status !== 200) throw new Error('Something went wrong.. Please try again');
        searchRes = resId.data.results;
      }

      if (searchRes.length > 0) {
        setSearchValue(searchRes[0].name);
      }
    } catch (err) {
      /* empty */
    }
  };

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
        if (item.length < matrixMaxArrayLength && item[0].property.column !== 'a') {
          const existingAlphabet = alphabets.indexOf(item[item.length - 1].property.column);
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

  useEffect(() => {
    fetchIngredientId(ingredient);
  }, [ingredient]);

  useEffect(() => {
    const tempTextArray = variables && variables.text ? variables.text : [];
    const tempColorArray = variables && variables.color ? variables.color : [];
    setColorArray(tempColorArray);
    // colors array without headerline colors
    const specialColorArray = tempColorArray.filter(
      (item) => item.includes('_bar') || item.includes('_backg')
    );

    const textObjArray = tempTextArray.map((item) => {
      return {
        [item]:
          ingredient_data && ingredient_data[item]
            ? ingredient_data[item]
            : ingredient_metadata[item].default
      };
    });
    const colorObjArray = tempColorArray.map((item) => {
      const colorKey = item.replace('color', 'color_key');
      return {
        [colorKey]:
          ingredient_data && ingredient_data[colorKey] ? ingredient_data[colorKey] : baseColorKey
      };
    });
    const variableObjArray = textObjArray.concat(colorObjArray);
    const finalVariableObj = {};
    variableObjArray.map((item) => {
      Object.assign(finalVariableObj, item);
      return null;
    });
    setVariableObj(finalVariableObj);

    const metaData = ingredient_metadata;
    const textMetaArray = tempTextArray.map((item) => {
      const colorTagName = `color__${item.split('__')[1]}`;
      const colorKey = colorTagName.replace('color', 'color_key');
      const eachMeta = {
        title: item,
        value:
          ingredient_data && ingredient_data[item]
            ? ingredient_data[item]
            : ingredient_metadata[item].default,
        color:
          ingredient_data && ingredient_data[colorKey]
            ? keyToColorMapping(ingredient_data[colorKey])
            : defaultColor,
        property: metaData && metaData[item] ? metaData[item] : null
      };
      return eachMeta;
    });
    const specialColorMetaArray = specialColorArray.map((item) => {
      const colorKey = item.replace('color', 'color_key');
      const eachColMeta = {
        title: item,
        value:
          ingredient_data && ingredient_data[colorKey]
            ? keyToColorMapping(ingredient_data[colorKey])
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
  }, [variables, ingredient_data, ingredient_metadata]);

  const headingInputChangeHandler = (evt, target) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt.target.value };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedSelIngredient;
      const updatedStaff = {
        ...selectedStaff,
        ingredients: tempArray
      };
      dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
    }
  };

  const inputRichChangeHandler = (evt, target) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);
      tempArray[index] = updatedSelIngredient;
      const updatedStaff = {
        ...selectedStaff,
        ingredients: tempArray
      };
      dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
    }
  };

  const headingInputClickHandler = (item, colorTagName) => {
    setSelectedColorTagName(colorTagName);
    setShowPopup(true);
  };

  const selectColor = (color) => {
    const colorKey = selectedColorTagName.replace('color', 'color_key');
    const tempVariableObj = {
      ...variableObj,
      [colorKey]: colorToKeyMapping(color)
    };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedSelIngredient;
      const updatedStaff = {
        ...selectedStaff,
        ingredients: tempArray
      };
      dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
    }
  };

  const handleColorClickItem = (color, target) => {
    const colorKey = target.title.replace('color', 'color_key');
    const tempVariableObj = {
      ...variableObj,
      [colorKey]: colorToKeyMapping(color)
    };
    setVariableObj(tempVariableObj);
    const updatedSelIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedSelIngredient;
      const updatedStaff = {
        ...selectedStaff,
        ingredients: tempArray
      };
      dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
    }
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
      ...selectedData,
      ingredient_data: updatedVariableObj
    };
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedSelIngredient;
      const updatedStaff = {
        ...selectedStaff,
        ingredients: tempArray
      };
      dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
    }
  };

  const onHandleClickEye = (metaTitle, val) => {
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);
      let updatedMetaData = {};
      if (tempArray[index].metadata) {
        updatedMetaData = {
          ...tempArray[index].metadata,
          [metaTitle]: {
            ...tempArray[index].metadata[metaTitle],
            hide: val
          }
        };
      } else {
        updatedMetaData = {
          [metaTitle]: {
            hide: val
          }
        };
      }
      if (index >= 0) {
        tempArray[index] = {
          ...tempArray[index],
          metadata: updatedMetaData
        };
        const updatedStaff = {
          ...selectedStaff,
          ingredients: tempArray
        };
        dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
      }
    }
  };

  const onHandleChangeLabel = (metaTitle, label) => {
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);
      let updatedMetaData = {};
      if (tempArray[index].metadata) {
        updatedMetaData = {
          ...tempArray[index].metadata,
          [metaTitle]: {
            ...tempArray[index].metadata[metaTitle],
            label
          }
        };
      } else {
        updatedMetaData = {
          [metaTitle]: {
            label
          }
        };
      }

      if (index >= 0) {
        tempArray[index] = {
          ...tempArray[index],
          metadata: updatedMetaData
        };
        const updatedStaff = {
          ...selectedStaff,
          ingredients: tempArray
        };
        dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
      }
    }
  };

  const headingInputChangeMargin = (evt) => {
    if (selectedStaff && selectedStaff.ingredients) {
      const tempArray = [...selectedStaff.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      if (index >= 0) {
        tempArray[index] = {
          ...tempArray[index],
          ingredient_data: {
            ...tempArray[index].ingredient_data,
            margin: parseInt(evt.target.value)
          }
        };
        const updatedStaff = {
          ...selectedStaff,
          ingredients: tempArray
        };
        dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
      }
    }
  };

  const handleClickArrow = (arrow) => {
    if (arrow === 'up') {
      if (selectedStaff && selectedStaff.ingredients) {
        const tempArray = [...selectedStaff.ingredients];
        const index = tempArray.findIndex((e) => e.id === id);
        const arrayLenth = selectedStaff.ingredients.length;
        if (arrayLenth > 1 && index > 0) {
          tempArray[index] = {
            ...tempArray[index],
            order: index - 1
          };

          tempArray[index - 1] = {
            ...tempArray[index - 1],
            order: index
          };

          const sortArray = tempArray.sort((a, b) => parseInt(a.order) - parseInt(b.order));

          const updatedStaff = {
            ...selectedStaff,
            ingredients: sortArray
          };
          dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
        }
      }
    } else if (arrow === 'down') {
      if (selectedStaff && selectedStaff.ingredients) {
        const tempArray = [...selectedStaff.ingredients];
        const index = tempArray.findIndex((e) => e.id === id);
        const arrayLenth = selectedStaff.ingredients.length;
        if (arrayLenth > 1 && index < arrayLenth - 1) {
          tempArray[index] = {
            ...tempArray[index],
            order: index + 1
          };

          tempArray[index + 1] = {
            ...tempArray[index + 1],
            order: index
          };

          const sortArray = tempArray.sort((a, b) => parseInt(a.order) - parseInt(b.order));

          const updatedStaff = {
            ...selectedStaff,
            ingredients: sortArray
          };
          dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
        }
      }
    }
  };

  return (
    <>
      <TitleBar
        item={ingredient_data}
        title={searchValue}
        onChange={(evt) => headingInputChangeMargin(evt)}
        onClickUp={() => {
          handleClickArrow('up');
        }}
        onClickDown={() => {
          handleClickArrow('down');
        }}
      />
      <div key={id}>
        {displayArray.map((rowItems, index) => {
          const letterItems = rowItems.filter((el) => el.title.includes('letter'));
          let idTitle = '';
          let currentOption = '';
          if (letterItems.length > 0) {
            idTitle = letterItems[0].title;
            currentOption = allOptions.filter((item) => item.id === idTitle)[0].option;
          }
          return (
            <div key={index}>
              <div className={form__row}>
                {rowItems.map((item, i) => {
                  const titleTxt = item.title;

                  const headlineLength =
                    item.property && item.property.length && item.property.length;
                  let placeholderTxt = '';

                  if (rowItems.length > 4 || (headlineLength && headlineLength < 7)) {
                    placeholderTxt = '';
                  } else if (
                    metadata &&
                    typeof metadata === 'object' &&
                    metadata[titleTxt] &&
                    metadata[titleTxt].label
                  ) {
                    placeholderTxt = metadata[titleTxt].label;
                  } else {
                    const defaultTxt = titleTxt.split('__')[1].split('_')[0];
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
                          key={i}
                          type="text"
                          id={`${item.title}`}
                          value={
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                              ? ' '
                              : item.value
                          }
                          pickerBgColor={
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                              ? selectedBaseColor?.value ?? '#9a9a9a'
                              : item.color
                          }
                          onChange={(evt) => headingInputChangeHandler(evt, item)}
                          onClick={() => headingInputClickHandler(item, colorTagName)}
                          isEyeIcon
                          onHandleClickEye={onHandleClickEye}
                          pickerNo={pickerNoValue}
                          metadata={metadata}
                        />
                      );
                    }
                    if (
                      titleTxt.includes('__headline') ||
                      titleTxt.includes('__blurp') ||
                      titleTxt.includes('__paragraph')
                    ) {
                      return (
                        <InputRichText
                          key={i}
                          id={`${item.title}`}
                          value={
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                              ? ' '
                              : item.value
                          }
                          pickerBgColor={
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                              ? selectedBaseColor
                                ? selectedBaseColor.value
                                : '#9a9a9a'
                              : item.color
                          }
                          onChange={(evt) => inputRichChangeHandler(evt, item)}
                          onClick={() => headingInputClickHandler(item, colorTagName)}
                          pickerNo={pickerNoValue}
                          placeholder={placeholderTxt}
                          isEyeIcon
                          isEditLabel={
                            !(
                              metadata &&
                              typeof metadata === 'object' &&
                              metadata[titleTxt] &&
                              metadata[titleTxt].hide
                            )
                          }
                          onHandleClickEye={onHandleClickEye}
                          onHandleChangeLabel={onHandleChangeLabel}
                          className={
                            titleTxt.includes('__paragraph')
                              ? selectChangedParagraphCss(headlineLength)
                              : selectChangedHeadBlurpCss(headlineLength)
                          }
                          metadata={metadata}
                          readOnly={
                            !!(
                              metadata &&
                              typeof metadata === 'object' &&
                              metadata[titleTxt] &&
                              metadata[titleTxt].hide
                            )
                          }
                        />
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
                          key={i}
                          value={
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                              ? titleTxt.includes('__backg_bar')
                                ? '#FFFFFF'
                                : titleTxt.includes('__color_bar')
                                ? selectedBaseColor
                                  ? selectedBaseColor.value
                                  : '#9a9a9a'
                                : selectedBaseColor
                                ? selectedBaseColor.value
                                : '#9a9a9a'
                              : item.value
                          }
                          handleClickItem={(color) => handleColorClickItem(color, item)}
                          id={`${item.title}`}
                          isEyeIcon
                          onHandleClickEye={onHandleClickEye}
                          className={titleTxt.includes('__color_backg_bar') && customColorBackg}
                          metadata={metadata}
                        />
                      );
                    }
                    return (
                      <InputRichText
                        key={i}
                        id={`${item.title}`}
                        value={
                          metadata &&
                          typeof metadata === 'object' &&
                          metadata[titleTxt] &&
                          metadata[titleTxt].hide
                            ? ' '
                            : item.value
                        }
                        pickerBgColor={
                          metadata &&
                          typeof metadata === 'object' &&
                          metadata[titleTxt] &&
                          metadata[titleTxt].hide
                            ? selectedBaseColor
                              ? selectedBaseColor.value
                              : '#9a9a9a'
                            : item.color
                        }
                        onChange={(evt) => inputRichChangeHandler(evt, item)}
                        onClick={() => headingInputClickHandler(item, colorTagName)}
                        pickerNo={pickerNoValue}
                        isEyeIcon
                        isEditLabel={
                          !(
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                          )
                        }
                        onHandleClickEye={onHandleClickEye}
                        onHandleChangeLabel={onHandleChangeLabel}
                        placeholder={placeholderTxt}
                        className={selectChangedHeadBlurpCss(headlineLength)}
                        metadata={metadata}
                        readOnly={
                          !!(
                            metadata &&
                            typeof metadata === 'object' &&
                            metadata[titleTxt] &&
                            metadata[titleTxt].hide
                          )
                        }
                      />
                    );
                  })();
                })}
              </div>
              {rowItems.some((item) => item.title.includes('letter')) && (
                <div className={form__row}>
                  <InputBoolNumbers
                    key={index}
                    value={currentOption}
                    onClick={(option) => handleOptionClick(option, rowItems)}
                  />
                </div>
              )}
            </div>
          );
        })}

        <DialogChangeColor onClose={onClose} open={showPopup} pallete={productPallete} />
        <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
      </div>
    </>
  );
}

export default StaffPage;
