import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/InputFields/Input';
import { apiCall } from 'helpers/api-config';
import { staffPageSliceActions } from 'store/staff-preview';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';

import styles from './AdminHeader.module.scss';

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

function DashboardHeader(props) {
  const { pageId } = props;
  const accessToken = localStorage.getItem('token');
  // const { showChat } = props;

  const {
    header,
    right,
    right__btnCont,
    autocomplete_con,
    loading_more,
    autocomplete_con__search_result,
    autocomplete_con__search_item,
    scrollbar
  } = styles;

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [_selectedIngredientImg, setSelectedIngredientImg] = useState();
  const [_isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const handleClickOutside = () => {
    setResult([]);
    setHasMore(false);
  };

  const ref = useOutsideClick(handleClickOutside);
  const isExit = useSelector((state) => state.staffPage.isExit);

  const onSearchText = async (inputValue) => {
    if (inputValue.length >= 3) {
      try {
        setIsLoading(true);
        const res = await apiCall(
          'get',
          `/book-generator/pages/?search=${inputValue}`,
          accessToken
        );
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const { count, next, _previous, results } = res.data;
        setSearchValue(results.system_id);
        setPagesCount(count);
        setNextUrl(next);
        if (next) setHasMore(true);
        else setHasMore(false);
        setResult(results);

        setIsLoading(false);
      } catch (err) {
        // empty
      }
    } else {
      setResult([]);
    }
  };

  useEffect(() => {
    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = debounce(onSearchText, 500);
  }, []);

  useEffect(() => {
    if (isExit) {
      setSearchValue('');
    }
  }, [isExit]);

  const getData = async (pId) => {
    if (pId) {
      try {
        const response = await apiCall('get', `/book-generator/pages/${pId}`, accessToken);
        const res = response.data;
        dispatch(staffPageSliceActions.setSelectStaffPage(res));
        dispatch(staffPageSliceActions.setErrorMessage(''));
        dispatch(staffPageSliceActions.setIsExit(false));
        setSearchValue(res.system_id);
      } catch (err) {
        dispatch(staffPageSliceActions.setSelectStaffPage({}));
        dispatch(staffPageSliceActions.setErrorMessage(err.message));
        dispatch(staffPageSliceActions.setIsExit(false));
      }
    }
  };

  useEffect(() => {
    if (pageId) {
      getData(pageId);
    }
  }, [pageId]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    inputRef.current(inputValue);
  };

  const fetchMoreData = async () => {
    if (result.length >= pagesCount) {
      setHasMore(false);
      return;
    }
    try {
      const res = await apiCall(
        'get',
        nextUrl.replace(`${process.env.REACT_APP_API_URL_HTTP}`, ''),
        accessToken
      );
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { next, results } = res.data;
      setNextUrl(next);
      const temp = result.concat(results);
      setResult(temp);
    } catch (err) {
      // empty
    }
  };

  const handleClickItem = (item) => {
    dispatch(staffPageSliceActions.setSelectStaffPage(item));
    dispatch(staffPageSliceActions.setErrorMessage(''));
    setSelectedIngredientImg(item.image_preview);
    setSearchValue(item.system_id);
    setResult([]);
  };

  return (
    <div className={header} ref={ref}>
      <div className={right}>
        <div className={right__btnCont}>
          <div className={autocomplete_con}>
            <Input
              type="text"
              id="pageId"
              placeholder="PAGE ID"
              value={searchValue}
              onChange={handleChange}
            />
            {result.length > 0 && (
              <InfiniteScroll
                dataLength={result.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className={loading_more}>Loading More...</h4>}
                height={350}
                className={scrollbar}>
                <ul className={autocomplete_con__search_result}>
                  {result.map((item, index) => (
                    <li
                      key={index}
                      className={autocomplete_con__search_item}
                      onClick={() => handleClickItem(item)}>
                      {item.system_id}
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
