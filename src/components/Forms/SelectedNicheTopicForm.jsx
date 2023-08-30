import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavButton from 'components/Buttons/NavButton';
import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import SaleAccordion from 'components/Layouts/SaleAccordion';

import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import { apiCall } from 'helpers/api-config';
import { saleNichesTopicsSliceActions } from 'store/sale-niche-topic';
import styles from './SelectedNicheTopicForm.module.scss';
import log from '../../helpers/log';

function SalesNicheTopic() {
  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, form__btnLayout, form__description, form__btn, form__accordion } = styles;

  const mainNiches = useSelector((state) => state.saleNichesTopics.mainNiches);
  const selectedSubNiches = useSelector((state) => state.saleNichesTopics.selectedSubNiches);
  const plan = useSelector((state) => state.pricingPlan.plan);

  const [isLoading, setIsLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMes, setErrorMes] = useState('');
  const [totalSelectedSubNiches, setTotalSelectedSubNiches] = useState([]);
  const [totalSelectedTopics, setTotalSelectedTopics] = useState([]);

  useEffect(() => {
    let totalSelSubNiches = [];
    let totalSelTopics = [];
    selectedSubNiches.forEach((item) => {
      const cleanNicheTags = item.nicheTags;
      totalSelSubNiches = [...totalSelSubNiches, ...cleanNicheTags];
      totalSelTopics = [...totalSelTopics, ...item.topicTags];
    });
    const uniqueTotalSelSubNiches = Array.from(new Set(totalSelSubNiches));
    const uniqueTotalSelTopics = Array.from(new Set(totalSelTopics));
    setTotalSelectedSubNiches(uniqueTotalSelSubNiches);
    setTotalSelectedTopics(uniqueTotalSelTopics);
  }, [selectedSubNiches]);

  const handleBackButton = () => {
    navigate('/dashboard/product-type');
  };

  const handleNextButton = async () => {
    try {
      setIsLoading(true);

      const resNiches = await apiCall('get', '/bizzy/niches/', accessToken);
      const resultsOfNiches = resNiches.data.results;

      const resTopics = await apiCall('get', '/book-generator/topics/', accessToken);
      const resultsOfTopics = resTopics.data.results;

      const resNextTopics = await apiCall('get', '/book-generator/topics/?page=2', accessToken);
      const resultsOfNextTopics = resNextTopics.data.results;
      const resultsOfTotalTopics = [...resultsOfTopics, ...resultsOfNextTopics];

      const totalSelSubNichesIds = totalSelectedSubNiches.map(
        (item) => resultsOfNiches.filter((niche) => niche.slug.includes(item))[0].id
      );
      const totalSelTopicsIds = totalSelectedTopics.map(
        (item) => resultsOfTotalTopics.filter((topic) => topic.slug.includes(item))[0].id
      );

      dispatch(saleNichesTopicsSliceActions.setTotalTopics(resultsOfTotalTopics));
      dispatch(saleNichesTopicsSliceActions.setTotalSubNiches(resultsOfNiches));

      dispatch(saleNichesTopicsSliceActions.setSelectedTopicsIds(totalSelTopicsIds));
      dispatch(saleNichesTopicsSliceActions.setSelectedSubNichesIds(totalSelSubNichesIds));

      setIsLoading(false);
      navigate('/dashboard/create-product');
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

  return (
    <div className={form} style={{ marginTop: plan.apiTitle === 'bizzy_free' ? '5.2rem' : '0' }}>
      <QuaternaryHeading txt="Tell Us Your Niche and Topic" />
      <p className={form__description}>
        Which of the following best describes what your product topic will be?
      </p>
      <div className={form__accordion}>
        {!!mainNiches && mainNiches.map((item) => <SaleAccordion key={item.id} niche={item} />)}
      </div>
      {isLoading ? (
        <LinearProgress color="inherit" />
      ) : (
        <div className={form__btnLayout}>
          <NavButton
            className={form__btn}
            type="button"
            txt="< &nbsp;Back"
            bgColor="#ffffff"
            onClick={handleBackButton}
          />
          <NavButton
            className={form__btn}
            type="button"
            bgColor="#ffc800"
            txt="Next&nbsp; >"
            onClick={handleNextButton}
          />
        </div>
      )}
      <ErrorMessageSnackbar message={errorMes} severity="error" open={errorFlag} />
    </div>
  );
}

export default SalesNicheTopic;
