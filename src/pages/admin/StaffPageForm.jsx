import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import { staffPageSliceActions } from 'store/staff-preview';
import { isObjEmpty } from 'helpers/utils';
import log from '../../helpers/log';
import StaffPage from './StaffPage';
import styles from './StaffPageForm.module.scss';

function StaffPageForm() {
  const accessToken = localStorage.getItem('token');
  const { form, form__container, form__bottom, form__bottom__refresh_btn } = styles;

  const selectedStaff = useSelector((state) => state.staffPage.selectedStaffPage);
  const defaultGlobalVars = useSelector((state) => state.staffPage.defaultGlobalVars);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortedStaff, setSortedStaff] = useState(
    (selectedStaff && selectedStaff.ingredients) || []
  );

  useEffect(() => {
    if (selectedStaff && selectedStaff.ingredients) {
      const temp = [...selectedStaff.ingredients];
      const sortArray = temp.sort((a, b) => parseInt(a.order) - parseInt(b.order));
      setSortedStaff(sortArray);
    } else {
      setSortedStaff([]);
    }
  }, [selectedStaff]);

  const updatePreview = async (updateData) => {
    if (updateData && updateData.ingredients) {
      try {
        setIsLoading(true);
        const res = await apiCall(
          'post',
          `/book-generator/pages/${updateData.id}/update-preview/`,
          accessToken,
          updateData
        );
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        dispatch(staffPageSliceActions.setSelectStaffPage(res.data));
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
    }
  };
  const handleClickPublish = async () => {
    const wordingData = { ...selectedStaff.wording };
    delete wordingData.page;
    const ingredients = selectedStaff.ingredients.map((ingredient) => {
      const ingredientData = { ...ingredient.ingredient_data };

      Object.keys({ ...ingredient.ingredient_data }).forEach((key) => {
        if (key.includes('color') && !key.includes('color_key')) {
          delete ingredientData[key];
        }
      });
      return {
        ...ingredient,
        ingredient_data: ingredientData
      };
    });
    const updatePageData = {
      system_id: selectedStaff.system_id,
      name: selectedStaff.name,
      type: selectedStaff.type,
      tags: selectedStaff.tags,
      wording: wordingData,
      is_active: selectedStaff.is_active,
      template: selectedStaff.template,
      ingredients
    };

    try {
      setIsLoading(true);
      const res = await apiCall(
        'put',
        `/book-generator/pages/${selectedStaff.id}/`,
        accessToken,
        updatePageData
      );
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');
      updatePreview(res.data);
      setIsLoading(false);
    } catch (err) {
      log.error(JSON.stringify(err));
      setErrorMessage(
        err.message === 'Network Error'
          ? 'Connectivity error. Please try again'
          : err.response.data?.errors[0]?.message
      );
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={form}>
      <div className={form__container}>
        {!isObjEmpty(defaultGlobalVars)
          ? sortedStaff.map((item) => <StaffPage selectedData={item} key={item.id} />)
          : null}
      </div>
      <div className={form__bottom}>
        <button className={form__bottom__refresh_btn} onClick={() => handleClickPublish()}>
          PUBLISH
        </button>
      </div>
      {isLoading && <LinearProgress color="inherit" />}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default StaffPageForm;
