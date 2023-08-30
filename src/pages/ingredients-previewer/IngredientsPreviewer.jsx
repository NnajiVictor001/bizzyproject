import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { apiCall } from 'helpers/api-config';
import { productBrandingSliceActions } from 'store/product-branding';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import IngredientAccordionLayout from './IngredientAccordionLayout';
import IngredientPreview from './IngredientPreview';
import styles from './IngredientsPreviewer.module.scss';
import { moveItem } from '../../helpers/array';
import log from '../../helpers/log';

function IngredientsPreviewer() {
  const accessToken = localStorage.getItem('token');
  const params = useParams();
  const { ingredientId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMes, setErrorMes] = useState('');
  const dispatch = useDispatch();

  const { container, container__left, container__right, flex_center } = styles;

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        setIsLoading(true);
        const resColor = await apiCall('get', '/bizzy/color-palettes/', accessToken);
        if (resColor.status !== 200) throw new Error('Something went wrong.. Please try again');
        const colorResults = resColor.data.results;
        const defaultColorResult = colorResults.filter((item) => item.is_default === true);
        const defaultColorResultIndex = colorResults.findIndex((item) => item.is_default === true);
        moveItem(colorResults, defaultColorResultIndex, 0); // Demo hack
        const colorPalleteData = colorResults.map((item) => ({
          id: item.id,
          name: item.name,
          mainColors: [
            {
              id: 0,
              value: item.color1,
              name: 'Color 1'
            },
            {
              id: 1,
              value: item.color2,
              name: 'Color 2'
            },
            {
              id: 2,
              value: item.color3,
              name: 'Color 3'
            },
            {
              id: 3,
              value: item.color4,
              name: 'Color 4'
            },
            {
              id: 4,
              value: item.color5,
              name: 'Color 5'
            }
          ],
          backgroundColors: [
            {
              id: 0,
              value: item.background_color1,
              name: 'Background Color 1'
            },
            {
              id: 1,
              value: item.background_color2,
              name: 'Background Color 2'
            },
            {
              id: 2,
              value: item.background_color3,
              name: 'Background Color 3'
            },
            {
              id: 3,
              value: item.background_color4,
              name: 'Background Color 4'
            }
          ]
        }));
        const initialColorPalette = {
          id: defaultColorResult[0].id,
          name: defaultColorResult[0].name,
          mainColors: [
            {
              id: 0,
              value: defaultColorResult[0].color1,
              name: 'Color 1'
            },
            {
              id: 1,
              value: defaultColorResult[0].color2,
              name: 'Color 2'
            },
            {
              id: 2,
              value: defaultColorResult[0].color3,
              name: 'Color 3'
            },
            {
              id: 3,
              value: defaultColorResult[0].color4,
              name: 'Color 4'
            },
            {
              id: 4,
              value: defaultColorResult[0].color5,
              name: 'Color 5'
            }
          ],
          backgroundColors: [
            {
              id: 0,
              value: defaultColorResult[0].background_color1,
              name: 'Background Color 1'
            },
            {
              id: 1,
              value: defaultColorResult[0].background_color2,
              name: 'Background Color 2'
            },
            {
              id: 2,
              value: defaultColorResult[0].background_color3,
              name: 'Background Color 3'
            },
            {
              id: 3,
              value: defaultColorResult[0].background_color4,
              name: 'Background Color 4'
            }
          ]
        };
        const baseColorsData = [
          {
            id: 0,
            value: defaultColorResult[0].base_color1
          },
          {
            id: 1,
            value: defaultColorResult[0].base_color2
          },
          {
            id: 2,
            value: defaultColorResult[0].base_color3
          },
          {
            id: 3,
            value: defaultColorResult[0].base_color4
          }
        ];
        const initialBaseColorData = {
          id: 3,
          value: defaultColorResult[0].base_color4
        };

        const resFont = await apiCall('get', '/bizzy/fonts/', accessToken);
        if (resFont.status !== 200) throw new Error('Something went wrong.. Please try again');
        const fontsResults = resFont.data.results;
        moveItem(fontsResults, 0, 3); // Demo hack

        dispatch(productBrandingSliceActions.selectBaseColor(initialBaseColorData));
        dispatch(productBrandingSliceActions.setBaseColorsData(baseColorsData));
        dispatch(productBrandingSliceActions.selectColorPallete(initialColorPalette));
        dispatch(productBrandingSliceActions.setPalleteData(colorPalleteData));
        dispatch(productBrandingSliceActions.selectFont(fontsResults[0]));
        dispatch(productBrandingSliceActions.setFontsData(fontsResults));

        setIsLoading(false);
      } catch (error) {
        if (error.message === 'Network Error') {
          log.error(JSON.stringify(error));
          setErrorMes('Connectivity error. Please try again');
        } else if (error.response?.data?.errors[0]?.message) {
          setErrorMes(error.response?.data?.errors[0]?.message);
        } else {
          log.error(JSON.stringify(error));
          setErrorMes('Something went wrong. Please try again');
        }
        setIsLoading(false);
        setErrorFlag(true);
        setTimeout(() => {
          setErrorFlag(false);
        }, 3000);
      }
    };
    fetchInitialValues();
  }, [accessToken]);

  return (
    <div className={container}>
      <div className={container__left}>
        <IngredientPreview ingredientId={ingredientId} />
      </div>
      <div className={container__right}>
        {isLoading ? (
          <div className={flex_center}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <IngredientAccordionLayout />
        )}
      </div>
      <ErrorMessageSnackbar message={errorMes} severity="error" open={errorFlag} />
    </div>
  );
}

export default IngredientsPreviewer;
