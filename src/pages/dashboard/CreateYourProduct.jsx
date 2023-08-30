import React, { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAlert } from 'hooks/alert';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import BatchCard from 'components/Cards/BatchCard';
import NavButton from 'components/Buttons/NavButton';
import MySelectedBatches from 'components/Products/MySelectedBatches';
import BatchPreviewModal from 'components/Modals/BatchPreviewModal';
import CustomSelectMultiple from 'components/InputFields/CustomSelectMultiple';

import CustomSelect from 'components/InputFields/CustomSelect';

import { productTypeSliceActions } from 'store/product-type';
import { productBatchesSliceActions } from 'store/product-batches';

import { dropdownValues } from 'helpers/custom-functions';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import ApiService from 'helpers/api';
import log from '../../helpers/log';
import styles from './CreateYourProduct.module.scss';

const defaultSubNicheIDs = [17, 15, 14]; // All, Productivity, Organization
const defaultTopicIDs = [69, 74]; // TOPIC_Calendar, TOPIC_Goals

function CreateYourProduct() {
  const {
    container,
    left_con,
    right_con,
    header_description,
    top_section,
    top_section__con,
    content_title,
    batches_con,
    btmBtnCon,
    flex_center,
    scrollbar
  } = styles;

  const [isOpen, setIsOpen] = useState(false);
  const [clickedBatch, setClickedBatch] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [pagesCount, setPagesCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [_previousUrl, setPreviousUrl] = useState(null);
  const [pageResults, setPageResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addAlert } = useAlert();

  const productTypes = useSelector((state) => state.productType.productTypes);
  const selectedProductType = useSelector((state) => state.productType.selectedProductType);
  const [productTypeTitle, setProductTypeTitle] = useState(
    selectedProductType ? selectedProductType.name : ''
  );
  const plan = useSelector((state) => state.pricingPlan.plan);

  const totalTopics = useSelector((state) => state.saleNichesTopics.totalTopics);

  const totalSelectedTopicsIds = useSelector(
    (state) => state.saleNichesTopics.totalSelectedTopicsIds
  );

  const totalTopicsDrp = dropdownValues(totalTopics, totalSelectedTopicsIds);

  const [updatedTotalSelectedTopicsIds, setUpdatedTotalSelectedTopicsIds] =
    useState(totalSelectedTopicsIds);
  const [selectTopicsName, setSelectTopicsName] = useState([]);

  const totalSubNiches = useSelector((state) => state.saleNichesTopics.totalSubNiches);
  const totalSelectedSubNichesIds = useSelector(
    (state) => state.saleNichesTopics.totalSelectedSubNichesIds
  );

  const totalNichesDrp = dropdownValues(totalSubNiches, totalSelectedSubNichesIds);

  const [updatedTotalSelectedSubNichesIds, setUpdatedTotalSelectedSubNichesIds] =
    useState(totalSelectedSubNichesIds);
  const [selectSubNichesName, setSelectSubNichesName] = useState([]);

  const selectedBatches = useSelector((state) => state.productBatches.selectedBatches);
  const numberOfSelectedBatches = useSelector(
    (state) => state.productBatches.numberOfSelectedBatches
  );
  const errorOfBatches = useSelector((state) => state.productBatches.error);

  async function fetchBatchesData(initialIds) {
    try {
      setIsLoading(true);
      const data = {
        topics:
          updatedTotalSelectedTopicsIds.length > 0
            ? updatedTotalSelectedTopicsIds
            : defaultTopicIDs,
        niches: initialIds
      };

      const response = await ApiService.post('/book-generator/batches/custom_search/', data);
      if (response.status !== 200) throw new Error('Something went wrong.. Please try again');
      const { count, next, previous, results } = response.data;
      setPagesCount(count);
      setNextUrl(next);
      setPreviousUrl(previous);
      setPageResults(results);

      setIsLoading(false);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert("Can't connect to the server. Please check your internet connection", 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
      setIsLoading(false);
    }
  }

  function addDefaultSubNicheIDs() {
    const restNumber = 3 - updatedTotalSelectedSubNichesIds.length;
    const cleanDefaultSubNicheIDs = defaultSubNicheIDs.filter(
      (val) => !updatedTotalSelectedSubNichesIds.includes(val)
    );
    const restIDs = cleanDefaultSubNicheIDs.slice(0, restNumber);
    const newIDs = updatedTotalSelectedSubNichesIds.concat(restIDs);
    setUpdatedTotalSelectedSubNichesIds(newIDs);
    const subNichesName = newIDs.map(
      (id) => totalSubNiches.filter((item) => item.id === id)[0].name
    );
    setSelectSubNichesName(subNichesName);

    fetchBatchesData(newIDs);
  }

  useEffect(() => {
    const newTopicsIds =
      totalSelectedTopicsIds.length > 0 ? totalSelectedTopicsIds : defaultTopicIDs;
    const topicsName = newTopicsIds.map(
      (id) => totalTopics.filter((item) => item.id === id)[0].name
    );
    setSelectTopicsName(topicsName);

    if (totalSelectedSubNichesIds.length < 3) {
      addDefaultSubNicheIDs();
    } else {
      const subNichesName = totalSelectedSubNichesIds.map(
        (id) => totalSubNiches.filter((item) => item.id === id)[0].name
      );
      setSelectSubNichesName(subNichesName);

      fetchBatchesData(totalSelectedSubNichesIds);
    }
  }, []);

  useEffect(() => {
    if (errorOfBatches) {
      addAlert(errorOfBatches, 'error');
    }
  }, [errorOfBatches]);

  useEffect(() => {
    if (updatedTotalSelectedSubNichesIds.length < 3) addDefaultSubNicheIDs();
    else {
      setHasMore(true);
      fetchBatchesData(updatedTotalSelectedSubNichesIds);
    }
  }, [updatedTotalSelectedTopicsIds, updatedTotalSelectedSubNichesIds]);

  const fetchMoreData = async () => {
    if (pageResults.length >= pagesCount) {
      setHasMore(false);
      return;
    }
    try {
      const data = {
        topics:
          updatedTotalSelectedTopicsIds.length > 0
            ? updatedTotalSelectedTopicsIds
            : defaultTopicIDs,
        niches: updatedTotalSelectedSubNichesIds
      };

      const nextEndpoint = process.env.REACT_APP_API_URL.includes('https')
        ? nextUrl.replace('http', 'https')
        : nextUrl;
      const response = await ApiService.post(nextEndpoint, data);
      if (response.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { next, results } = response.data;
      setNextUrl(next);
      const temp = pageResults.concat(results);
      setPageResults(temp);
    } catch (error) {
      if (error.message === 'Network Error') {
        log.error(JSON.stringify(error));
        addAlert("Can't connect to the server. Please try again", 'error');
      } else if (error.response?.data?.errors[0]?.message) {
        addAlert(error.response?.data?.errors[0]?.message, 'error');
      } else {
        log.error(JSON.stringify(error));
        addAlert('Something went wrong. Please try again', 'error');
      }
    }
  };

  const productSelectHandler = (evt) => {
    setProductTypeTitle(evt.target.value);
    const productType = productTypes.filter((pr) => pr.name === productTypeTitle);
    dispatch(productTypeSliceActions.select(productType));
  };

  const nicheSelectHandler = (evt) => {
    const {
      target: { value }
    } = evt;
    setSelectSubNichesName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    const temp = value.map(
      (item) => totalSubNiches.filter((subNiche) => item === subNiche.name)[0].id
    );
    setUpdatedTotalSelectedSubNichesIds(temp);
  };

  const topicSelectHandler = (evt) => {
    const {
      target: { value }
    } = evt;
    setSelectTopicsName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    const temp = value.map((item) => totalTopics.filter((topic) => item === topic.name)[0].id);
    setUpdatedTotalSelectedTopicsIds(temp);
  };

  const batchCheckHandler = (item) => {
    if (numberOfSelectedBatches <= 6) {
      dispatch(productBatchesSliceActions.toggleBatches(item));
    }
  };

  const handleBackButton = () => {
    navigate('/dashboard/sales-niche-topic');
  };

  const batchClickHandler = (item) => {
    if (!selectedBatches.some((val) => val.id === item.id) && numberOfSelectedBatches < 6) {
      setClickedBatch(item);
      setIsOpen(true);
    } else if (selectedBatches.some((val) => val.id === item.id) && numberOfSelectedBatches <= 6) {
      dispatch(productBatchesSliceActions.toggleBatches(item));
    }
  };

  return (
    <div
      className={container}
      style={{ marginTop: plan.apiTitle === 'bizzy_free' ? '5.2rem' : '0' }}>
      <div className={left_con}>
        <QuaternaryHeading txt="Create Your Awesome Product" />
        <p className={header_description}>
          Don’t worry you will be able to make edits to there in the next step.
        </p>
        <div className={top_section}>
          <CustomSelect
            id="product"
            className={top_section__con}
            value={productTypeTitle}
            label="Product"
            onChange={productSelectHandler}
            items={productTypes}
            selectedValue={productTypeTitle}
          />
          <CustomSelectMultiple
            id="niche"
            className={top_section__con}
            value={selectSubNichesName}
            label="Niche"
            onChange={nicheSelectHandler}
            items={totalNichesDrp}
            selectedIds={updatedTotalSelectedSubNichesIds}
          />
          <CustomSelectMultiple
            id="topic"
            className={top_section__con}
            value={selectTopicsName}
            label="Topic"
            onChange={topicSelectHandler}
            items={totalTopicsDrp}
            selectedIds={updatedTotalSelectedTopicsIds}
          />
        </div>
        <p className={content_title}>Pick 3-5 “Batches” to Create Your Product.</p>
        {isLoading ? (
          <div className={flex_center}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          pageResults.length > 0 && (
            <InfiniteScroll
              dataLength={pageResults.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className={flex_center}>
                  <h4 style={{ marginRight: 10 }}>Loading More...</h4>
                  <CircularProgress color="inherit" />
                </div>
              }
              height={1000}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              className={scrollbar}>
              <div className={batches_con}>
                {pageResults.map((item, index) => (
                  <BatchCard
                    data={item}
                    key={index}
                    onChange={() => batchCheckHandler(item)}
                    onClick={() => batchClickHandler(item)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )
        )}
        <div className={btmBtnCon}>
          <NavButton
            onClick={handleBackButton}
            type="button"
            txt="< &nbsp;Back"
            bgColor="#ffffff"
          />
        </div>
      </div>
      <div className={right_con}>
        <MySelectedBatches selectedBatches={selectedBatches} />
      </div>
      {isOpen && <BatchPreviewModal setIsOpen={setIsOpen} clickedBatch={clickedBatch} />}
    </div>
  );
}

export default CreateYourProduct;
