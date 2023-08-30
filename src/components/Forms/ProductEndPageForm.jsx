import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLetter from 'components/InputFields/InputLetter';
import InputBoolNumbers from 'components/InputFields/InputBoolNumbers';
import InputColorBar from 'components/InputFields/InputColorBar';
import DialogChangeColor from 'helpers/DialogChangeColor';
import Pallete from 'components/SlideShow/Pallete';
import { productBrandingSliceActions } from 'store/product-branding';
import { productBatchesSliceActions } from 'store/product-batches';
import InputRichText from 'components/InputFields/InputRichText';
import styles from './ProductEndPageForm.module.scss';

function ProductEndPageForm(props) {
  const { selectedData } = props;
  const { variables, ingredient_data, ingredient_metadata, id, metadata } = selectedData;

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
    form__row__paragraphBig,
    itemContainer
  } = styles;

  const dispatch = useDispatch();

  const selPallete = useSelector((state) => state.productBranding.selectedPallete);

  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);

  const selectedPage = useSelector((state) => state.productBranding.selectedPage);

  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);

  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);

  const [colorArray, setColorArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [variableObj, setVariableObj] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColorTagName, setSelectedColorTagName] = useState('');
  const [selectedColorKeyTagName, setSelectedColorKeyTagName] = useState('');
  const [allOptions, setAllOptions] = useState([]);

  const defaultColor = '#9A9A9A';
  const backgBar = [...selPallete.backgroundColors];

  const currentColor = selPallete?.mainColors;
  const newPallete = [];
  for (let i = 0; i <= currentColor.length; i++) {
    if (currentColor[i]) {
      newPallete[i] = currentColor[i];
    } else {
      newPallete[i] = {
        id: 5,
        value: selectedBaseColor ? selectedBaseColor.value : '#9A9A9A',
        name: 'Color 6'
      };
    }
  }

  const selectedPallete = selPallete
    ? {
        ...selPallete,
        mainColors: newPallete
      }
    : {
        mainColors: [
          { id: 0, value: '#5CE1E6', name: 'Color 1' },
          { id: 1, value: '#1CAEB2', name: 'Color 2' },
          { id: 2, value: '#FFA924', name: 'Color 3' },
          { id: 3, value: '#FDC600', name: 'Color 4' },
          { id: 4, value: '#9ACC3A', name: 'Color 5' },
          {
            id: 5,
            value: selectedBaseColor ? selectedBaseColor.value : '#9A9A9A',
            name: 'Color 6'
          }
        ]
      };

  const colorsBar = selPallete
    ? selPallete.mainColors
    : [
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

  const colorsBackgBar = useMemo(
    () => [
      ...selPallete.mainColors,
      selPallete.backgroundColors[1],
      selPallete.backgroundColors[2],
      {
        id: 8,
        value: selectedBaseColor ? selectedBaseColor.value : '#757575',
        name: 'Color 9'
      }
    ],
    []
  );

  const getLetterValue = (option, val) => {
    if (option === 'numbers') {
      const map = {
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        e: '5',
        f: '6',
        g: '7',
        h: '8'
      };
      return map[val] || '';
    }
    if (option === 'letters') {
      const map = {
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E',
        f: 'F',
        g: 'G',
        h: 'H'
      };
      return map[val] || '';
    }
    const map = {
      a: 'M',
      b: 'T',
      c: 'W',
      d: 'T',
      e: 'F',
      f: 'S',
      g: 'S',
      h: 'S'
    };
    return map[val] || '';
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
    const tempTextArray = variables && variables.text ? variables.text : [];
    const tempColorKeyArray = variables && variables.color_key ? variables.color_key : [];
    const tempColorArray = variables && variables.color ? variables.color : [];
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
        [item]: ingredient_data && ingredient_data[item] ? ingredient_data[item] : placeholderTxt
      };
    });
    const colorObjArray = tempColorArray.map((item) => ({
      [item]: ingredient_data && ingredient_data[item] ? ingredient_data[item] : defaultColor
    }));
    const colorKeyObjArray = tempColorKeyArray.map((item) => ({
      [item]: ingredient_data && ingredient_data[item] ? ingredient_data[item] : 'color6'
    }));
    const variableObjArray = textObjArray.concat(colorObjArray).concat(colorKeyObjArray);
    const finalVariableObj = {};
    variableObjArray.map((item) => {
      Object.assign(finalVariableObj, item);
      return null;
    });

    setVariableObj(finalVariableObj);

    const metaData = ingredient_metadata;
    const textMetaArray = tempTextArray.map((item) => {
      const tempTxt = item.split('__')[1];
      const colorTagName = `color__${item.split('__')[1]}`;
      const colorKeyTagName = `color_key__${item.split('__')[1]}`;
      let placeholderTxt = '';
      const lastTxt = tempTxt.split('_')[1];
      if (tempTxt.includes('letter')) {
        const firstLetter = lastTxt.charAt(0);
        placeholderTxt = getLetterValue('numbers', firstLetter);
      }
      const eachMeta = {
        title: item,
        value: ingredient_data && ingredient_data[item] ? ingredient_data[item] : placeholderTxt,
        color:
          ingredient_data && ingredient_data[colorTagName]
            ? ingredient_data[colorTagName]
            : defaultColor,
        color_key:
          ingredient_data && ingredient_data[colorKeyTagName]
            ? ingredient_data[colorKeyTagName]
            : 'color6',
        property: metaData && metaData[item] ? metaData[item] : null
      };
      return eachMeta;
    });
    const specialColorMetaArray = specialColorArray.map((item) => {
      const eachColMeta = {
        title: item,
        value: ingredient_data && ingredient_data[item] ? ingredient_data[item] : defaultColor,
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

  const headingInputChangeHandler = (evt, target, isBlur) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt.target.value };
    setVariableObj(tempVariableObj);
    const updatedPageIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedPage && selectedPage.ingredients) {
      const tempArray = [...selectedPage.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);
      tempArray[index] = updatedPageIngredient;
      const updatedPageData = {
        ...selectedPage,
        ingredients: tempArray
      };
      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.page === updatedPageData.page) {
          return { ...updatedPageData };
        }
        return page_item;
      });
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      if (isBlur) {
        dispatch(
          productBrandingSliceActions.selectPage({
            ...updatedPageData,
            isUpdate: true
          })
        );
      } else {
        dispatch(productBrandingSliceActions.selectPage(updatedPageData));
      }
    }
  };

  const inputRichChangeHandler = (evt, target, isBlur) => {
    const tempVariableObj = { ...variableObj, [target.title]: evt };
    setVariableObj(tempVariableObj);
    const updatedPageIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedPage && selectedPage.ingredients) {
      const tempArray = [...selectedPage.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);
      tempArray[index] = updatedPageIngredient;
      const updatedPageData = {
        ...selectedPage,
        ingredients: tempArray
      };
      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.id === updatedPageData.id) {
          return { ...updatedPageData };
        }
        return page_item;
      });
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      if (isBlur) {
        dispatch(
          productBrandingSliceActions.selectPage({
            ...updatedPageData,
            isUpdate: true
          })
        );
      } else {
        dispatch(productBrandingSliceActions.selectPage(updatedPageData));
      }
    }
  };

  const headingInputClickHandler = (item, colorTagName) => {
    const colorKeyTagName = colorTagName.replace('color__', 'color_key__');
    setSelectedColorTagName(colorTagName);
    setSelectedColorKeyTagName(colorKeyTagName);
    setShowPopup(true);
  };

  const selectColor = (color) => {
    // if(selectedPallete.mainColors)
    let color_key = 6;
    selectedPallete.mainColors.map((item) => {
      if (item.value.toLowerCase() === color) {
        color_key = item.id + 1;
      }
      return null;
    });
    const tempVariableObj = {
      ...variableObj,
      [selectedColorTagName]: color,
      [selectedColorKeyTagName]: `color${color_key}`
    };
    setVariableObj(tempVariableObj);
    const updatedPageIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedPage && selectedPage.ingredients) {
      const tempArray = [...selectedPage.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedPageIngredient;
      const updatedPageData = {
        ...selectedPage,
        ingredients: tempArray
      };

      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.page === updatedPageData.page) {
          return { ...updatedPageData };
        }
        return page_item;
      });
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      dispatch(
        productBrandingSliceActions.selectPage({
          ...updatedPageData,
          isUpdate: true
        })
      );
    }
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const colorToKeyMapping = (key) => {
    const mapping = Object.fromEntries(Object.entries(defaultPalette).map((a) => a.reverse()));
    const loweredMapping = Object.keys(mapping).reduce((obj, k) => {
      obj[k.toLowerCase()] = mapping[k];
      return obj;
    }, {});
    return loweredMapping[key.toLowerCase()];
  };

  const handleColorClickItem = (color, target) => {
    const colorKey = target.title.replace('color', 'color_key');
    const colorValue = colorToKeyMapping(color);
    const tempVariableObj = {
      ...variableObj,
      [target.title]: color,
      [colorKey]: colorValue
    };

    setVariableObj(tempVariableObj);
    const updatedPageIngredient = {
      ...selectedData,
      ingredient_data: tempVariableObj
    };
    if (selectedPage && selectedPage.ingredients) {
      const tempArray = [...selectedPage.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedPageIngredient;
      const updatedPageData = {
        ...selectedPage,
        ingredients: tempArray
      };

      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.page === updatedPageData.page) {
          return { ...updatedPageData };
        }
        return page_item;
      });
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      dispatch(
        productBrandingSliceActions.selectPage({
          ...updatedPageData,
          isUpdate: true
        })
      );
    }
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
    const updatedPageIngredient = {
      ...selectedData,
      ingredient_data: updatedVariableObj
    };
    if (selectedPage && selectedPage.ingredients) {
      const tempArray = [...selectedPage.ingredients];
      const index = tempArray.findIndex((e) => e.id === id);

      tempArray[index] = updatedPageIngredient;
      const updatedPageData = {
        ...selectedPage,
        ingredients: tempArray
      };

      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.page === updatedPageData.page) {
          return { ...updatedPageData };
        }
        return page_item;
      });
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      dispatch(
        productBrandingSliceActions.selectPage({
          ...updatedPageData,
          isUpdate: true
        })
      );
    }
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

  return (
    <div key={id}>
      {displayArray.map((rowItems, index) => {
        const letterItems = rowItems.filter((el) => el.title.includes('letter'));
        let idTitle = '';
        let currentOption = '';
        if (letterItems.length > 0) {
          idTitle = letterItems[0].title;
          currentOption = allOptions.filter((item) => item.id === idTitle)[0].option;
        }
        let cnt = 0;
        if (rowItems.length > 0) {
          rowItems.map((item) => {
            if (metadata && metadata[item.title] && metadata[item.title].hide) {
              cnt++;
            }
            return null;
          });
        }

        return (
          <div key={index}>
            <div
              className={form__row}
              style={{
                paddingBottom: rowItems.length === cnt ? 0 : '3.2rem'
              }}>
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
                    if (!(metadata && metadata[titleTxt] && metadata[titleTxt].hide))
                      return (
                        <InputLetter
                          key={i}
                          type="text"
                          id={`${item.title}`}
                          value={item.value}
                          // pickerBgColor={item.color}
                          pickerBgColor={
                            item.color_key === 'color6'
                              ? selectedBaseColor.value
                              : defaultPalette[item.color_key]
                          }
                          onChange={(evt) => headingInputChangeHandler(evt, item, false)}
                          onBlur={(evt) => headingInputChangeHandler(evt, item, true)}
                          onClick={() => headingInputClickHandler(item, colorTagName)}
                          pickerNo={pickerNoValue}
                          metadata={metadata}
                          className={itemContainer}
                        />
                      );
                    return null;
                  }
                  if (
                    titleTxt.includes('__headline') ||
                    titleTxt.includes('__blurp') ||
                    titleTxt.includes('__paragraph')
                  ) {
                    if (!(metadata && metadata[titleTxt] && metadata[titleTxt].hide))
                      return (
                        <InputRichText
                          key={i}
                          id={`${item.title}`}
                          value={item.value}
                          onChange={(evt) => inputRichChangeHandler(evt, item, false)}
                          onBlur={(evt) => inputRichChangeHandler(evt, item, true)}
                          // pickerBgColor={item.color}
                          pickerBgColor={
                            item.color_key === 'color6'
                              ? selectedBaseColor.value
                              : defaultPalette[item.color_key]
                          }
                          onClick={() => headingInputClickHandler(item, colorTagName)}
                          pickerNo={pickerNoValue}
                          placeholder={placeholderTxt}
                          className={
                            titleTxt.includes('__paragraph')
                              ? selectChangedParagraphCss(headlineLength)
                              : selectChangedHeadBlurpCss(headlineLength)
                          }
                          metadata={metadata}
                        />
                      );
                    return null;
                  }
                  if (
                    titleTxt.includes('__backg_bar') ||
                    titleTxt.includes('__color_bar') ||
                    titleTxt.includes('__color_backg_bar')
                  ) {
                    if (!(metadata && metadata[titleTxt] && metadata[titleTxt].hide))
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
                          key={i}
                          value={item.value}
                          handleClickItem={(color) => handleColorClickItem(color, item)}
                          id={`${item.title}`}
                          className={titleTxt.includes('__color_backg_bar') && customColorBackg}
                          metadata={metadata}
                        />
                      );
                    return null;
                  }
                  if (!(metadata && metadata[titleTxt] && metadata[titleTxt].hide))
                    return (
                      <InputRichText
                        key={i}
                        id={`${item.title}`}
                        value={item.value}
                        onChange={(evt) => inputRichChangeHandler(evt, item, false)}
                        onBlur={(evt) => inputRichChangeHandler(evt, item, true)}
                        // pickerBgColor={item.color}
                        pickerBgColor={
                          item.color_key === 'color6'
                            ? selectedBaseColor.value
                            : defaultPalette[item.color_key]
                        }
                        onClick={() => headingInputClickHandler(item, colorTagName)}
                        pickerNo={pickerNoValue}
                        placeholder={placeholderTxt}
                        className={selectChangedHeadBlurpCss(headlineLength)}
                        metadata={metadata}
                      />
                    );
                  return null;
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
    </div>
  );
}

export default ProductEndPageForm;
