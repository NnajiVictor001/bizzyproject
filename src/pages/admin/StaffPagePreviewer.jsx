import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import placeholder from 'img/batch_placeholder.png';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import { staffPageSliceActions } from 'store/staff-preview';
import { useRenderImage } from 'hooks/renderImage';
import _ from 'lodash';
import log from '../../helpers/log';
import styles from './StaffPagePreviewer.module.scss';

function StaffPagePreviewer() {
  const accessToken = localStorage.getItem('token');
  const { renderImage } = useRenderImage();

  const { select_con, select_con__download, select_con__image } = styles;

  const dispatch = useDispatch();

  const selectedStaffPage = useSelector((state) => state.staffPage.selectedStaffPage);
  const selectedErrorMessage = useSelector((state) => state.staffPage.errorMessage);
  const defaultGlobalVars = useSelector((state) => state.staffPage.defaultGlobalVars);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedStaffPageImg, setSelectedStaffPageImg] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickRefresh = async (format) => {
    if (selectedStaffPage && selectedStaffPage.ingredients) {
      const previewData = {
        page_ingredients: selectedStaffPage.ingredients.map((item) => ({
          page_ingredient: item.id,
          ingredient_data: item.ingredient_data
        }))
      };
      if (format === 'png') {
        try {
          const pageIngredients = selectedStaffPage.ingredients.map((item) => {
            const ingredientData = { ...item.ingredient_data };
            Object.keys({ ...item.ingredient_data }).forEach((key) => {
              if (key.includes('color') && !key.includes('color_key')) {
                delete ingredientData[key];
              }
            });
            return {
              page_ingredient: item.id,
              ingredient_data: ingredientData
            };
          });
          setIsLoading(true);
          const res = await renderImage(
            selectedStaffPage.id,
            pageIngredients,
            true,
            defaultGlobalVars
          );
          if (res.status !== 200) throw new Error('Something went wrong.. Please try again');
          const newImage = res.data.image;
          setSelectedStaffPageImg(`data:image/png;base64,${newImage}`);
          const updatedStaff = {
            ...selectedStaffPage,
            image_preview: `data:image/png;base64,${newImage}`
          };
          dispatch(staffPageSliceActions.setSelectStaffPage(updatedStaff));
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
      } else if (format === 'html') {
        const html_res = await apiCall(
          'post',
          `/book-generator/pages/${selectedStaffPage.id}/render-html/`,
          accessToken,
          previewData
        );
        if (html_res.status !== 200) throw new Error('Something went wrong.. Please try again');
        const html_data = html_res.data;
        const child = window.open('Render HTML:blank', 'HTML');
        child.document.write(html_data);
        child.document.close();
      } else {
        const previewPdfData = {
          system_id: selectedStaffPage.system_id,
          name: selectedStaffPage.name,
          type: selectedStaffPage.type,
          tags: selectedStaffPage.tags,
          wording: selectedStaffPage.wording,
          is_active: selectedStaffPage.is_active,
          template: selectedStaffPage.template,
          ingredients: selectedStaffPage.ingredients,
          update_preview: selectedStaffPage.update_preview
        };
        const pdf_res = await apiCall(
          'post',
          `/book-generator/pages/${selectedStaffPage.id}/render-pdf/`,
          accessToken,
          previewPdfData
        );
        if (pdf_res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const a = document.createElement('a');
        a.download = selectedStaffPage.system_id;
        a.href = `data:application/pdf;base64,${pdf_res.data.pdf}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  useEffect(() => {
    handleClickRefresh('png');

    const getDefaultGlobalVars = async () => {
      const res = await apiCall('get', '/book-generator/pages/default-global-vars/', accessToken);
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');
      dispatch(staffPageSliceActions.setDefaultGlobalVars(res.data));
    };
    getDefaultGlobalVars();
  }, [selectedStaffPage?.id]);

  useEffect(() => {
    if (selectedErrorMessage) {
      setErrorMessage(selectedErrorMessage);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setSelectedStaffPageImg(selectedStaffPage?.image_preview);
    }
  }, [selectedStaffPage, selectedErrorMessage]);

  return (
    <>
      <div className={select_con}>
        <div className={select_con__download}>
          <a onClick={() => handleClickRefresh('png')}>REFRESH VIEW</a>
          <a onClick={() => handleClickRefresh('pdf')}>PDF</a>
          <a onClick={() => handleClickRefresh('html')}>HTML</a>
        </div>
        <img
          src={selectedStaffPageImg || placeholder}
          alt="selected"
          className={select_con__image}
        />
      </div>
      {isLoading && <LinearProgress color="inherit" />}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </>
  );
}

export default StaffPagePreviewer;
