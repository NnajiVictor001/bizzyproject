import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { apiCall } from 'helpers/api-config';
import { productBrandingSliceActions } from 'store/product-branding';
import { staffPageSliceActions } from 'store/staff-preview';
import styles from './StaffPagesPreviewer.module.scss';
import StaffPagePreviewer from './StaffPagePreviewer';
import StaffPageAccordionLayout from './StaffPageAccordionLayout';
import AdminHeader from '../../components/Headers/AdminHeader';
import log from '../../helpers/log';
import { moveItem } from '../../helpers/array';

function StaffPagesPreviewer() {
  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const params = useParams();
  const { pageId } = params;

  const selectedStaffPage = useSelector((state) => state.staffPage.selectedStaffPage);
  const selectedErrorMessage = useSelector((state) => state.staffPage.errorMessage);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedErrorMessage) {
      setIsLoading(false);
      setErrorMessage(selectedErrorMessage);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (selectedStaffPage) {
      setIsLoading(false);
    }
  }, [selectedStaffPage, selectedErrorMessage]);

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
    fetchInitialValues();
  }, [accessToken]);

  const onClickExit = () => {
    dispatch(staffPageSliceActions.setSelectStaffPage({}));
    dispatch(staffPageSliceActions.setErrorMessage(''));
    dispatch(staffPageSliceActions.setIsExit(true));
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // the current entry in the history stack will be replaced with the new one with { replace: true }
      navigate('/staff/pages', { replace: true });
    }
  };

  const {
    container,
    container__left,
    container__right,
    layout__header,
    flex_center,
    form__bottom,
    form__bottom__exit_btn
  } = styles;

  return (
    <>
      <div className={layout__header}>
        <AdminHeader pageId={pageId} />
      </div>
      <div className={container}>
        <div className={container__left}>
          <StaffPagePreviewer pageId={pageId} />
        </div>
        <div className={container__right}>
          {isLoading ? (
            <div className={flex_center}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <>
              <StaffPageAccordionLayout />
              <div className={form__bottom}>
                <button onClick={() => onClickExit()} className={form__bottom__exit_btn}>
                  EXIT
                </button>
              </div>
            </>
          )}
        </div>
        <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
      </div>
    </>
  );
}

export default StaffPagesPreviewer;
